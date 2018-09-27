import * as Services from '../Services'
import Config from '../Config'

export const short = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

// param can be ETH address, mnid, or DID
export const universalIdToDID = (value: string) => {
  if (value.substr(0, 4) === 'did:') {
    return value
  } else if (Services.uPort.getProvider().isAddress(value)) {
    return `did:ethr:${value}`
  } else if (Services.uPort.MNID.isMNID(value)) {
    return `did:uport:${value}`
  }
  return 'notSuported'
}

export const universalIdToNetworkAddress = (value: string) => {
  if (value.substr(0, 9) === 'did:ethr:') {
    return value.substr(9)
  } else if (value.substr(0, 10) === 'did:uport:') {
    return Services.uPort.MNID.decode(value.substr(10)).address
  } else if (Services.uPort.getProvider().isAddress(value)) {
    return value
  } else if (Services.uPort.MNID.isMNID(value)) {
    return Services.uPort.MNID.decode(value).address
  }
  return 'notSuported'
}

export const mnidToNetworkName = (mnid: string) => {
  if (!Services.uPort.MNID.isMNID(mnid)) {
    return 'Unknown'
  }

  const decoded = Services.uPort.MNID.decode(mnid)

  return  Config.networks[decoded.network] ? Config.networks[decoded.network].name : 'Unknown'
}

export const networkIdForMnid = (mnid: any) => {
  const decoded = Services.uPort.MNID.decode(mnid)
  let nid = '1'
  switch (decoded.network) {
    case '0x1':
      nid = '1'
      break
    case '0x4':
      nid = '4'
      break
  }
  return nid
}
