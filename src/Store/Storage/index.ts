import * as localForage from 'localforage'

export const configureStorage = () => {
  return new Promise<LocalForage>((resolve, reject) => {
    resolve(localForage)
  })
}

export default {
  configureStorage,
}
