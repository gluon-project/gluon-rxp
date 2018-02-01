import Config from '../../Config'
import erc223abi from './erc223abi'
import erc223TokenFactoryAbi from './erc223TokenFactoryAbi'
import Uport from '../uPort'
const Web3 = require('ethjs-query')
const bs58 = require('bs58')
import * as moment from 'moment'

let web3: any = null

const ethSingleton =  {

  setProvider: (provider: any) => {
    web3 = provider
  },

  getEth: (): any => {
    return web3 && web3.eth
  },

  getErc223Factory: (): any => {
    return web3.eth.contract(erc223TokenFactoryAbi).at('0x4597c2b6b11a244179f45acf565c66deb3cd99a1')
  },

  getErc223: (address: string): any => {
    return web3.eth.contract(erc223abi).at(address)
  },
}

if ((<any>window).web3 && (<any>window).web3.currentProvider) {
  // ethSingleton.setProvider(new Web3((<any>window).web3.currentProvider))
  const w3 = Uport.provider
  w3.setProvider((<any>window).web3.currentProvider)
  ethSingleton.setProvider(w3)
}

const getNewBalances = (address: string, tokens: Token[]) => {
  let promises: Promise<Balance>[] = []

  tokens.forEach(token => {
    const tokenContract = ethSingleton.getErc223(token.address)
    const promise = new Promise<Balance>((resolve, reject) => {
      tokenContract.balanceOf.call(address, function (err: any, bal: any) {
        if (err) {
          reject(err)
        } else {
          resolve({
            token,
            amount: bal,
          })
        }
      })
    })
    promises.push(promise)
  })
  return Promise.all(promises)
}

const getTokenInfo = (address: string) => {
  let promises: Promise<any>[] = []

  const tokenContract = ethSingleton.getErc223(address)

  // name
  promises.push(new Promise<string>((resolve, reject) => {
    tokenContract.name.call(function (err: any, value: string) {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  }))

  // symbol
  promises.push(new Promise<string>((resolve, reject) => {
    tokenContract.symbol.call(function (err: any, value: string) {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  }))

  // decimals
  promises.push(new Promise<number>((resolve, reject) => {
    tokenContract.decimals.call(function (err: any, value: number) {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  }))

  // totalSupply
  promises.push(new Promise<number>((resolve, reject) => {
    tokenContract.totalSupply.call(function (err: any, value: number) {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  }))

  return Promise.all(promises).then((data: any[]) => {
    return {
      address,
      name: data[0],
      code: data[1],
      decimals: data[2],
      initialAmount: data[3],
    } as Token
  })
}

const sendTransaction = (transaction: Transaction): Promise<Transaction> => {
  const token = ethSingleton.getErc223(transaction.token)
  const hex = transaction.attachment && transaction.attachment ? bs58.decode(transaction.attachment).toString('hex') : '00'

  return new Promise<Transaction>((resolve, reject) => {
    token.transfer(transaction.receiver, transaction.amount, `0x${hex}`,
      { from: transaction.sender }, function (err: any, txHash: string) {
      if (err) {
        reject(err)
      } else {
        if (txHash) {
          console.log('Transaction sent')
          console.log(txHash)
          const interval = setInterval(() => {
            ethSingleton.getEth().getTransactionReceipt(txHash, (error: any, response: any) => {
              if (error) {
                reject(error)
              }
              if (response) {
                clearInterval(interval)
                resolve({
                  ...transaction,
                  hash: txHash,
                  date: moment().toISOString(),
                })
              }
            })
          }, 1000)
        }
      }
    })
  })
}

const createNewToken = (token: Token, creator: User): Promise<Token> => {
  const tokenFactory = ethSingleton.getErc223Factory()

  return new Promise<Token>((resolve, reject) => {
    tokenFactory.createERC223Token(
      token.initialAmount, token.name, token.decimals, token.code,
      { from: creator.address }, function (err: any, txHash: string) {
      if (err) {
        reject(err)
      } else {
        if (txHash) {
          console.log('Transaction created')
          console.log(txHash)
          const interval = setInterval(() => {
            ethSingleton.getEth().getTransactionReceipt(txHash, (error: any, response: any) => {
              if (error) {
                reject(error)
              }
              if (response) {
                clearInterval(interval)
                resolve({
                  ...token,
                  address: response.logs[0].address,
                })
              }
            })
          }, 1000)
        }
      }

    })
  })
}

const getAccount = (): string => {
  // return ethSingleton.getEth() && ethSingleton.getEth().defaultAccount
  return ethSingleton.getEth() && ethSingleton.getEth().accounts[0]
}

const getAccounts = (): string => {
  // return ethSingleton.getEth() && ethSingleton.getEth().defaultAccount
  return ethSingleton.getEth() && ethSingleton.getEth().accounts
}

export default {
  getNewBalances,
  sendTransaction,
  ethSingleton,
  getAccount,
  getAccounts,
  getTokenInfo,
  createNewToken,
}
