import Config from '../../Config'
import { addData } from './addData'

const getData = (hash: string) => {
  return fetch(`${Config.ipfs.gateWay}/ipfs/${hash}`)
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson
  })
  .catch((error) => {
    console.error(error)
  })

}

export default {
  addData,
  getData,
}
