import {
  createAction,
  createReducer,
} from 'redux-act'
import { remove, uniqBy } from 'lodash'
import { resetToInitialState } from './AppReducer'
import { logout } from './UserReducer'
import Config from '../Config'

export interface ContactsState {
  roomForSharing: string,
  newClaimType: string,
  newClaimValue: string,
  editing: User,
  selectedContact: string,
  list: User[],
  claims: VerifiableClaim[],
  matrixClaims: VerifiableClaim[],
}

const initialState: ContactsState = {
  roomForSharing: null,
  editing: null,
  newClaimType: null,
  newClaimValue: null,
  selectedContact: null,
  list: Config.contacts.defaultList,
  claims: Config.contacts.defaultClaimsList,
  matrixClaims: [],
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: ContactsState) => {
  return initialState
})

export const setRoomForSharing = createAction('Set Room For Sharing clam')
reducer.on(setRoomForSharing, (state: ContactsState, payload?: string) => {
  return {
    ...state,
    roomForSharing: payload,
  }
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

export const addClaim = createAction('Add claim')
reducer.on(addClaim, (state: ContactsState, payload?: VerifiableClaim) => {
  return {
    ...state,
    claims: uniqBy([ ...state.claims, payload ], (claim: VerifiableClaim) => claim.jwt),
  }
})

export const addClaims = createAction('Add claims')
reducer.on(addClaims, (state: ContactsState, payload?: VerifiableClaim[]) => {
  return {
    ...state,
    claims: uniqBy([ ...state.claims, ...payload ], (claim: VerifiableClaim) => claim.jwt),
  }
})

export const selectContact = createAction('Select contact')
reducer.on(selectContact, (state: ContactsState, payload?: string) => {
  return {
    ...state,
    selectedContact: payload,
  }
})

export const setNewClaimType = createAction('New Claim Type')
reducer.on(setNewClaimType, (state: ContactsState, payload?: string) => {
  return {
    ...state,
    newClaimType: payload,
  }
})

export const setNewClaimValue = createAction('New Claim Value')
reducer.on(setNewClaimValue, (state: ContactsState, payload?: string) => {
  return {
    ...state,
    newClaimValue: payload,
  }
})

export const setMatrixClaims = createAction('Set Matrix Claims')
reducer.on(setMatrixClaims, (state: ContactsState, payload?: VerifiableClaim[]) => {
  return {
    ...state,
    matrixClaims: payload,
  }
})

reducer.on(logout, (state: ContactsState) => {
  return {
    ...state,
    matrixClaims: [],
  }
})

export const appendMatrixClaims = createAction('Append Matrix Claims')
reducer.on(appendMatrixClaims, (state: ContactsState, payload?: VerifiableClaim[]) => {
  const allClaims = state.matrixClaims.concat(payload)
  return {
    ...state,
    matrixClaims: allClaims,
  }
})

export const addMatrixClaim = createAction('Add claim')
reducer.on(addMatrixClaim, (state: ContactsState, payload?: VerifiableClaim) => {
  return {
    ...state,
    matrixClaims: [ ...state.matrixClaims, payload ],
  }
})

export const signAnonymousClaim = createAction('Sign anonymous claim')
export const signAnonymousClaimAndShareInRoom = createAction('Sign anonymous claim and share in room')
export const signClaimAndShareInRoom = createAction('Sign claim and share in room')
export const loadMatrixClaims = createAction('Load matrix claims')
export const loadAndAppendMatrixClaims = createAction('Load matrix and append claims')
export const saveClaimsLocally = createAction('Save claims localy')
