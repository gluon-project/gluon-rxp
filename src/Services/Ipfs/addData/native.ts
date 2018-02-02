import Config from '../../../Config'
import RNFetchBlob from 'react-native-fetch-blob'

export const addData = (data: any ) => {

  const blob = {data: JSON.stringify(data), type: 'application/json', name: 'file'}

  return new Promise((resolve, reject) => {
      RNFetchBlob.fetch('POST', `${Config.ipfs.api}/api/v0/add?pin=true`, {
        'Content-Type': 'multipart/form-data',
      }, [ blob ]).then((response: any) => {
        resolve(response.json()['Hash'])
      }).catch((error: any) => {
        reject(error)
      })
    })
}
