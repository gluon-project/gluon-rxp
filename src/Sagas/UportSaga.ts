import { delay, SagaIterator } from 'redux-saga'
import { call, put, select, spawn, take } from 'redux-saga/effects'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import Config from '../Config'
import * as Services from '../Services'

export function* watchStartLogin(): SagaIterator {
  while (true) {
    yield take(Actions.User.startLogin)
    try {
      const result = yield call(Services.uPort.requestCredentials)
      if (result && result.name) {
        const user: User = {
          name: result.name,
          address: result.address,
          avatar: result.avatar ? result.avatar.uri : null,
        }
        yield put(Actions.User.setAccounts([result.address]))
        yield put(Actions.User.setCurrent(user))
        yield put(Actions.Contacts.addContact(user))
        yield call(Services.Web3.ethSingleton.setProvider, Services.uPort.provider)
        yield call(delay, 500)
        yield put(Actions.User.refreshBalances())
      }
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
  }
}
