import RX = require('reactxp')
import { connect } from 'react-redux'
import * as Theme from '../Theme'
import { CombinedState } from '../Reducers'
import { AccountIcon, CallToAction } from '../Components'
import Actions from '../Reducers/Actions'
import * as moment from 'moment'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import Utils from '../Utils'
import { isObject, isString } from 'lodash'

interface Props extends RX.CommonProps {
  transaction?: Transaction
  roomId?: string
  sender?: User
  amount?: number
  token?: Token
  setContactFormValue?: (contact: User) => void
  navigate?: (routeName: string) => void
  selectContact?: (did: string) => void
  setReceiver?: (receiver: string) => void
  setAmount?: (amount: string) => void
  setToken?: (token: string) => void
  setRoom?: (roomId: string) => void
  setIsSend?: (isSend: boolean) => void
}

class RequestBox extends RX.Component<Props, null> {
  constructor(props: Props) {
    super(props)
    this.handleContactPress = this.handleContactPress.bind(this)
    this.handleSendPress = this.handleSendPress.bind(this)
  }

  handleContactPress(contact: User) {
    this.props.selectContact(contact.did)
    this.props.navigate('ContactForm')
  }

  handleSendPress() {
    this.props.setIsSend(true)
    this.props.setReceiver(this.props.transaction.sender)
    if (this.props.transaction.token) {
      this.props.setToken(this.props.transaction.token)
    }
    if (this.props.transaction.amount) {
      this.props.setAmount(this.props.transaction.amount)
    }
    if (this.props.roomId) {
      this.props.setRoom(this.props.roomId)
    }
    this.props.navigate('SendTab')
  }

  render() {
    //{moment(this.props.transaction.date).fromNow()}
    const transaction = this.props.transaction
    if (!isObject(this.props.sender)) {
      return null
    }
    return (
      <RX.View style={[{
        backgroundColor: Theme.Colors.lightBackground,
        borderRadius: Theme.Metrics.borderRadius,
        paddingTop: Theme.Metrics.baseMargin,
      }]}>

        <RX.View style={Theme.Styles.box.requestWrapper}>

          <RX.Text style={Theme.Styles.box.titleLabel}>
              Request
          </RX.Text>

          <RX.View>
            <RX.Button style={{alignItems: 'center'}} onPress={() => this.handleContactPress(this.props.sender)}>
              <AccountIcon type={AccountIcon.type.Large} account={this.props.sender} />
              <RX.Text numberOfLines={2} style={Theme.Styles.box.accountLabel}>{this.props.sender.name}</RX.Text>
            </RX.Button>
          </RX.View>

        </RX.View>

          <RX.View style={Theme.Styles.box.amountWrapper}>

            {isString(transaction.amount) && isObject(this.props.token) && <RX.Text style={Theme.Styles.box.amountLabel}>
                {Utils.number.numberToString(transaction.amount, this.props.token.decimals)} {this.props.token.code}
            </RX.Text>}
            {!isString(transaction.amount) && isObject(this.props.token) && <RX.Text style={Theme.Styles.box.amountLabel}>
                {this.props.token.code}
            </RX.Text>}

          </RX.View>

        <RX.Button style={Theme.Styles.box.button} onPress={this.handleSendPress}>
          <RX.Text style={Theme.Styles.box.buttonLabel}>Send</RX.Text>
        </RX.Button>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState, ownProps: Props): Props => {
  return {
    token: Selectors.Tokens.getTokenByAddress(state, ownProps.transaction && ownProps.transaction.token),
    sender: Selectors.Contacts.getAccountByAddress(state, ownProps.transaction && ownProps.transaction.sender),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    selectContact: (did: string) => dispatch(Actions.Contacts.selectContact(did)),
    setIsSend: (isSend: boolean) => dispatch(Actions.Transactions.setIsSend(isSend)),
    setReceiver: (receiver: string) => dispatch(Actions.Transactions.setReceiver(receiver)),
    setToken: (token: string) => dispatch(Actions.Transactions.setToken(token)),
    setAmount: (amount: string) => dispatch(Actions.Transactions.setAmount(amount)),
    setRoom: (roomId: string) => dispatch(Actions.Transactions.setRoom(roomId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestBox)
