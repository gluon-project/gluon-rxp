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
    console.log(Services.Matrix.client)

    const timelineChannel = yield eventChannel(emitter => {
      Services.Matrix.client.on('Room.timeline', emitter)
      return () => Services.Matrix.client.off('Room.timeline', emitter)
    })
    yield takeEvery(timelineChannel, handleTimelineEvent)
  }
  return true
}

export function * handleTimelineEvent (event: any) {
  // const data = Services.Matrix.getEventData(event)
  // console.log('New message', data)
  // yield put(Actions.Matrix.addTimelineEvent(data))
  const rooms = yield call(Services.Matrix.getRooms)
  yield put(Actions.Matrix.setRooms(rooms))

}

export function * watchMatrixUpdates () {
  const synchChannel = yield eventChannel(emitter => {
    Services.Matrix.client.on('sync', emitter)
    return () => Services.Matrix.client.off('sync', emitter)
  })

  yield takeEvery(synchChannel, handleSyncEvent)

  Services.Matrix.client.startClient()
}

export function* watchStartLogin(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Matrix.login)
    yield put(Actions.Process.start({type: Enums.ProcessType.MatrixLogin}))

    try {
      const currentUser = yield call(Services.Matrix.login, action.payload.username, action.payload.password, action.payload.baseUrl)
      yield put(Actions.Matrix.setCurrentUser(currentUser))
      yield fork(watchMatrixUpdates)
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MatrixLogin}))
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
