import {
  createAction,
  createReducer,
} from 'redux-act'
import { remove } from 'lodash'
import { resetToInitialState } from './AppReducer'
import Config from '../Config'
import * as Enums from '../Enums'

export interface ProcessState {
  list: Process[],
}

const initialState: ProcessState = {
  list: [],
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: ProcessState) => {
  return initialState
})

export const start = createAction('Start process')
reducer.on(start, (state: ProcessState, payload?: Process) => {
  return {
    ...state,
    list: [ ...state.list, payload ],
  }
})

export const end = createAction('End process')
reducer.on(end, (state: ProcessState, payload?: Process) => {
  let list = [...state.list]
  remove(list, (item) => {
    if (payload.data) {
      return item.type === payload.type && item.data === payload.data
    }
    return item.type === payload.type
  })
  return {
    ...state,
    list,
  }
})
