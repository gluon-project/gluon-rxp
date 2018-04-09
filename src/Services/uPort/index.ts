import Config from '../../Config'
// import { Connect, SimpleSigner, MNID } from 'uport-connect'
var uportConnect = require('../../../src/Services/uPort/uport-connect.js')
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
    accountType: network === 'mainnet' ? 'keypair' : 'general',
  }).then((result: any) => {
    console.log(result)
    if (result.networkAddress) {
      console.log('result.networkAddress', result.networkAddress, MNID.decode(result.networkAddress))
      console.log('result.address', result.address, MNID.decode(result.address))
    } else {
      console.log('result.address', result.address, MNID.decode(result.address))
    }

    return {
      ...result,
      address: MNID.decode(result.networkAddress || result.address).address,
    }
  })
}

const getProvider = () => uport.getWeb3()

export default {
  MNID,
  requestCredentials,
  getProvider,
  rinkebyProvider: uportRinkeby.getWeb3(),
  mainnetProvider: uportMainnet.getWeb3(),
}
