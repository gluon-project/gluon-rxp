import RX = require('reactxp')
import { connect } from 'react-redux'
import { ModalMessage } from '../Components'
import {
  LoadingScreen,
  LoginScreen,
} from '../Containers'
import { ResponsiveLayout, MasterDetailNavigator} from '../Navigation'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Theme from '../Theme'
import * as Selectors from '../Selectors'
import { addNavigationHelpers } from 'react-navigation'

interface Props extends RX.CommonProps {
  loadingInitialData?: boolean
  uiTraits?: UITraits
  dispatch?: any
  modalMessage?: ModalMessageConfig
  closeModalMessage?: () => void
  closeModalMessageAndNextAction?: () => void,
  currentUser?: User,
  isAppProcessing?: boolean
}

class Navigation extends RX.Component<Props, null> {

  componentWillReceiveProps(newProps: Props) {
    if (this.props.isAppProcessing && !newProps.isAppProcessing) {
      RX.StatusBar.setNetworkActivityIndicatorVisible(true)
    } else if (!this.props.isAppProcessing && newProps.isAppProcessing) {
      RX.StatusBar.setNetworkActivityIndicatorVisible(false)
    }
  }

  render() {
    return (
      <ResponsiveLayout>
        <RX.View style={Theme.Styles.containerFull}>
          {this.props.loadingInitialData && <LoadingScreen/>}
          {!this.props.loadingInitialData
            && <MasterDetailNavigator />}
        </RX.View>
        {this.props.modalMessage && <ModalMessage
          onClose={this.props.closeModalMessage}
          onAction={this.props.closeModalMessageAndNextAction}
          config={this.props.modalMessage}
        />}
      </ResponsiveLayout>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    loadingInitialData: state.app.loadingInitialData,
    uiTraits: state.app.uiTraits,
    modalMessage: state.modalMessage,
    currentUser: state.user.current,
    isAppProcessing: Selectors.Process.isAppProcessing(state),
  }
}

const mapDispatchToProps = (dispatch: any): Props => {
  return {
    dispatch,
    closeModalMessage: () => dispatch(Actions.ModalMessage.setModalMessage(null)),
    closeModalMessageAndNextAction: () => dispatch(Actions.ModalMessage.closeModalMessage()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
