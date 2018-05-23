import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as ContactSelectors from './ContactsSelectors'
import * as Enums from '../Enums'
import * as _ from 'lodash'
import utils from '../Utils'

export const getAccounts = (state: CombinedState) => state.user.accounts
export const getCurrent = (state: CombinedState) => state.user.current
export const getBalances = (state: CombinedState) => state.user.balances
export const getBalanceByAddress = (state: CombinedState, address: string): Balance => {
  return _.find(state.user.balances, {token: {address: address}})
}

export const getUserAccounts = createSelector(
  [getAccounts, ContactSelectors.getList],
  (accounts, contacts) => {
    let result: User[] = _.map(accounts, (account) => {
      const existingContact = _.find(contacts, {address: account})
      if (existingContact) {
        return existingContact
      }
      return {
        name: utils.address.short(account),
        address: account,
        avatar: '',
      }
    })
    return result
  },
)
