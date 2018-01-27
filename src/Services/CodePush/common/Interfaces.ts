import Types = require('./Types')

export abstract class Api {
  abstract codePushSaga: any
  abstract getCodePushUpdateMetadata: any
  abstract sync: any
}

export interface PluginInterface {
  Types: typeof Types
  default: Api
}
