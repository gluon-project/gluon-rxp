import {
  createAction,
  createReducer,
} from 'redux-act'

export interface SettingsState {
  sampleFlag: boolean
}

const initialState: SettingsState = {
  sampleFlag: true,
}
export const reducer = createReducer({}, initialState)

export const setSampleFlag = createAction('Set Sample Flag')
reducer.on(setSampleFlag, (state: SettingsState, payload: boolean) => {
  return {
    ...state,
    sampleFlag: payload,
  }
})
