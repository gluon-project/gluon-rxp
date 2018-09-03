import {
  delay,
  SagaIterator,
  eventChannel,
} from 'redux-saga'
import {
  call,
  put,
  fork,
  select,
  spawn,
  take,
  takeEvery,
} from 'redux-saga/effects'
const URL = require('url-parse')
import RX = require('reactxp')
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import * as Services from '../Services'
import Utils from '../Utils'

// const client = Matrix.createClient({
//   baseUrl: 'https://matrix.org',
//   userId: '@colis:matrix.org',
//   accessToken: 'MDAxOGxvY2F0aW9uIG1hdHJpeC5vcmcKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID\
// 0gMQowMDI0Y2lkIHVzZXJfaWQgPSBAY29saXM6bWF0cml4Lm9yZwowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWN\
// pZCBub25jZSA9IHlCQzlXLCN1TjI2T2lrVVMKMDAyZnNpZ25hdHVyZSACh7IzteI-jyeBbTwX0_Hcn-iNpwOMTHcC\
// FxECVVOSNgo',
// })

// const matrixEventToArgs = (event: any) => ({
//   roomId: event.getRoomId(),
//   id: event.getId(),
//   type: event.getType(),
//   content: event.getContent(),
//   prevContent: event.getPrevContent(),
//   ts: event.getTs(),
//   sender: event.getSender(),
//   stateKey: event.getStateKey(),
//   redactedBecause: event.getUnsigned().redacted_because,
// })

// const emittedEventToEmittedArgs = {
//   sync: (state: any) => ({ state }),
//   Room: (room: any) => ({ roomId: room.roomId }),
//   'Room.timeline': matrixEventToArgs,
//   'Room.name': (room: any) => ({
//       roomId: room.roomId,
//       name: room.name,
//   }),
//   'Room.receipt': (event: any) => ({
//       roomId: event.getRoomId(),
//       content: event.getContent(),
//   }),
//   'Room.redaction': (event: any) => ({
//       redactedBecause: {
//           sender: event.getSender(),
//           content: event.getContent(),
//           ts: event.getTs(),
//       },
//       redactedEventId: event.event.redacts,
//       roomId: event.getRoomId(),
//   }),
//   'RoomState.events': matrixEventToArgs,
//   'RoomMember.membership': (event: any, member: any) => ({
//       roomId: event.getRoomId(),
//       userId: member.userId,
//       name: member.name,
//       membership: member.membership,
//       avatarUrl: member.events.member ?
//           member.events.member.getContent().avatar_url :
//           null,
//   }),
//   'RoomMember.name': (event: any, member: any) => ({
//       roomId: event.getRoomId(),
//       userId: member.userId,
//       name: member.name,
//   }),
// }

export function * handleSyncEvent (event: any) {
  if (event === 'PREPARED') {
    const rooms = yield call(Services.Matrix.getRooms)
    yield put(Actions.Matrix.setRooms(rooms))

    yield put(Actions.Process.start({type: Enums.ProcessType.LoadMatrixClaims}))
    const claimUrls = yield call(Services.Matrix.getClaims)
    yield put(Actions.Contacts.loadMatrixClaims(claimUrls))

    const timelineChannel = yield eventChannel(emitter => {
      Services.Matrix.client.on('Room.timeline', emitter)
      return () => Services.Matrix.client.off('Room.timeline', emitter)
    })
    yield takeEvery(timelineChannel, handleTimelineEvent)
  }
  return true
}

export function * handleTimelineEvent (event: any) {
  const data = Services.Matrix.getEventData(event)
  // console.log('New message', data)
  // yield put(Actions.Matrix.addTimelineEvent(data))
  if (data.content.info && data.content.info.mimetype === 'application/json') {
    const claimUrl = Services.Matrix.client.mxcUrlToHttp(data.content.url)
    yield put(Actions.Contacts.loadAndAppendMatrixClaims({roomId: data.roomId, url: claimUrl}))
  }

  const rooms = yield call(Services.Matrix.getRooms)
  yield put(Actions.Matrix.setRooms(rooms))

}

