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
  handleSelectRoom?: (roomId: string) => void
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
    currentUser: state.user.current,
    rooms: Selectors.Matrix.getRooms(state),
    uiTraits: state.app.uiTraits,
    selectedRoomId: Selectors.Matrix.getSelectedRoomId(state),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateHome: () => dispatch(Actions.Navigation.navigateHome()),
    handleSelectRoom: (roomId: string) => dispatch(Actions.Matrix.selectRoom(roomId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompactRoomsMasterScreen)
