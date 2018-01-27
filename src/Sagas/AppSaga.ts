import {
  delay,
  SagaIterator,
} from 'redux-saga'
import {
  call,
  put,
  select,
  spawn,
  take,
} from 'redux-saga/effects'

import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import { CodePush, Web3 } from '../Services'
import * as Enums from '../Enums'
import Config from '../Config'
import utils from '../Utils'

export function* watchStoreReady(): SagaIterator {
  yield take('persist/STOREREADY')
  const deploymentMetaData: CodePushDeploymentMetaData = yield call(() => CodePush.getCodePushUpdateMetadata())
  yield  call(delay, 500)
  yield put(Actions.App.setVersion(deploymentMetaData.version))

  let deploymentKey
  if (deploymentMetaData.deploymentKey) {
    deploymentKey = deploymentMetaData.deploymentKey
  } else {
    const currentCodePushDeployment: CodePushDeployment = yield select(Selectors.App.getCurrentCodePushDeployment)
    deploymentKey = currentCodePushDeployment.key
  }

  if (__DEV__ === undefined || __DEV__ === false) {
    yield spawn(CodePush.codePushSaga, {
      syncOptions: {
        deploymentKey: deploymentKey,
        updateDialog: true,
        installMode: 0,
      },
    })
  }

  yield *loadInitialState()

}

function* loadInitialState(): SagaIterator {
  yield put(Actions.App.initialDataStartedLoading())

  try {
    const accounts = yield call(Web3.getAccounts)
    if (accounts && accounts.length > 0) {
      yield put(Actions.User.setAccounts(accounts))
      yield put(Actions.User.setCurrent({
        name: utils.address.short(accounts[0]),
        address: accounts[0],
        avatar: null,
      }))
      yield call(delay, 500)
      yield put(Actions.User.refreshBalances())
    }
  } catch (e) {
    yield put(Actions.App.handleError(e))
  }
  yield put(Actions.Feed.fetchTransactions())
  yield put(Actions.App.initialDataFinishedLoading())
}

export function* watchResetToInitialState(): SagaIterator {
  while (true) {
    yield take(Actions.App.resetToInitialState)
    yield *loadInitialState()
  }
}

export function* watchSyncCodePushDeployment(): SagaIterator {
  while (true) {
    const action = yield take(Actions.App.syncCodePushDeployment)
    const codePushDeployment: CodePushDeployment = action.payload
    try {
      yield call(() => CodePush.sync(codePushDeployment.key, {
        codePushDownloadDidProgress: (o: any) => {
          console.log(o)
        },
        codePushStatusDidChange: (o: any) => {
          console.log(o)
        },
      }))
    } catch (e) {
      console.log(e)
    }
  }
}

export function* watchHandleError(): SagaIterator {
  while (true) {
    try {
      let msg: string = ''
      const action = yield take(Actions.App.handleError)
      const error = action.payload.error
      if (error && error.code) {
        msg = error.message
      } else if (action.payload.message) {
        msg = action.payload.message
      }

      yield put(Actions.ModalMessage.setModalMessage({
        title: action.payload.type || 'Error',
        ctaTitle: 'Close',
        message: msg,
        type: Enums.MessageType.Error,
      } as ModalMessageConfig))
    } catch (e) {
      console.log(e)
    }
  }
}
