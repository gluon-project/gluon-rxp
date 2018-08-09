import RX = require('reactxp')
import { connect } from 'react-redux'
import {
  CallToAction,
  ScrollView,
  ListItem,
  SegmentedControl,
  AttachmentCard,
  MatrixLogin,
  Icons,
  TextInput,
  Graphs } from '../Components'
import { TransactionBox, ClaimListBox, RequestBox } from '../Containers'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Theme from '../Theme'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import utils from '../Utils'
import { find, filter } from 'lodash'
interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  matrixLogin?: (username: string, password: string, baseUrl: string) => void
  isLoggingIn?: boolean
  matrixSendTextMessage?: (message: string) => void
  matrixSendMessage?: (content: any) => void
  navigateBack?: () => void
  setRoomForTransaction?: (roomId: any) => void
  setMessageForTransaction?: (message: string) => void
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
  return (room && room.members) ? find(room.members, {userId}) : { userId: '', avatarUrl: '', displayname: '', membership: 'join'}
}

class TokenActionsScreen extends RX.Component<Props, State> {
  private scrollRef: any = null

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
    this.props.setMessageForTransaction(this.state.message)
    this.props.setRoomForTransaction(this.props.room.id)
    this.props.navigate('SendTab')
  }
  render() {
    if (!this.props.room) {
      return null
    }
    const showInputRow = (this.props.currentMatrixUser !== null && this.props.room !== null) ? true : false
    const timeline: MatrixTimelineEvent[] = filter(this.props.room.timeline,
      (item: MatrixTimelineEvent) => {
        if (item.content.info && item.content.info.mimetype && item.content.info.mimetype === 'application/json') {
          return true
        } else {
          return true
        }
      })
    return (
      <RX.View style={[Theme.Styles.scrollContainerNoMargins, {paddingBottom: 80}]}>
        <ScrollView autoScrollToBottom>
          <RX.View style={[Theme.Styles.scrollContainer, {paddingTop: Theme.Metrics.baseMargin}]}>
            {showInputRow && timeline.map((event, key) =>
            (event.type === 'm.room.message' && event.content.body !== null) &&
            <RX.View key={event.eventId}  style={Theme.Styles.chat.messageBubble}>
              {(!timeline[key - 1] || (timeline[key - 1].sender !== event.sender)) && <RX.Image
                resizeMode={'cover'}
                style={Theme.Styles.chat.messageSenderAvatar}
                source={getMember(event.sender, this.props.room).avatarUrl} />}
              <RX.View style={[{flex: 1}, !(!timeline[key - 1] || (timeline[key - 1].sender !== event.sender)) && {marginLeft: 50}]}>
                {(!timeline[key - 1] || (timeline[key - 1].sender !== event.sender)) &&
                <RX.Text style={Theme.Styles.chat.messageSender}>{getMember(event.sender, this.props.room).displayname}</RX.Text>}
                {!event.content.request && !event.content.transaction &&
                !((event.content.info && event.content.info.mimetype && event.content.info.mimetype === 'application/json')) &&
                <RX.Text style={Theme.Styles.chat.messageBody}>{event.content.body}</RX.Text>}
                {event.content.transaction && <TransactionBox transactionPreview={event.content.transaction} />}
                {event.content.request && <RequestBox roomId={this.props.room.id} transaction={event.content.request} />}
                {event.content.fileContent && event.content.fileContent.claims
                  && <ClaimListBox encodedClaims={event.content.fileContent.claims} />}
              </RX.View>
            </RX.View>)}
          </RX.View>
        </ScrollView>
        {showInputRow &&
        <RX.View style={[Theme.Styles.containerWrapper, {
            position: 'absolute', bottom: 0, right: 0, left: 0, flex: 0, height: 80,
            alignItems: 'center', backgroundColor: Theme.Colors.background}]}>
          <RX.View style={[Theme.Styles.container, Theme.Styles.chat.inputRow]}>
            <RX.Image
              resizeMode={'cover'}
              style={Theme.Styles.chat.messageSenderAvatarInput}
              source={getMember(this.props.currentMatrixUser.user_id, this.props.room).avatarUrl} />
            <RX.TextInput
              style={Theme.Styles.chat.textInput}
              placeholder={'Send message...'}
              value={this.state.message}
              onKeyPress={this.handleKeyPress}
              onSubmitEditing={this.send}
              returnKeyType='send'
              placeholderTextColor={Theme.Colors.info}
              onChangeText={(message) => this.setState({message})}
              />
            <RX.Button onPress={this.send} style={{height: 44, justifyContent: 'center'}}>
              <RX.Text style={Theme.Styles.chat.messageSendButton}>Send</RX.Text>
            </RX.Button>
            <RX.Button onPress={this.sendTx} style={{margin: 15}}>
              <Icons.TransfersIcon height={25} width={25} fill={Theme.Colors.brand} />
            </RX.Button>
          </RX.View>
        </RX.View>}
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
    setMessageForTransaction: (message: string) => dispatch(Actions.Attachment.setMessage(message)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TokenActionsScreen)
