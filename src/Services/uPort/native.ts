import Config from '../../Config'
// import { Connect, SimpleSigner, MNID } from 'uport-connect'
import RX = require('reactxp')
import RN = require('react-native')

var uportConnect = require('uport-connect/dist/uport-connect')
const { Connect, SimpleSigner, MNID } = uportConnect
const uuidv1 = require('uuid/v1')
const URL = require('url-parse')
const qs = require('qs')

const uriHandler = (url: string) => {
  console.log(url)
  RN.Linking.openURL(url)
}

let uport = new Connect(Config.uport.app.name, {
  clientId: Config.uport.app.address,
  signer: SimpleSigner(Config.uport.app.privateKey),
  mobileUrlHandler: uriHandler,
  uriHandler: uriHandler,
})

const uportRinkeby = new Connect(Config.uport.app.name, {
  clientId: Config.uport.app.address,
  signer: SimpleSigner(Config.uport.app.privateKey),
  mobileUrlHandler: uriHandler,
  uriHandler: uriHandler,
})

const uportMainnet = new Connect(Config.uport.app.name, {
  clientId: Config.uport.app.address,
  signer: SimpleSigner(Config.uport.app.privateKey),
  mobileUrlHandler: uriHandler,
  uriHandler: uriHandler,
  network: 'mainnet',
})

const requestCredentials = (network: string) => {
  uport = new Connect(Config.uport.app.name, {
    clientId: Config.uport.app.address,
    signer: SimpleSigner(Config.uport.app.privateKey),
    mobileUrlHandler: uriHandler,
    uriHandler: uriHandler,
    network,
  })

  uport.topicFactory = (name: string) => {
    const id = uuidv1()
    const path = `/uport/${id}`
    const url = `gluon.space:${path}`
    let handler: any
    let cancel: any
    const topic = new Promise((resolve, reject) => {
      handler = (uri: string) => {
        console.log('Handler event', uri)
        if (uri) {
          const url = URL(uri, true)
          console.log(url)
          if (url.pathname === path) {
            if (url.hash) {
              const params = qs.parse(url.hash.slice(1))
              RX.Linking.deepLinkRequestEvent.unsubscribe(handler)
              resolve(params[name])
            } else {
              console.log('no hash')
              reject()
            }
          } else {
            console.log('ignoring request')
          }
        }
      }
      RX.Linking.deepLinkRequestEvent.subscribe(handler)

      cancel = () => {
        RX.Linking.deepLinkRequestEvent.unsubscribe(handler)
        resolve()
      }
    }) as any
    topic.url = url
    topic.cancel = cancel
    return topic
  }

  return uport.requestCredentials({
    requested: ['name', 'avatar'],
    accountType: network === 'mainnet' ? 'keypair' : 'general',
  }).then((result: any) => {
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
