import { AsyncStorage } from 'react-native'

export const configureStorage = () => {
  return new Promise((resolve, reject) => {
    resolve(AsyncStorage)
  })
}

export default {
  configureStorage,
}
