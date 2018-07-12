import RX = require('reactxp')
import { connect } from 'react-redux'
import {
  CallToAction,
  ScrollView,
  ListItem,
  SegmentedControl,
  TextInput,
  Graphs } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Theme from '../Theme'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  room?: MatrixRoom
  uiTraits?: UITraits
  currentUser?: User
}

class TokenActionsScreen extends RX.Component<Props, null> {

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          {this.props.room && this.props.room.timeline.map(event => <RX.View key={event.eventId}  style={Theme.Styles.chat.messageBubble}>
            <RX.Text style={Theme.Styles.chat.messageSender}>{event.sender}</RX.Text>
            <RX.Text style={Theme.Styles.chat.messageBody}>{event.content.body}</RX.Text>
          </RX.View>)}
        </ScrollView>
        <RX.View style={[Theme.Styles.containerWrapper, {flex: 0}]}>
          <RX.View style={Theme.Styles.container}>
            <TextInput
              />
          </RX.View>
        </RX.View>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    room: Selectors.Matrix.getSelectedRoom(state),
    uiTraits: state.app.uiTraits,
    currentUser: state.user.current,

  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TokenActionsScreen)
