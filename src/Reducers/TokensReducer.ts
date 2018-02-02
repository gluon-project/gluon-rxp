import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'
import Config from '../Config'
import * as Enums from '../Enums'

export interface TokensState {
  new: Token,
  list: Token[],
}

const initialState: TokensState = {
  new: null,
  list: [
    {
      name: 'Mircea Token',
      code: 'MRT',
      logo: '',
      address: '0xd018a40a8876b21aa8f679bbaf8970f5d70f49fc',
      type: Enums.TokenType.Erc223,
    },
  ],
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

export const setNew = createAction('Set new Token values')
reducer.on(setNew, (state: TokensState, payload?: Token) => {
  return {
    ...state,
    new: payload,
  }
})

export const getTokenInfo = createAction('Get Token info')

export const createNewToken = createAction('Create new token')
