import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, SendDetails, ScrollView } from '../Components'
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
  uiTraits?: UITraits
  startLogin?: () => void
  receiver?: User
  sender?: User
  amount?: number
  token?: Token
  attachment?: Attachment
}

class CompactSendMasterScreen extends RX.Component<Props, null> {
  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>

          <SendDetails
              navigate={this.props.navigate}
              startLogin={this.props.startLogin}
              send={this.props.send}
              isProcessing={this.props.isProcessing}
              routeName={''}
              sender={this.props.sender}
              receiver={this.props.receiver}
              amount={this.props.amount}
              token={this.props.token}
              attachment={this.props.attachment}
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
    transaction: state.transactions.new,
    amount: state.transactions.new.amount,
    attachment: Selectors.Attachment.getFromCache(state, state.transactions.new.attachment),
    token: Selectors.Tokens.getTokenByAddress(state, state.transactions.new.token),
    receiver: Selectors.Contacts.getAccountByAddress(state, state.transactions.new.receiver),
    sender: Selectors.Contacts.getAccountByAddress(state, state.transactions.new.sender),
    isProcessing: Selectors.Process.isRunningProcess(state, Enums.ProcessType.SendTransaction),
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateHome: () => dispatch(Actions.Navigation.navigateHome()),
    send: () => dispatch(Actions.Transactions.startSaving()),
    startLogin: () => dispatch(Actions.User.startLogin()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompactSendMasterScreen)
