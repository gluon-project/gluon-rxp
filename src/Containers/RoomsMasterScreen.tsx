import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, RoomsDetails, NavBar } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateHome?: () => void
  navigation?: any,
  currentUser?: User,
  uiTraits?: UITraits
  selectedRoomId?: string
  rooms?: MatrixRoom[]
  handleSelectRoom?: (roomId: string) => void
  matrixLogin?: (username: string, password: string, baseUrl: string) => void
  matrixRegister?: (username: string, password: string, baseUrl: string) => void
  isLoggingIn?: boolean
  isRegistering?: boolean
  currentMatrixUser?: MatrixUser
}

class RoomsMasterScreen extends RX.Component<Props, null> {
  render() {
    const tabIndex = this.props.navigation.state.index
    const index = this.props.navigation.state.routes[tabIndex].index
    const routeName = this.props.navigation.state.routes[tabIndex].routes[index].routeName
    return (
      <RX.View style={Theme.Styles.containerFull}>
        <NavBar title='Rooms' />
        <RX.ScrollView style={[Theme.Styles.scrollContainerNoMargins, Theme.Styles.masterViewContainer]}>
          <RoomsDetails
            currentMatrixUser={this.props.currentMatrixUser}
            matrixLogin={this.props.matrixLogin}
            matrixRegister={this.props.matrixRegister}
            isLoggingIn={this.props.isLoggingIn}
            isRegistering={this.props.isRegistering}
            navigate={this.props.navigate}
            routeName={routeName}
            currentUser={this.props.currentUser}
            handleSelectRoom={this.props.handleSelectRoom}
            selectedRoomId={this.props.selectedRoomId}
            rooms={this.props.rooms}
            uiTraits={this.props.uiTraits}
          />
        </RX.ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    currentUser: state.user.current,
    rooms: Selectors.Matrix.getRooms(state),
    uiTraits: state.app.uiTraits,
    selectedRoomId: Selectors.Matrix.getSelectedRoomId(state),
    isLoggingIn: Selectors.Process.isRunningProcess(state, Enums.ProcessType.MatrixLogin),
    isRegistering: Selectors.Process.isRunningProcess(state, Enums.ProcessType.MatrixRegister),
    currentMatrixUser: Selectors.Matrix.getCurrentUser(state),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    matrixLogin: (username: string, password: string, baseUrl: string) => dispatch(Actions.Matrix.login({username, password, baseUrl})),
    matrixRegister: (username: string, password: string, baseUrl: string) =>
    dispatch(Actions.Matrix.register({username, password, baseUrl})),
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateHome: () => dispatch(Actions.Navigation.navigateHome()),
    handleSelectRoom: (roomId: string) => {
      dispatch(Actions.Navigation.navigate('RoomActions'))
      dispatch(Actions.Matrix.selectRoom(roomId))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomsMasterScreen)
