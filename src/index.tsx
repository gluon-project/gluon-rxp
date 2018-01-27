// For hot reload settings
declare var module: { hot: any }
declare var require: {
  (path: string): any;
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

import RX = require('reactxp')

import App = require('./App')
import { IStore } from '~react-redux~redux/redux'
import configureStore from './Store/Store'

RX.StatusBar.setBarStyle('light-content', false)

const store = configureStore() as IStore<any>

RX.App.initialize(true, true)

if (RX.Platform.getType() === 'web') {
  const {AppContainer} = require('react-hot-loader')
  const render = (App: any) => RX.UserInterface.setMainView(
    <AppContainer>
      <App store={store}/>
    </AppContainer>,
  )

  if (module.hot) {
    module.hot.accept()
    render(App)
  } else {
    render(App)
  }
} else {
  RX.UserInterface.setMainView(<App store={store}/>)
}
