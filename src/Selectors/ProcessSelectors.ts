import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as Enums from '../Enums'
import * as _ from 'lodash'

export const getList = (state: CombinedState) => state.process.list

export const isAppProcessing = createSelector(
  getList,
  list => list.length > 0,
)

export const isRunningProcess = (state: CombinedState, process: Enums.ProcessType, data?: string) => {
  let result = false
  if (data) {
    return _.find(getList(state), {type: process, data: data}) !== undefined
  }
  return _.find(getList(state), {type: process}) !== undefined
}
