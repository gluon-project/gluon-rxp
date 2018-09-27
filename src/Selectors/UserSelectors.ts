import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as ContactSelectors from './ContactsSelectors'
import * as TokensSelectors from './TokensSelectors'
import * as Enums from '../Enums'
import * as _ from 'lodash'
import { uPort } from '../Services'
import utils from '../Utils'

export const getAccounts = (state: CombinedState) => state.user.accounts
export const getCurrent = (state: CombinedState) => state.user.current
export const getUportDid = (state: CombinedState) => state.user.uportDid
export const getBalances = (state: CombinedState) => {
  const networkId = utils.address.networkIdForMnid(state.user.current.mnid)
  return _.filter(state.user.balances, (balance: Balance) => !balance.token.networkId || balance.token.networkId === networkId)
}
export const getBalanceByAddress = (state: CombinedState, address: string): Balance => {
  return _.find(state.user.balances, {token: {address: address}})
}
export const getReserveBalanceByAddress = (state: CombinedState, address: string): Balance => {
  const token = TokensSelectors.getTokenByAddress(state, address)
  return _.find(state.user.balances, {token: {address: token.reserveToken}})
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
