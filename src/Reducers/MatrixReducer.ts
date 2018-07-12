import {
  createAction,
  createReducer,
} from 'redux-act'
import { remove } from 'lodash'
import { resetToInitialState } from './AppReducer'
import Config from '../Config'

export interface MatrixState {
  selectedRoomId: string,
  rooms: MatrixRoom[],
}

const initialState: MatrixState = {
  selectedRoomId: null,
  rooms: [
    {
      id: '!APCMYIiDTQGkcIeuVR:matrix.org',
      name: 'Skaniukai',
      members: [
        {
          displayname: 'Simonas',
          mxid: '@simonas:matrix.org',
          avatarUrl: 'mxc://matrix.org/nvzxrWtNBPInTssDBbZNIJqF',
          membership: 'join',
        },
      ],
      state: null,
      receipts: [],
      timeline: [
        {
          type: 'm.room.message',
          content: {
            body: 'Hello',
            msgtype: 'm.text',
          },
          eventId: '12345',
          originServerTs: 1234564,
          sender: '@simonas:matrix.org',
          roomId: '!APCMYIiDTQGkcIeuVR:matrix.org',
        },
        {
          type: 'm.room.message',
          content: {
            body: 'Whats up?',
            msgtype: 'm.text',
          },
          eventId: '5345345',
          originServerTs: 3432423,
          sender: '@simonas:matrix.org',
          roomId: '!APCMYIiDTQGkcIeuVR:matrix.org',
        },
      ],
    },
    {
      id: '!APCMYIiDTQGkcIeuVR2:matrix.org',
      name: 'EV Running Club',
      members: [
        {
          displayname: 'Simonas',
          mxid: '@simonas:matrix.org',
          avatarUrl: 'mxc://matrix.org/nvzxrWtNBPInTssDBbZNIJqF',
          membership: 'join',
        },
        {
          displayname: 'Ziggy',
          mxid: '@ziggy:matrix.org',
          avatarUrl: 'mxc://matrix.org/nvzxrWtNBPInTssDBbZNIJqF3',
          membership: 'join',
        },
      ],
      state: null,
      receipts: [],
      timeline: [
        {
          type: 'm.room.message',
          content: {
            body: 'What are we running from?',
            msgtype: 'm.text',
          },
          eventId: '123454',
          originServerTs: 12345634,
          sender: '@simonas:matrix.org',
          roomId: '!APCMYIiDTQGkcIeuVR2:matrix.org',
        },
        {
          type: 'm.room.message',
          content: {
            body: 'From our problems :)',
            msgtype: 'm.text',
          },
          eventId: '53453453',
          originServerTs: 3432423,
          sender: '@ziggy:matrix.org',
          roomId: '!APCMYIiDTQGkcIeuVR2:matrix.org',
        },
      ],
    },
  ],
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: MatrixState) => {
  return initialState
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
