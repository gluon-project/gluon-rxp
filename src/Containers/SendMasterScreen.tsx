import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, SendDetails, NavBar } from '../Components'
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
  transaction?: Transaction,
  isProcessing?: boolean
  send?: () => void
  request?: () => void
  uiTraits?: UITraits
  startLogin?: () => void
  createNewToken?: (token: Token) => void
  receiver?: User
  sender?: User
  amount?: string
  token?: Token
  attachment?: Attachment
  room?: MatrixRoom
  isSend?: boolean
  setIsSend?: (isSend: boolean) => void
  setModalMessage?: (config: ModalMessageConfig) => void
}

class SendMasterScreen extends RX.Component<Props, null> {
  render() {
    const tabIndex = this.props.navigation.state.index
    const index = this.props.navigation.state.routes[tabIndex].index
    const routeName = this.props.navigation.state.routes[tabIndex].routes[index].routeName
    return (
      <RX.View style={Theme.Styles.containerFull}>
        <NavBar title='Transfers' />
        <RX.ScrollView style={[Theme.Styles.scrollContainerNoMargins, Theme.Styles.masterViewContainer]}>
          <SendDetails
            navigate={this.props.navigate}
            startLogin={this.props.startLogin}
            send={this.props.send}
            request={this.props.request}
            isProcessing={this.props.isProcessing}
            routeName={routeName}
            sender={this.props.sender}
            receiver={this.props.receiver}
            amount={this.props.amount}
            token={this.props.token}
            attachment={this.props.attachment}
            room={this.props.room}
            setModalMessage={this.props.setModalMessage}
            isSend={this.props.isSend}
            setIsSend={this.props.setIsSend}
            currentUser={this.props.currentUser}
          />
        </RX.ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    currentUser: Selectors.Contacts.getAccountByAddress(state, state.transactions.new.sender),
    transaction: state.transactions.new,
    amount: state.transactions.new.amount,
    attachment: Selectors.Attachment.getNew(state),
    isSend: Selectors.Transactions.getIsSend(state),
    token: Selectors.Tokens.getTokenByAddress(state, state.transactions.new.token),
    receiver: Selectors.Contacts.getAccountByAddress(state, state.transactions.new.receiver),
    sender: Selectors.Contacts.getAccountByAddress(state, state.transactions.new.sender),
    isProcessing: Selectors.Process.isRunningProcess(state, Enums.ProcessType.SendTransaction),
    room: Selectors.Matrix.getRoomById(state, state.transactions.new.room),
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateHome: () => dispatch(Actions.Navigation.navigateHome()),
    send: () => dispatch(Actions.Transactions.startSaving()),
    request: () => dispatch(Actions.Transactions.requestInMatrix()),
    startLogin: () => dispatch(Actions.User.startLogin()),
    createNewToken: (token: Token) => dispatch(Actions.Tokens.createNewToken(token)),
    setIsSend: (isSend: boolean) => dispatch(Actions.Transactions.setIsSend(isSend)),
    setModalMessage: (config: ModalMessageConfig) => dispatch(Actions.ModalMessage.setModalMessage(config)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SendMasterScreen)
