import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as Enums from '../Enums'
import * as _ from 'lodash'
import Utils from '../Utils'
import * as S from 'string'
import { decodeJWT } from 'did-jwt'
import uPort from '../Services/uPort'

interface DidToUserMap {
  [did: string]: User
}

// Workaround. This should be in matrix selectors
export const getRoomById = (state: CombinedState, roomId: string) => {
  return _.find(state.matrix.rooms, {id: roomId})
}

export const getGroupClaimsBy = (state: CombinedState) => state.contacts.groupClaimsBy
export const getRoomForSharing = (state: CombinedState) => state.contacts.roomForSharing
export const getSelectedContact = (state: CombinedState) => state.contacts.selectedContact
export const getMatrixClaims = (state: CombinedState) => state.contacts.matrixClaims
export const getLocalClaims = (state: CombinedState) => state.contacts.claims

export const getCurrentUserNetworkId = (state: CombinedState) => {
  return uPort.MNID.decode(state.user.current.mnid).network
}

export const getAllClaims = createSelector(getLocalClaims, getMatrixClaims,
  (localClaims, matrixClaims) => localClaims.concat(matrixClaims))

export const decodeAndExtendClaims = (state: CombinedState, encodedClaims: string[]) => {
  const claims = _.map(encodedClaims, (jwt: string) => {
    let result: VerifiableClaim = null
    try {
      const decodedClaim = decodeJWT(jwt)
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

export const getSourceAccountForClaim = (state: CombinedState, claim: VerifiableClaim): User => {
  let account = {
    name: 'Local',
    avatar: 'https://gluon.space/Assets/Images/logo.png',
  }
  if (claim.source && claim.source.type === 'matrix') {
    const room: MatrixRoom = getRoomById(state, claim.source.id)
    account.name = room.name
    account.avatar = room.avatarUrl
  }
  return account
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
      subject: getAccountByDid(state, Utils.address.universalIdToDID(claim.sub)),
      source: {
        ...claim.source,
        account: getSourceAccountForClaim(state, claim),
      },
    }
  })
  return extendedClaims
}
export const getMatrixContacts = (state: CombinedState): VerifiableClaim[] => {
  const allClaims = getAllClaimsExtended(state)
  const matrixClaims = _.filter(allClaims, (claim: VerifiableClaim) => claim.claimType === 'Matrix')
  return _.uniqBy(matrixClaims, (claim: VerifiableClaim) => claim.claimValue)
}

export const getAllClaimsExtended = (state: CombinedState): VerifiableClaim[] => {
  const allClaims = getAllClaims(state)
  const extendedClaims = getExtendedClaims(state, allClaims)
  const uniqClaims: VerifiableClaim[] = _.uniqWith(extendedClaims, (claimA: any, claimB: any): boolean => {
    return `${claimA.jwt}${claimA.source.type}${claimA.source.id}` === `${claimB.jwt}${claimB.source.type}${claimB.source.id}`
  })
  return uniqClaims
}
export const getList = createSelector(getAllClaims, getCurrentUserNetworkId, (allClaims, networkId) => {

  const contactsByDid: DidToUserMap = {}
  const contacts: User[] = []

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
        uniqueIssuers: [Utils.address.universalIdToDID(claim.iss)],
      }
    } else {
      contactsByDid[claim.sub].uniqueIssuers = _.uniq(
        [...contactsByDid[claim.sub].uniqueIssuers, Utils.address.universalIdToDID(claim.iss)])
    }
    // if (!contactsByDid[claim.iss]) {
    //   contactsByDid[claim.iss] = {
    //     name: Utils.address.short(Utils.address.universalIdToNetworkAddress(claim.iss)),
    //     address: Utils.address.universalIdToNetworkAddress(claim.iss),
    //     did: Utils.address.universalIdToDID(claim.iss),
    //     shortId: Utils.address.short(Utils.address.universalIdToNetworkAddress(claim.iss)),
    //     claims: {},
    //     uniqueIssuers: [],
    //   }
    // }
    if (key.toLowerCase() === 'name') {
      contactsByDid[claim.sub].name = value
      contactsByDid[claim.sub].claims.name = claim
    }
    if (key.toLowerCase() === 'matrixid' || key.toLowerCase() === 'matrix') {
      contactsByDid[claim.sub].claims.matrixId = claim
    }
    if (key.toLowerCase() === 'avatar') {
      contactsByDid[claim.sub].avatar = value
      contactsByDid[claim.sub].claims.avatar = claim
    }

    if (key.toLowerCase() === 'mnid' && uPort.MNID.decode(value).network === networkId) {
      contactsByDid[claim.sub].mnid = value
      contactsByDid[claim.sub].address = Utils.address.universalIdToNetworkAddress(value)
      contactsByDid[claim.sub].shortId = Utils.address.short(Utils.address.universalIdToNetworkAddress(value))
      contactsByDid[claim.sub].claims.mnid = claim
    }

  })

  _.forEach(contactsByDid, (contact: User) => {
    contacts.push(contact)
  })

  return contacts
})

export const getListForTransfer = createSelector(getList, getCurrentUserNetworkId, (list, networkId) => {
  return _.filter(list, (item: User) => item.mnid && uPort.MNID.decode(item.mnid).network === networkId)
})

export const getAccountByAddress = (state: CombinedState, address: string): User => {
  if (!address) {
    return null
  }

  const account = _.find(getList(state), (a) => a.address.toLocaleLowerCase() === address.toLocaleLowerCase())
  if (!account) {
    return {
      did: Utils.address.universalIdToDID(address),
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
      did: did,
      address: Utils.address.universalIdToNetworkAddress(did),
      name: Utils.address.short(did),
    }
  } else {
    return account
  }
}
export const getSelectedContactClaims = (state: CombinedState) => _.filter(getAllClaimsExtended(state),
  (claim: VerifiableClaim) => claim.sub === state.contacts.selectedContact)
