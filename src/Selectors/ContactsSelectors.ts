import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as Enums from '../Enums'
import * as _ from 'lodash'
import Utils from '../Utils'

export const getList = (state: CombinedState) => state.contacts.list
export const getAccountByAddress = (state: CombinedState, address: string): User => {
  if (!address) {
    return null
  }

  const account = _.find(state.contacts.list, (a) => a.address.toLocaleLowerCase()  === address.toLocaleLowerCase())
  if (!account) {
    return {
      address,
      name: Utils.address.short(address),
    }
  } else {
    return account
  }
}
