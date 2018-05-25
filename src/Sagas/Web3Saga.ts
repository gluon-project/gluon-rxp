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
      if (token.type === Enums.TokenType.ETH) {
        newTransaction = yield call(Web3.sendTransactionETH, transaction)
        yield call(delay, 5000)
        yield put(Actions.Transactions.resetNewTransaction(newTransaction))
        yield put(Actions.User.refreshBalances())
        yield put(Actions.Navigation.navigate('Tokens'))
      } else {
        if (token.type === Enums.TokenType.Erc223) {
          newTransaction = yield call(Web3.sendTransactionErc223, transaction)
        } else if (token.type === Enums.TokenType.Erc20) {
          newTransaction = yield call(Web3.sendTransactionErc20, transaction)
        }

        yield put(Actions.Feed.addTransaction(newTransaction))
        yield put(Actions.Feed.selectToken(newTransaction.token))
        yield call(delay, 15000)
        yield put(Actions.Navigation.navigate('FeedTab'))
      }
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
      if (currentUser) {
        const tokens = yield select(Selectors.Tokens.getList)
        const newBalances = yield call(Web3.getNewBalances, currentUser.address, tokens)
        yield put(Actions.User.setBalances(newBalances))
      }
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
    yield call(delay, 1000)
    const tokens: Token[] = yield select(Selectors.Tokens.getListForDownload)
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

export function* watchSetMintNumTokens(): SagaIterator {
  yield takeEvery(Actions.Tokens.setMintNumTokens, getPriceToMint)
}

export function* watchSetBurnNumTokens(): SagaIterator {
  yield takeEvery(Actions.Tokens.setBurnNumTokens, getRewardForBurn)
}

export function* getPriceToMint(): SagaIterator {
  yield put(Actions.Process.start({type: Enums.ProcessType.GetPriceToMint}))
  try {
    const mintTransaction: MintTransaction = yield select(Selectors.Tokens.getMintTransaction)
    const tokenAddress = yield select(Selectors.Tokens.getCurrentToken)
    const token = yield select(Selectors.Tokens.getTokenByAddress, tokenAddress)
    const price = yield call(Web3.priceToMint, token, mintTransaction.numTokens)
    yield put(Actions.Tokens.setMintPrice(price))
  } catch (e) {
    yield put(Actions.App.handleError(e))
  }
  yield put(Actions.Process.end({type: Enums.ProcessType.GetPriceToMint}))
}

export function* getRewardForBurn(): SagaIterator {
  yield put(Actions.Process.start({type: Enums.ProcessType.GetRewardForBurn}))
  try {
    const burnTransaction: BurnTransaction = yield select(Selectors.Tokens.getBurnTransaction)
    const tokenAddress = yield select(Selectors.Tokens.getCurrentToken)
    const token = yield select(Selectors.Tokens.getTokenByAddress, tokenAddress)
    const reward = yield call(Web3.rewardForBurn, token, burnTransaction.numTokens)
    yield put(Actions.Tokens.setBurnReward(reward))
  } catch (e) {
    yield put(Actions.App.handleError(e))
  }
  yield put(Actions.Process.end({type: Enums.ProcessType.GetRewardForBurn}))
}

export function* watchMintTokens(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Tokens.mintTokens)
    yield put(Actions.Process.start({type: Enums.ProcessType.MintTokens}))
    try {
      const currentUser = yield select(Selectors.User.getCurrent)
      const tokenAddress = yield select(Selectors.Tokens.getCurrentToken)
      const transaction: MintTransaction = yield select(Selectors.Tokens.getMintTransaction)
      const token: Token = yield select(Selectors.Tokens.getTokenByAddress, tokenAddress)
      if (token.reserveToken === Config.tokens.etherAddress) {
        const tx = yield call(Web3.mintTokens, {
          ...transaction,
          token: tokenAddress,
          sender: currentUser.address,
        } as MintTransaction)
      } else {
        const tx = yield call(Web3.mintCommunityTokens, {
          ...transaction,
          token: tokenAddress,
          reserveToken: token.reserveToken,
          sender: currentUser.address,
        } as MintTransaction)
      }
      yield call(delay, 1000)
      yield put(Actions.User.refreshBalances())
      yield put(Actions.Feed.fetchTransactions())
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.MintTokens}))
  }
}

export function* watchBurnTokens(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Tokens.burnTokens)
    yield put(Actions.Process.start({type: Enums.ProcessType.BurnTokens}))
    try {
      const currentUser = yield select(Selectors.User.getCurrent)
      const tokenAddress = yield select(Selectors.Tokens.getCurrentToken)
      const transaction: BurnTransaction = yield select(Selectors.Tokens.getBurnTransaction)
      const token: Token = yield select(Selectors.Tokens.getTokenByAddress, tokenAddress)
      if (token.reserveToken === Config.tokens.etherAddress) {
        const tx = yield call(Web3.burnTokens, {
          ...transaction,
          token: tokenAddress,
          sender: currentUser.address,
        } as BurnTransaction)
      } else {
        const tx = yield call(Web3.burnCommunityTokens, {
          ...transaction,
          token: tokenAddress,
          reserveToken: token.reserveToken,
          sender: currentUser.address,
        } as BurnTransaction)
      }
      yield call(delay, 1000)
      yield put(Actions.User.refreshBalances())
      yield put(Actions.Feed.fetchTransactions())
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.BurnTokens}))
  }
}
