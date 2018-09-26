import * as Services from '../Services'

interface Network {
  name: string,
  explorerUrl: string,
}

interface NetworksMap {
  [tokenId: string]: Network
}

export const networks = {
  '0x1': {
    name: 'Mainnet',
    explorerUrl: 'https://etherscan.io',
  },
  '0x3': {
    name: 'Ropsten',
    explorerUrl: 'https://ropsten.io',
  },
  '0x2a': {
    name: 'Kovan',
    explorerUrl: 'https://kovan.etherscan.io',
  },
  '0x16B2': {
    name: 'Infuranet',
    explorerUrl: 'https://explorer.infuranet.io',
  },
  '0x4': {
    name: 'Rinkeby',
    explorerUrl: 'https://rinkeby.etherscan.io',
  },
} as NetworksMap

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

  return  networks[decoded.network] ? networks[decoded.network].name : 'Unknown'
}
