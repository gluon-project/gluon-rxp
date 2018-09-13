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

  const createCommunityTokenTxChannel = yield eventChannel(emitter => {
    Services.uPort.uportConnect.onResponse('createCommunityTokenTx', (err: any, data: any) => {
      console.log('createCommunityTokenTx response', data)
      emitter(data.res)
    })
    return () => {
      console.log('SAGA unsubscribe')
    }
  })

  const burnTxChannel = yield eventChannel(emitter => {
    Services.uPort.uportConnect.onResponse('burnTx', (err: any, data: any) => {
      console.log('burn response', data)
      emitter(data.res)
    })
    return () => {
      console.log('SAGA unsubscribe')
    }
  })

  const mintTxChannel = yield eventChannel(emitter => {
    Services.uPort.uportConnect.onResponse('mintTx', (err: any, data: any) => {
      console.log('mint response', data)
      emitter(data.res)
    })
    return () => {
      console.log('SAGA unsubscribe')
    }
  })

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
  yield takeEvery(mintTxChannel, (data: any) => console.log(data))
  yield takeEvery(burnTxChannel, (data: any) => console.log(data))
  yield takeEvery(createCommunityTokenTxChannel, (data: any) => console.log(data))
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

export function* restoreState(): SagaIterator {
  try {
    const result = Services.uPort.uportConnect.state
    console.log('Restoring uPort state: ', result)
    if (result && result.name) {
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
      yield call(Services.Web3.ethSingleton.setProvider, Services.uPort.getProvider())
      yield call(delay, 500)
      yield put(Actions.User.refreshBalances())
    } else {
      console.log('no uport state')
    }
  } catch (e) {
    yield put(Actions.App.handleError(e))
  }
  return true
}

export function* logout(): SagaIterator {
  try {
    yield put(Actions.App.resetToInitialState())
    yield call(Services.uPort.logout)
    yield call(Services.Matrix.logout)
  } catch (e) {
    yield put(Actions.App.handleError(e))
  }
  return true
}

export function* watchLogout(): SagaIterator {
  yield takeEvery(Actions.User.logout, logout)
}
