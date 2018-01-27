import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'
import Config from '../Config'

export interface TokensState {
  list: Token[],
}

const initialState: TokensState = {
  list: [
    {
      name: 'Mircea Token',
      code: 'MRT',
      logo: '',
      address: '0xd018a40a8876b21aa8f679bbaf8970f5d70f49fc',
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

export const createNewToken = createAction('Create new token')
