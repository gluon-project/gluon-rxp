import {
  createAction,
  createReducer,
} from 'redux-act'
import { remove } from 'lodash'
import { resetToInitialState } from './AppReducer'
import Config from '../Config'

export interface MatrixState {
  rooms: any[],
}

const initialState: MatrixState = {
  rooms: [],
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: MatrixState) => {
  return initialState
})

export const addRoom = createAction('Add room')
reducer.on(addRoom, (state: MatrixState, payload?: any) => {
  return {
    ...state,
    rooms: [ ...state.rooms, payload ],
  }
})
