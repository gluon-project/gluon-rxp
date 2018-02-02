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
  takeEvery,
  all,
} from 'redux-saga/effects'

import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import Config from '../Config'
import { Web3, Etherscan } from '../Services'

export function* watchStartSavingTransaction(): SagaIterator {
  while (true) {
    yield take(Actions.Transactions.startSaving)
    yield put(Actions.Process.start({type: Enums.ProcessType.SendTransaction}))
    const transaction: Transaction = yield select(Selectors.Transactions.getNew)
    const currentUser = yield select(Selectors.User.getCurrent)
    const token: Token = yield select(Selectors.Tokens.getTokenByAddress, transaction.token)
    try {
      let newTransaction
      if (token.type === Enums.TokenType.Erc223) {
        newTransaction = yield call(Web3.sendTransactionErc223, transaction)
      } else if (token.type === Enums.TokenType.Erc20) {
        newTransaction = yield call(Web3.sendTransactionErc20, transaction)
      }

      yield put(Actions.Feed.addTransaction(newTransaction))
      yield put(Actions.Feed.selectToken(newTransaction.token))
      yield call(delay, 15000)
      yield put(Actions.Navigation.navigate('FeedTab'))
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.SendTransaction}))
  }
}

export function* watchRefreshBalances(): SagaIterator {
  while (true) {
    yield take(Actions.User.refreshBalances)
    yield put(Actions.Process.start({type: Enums.ProcessType.BalanceUpdate}))
    try {
      const currentUser = yield select(Selectors.User.getCurrent)
      const tokens = yield select(Selectors.Tokens.getList)
      const newBalances = yield call(Web3.getNewBalances, currentUser.address, tokens)
      yield put(Actions.User.setBalances(newBalances))
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.BalanceUpdate}))
  }
}

function* loadTokenFeed(token: Token): SagaIterator {
  const transactions = yield call(Etherscan.fetchTransactions, token)
  if (transactions) {
    yield put(Actions.Feed.setTransactions({transactions, tokenAddress: token.address}))
  }
}

export function* loadAllTokenFeeds(): SagaIterator {
  yield put(Actions.Process.start({type: Enums.ProcessType.LoadTransactions}))
  try {
    const tokens: Token[] = yield select(Selectors.Tokens.getList)
    yield all(tokens.map(token => call(loadTokenFeed, token)))
  } catch (e) {
    yield put(Actions.App.handleError(e))
  }
  yield put(Actions.Process.end({type: Enums.ProcessType.LoadTransactions}))
}

export function* watchLoadFeed(): SagaIterator {
  yield takeEvery(Actions.Feed.fetchTransactions, loadAllTokenFeeds)
}

export function* watchCreateNewToken(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Tokens.createNewToken)
    const token = action.payload as Token
    console.log(token)
    yield put(Actions.Process.start({type: Enums.ProcessType.CreateNewToken}))
    const currentUser = yield select(Selectors.User.getCurrent)
    try {
      const newToken = yield call(Web3.createNewToken, token, currentUser)
      yield put(Actions.Tokens.addToken(newToken))
      yield put(Actions.User.refreshBalances())
      yield put(Actions.Feed.fetchTransactions())
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.CreateNewToken}))
  }
}

export function* watchAddToken(): SagaIterator {
  while (true) {
    yield take(Actions.Tokens.addToken)
    yield put(Actions.Tokens.setNew(null))
    yield put(Actions.User.refreshBalances())
    yield put(Actions.Feed.fetchTransactions())
  }
}

export function* watchGetTokenInfo(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Tokens.getTokenInfo)
    try {
      const token = yield call(Web3.getTokenInfo, action.payload)
      yield put(Actions.Tokens.setNew(token))

    } catch (e) {
      yield put(Actions.App.handleError(e))
    }

  }
}
