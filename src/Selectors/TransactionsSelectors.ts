import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as Enums from '../Enums'
import * as _ from 'lodash'

export const getNew = (state: CombinedState) => state.transactions.new
export const getIsSend = (state: CombinedState) => state.transactions.isSend
