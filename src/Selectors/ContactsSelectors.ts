import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as Enums from '../Enums'
import * as _ from 'lodash'
import Utils from '../Utils'
import * as S from 'string'
import { decodeToken } from 'jsontokens'

interface DidToUserMap {
  [did: string]: User
}

export const getSelectedContact = (state: CombinedState) => state.contacts.selectedContact
export const getAllClaims = (state: CombinedState) => state.contacts.claims.concat(state.contacts.matrixClaims)

export const decodeAndExtendClaims = (state: CombinedState, encodedClaims: string[]) => {
  const claims = _.map(encodedClaims, (jwt: string) => {
    let result: VerifiableClaim = null
    try {
      const decodedClaim = decodeToken(jwt)
      result = {
        ...decodedClaim.payload,
        jwt,
      }
    } catch (e) {
      console.log(e)
    }
    return result
  })

  return getExtendedClaims(state, claims)
}

export const getExtendedClaims = (state: CombinedState, claims: VerifiableClaim[]) => {
  const extendedClaims = _.map(claims, (claim: VerifiableClaim) => {
    const keys = _.keys(claim.claim)
    const key = keys[0]
    const value = typeof claim.claim[key] === 'string' ? claim.claim[key] : JSON.stringify(claim.claim[key])

    return {
      ...claim,
      claimType: S(key).humanize().titleCase().s,
      claimValue: value,
      issuer: getAccountByDid(state, claim.iss),
      subject: getAccountByDid(state, claim.sub),
    }
  })
  return extendedClaims
}
export const getAllClaimsExtended = (state: CombinedState): VerifiableClaim[] => {
  const allClaims = getAllClaims(state)
  const extendedClaims = getExtendedClaims(state, allClaims)
  const uniqClaims: VerifiableClaim[] = _.uniqWith(extendedClaims, (claimA: any, claimB: any): boolean => {
    return `${claimA.jwt}${claimA.source.type}${claimA.source.id}` === `${claimB.jwt}${claimB.source.type}${claimB.source.id}`
  })
  return uniqClaims
}
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

export const getAccountByDid = (state: CombinedState, did: string): User => {
  if (!did) {
    return null
  }

  const account = _.find(getList(state), (a) => a.did.toLocaleLowerCase() === did.toLocaleLowerCase())
  if (!account) {
    return {
      address: Utils.address.universalIdToNetworkAddress(did),
      name: Utils.address.short(did),
    }
  } else {
    return account
  }
}
export const getSelectedContactClaims = (state: CombinedState) => _.filter(getAllClaimsExtended(state),
  (claim: VerifiableClaim) => claim.sub === state.contacts.selectedContact)
