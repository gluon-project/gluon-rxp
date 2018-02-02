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
      name: 'Ether',
      code: 'ETH',
      logo: '',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      type: Enums.TokenType.ETH,
    },
    {
      name: 'Gluon',
      code: 'GLU',
      logo: '',
      address: '0x4356ea7ffec8e481984c3a697351091cf51f87f6',
      decimals: 0,
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
