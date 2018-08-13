import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'
import Config from '../Config'

export interface UserState {
  uportDid: string,
  current: User,
  accounts: string[],
  balances: Balance[],
}

const initialState: UserState = {
  uportDid: null,
  current: null,
  accounts: null,
  // current: Config.contacts.defaultList[0],
  balances: [],
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: UserState) => {
  return initialState
})

export const setUportDid = createAction('Set current uPort Did')
reducer.on(setUportDid, (state: UserState, payload?: string) => {
  return {
    ...state,
    uportDid: payload,
  }
})

export const setCurrent = createAction('Set current user')
reducer.on(setCurrent, (state: UserState, payload?: User) => {
  return {
    ...state,
    current: payload,
  }
})

export const setAccounts = createAction('Set user web3 accounts')
reducer.on(setAccounts, (state: UserState, payload?: string[]) => {
  return {
    ...state,
    accounts: payload,
  }
})

export const setBalances = createAction('Set token balances')
reducer.on(setBalances, (state: UserState, payload?: Balance[]) => {
  return {
    ...state,
    balances: payload,
  }
})

export const addBalance = createAction('Add balance')
reducer.on(addBalance, (state: UserState, payload?: Balance) => {
  return {
    ...state,
    balances: [ ...state.balances, payload ],
  }
})

export const refreshBalances = createAction('Start refreshing token balances')

export const startLogin = createAction('Start Login')
