import RX = require('reactxp')
import { connect } from 'react-redux'
import {
  CallToAction,
  ScrollView,
  ListItem,
  SegmentedControl,
  MatrixLogin,
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
  matrixLogin?: (username: string, password: string, baseUrl: string) => void
  matrixSendTextMessage?: (message: string) => void
  matrixSendMessage?: (content: any) => void
  navigateBack?: () => void
  isLoggingIn?: boolean
  isSendingMessage?: boolean
  room?: MatrixRoom
  uiTraits?: UITraits
  currentUser?: User
  currentMatrixUser?: MatrixUser
}

interface State {
  message: string
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
    const content = {
      body: 'Simonas sent 50 GLU to Ziggy',
      msgtype: 'm.eth.erc20.tranferTo',
      txHash: '0x1242343',
    }
    this.props.matrixSendMessage(content)
  }
  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        {!this.props.currentMatrixUser && <MatrixLogin login={this.props.matrixLogin} isLoggingIn={this.props.isLoggingIn} />}
        <ScrollView>
          {this.props.room && this.props.room.timeline.map(event => <RX.View key={event.eventId}  style={Theme.Styles.chat.messageBubble}>
            <RX.Text style={Theme.Styles.chat.messageSender}>{event.sender}</RX.Text>
            <RX.Text style={Theme.Styles.chat.messageBody}>{event.content.body}</RX.Text>
            {event.content.msgtype === 'm.eth.erc20.tranferTo' && <RX.View><RX.Text style={Theme.Styles.chat.messageSender}>
              ETH TX: {event.content.txHash}
            </RX.Text></RX.View>}
          </RX.View>)}
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
              inProgress={this.props.isSendingMessage}
              title='TX'
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TokenActionsScreen)
