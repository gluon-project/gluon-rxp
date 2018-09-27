import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'
import * as UserActions from './UserReducer'
import * as FeedActions from './FeedReducer'

interface HashToTransactionMap {
  [hash: string]: Transaction
}

export interface TransactionState {
  isSend: boolean,
  new: Transaction,
  list: Transaction[],
  cache: HashToTransactionMap,
}

const emptyTransaction = {
  amount: '',
  token: null,
  receiver: null,
  sender: null,
  attachment: null,
} as Transaction

const initialState: TransactionState = {
  isSend: true,
  new: emptyTransaction,
  list: [],
  cache: {},
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: TransactionState) => {
  return initialState
})

export const setNewTransaction = createAction('Set New Transaction')
reducer.on(setNewTransaction, (state: TransactionState, payload?: Transaction) => {
  return {
    ...state,
    new: payload,
  }
})

export const setRoom = createAction('Set Room')
reducer.on(setRoom, (state: TransactionState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      room: payload,
    },
  }
})

export const setIsSend = createAction('Set is send')
reducer.on(setIsSend, (state: TransactionState, payload?: boolean) => {
  return {
    ...state,
    isSend: payload,
  }
})

export const setToken = createAction('Set Token')
reducer.on(setToken, (state: TransactionState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      token: payload,
    },
  }
})

export const setNetworkId = createAction('Set Network Id')
reducer.on(setNetworkId, (state: TransactionState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      networkId: payload,
    },
  }
})

export const setAmount = createAction('Set Amount')
reducer.on(setAmount, (state: TransactionState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      amount: payload,
    },
  }
})

export const setReceiver = createAction('Set Receiver')
reducer.on(setReceiver, (state: TransactionState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      receiver: payload,
    },
  }
})

export const setSender = createAction('Set Sender')
reducer.on(setSender, (state: TransactionState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      sender: payload,
    },
  }
})

reducer.on(UserActions.setCurrent, (state: TransactionState, payload?: User) => {
  return {
    ...state,
    new: {
      ...state.new,
      sender: payload.address,
    },
  }
})

export const setAttachment = createAction('Set transaction attachment')
reducer.on(setAttachment, (state: TransactionState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      attachment: payload,
    },
  }
})

export const setHash = createAction('Set Ethereum transaction hash')
reducer.on(setHash, (state: TransactionState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      hash: payload,
    },
  }
})

export const setNew = createAction('Set new transaction params')
reducer.on(setNew, (state: TransactionState, payload?: Transaction) => {
  return {
    ...state,
    new: {
      ...state.new,
      ...payload,
    },
  }
})

export const startSaving = createAction('Start saving transaction')

reducer.on(FeedActions.addTransaction, (state: TransactionState, payload?: Transaction) => {
  return {
    ...state,
    new: {...emptyTransaction, sender: payload.sender},
  }
})

export const resetNewTransaction = createAction('Start saving transaction')
reducer.on(resetNewTransaction, (state: TransactionState, payload?: Transaction) => {
  return {
    ...state,
    new: {...emptyTransaction, sender: payload.sender},
  }
})

export const requestInMatrix = createAction('Request in matrix')

export const startLoading = createAction('Start loading transaction')

export const addToCache = createAction('Add attachment to cache')
reducer.on(addToCache, (state: TransactionState, payload?: Transaction) => {
  let newCache = { ...state.cache }
  newCache[payload.hash] = payload
  return {
    ...state,
    cache: newCache,
  }
})
