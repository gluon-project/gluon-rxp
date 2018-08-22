import Config from '../../Config'
import RX = require('reactxp')
const Web3 = require('web3')

import Connect from 'uport-connect'
import { Credentials } from 'uport'
import { createJWT, SimpleSigner } from 'did-jwt'
import * as MNID from 'mnid'

const credentials = new Credentials({
  address: Config.uport.app.address,
  privateKey: Config.uport.app.privateKey,
})

const uportConnect = new Connect(Config.uport.app.name, {
  isMobile: false,
  useStore: false,
})

uportConnect.credentials = credentials

const requestCredentials = (network: string) => {
  return uportConnect.requestDisclosure({
    requested: ['name', 'avatar', 'matrixUser'],
    notifications: true,
    accountType: 'keypair',
  })
}
const getProvider = () => new Web3(uportConnect.getProvider())

const signAnonymousClaim = (claim: any): VerifiableClaim => {
  return createJWT(claim, {
    issuer: Config.uport.app.address,
    signer: SimpleSigner(Config.uport.app.privateKey),
  })
}

const signClaim = (claim: any) => {
  return uportConnect.createVerificationRequest(claim)
}

const attestCredentials = (credentials: any) => {
  const claim = {
    ...credentials,
  }
  return uportConnect.attest(claim)
}

export default {
  uportConnect,
  signClaim,
  MNID,
  attestCredentials,
  signAnonymousClaim,
  requestCredentials,
  getProvider,
  rinkebyProvider: getProvider(),
  mainnetProvider: getProvider(),
}
