import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as Enums from '../Enums'
import * as _ from 'lodash'
import Utils from '../Utils'
import * as S from 'string'
interface DidToUserMap {
  [did: string]: User
}

export const getSelectedContact = (state: CombinedState) => state.contacts.selectedContact
export const getAllClaims = (state: CombinedState) => state.contacts.claims.concat(state.contacts.matrixClaims)
export const getList = (state: CombinedState): User[] => {
  const contactsByDid: DidToUserMap = {}
  const contacts: User[] = []

  const allClaims = getAllClaims(state)

  _.forEach(allClaims, claim => {
    const keys = _.keys(claim.claim)
    const key = keys[0]
    const value = typeof claim.claim[key] === 'string' ? claim.claim[key] : JSON.stringify(claim.claim[key])
    if (!contactsByDid[claim.sub]) {
      contactsByDid[claim.sub] = {
        name: Utils.address.short(Utils.address.universalIdToNetworkAddress(claim.sub)),
        address: Utils.address.universalIdToNetworkAddress(claim.sub),
        did: Utils.address.universalIdToDID(claim.sub),
        shortId: Utils.address.short(Utils.address.universalIdToNetworkAddress(claim.sub)),
        claims: {},
      }
    }
    if (key === 'name') {
      contactsByDid[claim.sub].name = value
      contactsByDid[claim.sub].claims.name = claim
    }
    if (key === 'avatar') {
      contactsByDid[claim.sub].avatar = value
      contactsByDid[claim.sub].claims.avatar = claim
    }

  })

  _.forEach(contactsByDid, (contact: User) => {
    contacts.push(contact)
  })

  return contacts
}
export const getAccountByAddress = (state: CombinedState, address: string): User => {
  if (!address) {
    return null
  }

  const account = _.find(getList(state), (a) => a.address.toLocaleLowerCase() === address.toLocaleLowerCase())
  if (!account) {
    return {
      address,
      name: Utils.address.short(address),
    }
  } else {
    return account
  }
}

export const getSelectedContactClaims = (state: CombinedState) => _.filter(getAllClaims(state),
  (claim: VerifiableClaim) => claim.sub === state.contacts.selectedContact)
