import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'
import * as FeedActions from './FeedReducer'
import Config from '../Config'

interface IpfsHashToAttachmentMap {
  [ipfs: string]: Attachment
}

export interface AttachmentState {
  new: Attachment,
  cache: IpfsHashToAttachmentMap,
}

const emptyAttachment: Attachment = {
  url: '',
  message: '',
  data: null,
  ipfs: null,
}

const initialState: AttachmentState = {
  new: emptyAttachment,
  cache: {},
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: AttachmentState) => {
  return initialState
})

export const setUrl = createAction('Set Attachment URL')
reducer.on(setUrl, (state: AttachmentState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      url: payload,
    },
  }
})

export const setIpfs = createAction('Set Attachment IPFS hash')
reducer.on(setIpfs, (state: AttachmentState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      ipfs: payload,
    },
  }
})

export const setMessage = createAction('Set Attachment message')
reducer.on(setMessage, (state: AttachmentState, payload?: string) => {
  return {
    ...state,
    new: {
      ...state.new,
      message: payload,
    },
  }
})

export const setParsed = createAction('Set parsed Attachment data')
reducer.on(setParsed, (state: AttachmentState, payload?: AttachmentData) => {
  return {
    ...state,
    new: {
      ...state.new,
      data: payload,
    },
  }
})

export const startDownload = createAction('Start downloading attachment')
export const getFromIpfs = createAction('Get attachment data from IPFS')

export const addToCache = createAction('Add attachment to cache')
reducer.on(addToCache, (state: AttachmentState, payload?: Attachment) => {
  let newCache = { ...state.cache }
  newCache[payload.ipfs] = payload
  return {
    ...state,
    cache: newCache,
  }
})

export const saveAttachment = createAction('Save attachment')

reducer.on(FeedActions.addTransaction, (state: AttachmentState, payload?: Transaction) => {
  return {
    ...state,
    new: emptyAttachment,
  }
})
