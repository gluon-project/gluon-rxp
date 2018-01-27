import { Provider } from 'react-redux'
import { IStore } from '~react-redux~redux/redux'
import { Navigation } from './Navigation'
import Actions from './Reducers/Actions'
import RX = require('reactxp')

interface AppProps extends RX.CommonProps {
  store: IStore<any>
}

class App extends RX.Component<AppProps, null> {

  componentWillMount() {
    const {dispatch} = this.props.store
    dispatch(Actions.App.startup())
    RX.Input.backButtonEvent.subscribe(() => {
      dispatch(Actions.Navigation.navigateBack())
      return true
    })
  }

  render(): JSX.Element | null {
    return (
      <Provider store={this.props.store}>
        <Navigation/>
      </Provider>
    )
  }
}

export = App
