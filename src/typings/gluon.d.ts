
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
  did?: string,
  mnid?: string,
  shortId?: string,
  address?: string,
  networkId?: string,
  name?: string,
  avatar?: string,
  hidden?: boolean,
  uniqueIssuers?: string[],
  claims?: {
    name?: VerifiableClaim,
    avatar?: VerifiableClaim,
    matrixId?: VerifiableClaim,
    mnid?: VerifiableClaim,
  }
}

// Claims

declare interface VerifiableClaim {
  iss: string,
  sub?: string,
  iat: number,
  exp?: number,
  claim: any,
  jwt: string,
  source: {
    type: string, // 'local', 'matrix', etc.
    id?: string, // 'folder', 'roomId', etc.
    account?: {
      name?: string,
      avatar?: string,
    },
  },
  issuer?: User,
  subject?: User,
  claimType?: string,
  claimValue?: string,
}

// Token

declare interface Token {
  address?: string,
  networkId?: string,
  name?: string,
  code?: string,
  logo?: string,
  initialAmount?: string,
  totalSupply?: number,
  decimals?: number,
  type?: number,
  exponent?: number,
  poolBalance?: number,
  reserveToken?: string,
}

declare interface Transaction {
  hash?: string,
  sender?: string,
  receiver?: string,
  amount?: string,
  token?: string,
  date?: string,
  room?: string,
  attachment?: string,
  type?: string,
  pending?: boolean,
}

declare interface MintTransaction {
  hash?: string,
  sender?: string,
  price?: string,
  numTokens?: string,
  token?: string,
  reserveToken?: string,
  date?: string,
  attachment?: string,
}

declare interface BurnTransaction {
  hash?: string,
  sender?: string,
  reward?: string,
  numTokens?: string,
  token?: string,
  date?: string,
  attachment?: string,
}

declare interface Balance {
  token: Token
  amount: string
  priceToMint?: string
  rewardForBurn?: string
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
  html?: string,
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

declare interface ImagePickerFile {
  dataUrl: any
  contents?: string
}

// Matrix

declare interface MatrixUser {
  access_token: string
  device_id: string
  home_server: string
  user_id: string
  avatarUrl: string
}

declare interface MatrixRoomState {
}
declare interface MatrixTimelineEvent {
  type: string,
  content: {
    body: string,
    url?: string,
    info?: {
      mimetype: string,
    },
    transaction?: Transaction,
    request?: Transaction,
    fileContent?: {
      claims: string[],
    },
  },
  eventId: string,
  ts: number,
  sender: string,
  roomId: string,
}

declare interface MatrixMember {
  userId: string,
  displayname: string,
  membership: 'invite' | 'join',
  avatarUrl: string,
  account?: User,
}
declare interface MatrixRoom {
  id: string,
  name: string,
  avatarUrl: string,
  members: MatrixMember[],
  timeline: MatrixTimelineEvent[],
  state: MatrixRoomState,
  receipts: any[],
}

declare interface MatrixNewRoomOptions {
  room_alias_name?: string,
  visibility?: 'public' | 'private',
  invite?: string[], //A list of user IDs to invite to this room
  name?: string,
  topic?: string,
  file?: any,
}
