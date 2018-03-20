import Config from '../../Config'
import erc223abi from './erc223abi'
import erc20abi from './erc20abi'
import erc223TokenFactoryAbi from './erc223TokenFactoryAbi'
import Uport from '../uPort'
const Web3 = require('ethjs-query')
const bs58 = require('bs58')
import * as _ from 'lodash'
import * as moment from 'moment'
import * as Enums from '../../Enums'

var abiDecoder = require('../../../src/Services/Web3/abi-decoder.js')
abiDecoder.addABI(erc223abi)

let web3: any = null

const ethSingleton =  {

  setProvider: (provider: any) => {
    web3 = provider
  },

  getWeb3: (): any => {
    return web3
  },

  getEth: (): any => {
    return web3 && web3.eth
  },

  getNetworkId: (): Promise<String> => {
    return new Promise<string>((resolve, reject) => {
      web3.version.getNetwork((err: any, networkId: string) => {
        if (err) {
          reject(err)
        }
        resolve(networkId)
      })
    })
  },

  getErc223Factory: (): any => {
    return ethSingleton.getNetworkId()
    .then((networkId: string) => {
      return web3.eth.contract(erc223TokenFactoryAbi).at(
        networkId === '4' ? '0x4597c2b6b11a244179f45acf565c66deb3cd99a1' : '0x5AECaF7d9712851dd5Db865c4242F54D9366b3e1',
      )
    })
  },

  getErc223: (address: string, networkId?: string): any => {
    if (!networkId) {
      return web3.eth.contract(erc223abi).at(address)
    } else if (networkId === '1') {
      return Uport.mainnetProvider.eth.contract(erc223abi).at(address)
    } else if (networkId === '4') {
      return Uport.rinkebyProvider.eth.contract(erc223abi).at(address)
    }
  },

  getErc20: (address: string): any => {
    return web3.eth.contract(erc20abi).at(address)
  },
}

if ((<any>window).web3 && (<any>window).web3.currentProvider) {
  // ethSingleton.setProvider(new Web3((<any>window).web3.currentProvider))
  const w3 = Uport.getProvider()
  w3.setProvider((<any>window).web3.currentProvider)
  ethSingleton.setProvider(w3)
}

const getNewBalances = (address: string, tokens: Token[]) => {
  let promises: Promise<Balance>[] = []

  tokens.forEach(token => {
    if (token.type === Enums.TokenType.ETH) {
      const promise = new Promise<Balance>((resolve, reject) => {
        ethSingleton.getEth().getBalance(address, function (err: any, bal: any) {
          if (err) {
            reject(err)
          } else {
            resolve({
              token,
              amount: bal.toString(),
            })
          }
        })
      })
      promises.push(promise)
    } else {
      const tokenContract = ethSingleton.getErc223(token.address)
      const promise = new Promise<Balance>((resolve, reject) => {
        tokenContract.balanceOf.call(address, function (err: any, bal: any) {
          if (err) {
            reject(err)
          } else {
            resolve({
              token,
              amount: bal.toString(),
            })
          }
        })
      })
      promises.push(promise)
    }
  })
  return Promise.all(promises)
}

const getTokenInfo = (address: string, networkId?: string) => {
  let promises: Promise<any>[] = []

  const tokenContract = ethSingleton.getErc223(address, networkId)

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

  // MAX_UINT256 - ERC20 returns 0. This is a hacky way of checking if token is ERC20
  promises.push(new Promise<number>((resolve, reject) => {
    tokenContract.MAX_UINT256.call(function (err: any, value: number) {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  }))

  promises.push(ethSingleton.getNetworkId())

  return Promise.all(promises).then((data: any[]) => {
    return {
      address,
      name: data[0],
      code: data[1],
      decimals: data[2].toNumber(),
      initialAmount: data[3].toString(),
      type: data[4].toString() === '0' ? Enums.TokenType.Erc20 : Enums.TokenType.Erc223,
      networkId: networkId || '4',
    } as Token
  })
}

const sendTransactionErc223 = (transaction: Transaction): Promise<Transaction> => {
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

const sendTransactionErc20 = (transaction: Transaction): Promise<Transaction> => {
  const token = ethSingleton.getErc20(transaction.token)

  return new Promise<Transaction>((resolve, reject) => {
    token.transfer(transaction.receiver, transaction.amount,
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

const sendTransactionETH = (transaction: Transaction): Promise<Transaction> => {

  return new Promise<Transaction>((resolve, reject) => {
    ethSingleton.getEth().sendTransaction({
        from: transaction.sender,
        to: transaction.receiver,
        value: transaction.amount,
      }, function (err: any, txHash: string) {
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

const findTokenContractAddress = (logs: any[]): string => {
  const decodedLogs = abiDecoder.decodeLogs(logs)
  const filtered = _.filter(decodedLogs, (log: any) => {
    return log && log.name === 'Transfer'
  })

  return filtered[0].address
}

const createNewToken = (token: Token, creator: User): Promise<Token> => {
  return ethSingleton.getErc223Factory()
  .then((tokenFactory: any) => {
    console.log(tokenFactory)
    return new Promise<Token>((resolve, reject) => {
      tokenFactory.createERC223Token(
        token.initialAmount, token.name, token.decimals, token.code,
        { from: creator.address, gasPrice: 3000000000 }, function (err: any, txHash: string) {
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
                    address: findTokenContractAddress(response.logs),
                    type: Enums.TokenType.Erc223,
                  })
                }
              })
            }, 1000)
          }
        }
      })
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
  sendTransactionErc223,
  sendTransactionErc20,
  sendTransactionETH,
  ethSingleton,
  getAccount,
  getAccounts,
  getTokenInfo,
  createNewToken,
}
