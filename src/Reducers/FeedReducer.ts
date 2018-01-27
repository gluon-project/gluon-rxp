import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'
import * as UserActions from './UserReducer'

export interface FeedState {
  selectedToken: string,
  list: TokenTransactionsMap,
}

const initialState: FeedState = {
  selectedToken: null,
  list: {},
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: FeedState) => {
  return initialState
})

export const fetchTransactions = createAction('Start fetching Transactions')

export const setTransactions = createAction('Set Transactions')
reducer.on(setTransactions, (state: FeedState, payload?: {transactions: Transaction[], tokenAddress?: string}) => {
  return {
    ...state,
    list: {...state.list, [payload.tokenAddress]: payload.transactions},
  }
})

export const addTransaction = createAction('Add transaction')
reducer.on(addTransaction, (state: FeedState, payload?: Transaction) => {
  let list = {...state.list}
  if (!list[payload.token]) {
    list[payload.token] = []
  }
  list[payload.token].push(payload)
  return {
    ...state,
    list: { ...list },
  }
})

export const selectToken = createAction('Select Feed token')
reducer.on(selectToken, (state: FeedState, payload?: string) => {
  return {
    ...state,
    selectedToken: payload,
  }
})
