import Config from '../../Config'
import RX = require('reactxp')
const Web3 = require('web3')

import { Connect } from 'uport-connect'
import { Credentials } from 'uport'
import { createJWT, SimpleSigner } from 'did-jwt'
import { network } from 'uport-transports'
import * as MNID from 'mnid'

const credentials = new Credentials({
  // address: Config.uport.app.address,
  did: Config.uport.app.address,
  privateKey: Config.uport.app.privateKey,
})

const uportConnect = new Connect(Config.uport.app.name, {
  // isMobile: false,
  // useStore: false,
  // network: 'mainnet',
})

const uportConnectMainnet = new Connect(Config.uport.app.name, {
  network: 'mainnet',
  useStore: false,
})

const uportConnectRinkeby = new Connect(Config.uport.app.name, {
  network: 'rinkeby',
  useStore: false,
})

uportConnect.credentials = credentials

const setNetworkForMnid = (mnid: any) => {
  const decoded = MNID.decode(mnid)
  switch (decoded.network) {
    case '0x1':
      uportConnect.network = network.config.network('mainnet')
      break
    case '0x4':
      uportConnect.network = network.config.network('rinkeby')
      break
  }
}

const requestCredentials = (networkName: string) => {
  uportConnect.network = network.config.network(networkName)
  return uportConnect.requestDisclosure({
    requested: ['name', 'avatar', 'matrixUser'],
    notifications: true,
    accountType: 'keypair',
    networkId: uportConnect.network.id,
  })
}
const getProvider = () => new Web3(uportConnect.getProvider())
const getProviderMainnet = () => new Web3(uportConnectMainnet.getProvider())
const getProviderRinkeby = () => new Web3(uportConnectRinkeby.getProvider())

const signAnonymousClaim = (claim: any): VerifiableClaim => {
  return createJWT(claim, {
    issuer: Config.uport.app.did,
    signer: SimpleSigner(Config.uport.app.privateKey),
  })
}

const signClaim = (claim: any) => {
  // return uportConnect.requestVerificationSignature(claim)
  const id = 'signClaimReq'
  return uportConnect.credentials.signJWT({
    unsignedClaim: claim.unsignedClaim,
    sub: claim.sub,
    // riss: claim.riss,
    callback: uportConnect.genCallback(id),
    type: 'verReq',
  }).then((jwt: string) => uportConnect.send(jwt, id))
}

const attestCredentials = (credentials: any) => {
  const claim = {
    ...credentials,
  }
  return uportConnect.sendVerification(claim, 'attest')
}

const logout = () => {
  return uportConnect.logout()
}

export default {
  uportConnect,
  setNetworkForMnid,
  logout,
  signClaim,
  MNID,
  attestCredentials,
  signAnonymousClaim,
  requestCredentials,
  getProvider,
  rinkebyProvider: getProviderRinkeby(),
  mainnetProvider: getProviderMainnet(),
}
