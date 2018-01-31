import Config from '../../Config'
// import { Connect, SimpleSigner, MNID } from 'uport-connect'
import RX = require('reactxp')
import RN = require('react-native')

var uportConnect = require('../../../src/Services/uPort/uport-connect.js')
const { Connect, SimpleSigner, MNID } = uportConnect
const uuidv1 = require('uuid/v1')
const URL = require('url-parse')
const qs = require('qs')

const uriHandler = (url: string) => {
  console.log(url)
  RN.Linking.openURL(url)
}

const uport = new Connect(Config.uport.app.name, {
  clientId: Config.uport.app.address,
  signer: SimpleSigner(Config.uport.app.privateKey),
  mobileUrlHandler: uriHandler,
  uriHandler: uriHandler,
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

const requestCredentials = () => {
  return uport.requestCredentials({
    requested: ['name', 'avatar'],
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
