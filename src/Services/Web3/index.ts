import Config from '../../Config'
import gluonTokenAbi from './gluon-token-abi'
import communityTokenAbi from './community-token-abi'
import communityTokenFactoryAbi from './community-token-factory-abi'
import erc223abi from './erc223abi'
import erc20abi from './erc20abi'
import Uport from '../uPort'
const Web3 = require('ethjs-query')
const bs58 = require('bs58')
import * as _ from 'lodash'
import * as moment from 'moment'
import * as Enums from '../../Enums'

import Etherscan from '../Etherscan'

var abiDecoder = require('../../../src/Services/Web3/abi-decoder.js')
abiDecoder.addABI(gluonTokenAbi)
abiDecoder.addABI(communityTokenAbi)
abiDecoder.addABI(communityTokenFactoryAbi)

const DEFAULT_GAS_PRICE = '3000000000'

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

  getCommunityTokenFactory: (): any => {
    return ethSingleton.getNetworkId()
    .then((networkId: string) => {
      return web3.eth.contract(communityTokenFactoryAbi).at(
        networkId === '4' ? Config.tokens.communityTokenFactoryAddress : '',
      )
    })
  },

  getCommunityToken: (address: string, networkId?: string): any => {
    if (!networkId) {
      return web3.eth.contract(communityTokenAbi).at(address)
    } else if (networkId === '1') {
      return Uport.mainnetProvider.eth.contract(communityTokenAbi).at(address)
    } else if (networkId === '4') {
      return Uport.rinkebyProvider.eth.contract(communityTokenAbi).at(address)
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
      const tokenContract = ethSingleton.getCommunityToken(token.address)

      const subPromises: Promise<any>[] = []

      // totalSupply
      subPromises.push(new Promise<string>((resolve, reject) => {
        tokenContract.totalSupply.call(function (err: any, value: string) {
          if (err) {
            reject(err)
          } else {
            resolve(value)
          }
        })
      }))

      // poolBalance
      subPromises.push(new Promise<string>((resolve, reject) => {
        tokenContract.poolBalance.call(function (err: any, value: string) {
          if (err) {
            reject(err)
          } else {
            resolve(value)
          }
        })
      }))

      // balanceOf
      subPromises.push(new Promise<string>((resolve, reject) => {
        tokenContract.balanceOf.call(address, function (err: any, value: string) {
          if (err) {
            reject(err)
          } else {
            resolve(value)
          }
        })
      }))

      const promise = Promise.all(subPromises).then((data: any[]) => {
        return {
          token: {
            ...token,
            totalSupply: parseInt(data[0], 10),
            poolBalance: parseInt(data[1], 10),
          },
          amount: data[2].toString(),
        } as Balance
      })

      promises.push(promise)
    }
  })
  return Promise.all(promises)
}

const priceToMint = (token: Token, amount: string): Promise<string> => {
  if (token.type === Enums.TokenType.Erc223) {
    const tokenContract = ethSingleton.getCommunityToken(token.address)
    return new Promise<any>((resolve, reject) => {
      tokenContract.priceToMint.call(amount, function (err: any, val: any) {
        if (err) {
          reject(err)
        } else {
          console.log(val)
          resolve(val.toString())
        }
      })
    })
  } else {
    return Promise.reject('Token does not support priceToMint')
  }
}

const rewardForBurn = (token: Token, amount: string): Promise<string> => {
  if (token.type === Enums.TokenType.Erc223) {
    const tokenContract = ethSingleton.getCommunityToken(token.address)
    return new Promise<any>((resolve, reject) => {
      tokenContract.rewardForBurn.call(amount, function (err: any, val: any) {
        if (err) {
          reject(err)
        } else {
          resolve(val.toString())
        }
      })
    })
  } else {
    return Promise.reject('Token does not support rewardForBurn')
  }
}

const getTokenListInfo = (address: string[]): Promise<Token[]> => {
  let promises = address.map(item => getTokenInfo(item) as Promise<Token>)
  return Promise.all(promises)
}

