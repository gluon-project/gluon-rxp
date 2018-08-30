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
import { simpleHtmlForAttachment } from '../Components/AttachmentCard'
import Utils from '../Utils'

export function* watchStartSavingTransaction(): SagaIterator {
  while (true) {
    yield take(Actions.Transactions.startSaving)
    yield put(Actions.Process.start({type: Enums.ProcessType.SendTransaction}))
    const transaction: Transaction = yield select(Selectors.Transactions.getNew)
    const currentUser = yield select(Selectors.User.getCurrent)
    const token: Token = yield select(Selectors.Tokens.getTokenByAddress, transaction.token)
    try {
      let newTransaction: Transaction
      let msgtype: string
      if (token.type === Enums.TokenType.ETH) {
        msgtype = 'm.eth.transfer'
        newTransaction = yield call(Web3.sendTransactionETH, transaction)
        yield put(Actions.Navigation.navigate('Tokens'))
      } else {
        msgtype = 'm.eth.erc20.tranferTo'
        if (token.type === Enums.TokenType.Erc223) {
          newTransaction = yield call(Web3.sendTransactionErc223, transaction)
        } else if (token.type === Enums.TokenType.Erc20) {
          newTransaction = yield call(Web3.sendTransactionErc20, transaction)
        }
      }
      if (transaction.room) {
        // Send message

        yield put(Actions.Matrix.selectRoom(transaction.room))
        const sender: User = yield select(Selectors.Contacts.getAccountByAddress, newTransaction.sender)
        const receiver: User = yield select(Selectors.Contacts.getAccountByAddress, newTransaction.receiver)
        const content = {
          body: `${sender.name} sent ${Utils.number.numberToString(newTransaction.amount, token.decimals)} \
 ${token.code} to ${receiver.name}`,
          formatted_body: `<strong><a href="https://rinkeby.etherscan.io/address/${sender.address}">${sender.name}</a></strong> sent \
<a href="https://rinkeby.etherscan.io/tx/${newTransaction.hash}">\
${Utils.number.numberToString(newTransaction.amount, token.decimals)} ${token.code}</a> \
to <strong><a href="https://rinkeby.etherscan.io/address/${sender.address}">${receiver.name}</a></strong>`,
          format: 'org.matrix.custom.html',
          msgtype: 'm.text',
          txHash: newTransaction.hash,
          transaction: newTransaction,
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
        if (receiver.claims && receiver.claims.name) {
          claims.push(receiver.claims.name.jwt)
        }
        if (receiver.claims && receiver.claims.matrixId) {
          claims.push(receiver.claims.matrixId.jwt)
        }
        if (receiver.claims && receiver.claims.avatar) {
          claims.push(receiver.claims.avatar.jwt)
        }

        const file = {
          fileName: 'claims.json',
          fileContent: JSON.stringify({claims}),
        }
        yield put(Actions.Matrix.sendFile(file))

        yield put(Actions.Navigation.navigate('RoomsTab'))
      } else {
        yield put(Actions.User.refreshBalances())
        yield put(Actions.Tokens.selectToken(token.address))
        yield put(Actions.Navigation.navigate('WalletTab'))
      }
      yield put(Actions.Transactions.resetNewTransaction(newTransaction))
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
      console.log({newToken})
      // yield put(Actions.Tokens.addToken(newToken))
      // yield put(Actions.User.refreshBalances())
      // yield put(Actions.Feed.fetchTransactions())
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
      yield put(Actions.Tokens.getPriceToMint())
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
      yield put(Actions.Tokens.getRewardForBurn())
      yield put(Actions.Feed.fetchTransactions())
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.BurnTokens}))
  }
}

export function* watchGetAvailableTokens(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Tokens.getAvailableTokens)
    yield put(Actions.Process.start({type: Enums.ProcessType.GetAvailableTokens}))
    try {
      const tokenAddresses: string[] = yield call(Etherscan.fetchAvailableTokens)
      const tokens = yield call(Web3.getTokenListInfo, tokenAddresses)
      yield put(Actions.Tokens.setAvailableTokens(tokens))
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.GetAvailableTokens}))
  }
}

export function* loadTransactionInfo(action: any): SagaIterator {
  const hash = action.payload
  yield put(Actions.Process.start({type: Enums.ProcessType.LoadTransactionInfo, data: hash}))
  try {
    const transaction: Transaction = yield call(Web3.loadTransactionInfo, hash)

    // Add token if unknown
    const existingToken = yield select(Selectors.Tokens.getTokenByAddress, transaction.token)
    if (!existingToken) {
      const token = yield call(Web3.getTokenInfo, transaction.token)
      yield put(Actions.Tokens.addToken(token))
    }

    yield put(Actions.Transactions.addToCache(transaction))
  } catch (e) {
    yield put(Actions.App.handleError(e))
  }
  yield put(Actions.Process.end({ type: Enums.ProcessType.LoadTransactionInfo, data: hash}))
}

export function* watchLoadTransactionInfo(): SagaIterator {
  yield takeEvery(Actions.Transactions.startLoading, loadTransactionInfo)
}
