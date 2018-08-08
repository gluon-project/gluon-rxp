import { delay, SagaIterator } from 'redux-saga'
import { call, put, select, spawn, take } from 'redux-saga/effects'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import Config from '../Config'
import * as Services from '../Services'
import utils from '../Utils'

export function* watchStartLogin(): SagaIterator {
  while (true) {
    const action = yield take(Actions.User.startLogin)
    try {
      const result = yield call(Services.uPort.requestCredentials, action.payload)
      if (result && result.name) {
        console.log(result)
        const user: User = {
          name: result.name,
          address: result.address,
          avatar: result.avatar ? result.avatar.uri : null,
        }
        yield put(Actions.User.setAccounts([result.address]))
        yield put(Actions.User.setCurrent(user))
        yield put(Actions.Contacts.signAnonymousClaim({
          sub: utils.address.universalIdToDID(result.address),
          claim: {
            name: result.name,
          },
        }))
        if (result.avatar) {
          yield put(Actions.Contacts.signAnonymousClaim({
            sub: utils.address.universalIdToDID(result.address),
            claim: {
              avatar: result.avatar.uri,
            },
          }))
        }
        yield call(Services.Web3.ethSingleton.setProvider, Services.uPort.getProvider())
        yield call(delay, 500)
        yield put(Actions.User.refreshBalances())
      }
    } catch (e) {
      yield put(Actions.App.handleError(e))
    }
  }
}