const getTokenInfo = (address: string, networkId?: string) => {
  let promises: Promise<any>[] = []

  const tokenContract = ethSingleton.getCommunityToken(address, networkId)
  const tokenFactoryContract = ethSingleton.getCommunityTokenFactory()

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

  // exponent
  promises.push(new Promise<number>((resolve, reject) => {
    tokenContract.exponent.call(function (err: any, value: number) {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  }))

  // poolBalance
  promises.push(new Promise<string>((resolve, reject) => {
    tokenContract.poolBalance.call(function (err: any, value: string) {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  }))

  // reserveToken
  promises.push(new Promise<string>((resolve, reject) => {
    tokenContract.reserveToken.call(function (err: any, value: string) {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  }))

  // isCommunityToken
  promises.push(new Promise<number>((resolve, reject) => {
    tokenFactoryContract.then((contract: any) => contract.isCommunityToken.call(address, function (err: any, value: number) {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    }))
  }))

  promises.push(ethSingleton.getNetworkId())

  return Promise.all(promises).then((data: any[]) => {
    return {
      address,
      name: data[0],
      code: data[1],
      decimals: data[2].toNumber(),
      totalSupply: data[3].toString(),
      exponent: data[4].toNumber(),
      poolBalance: data[5].toString(),
      reserveToken: data[6].toString(),
      type: data[7] ? Enums.TokenType.Erc223 : Enums.TokenType.Erc20,
      networkId: networkId || '4',
    } as Token
  })
}

const handlePendingTransaction = (
  handleResponse: (txHash: string, response: any, timestamp?: number) => any,
  resolve: (data: any) => void,
  reject: (error: any) => void,
  returnWithoutWaiting?: boolean,
) => {
  return function (err: any, txHash: string) {
    if (err) {
      reject(err)
    } else {
      if (txHash) {
        console.log('Transaction sent')
        // console.log(txHash)
        if (returnWithoutWaiting === true) {
          console.log('Not waiting for blockchain confirmation')
          resolve(handleResponse(txHash, null))
        } else {
          const interval = setInterval(() => {
            ethSingleton.getEth().getTransactionReceipt(txHash, (error: any, response: any) => {
              if (error) {
                console.log('TX Error: ', txHash, error)
                reject(error)
              }
              if (response) {
                // console.log('TX Response: ', txHash, response)
                clearInterval(interval)
                ethSingleton.getEth().getBlock(response.blockNumber, (err: any, block: any) => {
                  if (err) {
                    console.log('TX Error: ', error)
                    reject(err)
                  }
                  const timestamp = block ? block.timestamp : moment().format('X')
                  resolve(handleResponse(txHash, response, timestamp))
                })
              }
            })
          }, 1000)
        }
      }
    }
  }
}

const loadTransactionInfo = (txHash: string): Promise<Transaction> => {

  return new Promise<Transaction>((resolve, reject) => {
    handlePendingTransaction((txHash, response, timestamp) => {
      const tx = Etherscan.ethTransactionToGluonTransactionGeneric(response, timestamp)
      return tx
    }, resolve, reject)(null, txHash)
  })
}

const mintTokens = (transaction: MintTransaction): Promise<Transaction> => {
  const contract = ethSingleton.getEth().contract(gluonTokenAbi).at(transaction.token)
  console.log(transaction)
  return new Promise<Transaction>((resolve, reject) => {
    contract.mint(
      transaction.numTokens,
      { from: transaction.sender, value: transaction.price, gasPrice: DEFAULT_GAS_PRICE },
      handlePendingTransaction((txHash, response) => {
        return {
          ...transaction,
          hash: txHash,
          date: moment().toISOString(),
        }
      }, resolve, reject),
    )
  })
}

const burnTokens = (transaction: BurnTransaction): Promise<Transaction> => {
  const contract = ethSingleton.getEth().contract(gluonTokenAbi).at(transaction.token)

  return new Promise<Transaction>((resolve, reject) => {
    contract.burn(
      transaction.numTokens,
      { from: transaction.sender, gasPrice: DEFAULT_GAS_PRICE },
      handlePendingTransaction((txHash, response) => {
        return {
          ...transaction,
          hash: txHash,
          date: moment().toISOString(),
        }
      }, resolve, reject),
    )
  })
}

const uintToBytes = (uint: number) => {
  const hexInt = uint.toString(16)
  return '0x' + '0'.repeat(64 - hexInt.length) + hexInt
}

const mintCommunityTokens = (transaction: MintTransaction): Promise<Transaction> => {
  const contract = ethSingleton.getEth().contract(gluonTokenAbi).at(transaction.reserveToken)

  return new Promise<Transaction>((resolve, reject) => {
    contract.transfer(
      transaction.token,
      transaction.price,
      uintToBytes(parseInt(transaction.numTokens, 10)),
      { from: transaction.sender, gasPrice: DEFAULT_GAS_PRICE },
      handlePendingTransaction((txHash, response) => {
        return {
          ...transaction,
          hash: txHash,
          date: moment().toISOString(),
        }
      }, resolve, reject),
    )
  })
}

const burnCommunityTokens = (transaction: BurnTransaction): Promise<Transaction> => {
  const contract = ethSingleton.getEth().contract(communityTokenAbi).at(transaction.token)

  return new Promise<Transaction>((resolve, reject) => {
    contract.burn(
      transaction.numTokens,
      '0x0',
      { from: transaction.sender, gasPrice: DEFAULT_GAS_PRICE },
      handlePendingTransaction((txHash, response) => {
        return {
          ...transaction,
          hash: txHash,
          date: moment().toISOString(),
        }
      }, resolve, reject),
    )
  })
}

const sendTransactionErc223 = (transaction: Transaction): Promise<Transaction> => {
  const token = ethSingleton.getCommunityToken(transaction.token)
  const hex = transaction.attachment && transaction.attachment ? bs58.decode(transaction.attachment).toString('hex') : '00'

  return new Promise<Transaction>((resolve, reject) => {
    token.transfer(
      transaction.receiver,
      transaction.amount,
      `0x${hex}`,
      { from: transaction.sender, gasPrice: DEFAULT_GAS_PRICE },
      handlePendingTransaction((txHash, response) => {
        return {
          ...transaction,
          hash: txHash,
          date: moment().toISOString(),
          pending: response ? false : true,
        }
      }, resolve, reject, true),
    )
  })
}

const sendTransactionErc20 = (transaction: Transaction): Promise<Transaction> => {
  const token = ethSingleton.getErc20(transaction.token)

  return new Promise<Transaction>((resolve, reject) => {
    token.transfer(
      transaction.receiver,
      transaction.amount,
      { from: transaction.sender, gasPrice: DEFAULT_GAS_PRICE },
      handlePendingTransaction((txHash, response) => {
        return {
          ...transaction,
          hash: txHash,
          date: moment().toISOString(),
          pending: response ? false : true,
        }
      }, resolve, reject, true),
    )
  })
}

const sendTransactionETH = (transaction: Transaction): Promise<Transaction> => {

  return new Promise<Transaction>((resolve, reject) => {
    ethSingleton.getEth().sendTransaction({
        from: transaction.sender,
        to: transaction.receiver,
        value: transaction.amount,
        gasPrice: DEFAULT_GAS_PRICE,
      },
      handlePendingTransaction((txHash, response) => {
        return {
          ...transaction,
          hash: txHash,
          date: moment().toISOString(),
          pending: response ? false : true,
        }
      }, resolve, reject, true),
    )
  })
}

const findTokenContractAddress = (logs: any[]): string => {
  const decodedLogs = abiDecoder.decodeLogs(logs)
  const filtered = _.filter(decodedLogs, (log: any) => {
    return log && log.name === 'TokenCreated'
  })

  return filtered[0].events[1].value
}

const createNewToken = (token: Token, creator: User): Promise<Token> => {
  return ethSingleton.getCommunityTokenFactory()
  .then((tokenFactory: any) => {
    return new Promise<Token>((resolve, reject) => {
      tokenFactory.createCommunityToken(
        token.name,
        token.decimals,
        token.code,
        token.exponent,
        { from: creator.address, gasPrice: DEFAULT_GAS_PRICE },
        handlePendingTransaction((txHash, response) => {
          return {
            ...token,
            address: findTokenContractAddress(response.logs),
            type: Enums.TokenType.Erc223,
          }
        }, resolve, reject),
      )
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
  mintTokens,
  burnTokens,
  mintCommunityTokens,
  burnCommunityTokens,
  priceToMint,
  rewardForBurn,
  sendTransactionErc223,
  sendTransactionErc20,
  sendTransactionETH,
  ethSingleton,
  getAccount,
  getAccounts,
  getTokenInfo,
  getTokenListInfo,
  createNewToken,
  loadTransactionInfo,
}
