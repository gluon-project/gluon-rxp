interface Network {
  name: string,
  explorerUrl: string,
  factoryAddress: string,
  etherscanApiEndpoint: string,
}

interface NetworksMap {
  [tokenId: string]: Network
}

export default {
  '0x1': {
    name: 'Mainnet',
    explorerUrl: 'https://etherscan.io',
    factoryAddress: '0x04141a301610568f4eecb6f1d226ec671d415f23',
    etherscanApiEndpoint: 'https://api.etherscan.io/api?',
  },
  '0x4': {
    name: 'Rinkeby',
    explorerUrl: 'https://rinkeby.etherscan.io',
    factoryAddress: '0x96319f39a17fe10fd0be22cbd0ec6cf0c5103900',
    etherscanApiEndpoint: 'https://rinkeby.etherscan.io/api?',
  },
} as NetworksMap
