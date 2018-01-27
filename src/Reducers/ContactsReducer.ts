import {
  createAction,
  createReducer,
} from 'redux-act'
import { remove } from 'lodash'
import { resetToInitialState } from './AppReducer'
import Config from '../Config'

export interface ContactsState {
  editing: User,
  list: User[],
}

const initialState: ContactsState = {
  editing: null,
  list: Config.contacts.defaultList,
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: ContactsState) => {
  return initialState
})

export const addContact = createAction('Add contact')
reducer.on(addContact, (state: ContactsState, payload?: User) => {
  let list = [...state.list]
  remove(list, (item: User) => {
    return item.address === payload.address
  })
  return {
    ...state,
    list: [ ...list, payload ],
  }
})

export const setForEditing = createAction('Set contact for editing')
reducer.on(setForEditing, (state: ContactsState, payload?: User) => {
  return {
    ...state,
    editing: payload,
  }
})
