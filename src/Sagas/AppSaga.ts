import {
  delay,
  SagaIterator,
  eventChannel,
} from 'redux-saga'
import {
  call,
  put,
  select,
  fork,
  spawn,
  take,
} from 'redux-saga/effects'
const URL = require('url-parse')
import RX = require('reactxp')
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import { CodePush, Web3, uPort } from '../Services'
import * as Enums from '../Enums'
import Config from '../Config'
import utils from '../Utils'

import { startClient } from './MatrixSaga'
import { restoreState } from './UportSaga'

export function* watchStoreReady(): SagaIterator {
  yield take('persist/STOREREADY')
  // yield  call(delay, 5000)
  // const web3Provider = uPort.getProvider()
  // TODO Re-enable metamask
  // if ((<any>window).web3 && (<any>window).web3.currentProvider) {
  //   web3Provider.setProvider((<any>window).web3.currentProvider)
  // }
  // yield call(Web3.ethSingleton.setProvider, web3Provider)

  const matrixUser = yield select(Selectors.Matrix.getCurrentUser)
  if (matrixUser) {
    yield fork(startClient)
  }

  const deploymentMetaData: CodePushDeploymentMetaData = yield call(() => CodePush.getCodePushUpdateMetadata())
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

export function * watchUrlChanges () {
  const uriChannel = yield eventChannel(emitter => {
    RX.Linking.deepLinkRequestEvent.subscribe(emitter)
    return () => RX.Linking.deepLinkRequestEvent.unsubscribe(emitter)
  })

  while (true) {
    const uri = yield take(uriChannel)
    yield call(handleRequest, uri)
  }
}

function* handleInitialUrl(): SagaIterator {
  let uri = null
  if (RX.Platform.getType() === 'web') {
    uri = (<any>window.document.location.href)
  } else {
    uri = yield call(RX.Linking.getInitialUrl)
  }
  if (uri) {
    yield call(handleRequest, uri)
  }
}

function* handleRequest(uri: string): SagaIterator {
  const url = URL(uri, true)
  switch (url.pathname) {
    case '/reset':
      yield put(Actions.App.resetToInitialState())
      break
    case '/token/':
      const tokenAddress = url.query.t
      const networkId = url.query.nid
      const token = yield call(Web3.getTokenInfo, tokenAddress, networkId)
      const existingToken = yield select(Selectors.Tokens.getTokenByAddress, tokenAddress)
      if (!existingToken) {
        yield put(Actions.Tokens.addToken(token))
      }
      if (url.query.sa) {
        const existingContact = yield select(Selectors.Contacts.getAccountByAddress, url.query.sa)
        if (!existingContact.avatar) {
          yield put(Actions.Contacts.addContact({
            name: url.query.sn ? url.query.sn : utils.address.short(url.query.sa),
            address: url.query.sa,
            avatar: null,
          }))
        }
      }
      if (url.query.ra) {
        const existingContact = yield select(Selectors.Contacts.getAccountByAddress, url.query.ra)
        if (!existingContact.avatar) {
          yield put(Actions.Contacts.addContact({
            name: url.query.rn ? url.query.rn : utils.address.short(url.query.ra),
            address: url.query.ra,
            avatar: null,
          }))
        }
      }
      yield put(Actions.Feed.selectToken(tokenAddress))
      yield put(Actions.Navigation.navigate('FeedTab'))
      // yield put(Actions.Navigation.navigate('Feed'))
      break
    case '/send/':
      if (url.query.r) {
        const existingContact = yield select(Selectors.Contacts.getAccountByAddress, url.query.r)
        if (!existingContact.avatar) {
          yield put(Actions.Contacts.addContact({
            name: url.query.n ? url.query.n : utils.address.short(url.query.r),
            address: url.query.r,
            avatar: null,
          }))
        }
        yield put(Actions.Transactions.setReceiver(url.query.r))
      }
      if (url.query.t) {
        const tokenAddress = url.query.t
        if (url.query.t !== '0x0000000000000000000000000000000000000000') {
          const networkId = url.query.nid
          const token = yield call(Web3.getTokenInfo, tokenAddress, networkId)
          const existingToken = yield select(Selectors.Tokens.getTokenByAddress, tokenAddress)
          if (!existingToken) {
            yield put(Actions.Tokens.addToken(token))
          }
        }
        yield put(Actions.Transactions.setToken(url.query.t))
      }
      if (url.query.a) {
        yield put(Actions.Transactions.setAmount(parseInt(url.query.a, 10)))
      }
      yield put(Actions.Navigation.navigate('SendTab'))
      break
  }
}

function* loadInitialState(): SagaIterator {

  // yield fork(startClient)
  // yield fork(restoreState)

  yield call(handleInitialUrl)

  // try {
  //   // const accounts = yield call(Web3.getAccounts)
  //   // if (accounts && accounts.length > 0) {
  //   //   yield put(Actions.User.setAccounts(accounts))
  //   //   yield put(Actions.User.setCurrent({
  //   //     name: utils.address.short(accounts[0]),
  //   //     address: accounts[0],
  //   //     avatar: null,
  //   //   }))
  //     // yield call(delay, 500)
  //     // yield put(Actions.User.refreshBalances())
  //   }
  // } catch (e) {
  //   yield put(Actions.App.handleError(e))
  // }
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
      //@TODO figure out why this is happening
      if (msg !== 'Uport Web3 SubProvider does not support synchronous requests.') {
        yield put(Actions.ModalMessage.setModalMessage({
          title: action.payload.type || 'Error',
          ctaTitle: 'Close',
          message: msg,
          type: Enums.MessageType.Error,
        } as ModalMessageConfig))
      }
    } catch (e) {
      console.log(e)
    }
  }
}
