import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'
import Config from '../Config'
import * as Enums from '../Enums'

export interface TokensState {
  current: string,
  new: Token,
  list: Token[],
}

const initialState: TokensState = {
  current: Config.tokens.defaultList[0].address,
  new: null,
  list: Config.tokens.defaultList,
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: TokensState) => {
  return initialState
})

export const addToken = createAction('Add token')
reducer.on(addToken, (state: TokensState, payload?: Token) => {
  return {
    ...state,
    list: [ ...state.list, payload ],
  }
})

export const selectToken = createAction('Select token')
reducer.on(selectToken, (state: TokensState, payload?: string) => {
  return {
    ...state,
    current: payload,
  }
})

export const setNew = createAction('Set new Token values')
reducer.on(setNew, (state: TokensState, payload?: Token) => {
  return {
    ...state,
    new: payload,
  }
})

export const getTokenInfo = createAction('Get Token info')

export const createNewToken = createAction('Create new token')
