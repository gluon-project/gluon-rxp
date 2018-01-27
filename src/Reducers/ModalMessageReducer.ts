import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'

const initialState: ModalMessageConfig = null

export const reducer = createReducer({}, initialState)

export const closeModalMessage = createAction('Close Modal Message')
export const setModalMessage = createAction('Set Modal Message')
reducer.on(setModalMessage, (state: ModalMessageConfig, payload?: ModalMessageConfig) => {
  return payload
})
