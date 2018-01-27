import Config from '../../Config'
import * as _ from 'lodash'
import * as moment from 'moment'

// var abiDecoder = require('abi-decoder')
var abiDecoder = require('../../../src/Services/Web3/abi-decoder.js')
console.log('aaaa', abiDecoder)

var bs58 = require('bs58')
import erc233abi from '../Web3/erc223abi'

abiDecoder.addABI(erc233abi)

const toIPFSHash = (str: string) => {
  // remove leading 0x
  const remove0x = str.slice(2, str.length)
  // add back the multihash id
  // const bytes = Buffer.from(`1220${remove0x}`, 'hex')
  const bytes = Buffer.from(remove0x, 'hex')
  const hash = bs58.encode(bytes)
  return hash
}

const ethTransactionToGluonTransaction = (ethTx: any, token: Token): Transaction => {
  const event: EthereumLogEvent[] = abiDecoder.decodeLogs([ethTx])[0].events
  const sender = _.find(event, {'name': 'from'}).value
  const receiver = _.find(event, {'name': 'to'}).value
  const amount = _.find(event, {'name': 'value'}).value
  const data = _.find(event, {'name': 'data'}).value
  const attachment = toIPFSHash(data)

  const date = moment(parseInt(ethTx.timeStamp.slice(2, ethTx.timeStamp.length), 16) * 1000).toISOString()

  return {
    hash: ethTx.transactionHash,
    sender,
    receiver,
    amount: parseInt(amount, 10),
    token: token.address,
    date,
    attachment,
  }
}

const fetchTransactions = (token: Token) => {
  return fetch(
    `${Config.etherscan.endPoint}module=logs&action=getLogs&fromBlock=0&toBlock=latest&\
address=${token.address}&apikey=${Config.etherscan.apiKey}`,
  )
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.result.map((ethTx: any) => ethTransactionToGluonTransaction(ethTx, token))
    // const decodedLogs = abiDecoder.decodeLogs(responseJson.result)
    // var hashes = decodedLogs.map((item: any) => {
    //   return toIPFSHash(item.events[3].value)
    // })
    // console.log(responseJson)
    // console.log(decodedLogs)
    // return decodedLogs
  })
  .catch((error) => {
    console.error(error)
  })
}

export default {
  fetchTransactions,
}
