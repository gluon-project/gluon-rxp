import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'

export interface OsExtensionState {
  balances: Balance[],
}

const initialState: OsExtensionState = {
  balances: null,
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: OsExtensionState) => {
  return initialState
})
