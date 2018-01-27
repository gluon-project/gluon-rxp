import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as Enums from '../Enums'
import * as _ from 'lodash'

export const getList = (state: CombinedState) => state.feed.list
export const getSelectedToken = (state: CombinedState) => state.feed.selectedToken

export const getSelectedList = createSelector(
  [getList, getSelectedToken],
  (list, selectedToken) => {
    let result
    if (selectedToken) {
      result = list[selectedToken]
    } else {
      result = _.reduce(list, function(arr, value, key) {
        arr = _.concat(arr, value)
        return arr
      }, [])
    }
    return _.orderBy(result, ['date'], ['desc'])
  },
)
