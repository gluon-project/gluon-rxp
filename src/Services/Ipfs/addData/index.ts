import Config from '../../../Config'

export const addData = (data: any ) => {
  const formData  = new FormData()
  formData.append('blob', new Blob([JSON.stringify(data)]), 'file')

  return fetch(`${Config.ipfs.api}/api/v0/add?pin=true`, {
    method: 'POST',
    body: formData,
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson)
    return responseJson.Hash
  })
  .catch((error) => {
    console.error(error)
  })
}
