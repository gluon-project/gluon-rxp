import Config from '../../Config'
// import { Connect, SimpleSigner, MNID } from 'uport-connect'
var uportConnect = require('uport-connect/dist/uport-connect')
var { JWT } = require ('uport')
const { Connect, SimpleSigner, MNID } = uportConnect

let uport = new Connect(Config.uport.app.name, {
  clientId: Config.uport.app.address,
  signer: SimpleSigner(Config.uport.app.privateKey),
})

const uportRinkeby = new Connect(Config.uport.app.name, {
  clientId: Config.uport.app.address,
  signer: SimpleSigner(Config.uport.app.privateKey),
})

const uportMainnet = new Connect(Config.uport.app.name, {
  clientId: Config.uport.app.address,
  signer: SimpleSigner(Config.uport.app.privateKey),
  network: 'mainnet',
})

const requestCredentials = (network: string) => {
  uport = new Connect(Config.uport.app.name, {
    clientId: Config.uport.app.address,
    signer: SimpleSigner(Config.uport.app.privateKey),
    network,
  })

  return uport.requestCredentials({
    requested: ['name', 'avatar'],
    notifications: true,
    accountType: 'keypair',
  }).then((result: any) => {
    return {
      ...result,
      address: MNID.decode(result.networkAddress).address,
    }
  })
}

const signAnonymousClaim = (claim: any): VerifiableClaim => {
  return JWT.createJWT({
    address: Config.uport.app.address,
    signer: SimpleSigner(Config.uport.app.privateKey),
  }, claim)
}

const verifyJWT = (jwt: string): VerifiableClaim => {
  return JWT.verifyJWT(jwt)
}
const getProvider = () => uport.getWeb3()

export default {
  MNID,
  signAnonymousClaim,
  verifyJWT,
  requestCredentials,
  getProvider,
  rinkebyProvider: uportRinkeby.getWeb3(),
  mainnetProvider: uportMainnet.getWeb3(),
}