export function * watchMatrixUpdates () {
  const synchChannel = yield eventChannel(emitter => {
    Services.Matrix.client.on('sync', emitter)
    return () => Services.Matrix.client.off('sync', emitter)
  })

  yield takeEvery(synchChannel, handleSyncEvent)

  Services.Matrix.client.startClient({initialSyncLimit: 100})
}

export function* watchStartLogin(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Matrix.login)
    yield put(Actions.Process.start({type: Enums.ProcessType.MatrixLogin}))

    try {
      const currentUser = yield call(Services.Matrix.login, action.payload.username, action.payload.password, action.payload.baseUrl)
      const profileInfo = yield call(Services.Matrix.getProfileInfo)
      const currentWeb3User: User = yield select(Selectors.User.getCurrent)
      console.log({profileInfo, currentWeb3User})

      yield put(Actions.Contacts.signAnonymousClaim({
        sub: currentWeb3User.did,
        claim: {
          matrixId: currentUser.user_id,
        },
      }))

      if (profileInfo.displayname) {
        yield put(Actions.Contacts.signAnonymousClaim({
          sub: currentWeb3User.did,
          claim: {
            name: profileInfo.displayname,
          },
        }))
      }
      if (profileInfo.avatar_url) {
        yield put(Actions.Contacts.signAnonymousClaim({
          sub: currentWeb3User.did,
          claim: {
            avatar: profileInfo.avatar_url,
          },
        }))
      }

      yield put(Actions.Matrix.setCurrentUser(currentUser))
      const uportDid = yield select(Selectors.User.getUportDid)
      if (uportDid !== null) {
        const credentials = {
          sub: uportDid,
          claim: {
            matrixUser: currentUser,
          },
        }
        yield call(Services.uPort.attestCredentials, credentials)
      }
      yield fork(watchMatrixUpdates)
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MatrixLogin}))
  }
}

export function* watchStartRegister(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Matrix.register)
    yield put(Actions.Process.start({type: Enums.ProcessType.MatrixRegister}))

    try {
      const currentUser = yield call(Services.Matrix.register, action.payload.username, action.payload.password, action.payload.baseUrl)
      // yield put(Actions.Matrix.setCurrentUser(currentUser))
      // yield fork(watchMatrixUpdates)
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MatrixRegister}))
  }
}

export function* startClient(): SagaIterator {
  try {
    const currentUser = yield select(Selectors.Matrix.getCurrentUser)
    if (currentUser) {
      yield call(Services.Matrix.startClient, currentUser)
      yield call(delay, 1000)
      yield fork(watchMatrixUpdates)
    }
  } catch (e) {
    yield put(Actions.App.handleError(e))
  }
}

export function* watchSendTextMessage(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Matrix.sendTextMessage)
    yield put(Actions.Process.start({type: Enums.ProcessType.MatrixSendMessage}))

    try {
      const currentRoomId = yield select(Selectors.Matrix.getSelectedRoomId)
      yield call(Services.Matrix.sendTextMessage, currentRoomId, action.payload)
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MatrixSendMessage}))
  }
}

export function* watchSendMessage(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Matrix.sendMessage)
    yield put(Actions.Process.start({type: Enums.ProcessType.MatrixSendMessage}))

    try {
      const currentRoomId = yield select(Selectors.Matrix.getSelectedRoomId)
      yield call(Services.Matrix.sendMessage, currentRoomId, action.payload)
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MatrixSendMessage}))
  }
}

export function* watchSendFile(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Matrix.sendFile)
    yield put(Actions.Process.start({type: Enums.ProcessType.MatrixSendMessage}))

    try {
      const currentRoomId = yield select(Selectors.Matrix.getSelectedRoomId)
      yield call(Services.Matrix.uploadFile, currentRoomId, action.payload)
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MatrixSendMessage}))
  }
}

