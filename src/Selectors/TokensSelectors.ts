import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as Enums from '../Enums'
import * as _ from 'lodash'
import Utils from '../Utils'

export const getList = (state: CombinedState) => state.tokens.list
export const getNew = (state: CombinedState) => state.tokens.new
export const getTokenByAddress = (state: CombinedState, address: string): Token => {
  return _.find(state.tokens.list, {address: address})
}
