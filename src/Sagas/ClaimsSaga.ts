import { delay, SagaIterator } from 'redux-saga'
import { call, put, select, spawn, take } from 'redux-saga/effects'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import Config from '../Config'
import * as Services from '../Services'

import { decodeToken } from 'jsontokens'

export function* watchSignAnonymousClaim(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Contacts.signAnonymousClaim)
    yield put(Actions.Process.start({type: Enums.ProcessType.SignClaim}))

    try {
      const jwt = yield call(Services.uPort.signAnonymousClaim, action.payload)
      const decodedClaim = yield call(decodeToken, jwt)
      const signedClaim: VerifiableClaim = {
        ...decodedClaim.payload,
        jwt,
        source: {
          type: 'local',
        },
      }

      yield put(Actions.Contacts.addClaim(signedClaim))
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
    yield put(Actions.Process.end({type: Enums.ProcessType.SignClaim}))
  }
}