export function* watchRequest(): SagaIterator {
  while (true) {
    yield take(Actions.Transactions.requestInMatrix)
    yield put(Actions.Process.start({type: Enums.ProcessType.RequestInMatrix}))
    const transaction: Transaction = yield select(Selectors.Transactions.getNew)

    const token: Token = yield select(Selectors.Tokens.getTokenByAddress, transaction.token)
    try {

      if (transaction.room) {
        // Send message

        yield put(Actions.Matrix.selectRoom(transaction.room))
        const sender: User = yield select(Selectors.Contacts.getAccountByAddress, transaction.sender)

        let url = 'https://gluon.space/send/?'
        if (sender) {
          url = `${url}r=${sender.address}&n=${encodeURIComponent(sender.name)}`
        }
        if (token) {
          url = `${url}&t=${token.address}`
        }
        if (token && token.networkId) {
          url = `${url}&nid=${token.networkId}`
        }
        if (transaction.amount) {
          url = `${url}&a=${transaction.amount}`
        }

        const content = {
          body: `${sender.name} requests ${transaction.amount ?
            Utils.number.numberToString(transaction.amount, token.decimals) : ''} ${token ? token.code : ''}`,
          formatted_body: `<strong><a href="${url}">${sender.name} is requesting \
${transaction.amount ? transaction.amount : ''} ${token ? token.code : ''}</a></strong>`,
          format: 'org.matrix.custom.html',
          msgtype: 'm.text',
          request: transaction,
        }

        yield put(Actions.Matrix.sendMessage(content))

        const claims: any[] = []
        if (sender.claims && sender.claims.name) {
          claims.push(sender.claims.name.jwt)
        }
        if (sender.claims && sender.claims.matrixId) {
          claims.push(sender.claims.matrixId.jwt)
        }
        if (sender.claims && sender.claims.avatar) {
          claims.push(sender.claims.avatar.jwt)
        }

        const file = {
          fileName: 'claims.json',
          fileContent: JSON.stringify({claims}),
        }
        yield put(Actions.Matrix.sendFile(file))

        yield put(Actions.Navigation.navigate('RoomsTab'))
      }
      yield put(Actions.Transactions.resetNewTransaction(transaction))
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.RequestInMatrix}))
  }
}

export function* watchCreateRoom(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Matrix.createRoom)
    yield put(Actions.Process.start({type: Enums.ProcessType.MatrixCreateRoom}))

    try {
      const result = yield call(Services.Matrix.createRoom, action.payload)
      yield put(Actions.Matrix.selectRoom(result.room_id))
      yield put(Actions.Navigation.navigateBack())
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MatrixCreateRoom}))
  }
}

export function* watchLeaveRoom(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Matrix.leaveRoom)
    yield put(Actions.Process.start({type: Enums.ProcessType.MatrixLeaveRoom}))

    try {
      const result = yield call(Services.Matrix.leaveRoom, action.payload)
      const rooms: MatrixRoom[] = yield select(Selectors.Matrix.getRoomsRaw)
      yield put(Actions.Matrix.selectRoom(rooms.length > 0 ? rooms[0].id : null))
      yield put(Actions.Navigation.navigateBack())
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MatrixLeaveRoom}))
  }
}

export function* watchInviteToRoom(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Matrix.inviteToRoom)
    yield put(Actions.Process.start({type: Enums.ProcessType.MatrixInviteContacts}))

    try {
      const result = yield call(Services.Matrix.invite, action.payload.roomId, action.payload.userIds)
      yield put(Actions.Navigation.navigateBack())
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MatrixInviteContacts}))
  }
}

export function* watchSetRoomName(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Matrix.setRoomName)
    yield put(Actions.Process.start({type: Enums.ProcessType.MatrixSetRoomName}))

    try {
      const result = yield call(Services.Matrix.setRoomName, action.payload.roomId, action.payload.name)
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MatrixSetRoomName}))
  }
}
