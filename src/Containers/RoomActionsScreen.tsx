import RX = require('reactxp')
import { connect } from 'react-redux'
import {
  CallToAction,
  ScrollView,
  ListItem,
  SegmentedControl,
  AttachmentCard,
  MatrixLogin,
  TextInput,
  Graphs } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Theme from '../Theme'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import utils from '../Utils'
import { find } from 'lodash'
interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  matrixLogin?: (username: string, password: string, baseUrl: string) => void
  isLoggingIn?: boolean
  matrixSendTextMessage?: (message: string) => void
  matrixSendMessage?: (content: any) => void
  navigateBack?: () => void
  setRoomForTransaction?: (roomId: any) => void
  isSendingMessage?: boolean
  room?: MatrixRoom
  uiTraits?: UITraits
  currentUser?: User
  currentMatrixUser?: MatrixUser
}

interface State {
  message: string
}

const getMember = (userId: string, room: MatrixRoom): MatrixMember => {
  return find(room.members, {userId})
}

class TokenActionsScreen extends RX.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      message: '',
    }
    this.send = this.send.bind(this)
    this.sendTx = this.sendTx.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(e: any) {
    if (e.key === 'Enter') {
      this.send()
    }
  }

  send() {
    this.props.matrixSendTextMessage(this.state.message)
    this.setState({message: ''})
  }

  sendTx() {
    this.props.setRoomForTransaction(this.props.room.id)
    this.props.navigate('SendTab')
  }
  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <RX.View style={Theme.Styles.scrollContainer}>
            {this.props.room && this.props.room.timeline.map(event => (event.type === 'm.room.message' && event.content.body) &&
            <RX.View key={event.eventId}  style={Theme.Styles.chat.messageBubble}>
              <RX.Image
                resizeMode={'cover'}
                style={Theme.Styles.chat.messageSenderAvatar}
                source={getMember(event.sender, this.props.room).avatarUrl} />
              <RX.View style={{flex: 1}}>
                <RX.Text style={Theme.Styles.chat.messageSender}>{getMember(event.sender, this.props.room).displayname}</RX.Text>
                <RX.Text style={Theme.Styles.chat.messageBody}>{event.content.body}</RX.Text>
                {event.content.attachment && <AttachmentCard attachment={event.content.attachment} />}
              </RX.View>
            </RX.View>)}
          </RX.View>
        </ScrollView>
        <RX.View style={[Theme.Styles.containerWrapper, {flex: 0}]}>
          <RX.View style={[Theme.Styles.container, Theme.Styles.row]}>
            <TextInput
              value={this.state.message}
              onKeyPress={this.handleKeyPress}
              onChangeText={(message) => this.setState({message})}
              />
            <CallToAction
              inProgress={this.props.isSendingMessage}
              title='Send'
              onPress={this.send}
              />
            <CallToAction
              title='+'
              onPress={this.sendTx}
              />
          </RX.View>
        </RX.View>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    isLoggingIn: Selectors.Process.isRunningProcess(state, Enums.ProcessType.MatrixLogin),
    isSendingMessage: Selectors.Process.isRunningProcess(state, Enums.ProcessType.MatrixSendMessage),
    room: Selectors.Matrix.getSelectedRoom(state),
    currentMatrixUser: Selectors.Matrix.getCurrentUser(state),
    uiTraits: state.app.uiTraits,
    currentUser: state.user.current,

  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    matrixLogin: (username: string, password: string, baseUrl: string) => dispatch(Actions.Matrix.login({username, password, baseUrl})),
    matrixSendTextMessage: (message: string) => dispatch(Actions.Matrix.sendTextMessage(message)),
    matrixSendMessage: (content: any) => dispatch(Actions.Matrix.sendMessage(content)),
    setRoomForTransaction: (roomId: any) => dispatch(Actions.Transactions.setRoom(roomId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TokenActionsScreen)
