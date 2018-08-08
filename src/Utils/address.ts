import * as Services from '../Services'

export const short = (address: string) => {
  return `${address.slice(0, 8)}...${address.slice(-6)}`
}

// param can be ETH address, mnid, or DID
export const universalIdToDID = (value: string) => {
  if (value.substr(0, 4) === 'did:') {
    return value
  } else if (Services.Web3.ethSingleton.getWeb3().isAddress(value)) {
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
  } else if (Services.Web3.ethSingleton.getWeb3().isAddress(value)) {
    return value
  } else if (Services.uPort.MNID.isMNID(value)) {
    return Services.uPort.MNID.decode(value).address
  }
  return 'notSuported'
}
