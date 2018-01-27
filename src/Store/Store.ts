import {
  applyMiddleware,
  compose,
  createStore,
  Store,
} from 'redux'
import {
  autoRehydrate,
  persistStore,
} from 'redux-persist'
const reduxCatch = require('redux-catch')
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../Reducers/'
import sagas from '../Sagas/'

import CustomStorage from './Storage'

const sagaMiddleware = createSagaMiddleware()

const callback = (store: Store<any>) => {
  const { dispatch } = store
  dispatch({ type: 'persist/STOREREADY'})
}

const updateReducers = (store: Store<any>) => {
  CustomStorage.configureStorage().then(configuredStorage => {
    const reducerVersion = 3 // Bump up this value, when persisted reducer state format changes
    const config = {
      storage: configuredStorage,
      whitelist: [
        'osExtensions',
        'settings',
        'nav',
        'feed',
        'attachment',
        'contacts',
        'tokens',
      ], // Reducers that should persist their states between app launches
    }

    // Begin a fresh store
    persistStore(store, config, () => {callback(store)})

    // Check to ensure latest reducer version
    configuredStorage.getItem('reducerVersion').then((localVersion: string) => {
      if (parseInt(localVersion, 10) !== reducerVersion) {
        console.log('PURGING STORE', localVersion, 'vs.', reducerVersion)
        // Purge store and refresh
        persistStore(store, config, () => {
          // Start a fresh store
          persistStore(store, config, () => {callback(store)})
        }).purge()
        // Update reducer to current version number
        configuredStorage.setItem('reducerVersion', reducerVersion.toString(), (e) => {
          return
        })
      }
    }).catch(() => configuredStorage.setItem('reducerVersion', reducerVersion.toString(), (e) => {
      return
    }))
  })
}

function errorHandler(error: any, getState: any, lastAction: any, dispatch: any) {
  console.log('ERROR:')
  console.error(error)
  console.log('current state', getState())
  console.log('last action was', lastAction)
  // optionally dispatch an action due to the error using the dispatch parameter
}

export default () => {
  const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxCatch(errorHandler), sagaMiddleware), autoRehydrate()))

  updateReducers(store)

  // kick off root saga
  sagaMiddleware.run(sagas)

  return store
}
