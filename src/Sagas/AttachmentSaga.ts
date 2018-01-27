import {
  delay,
  SagaIterator,
} from 'redux-saga'
import {
  call,
  put,
  select,
  spawn,
  take,
  takeEvery,
} from 'redux-saga/effects'

import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import * as Services from '../Services'
import Config from '../Config'

function parseMetaData(url: string): Promise<AttachmentData | void> {
  const fullUrl = `${Config.scraper.url}${encodeURI(url)}`
  return fetch(fullUrl, {mode: 'cors'})
    .then(data => data.json())
    .then((json: any) => {
      if (json.error) {
        return null
      }
      console.log(json)
      return json
    })
    .catch(console.log)
}

export function* getFromIpfs(action: any): SagaIterator {
  const ipfsHash = action.payload
  yield put(Actions.Process.start({type: Enums.ProcessType.GetDataFromIpfs, data: ipfsHash}))
  try {
    const attachment: Attachment = yield call(Services.Ipfs.getData, ipfsHash)
    attachment.ipfs = ipfsHash
    yield put(Actions.Attachment.addToCache(attachment))
  } catch (e) {
    yield put(Actions.App.handleError(e))
  }
  yield put(Actions.Process.end({ type: Enums.ProcessType.GetDataFromIpfs, data: ipfsHash}))
}

export function* watchGetFromIpfs(): SagaIterator {
  yield takeEvery(Actions.Attachment.getFromIpfs, getFromIpfs)
}

export function* watchStartDownload(): SagaIterator {
  while (true) {
    yield take(Actions.Attachment.startDownload)
    yield put(Actions.Process.start({type: Enums.ProcessType.ProcessAttachment}))
    try {
      const { url } = yield select(Selectors.Attachment.getNew)
      const result = yield call(parseMetaData, url)
      yield put(Actions.Attachment.setParsed(result))
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({ type: Enums.ProcessType.ProcessAttachment}))
  }
}

export function* watchSaveAttachment(): SagaIterator {
  while (true) {
    yield take(Actions.Attachment.saveAttachment)
    yield put(Actions.Process.start({type: Enums.ProcessType.SaveAttachment}))
    try {
      const attachment = yield select(Selectors.Attachment.getNew)
      const ipfsHash = yield call(Services.Ipfs.addData, attachment)
      yield put(Actions.Attachment.setIpfs(ipfsHash))

      const newAttachment: Attachment = yield select(Selectors.Attachment.getNew)
      yield put(Actions.Attachment.addToCache(newAttachment))
      yield put(Actions.Transactions.setAttachment(newAttachment.ipfs))
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.SaveAttachment}))
  }
}
