import { delay, SagaIterator, eventChannel } from 'redux-saga'
import { call, put, select, spawn, take, fork, takeEvery } from 'redux-saga/effects'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import Config from '../Config'
import * as Services from '../Services'
import utils from '../Utils'
import { startClient } from './MatrixSaga'
import { handleSignedClaim } from './ClaimsSaga'

export function* watchStartLogin(): SagaIterator {
  while (true) {
    const action = yield take(Actions.User.startLogin)
    try {
      yield call(Services.uPort.requestCredentials, action.payload)
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
  }
}

export function * subscribeEvents () {

  const signClaimChannel = yield eventChannel(emitter => {
    Services.uPort.uportConnect.onResponse('signClaimReq', (err: any, data: any) => {
      emitter(data.res)
    })
    return () => {
      console.log('SAGA unsubscribe')
    }
  })

  const loginChannel = yield eventChannel(emitter => {
    Services.uPort.uportConnect.onResponse('disclosureReq', (err: any, data: any) => {
      emitter(data)
    })
    return () => {
      console.log('SAGA unsubscribe')
    }
  })

  yield takeEvery(loginChannel, handleLoginResponse)
  yield takeEvery(signClaimChannel, handleSignedClaim)
}

export function* handleLoginResponse(action: any): SagaIterator {
  console.log({action})
  const result = action.res
  try {
    if (result && result.name) {
      console.log(result)
      const user: User = {
        name: result.name,
        address: result.address,
        mnid: result.mnid,
        did: `did:uport:${result.mnid}`,
        avatar: result.avatar ? result.avatar.uri : null,
      }
      yield put(Actions.User.setUportDid(result.did))
      if (result.matrixUser) {
        yield put(Actions.Matrix.setCurrentUser(result.matrixUser))
        yield fork(startClient)
      }
      yield put(Actions.User.setAccounts([result.address]))
      yield put(Actions.User.setCurrent(user))
      yield put(Actions.Contacts.signAnonymousClaim({
        sub: user.did,
        claim: {
          name: result.name,
        },
      }))
      if (result.avatar) {
        yield put(Actions.Contacts.signAnonymousClaim({
          sub: user.did,
          claim: {
            avatar: result.avatar.uri,
          },
        }))
      }
      yield call(Services.Web3.ethSingleton.setProvider, Services.uPort.getProvider())
      yield call(delay, 500)
      yield put(Actions.User.refreshBalances())
    }
  } catch (e) {
    yield put(Actions.App.handleError(e))
  }
  return true
}
