import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'

export const getShowMainVisual = (state: CombinedState) => state.settings.showMainVisual
