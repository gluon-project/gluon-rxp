import { SagaIterator, delay } from 'redux-saga'
import {
  put,
  select,
  take,
} from 'redux-saga/effects'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'

export function* watchNavigate(): SagaIterator {
  while (true) {
    const action = yield take(Actions.Navigation.navigate)
    const routeName = action.payload
    yield put({ type: 'Navigation/NAVIGATE', routeName })
  }
}
