
declare interface UITraits {
  horizontalIsCompact: boolean,
  verticalIsCompact: boolean,
  displayScale: number
}

declare interface CodePushDeployment {
  name: string,
  key: string
}

declare interface CodePushDeploymentMetaData {
  version: string,
  deploymentKey: string
}

declare interface ModalMessageConfig {
  title: string,
  message: string,
  ctaTitle: string,
  type: number, //Enums.MessageType
  nextAction?: any,
  nextActionCtaTitle: string,
  inputText?: string,
}

declare const __DEV__: boolean

declare interface User {
  address?: string,
  name?: string,
  avatar?: string,
}

declare interface Token {
  address?: string,
  name?: string,
  code?: string,
  logo?: string,
  initialAmount?: string,
  decimals?: number,
  type?: number,
}

declare interface Transaction {
  hash?: string,
  sender?: string,
  receiver?: string,
  amount?: string,
  token?: string,
  date?: string,
  attachment?: string,
}

declare interface Balance {
  token: Token
  amount: string
}

declare interface Attachment {
  ipfs?: string,
  message?: string,
  url?: string,
  data?: AttachmentData,
}

// https://iframely.com/docs/iframely-api

declare interface LinkType {
  media?: {
    'aspect-ratio'?: number,
    'max-width'?: number,
    height?: number,
    width?: number,
  },
  href?: string,
  rel?: string[],
  type?: string,
  content_length?: number,
}

declare interface AttachmentData {
  url?: string,
  meta?: {
    title?: string,
    description?: string,
    author_url?: string,
    author?: string,
    site?: string,
    canonical?: string,
    keywords?: string,
    media?: string,
  },
  rel?: string[],
  links?: {
    player?: LinkType[],
    thumbnail?: LinkType[],
    icon?: LinkType[],
    app?: LinkType[],
    image?: LinkType[],
  }
}

declare interface EthereumLogEvent {
  name: string,
  type: string,
  value: string,
}

declare interface Process {
  type: number,
  data: string,
}

interface TokenTransactionsMap {
  [tokenAddress: string]: Transaction[]
}
