import RNFetchBlob from 'react-native-fetch-blob'
import FilesystemStorage from 'redux-persist-filesystem-storage'

export const configureStorage = () => {
  return RNFetchBlob.fs.pathForAppGroup('group.cat.not.gluon')
    .then((path: string) => {
      FilesystemStorage.config({storagePath: `${path}/persistStore`})
      return FilesystemStorage
    })
}

export default {
  configureStorage,
}
