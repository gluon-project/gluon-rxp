import {
  createAction,
  createReducer,
} from 'redux-act'

export interface SettingsState {
  showMainVisual: boolean
}

const initialState: SettingsState = {
  showMainVisual: true,
}
export const reducer = createReducer({}, initialState)

export const setShowMainVisual = createAction('Set showMainVisual flag')
reducer.on(setShowMainVisual, (state: SettingsState, payload: boolean) => {
  return {
    ...state,
    showMainVisual: payload,
  }
})
