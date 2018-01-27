import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as Enums from '../Enums'
import * as _ from 'lodash'

export const getNew = (state: CombinedState) => state.attachment.new
export const getFromCache = (state: CombinedState, ipfsHash: string): Attachment => {
  return state.attachment.cache[ipfsHash]
}
