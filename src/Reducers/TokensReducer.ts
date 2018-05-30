import {
  createAction,
  createReducer,
} from 'redux-act'
import { resetToInitialState } from './AppReducer'
import Config from '../Config'
import * as Enums from '../Enums'

export interface TokensState {
  current: string,
  mintTransaction: MintTransaction,
  burnTransaction: BurnTransaction,
  new: Token,
  list: Token[],
  available: Token[],
}

const emptyMintTransaction: MintTransaction = {
  numTokens: '0',
  price: '0',
}

const emptyBurnTransaction: BurnTransaction = {
  numTokens: '0',
  reward: '0',
}

const initialState: TokensState = {
  current: Config.tokens.defaultList[0].address,
  mintTransaction: emptyMintTransaction,
  burnTransaction: emptyBurnTransaction,
  new: null,
  list: Config.tokens.defaultList,
  available: [],
}

export const reducer = createReducer({}, initialState)
reducer.on(resetToInitialState, (state: TokensState) => {
  return initialState
})

export const addToken = createAction('Add token')
reducer.on(addToken, (state: TokensState, payload?: Token) => {
  return {
    ...state,
    list: [ ...state.list, payload ],
  }
})

export const selectToken = createAction('Select token')
reducer.on(selectToken, (state: TokensState, payload?: string) => {
  return {
    ...state,
    current: payload,
    burnTransaction: emptyBurnTransaction,
    mintTransaction: emptyMintTransaction,
  }
})

export const setNew = createAction('Set new Token values')
reducer.on(setNew, (state: TokensState, payload?: Token) => {
  return {
    ...state,
    new: payload,
  }
})

export const setMintNumTokens = createAction('Set amount of tokens to mint')
reducer.on(setMintNumTokens, (state: TokensState, payload?: string) => {
  return {
    ...state,
    mintTransaction: {
      ...state.mintTransaction,
      numTokens: payload,
    },
  }
})

export const setMintPrice = createAction('Set mint price')
reducer.on(setMintPrice, (state: TokensState, payload?: string) => {
  return {
    ...state,
    mintTransaction: {
      ...state.mintTransaction,
      price: payload,
    },
  }
})

export const setBurnNumTokens = createAction('Set amount of tokens to burn')
reducer.on(setBurnNumTokens, (state: TokensState, payload?: string) => {
  return {
    ...state,
    burnTransaction: {
      ...state.burnTransaction,
      numTokens: payload,
    },
  }
})

export const setBurnReward = createAction('Set reward for burn')
reducer.on(setBurnReward, (state: TokensState, payload?: string) => {
  return {
    ...state,
    burnTransaction: {
      ...state.burnTransaction,
      reward: payload,
    },
  }
})

export const setAvailableTokens = createAction('Set available tokens')
reducer.on(setAvailableTokens, (state: TokensState, payload?: Token[]) => {
  return {
    ...state,
    available: payload,
  }
})

export const getTokenInfo = createAction('Get Token info')
export const createNewToken = createAction('Create new token')
export const mintTokens = createAction('Mint new tokens')
export const burnTokens = createAction('Burn tokens')
export const getPriceToMint = createAction('Get price to mint')
export const getRewardForBurn = createAction('Get reward for burn')
export const getAvailableTokens = createAction('Get available tokens')
