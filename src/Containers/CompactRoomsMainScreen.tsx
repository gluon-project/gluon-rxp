import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, RoomsDetails, ScrollView } from '../Components'
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
  matrixLogin?: (username: string, password: string, baseUrl: string) => void
  matrixRegister?: (username: string, password: string, baseUrl: string) => void
  isRegistering?: boolean
  isLoggingIn?: boolean
  handleSelectRoom?: (roomId: string) => void
  currentMatrixUser?: MatrixUser
}

class CompactRoomsMasterScreen extends RX.Component<Props, null> {
  constructor(props: Props) {
    super(props)
    this.handleSelectRoom = this.handleSelectRoom.bind(this)
  }

  handleSelectRoom(roomId: string) {
    this.props.handleSelectRoom(roomId)
    if (this.props.uiTraits.horizontalIsCompact) {
      this.props.navigate('RoomActions')
    }
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>

          <RoomsDetails
            currentMatrixUser={this.props.currentMatrixUser}
            matrixLogin={this.props.matrixLogin}
            matrixRegister={this.props.matrixRegister}
            isRegistering={this.props.isRegistering}
            isLoggingIn={this.props.isLoggingIn}
            navigate={this.props.navigate}
            routeName={''}
            currentUser={this.props.currentUser}
            handleSelectRoom={this.handleSelectRoom}
            selectedRoomId={this.props.selectedRoomId}
            rooms={this.props.rooms}
            uiTraits={this.props.uiTraits}
            />

        </ScrollView>
      </RX.View>
    )
  }
}
const styles = {
  cta: RX.Styles.createViewStyle({
    marginTop: Theme.Metrics.baseMargin,
  }),
}
const mapStateToProps = (state: CombinedState): Props => {
  return {
    currentUser: Selectors.Contacts.getAccountByAddress(state, state.transactions.new.sender),
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
    handleSelectRoom: (roomId: string) => dispatch(Actions.Matrix.selectRoom(roomId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompactRoomsMasterScreen)
