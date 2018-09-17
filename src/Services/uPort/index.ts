import Config from '../../Config'
import RX = require('reactxp')
const Web3 = require('web3')

import { Connect } from 'uport-connect'
import { Credentials } from 'uport'
import { createJWT, SimpleSigner } from 'did-jwt'
import * as MNID from 'mnid'

const credentials = new Credentials({
  // address: Config.uport.app.address,
  did: Config.uport.app.address,
  privateKey: Config.uport.app.privateKey,
})

const uportConnect = new Connect(Config.uport.app.name, {
  // isMobile: false,
  // useStore: false,
  network: 'mainnet',
})

uportConnect.credentials = credentials

const requestCredentials = (network: string) => {
  return uportConnect.requestDisclosure({
    requested: ['name', 'avatar', 'matrixUser'],
    notifications: true,
    accountType: 'keypair',
    networkId: '0x1',
  })
}
const getProvider = () => new Web3(uportConnect.getProvider())

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
  logout,
  signClaim,
  MNID,
  attestCredentials,
  signAnonymousClaim,
  requestCredentials,
  getProvider,
  rinkebyProvider: getProvider(),
  mainnetProvider: getProvider(),
}
