import {
  SagaIterator,
} from 'redux-saga'
import {
  put,
  select,
  spawn,
  take,
} from 'redux-saga/effects'

import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'

export function* watchCloseModalMessage(): SagaIterator {
  while (true) {
    const action = yield take(Actions.ModalMessage.closeModalMessage)
    const modalConfig: ModalMessageConfig = yield select(Selectors.App.getModalMessageConfig)
    yield put(Actions.ModalMessage.setModalMessage(null))
    if (modalConfig.nextAction) {
      yield put(modalConfig.nextAction)
    }
  }
}
