import {
  createAction,
} from 'redux-act'

export const navigate = createAction('Navigate')
export const navigateHome = createAction('Navigate home')
export const navigateBack = () => { return { type: 'Navigation/BACK' } }
