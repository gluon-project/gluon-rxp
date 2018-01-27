import Config from '../../Config'
// import { Connect, SimpleSigner, MNID } from 'uport-connect'
var uportConnect = require('../../../src/Services/uPort/uport-connect.js')
const { Connect, SimpleSigner, MNID } = uportConnect

const uport = new Connect(Config.uport.app.name, {
  clientId: Config.uport.app.address,
  signer: SimpleSigner(Config.uport.app.privateKey),
})

const requestCredentials = () => {
  return uport.requestCredentials({
    requested: ['name', 'avatar'],
    notifications: true,
  }).then((result: any) => {
    return {
      ...result,
      address: MNID.decode(result.address).address,
    }
  })
}

export default {
  MNID,
  requestCredentials,
  provider: uport.getWeb3(),
}
