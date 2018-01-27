import {
  createAction,
  createReducer,
} from 'redux-act'
import RX = require('reactxp')
import Config from '../Config'

import * as Enums from '../Enums'

export interface AppState {
  modalMessage?: ModalMessageConfig
  version: string
  loadingInitialData: boolean
  uiTraits: UITraits
  codePushDeployments: CodePushDeployment[]
  currentCodePushDeploymentName: string
}

const initialState: AppState = {
  version: '',
  loadingInitialData: true,
  uiTraits: {
    verticalIsCompact: false,
    horizontalIsCompact: false,
    displayScale: 2,
  },
  codePushDeployments: RX.Platform.getType() === 'ios' ? Config.codepush.ios : Config.codepush.android,
  currentCodePushDeploymentName: 'Production',
}

export const reducer = createReducer({}, initialState)

export const startup = createAction('App startup')

export const resetToInitialState = createAction('Reset to initial state')

export const syncCodePushDeployment = createAction('Sync CodePush Deployment')

export const initialDataStartedLoading = createAction('Initial data started loading')
reducer.on(initialDataStartedLoading, (state: AppState) => {
  return {
    ...state,
    loadingInitialData: true,
  }
})

export const initialDataFinishedLoading = createAction('Initial data finished loading')
reducer.on(initialDataFinishedLoading, (state: AppState) => {
  return {
    ...state,
    loadingInitialData: false,
  }
})

export const setVersion = createAction('Set Version')
reducer.on(setVersion, (state: AppState, payload: string) => {
  return {
    ...state,
    version: payload,
  }
})

export const setUiTraits = createAction('Set UI Traits')
reducer.on(setUiTraits, (state: AppState, payload: UITraits) => {
  return {
    ...state,
    uiTraits: payload,
  }
})

export const handleError = createAction('Handle Error')
