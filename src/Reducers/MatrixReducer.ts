import {
  createAction,
  createReducer,
} from 'redux-act'
import { remove, findIndex } from 'lodash'
import { resetToInitialState } from './AppReducer'
import Config from '../Config'

export interface MatrixState {
  currentUser: MatrixUser,
  selectedRoomId: string,
  rooms: MatrixRoom[],
}

const initialState: MatrixState = {
  currentUser: null,
  selectedRoomId: null,
  rooms: [],
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: MatrixState) => {
  return initialState
})

export const setRooms = createAction('Set rooms')
reducer.on(setRooms, (state: MatrixState, payload?: MatrixRoom[]) => {
  return {
    ...state,
    rooms: payload,
  }
})

export const addRoom = createAction('Add room')
reducer.on(addRoom, (state: MatrixState, payload?: MatrixRoom) => {
  return {
    ...state,
    rooms: [ ...state.rooms, payload ],
  }
})

export const selectRoom = createAction('Select room')
reducer.on(selectRoom, (state: MatrixState, payload?: string) => {
  return {
    ...state,
    selectedRoomId: payload,
  }
})

export const setCurrentUser = createAction('Set Current User')
reducer.on(setCurrentUser, (state: MatrixState, payload?: MatrixUser) => {
  return {
    ...state,
    currentUser: payload,
  }
})

export const addTimelineEvent = createAction('Add timeline event')
reducer.on(addTimelineEvent, (state: MatrixState, payload?: MatrixTimelineEvent) => {
  const rooms = [...state.rooms]
  const index = findIndex(rooms, {id: payload.roomId})
  rooms[index].timeline.push(payload)
  return {
    ...state,
    rooms: [ ...rooms ],
  }
})

export const login = createAction('Matrix login')
export const sendTextMessage = createAction('Send text message')
export const sendMessage = createAction('Send message')
