import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'
import * as UserActions from './UserReducer'
import * as FeedActions from './FeedReducer'

export interface TransactionState {
  isSend: boolean,
  new: Transaction,
  list: Transaction[],
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
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: TransactionState) => {
  return initialState
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
