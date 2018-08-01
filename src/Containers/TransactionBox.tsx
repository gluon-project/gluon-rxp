import RX = require('reactxp')
import { connect } from 'react-redux'
import * as Theme from '../Theme'
import { CombinedState } from '../Reducers'
import { AccountIcon } from '../Components'
import Actions from '../Reducers/Actions'
import * as moment from 'moment'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import Utils from '../Utils'

interface Props extends RX.CommonProps {
  hash?: string
  transaction?: Transaction
  receiver?: User
  sender?: User
  amount?: number
  token?: Token
  isProcessing?: boolean
  startLoadingTransaction?: (hash: string) => void
  setContactFormValue?: (contact: User) => void
  navigate?: (routeName: string) => void
}

class TransactionBox extends RX.Component<Props, null> {
  constructor(props: Props) {
    super(props)
    this.handleContactPress = this.handleContactPress.bind(this)
  }

  componentDidMount() {
    if (!this.props.transaction && !this.props.isProcessing) {
      this.props.startLoadingTransaction(this.props.hash)
    }
  }

  handleContactPress(contact: User) {
    this.props.setContactFormValue(contact)
    this.props.navigate('ContactForm')
  }

  render() {
    //{moment(this.props.transaction.date).fromNow()}
    return (
      <RX.View>
        {this.props.transaction && this.props.sender && <RX.View style={[Theme.Styles.row, {
          justifyContent: 'flex-start',
          backgroundColor: Theme.Colors.backgroundSelected,
          padding: Theme.Metrics.baseMargin,
          borderRadius: Theme.Metrics.borderRadius,
          }]}>
          <RX.View style={{alignItems: 'center', flex: 1}}>
            <AccountIcon type={AccountIcon.type.Medium} account={this.props.sender} />
              <RX.Button onPress={() => this.handleContactPress(this.props.sender)}>
                <RX.Text numberOfLines={2} style={Theme.Styles.feed.title}>{this.props.sender.name}</RX.Text>
              </RX.Button>
          </RX.View>

          <RX.View style={{alignItems: 'center', justifyContent: 'flex-start', flex: 0}}>
            <RX.Text style={Theme.Styles.feed.subTitle}>
                Sent
            </RX.Text>

            <RX.Text style={Theme.Styles.feed.amount}>
                {Utils.number.numberToString(this.props.transaction.amount, this.props.token.decimals)} {this.props.token.code}
            </RX.Text>

            <RX.Link
              url={`https://rinkeby.etherscan.io/tx/${this.props.hash}`}
              style={Theme.Styles.feed.subTitle}>to</RX.Link>

          </RX.View>

          <RX.View style={{alignItems: 'center', flex: 1}}>
            <AccountIcon type={AccountIcon.type.Medium} account={this.props.receiver} />
              <RX.Button onPress={() => this.handleContactPress(this.props.receiver)}>
                <RX.Text numberOfLines={2} style={Theme.Styles.feed.title}>{this.props.receiver.name}</RX.Text>
              </RX.Button>
          </RX.View>

        </RX.View>}

        {this.props.isProcessing && !this.props.transaction && <RX.View style={[Theme.Styles.activityIndicator, {
          backgroundColor: Theme.Colors.backgroundSelected,
          padding: Theme.Metrics.baseMargin,
          borderRadius: Theme.Metrics.borderRadius,
          }]}>
        <RX.Text style={Theme.Styles.feed.title}>Pending transaction</RX.Text>
        <RX.ActivityIndicator
          size='small'
          color={Theme.Colors.light}
          /></RX.View>}

      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState, ownProps: Props): Props => {
  const transaction = Selectors.Transactions.getTransactionByHash(state, ownProps.hash)
  return {
    transaction,
    token: Selectors.Tokens.getTokenByAddress(state, transaction && transaction.token),
    receiver: Selectors.Contacts.getAccountByAddress(state, transaction && transaction.receiver),
    sender: Selectors.Contacts.getAccountByAddress(state, transaction && transaction.sender),
    isProcessing: Selectors.Process.isRunningProcess(state, Enums.ProcessType.LoadTransactionInfo, ownProps.hash),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    startLoadingTransaction: (hash: string) => dispatch(Actions.Transactions.startLoading(hash)),
    setContactFormValue: (contact: User) => dispatch(Actions.Contacts.setForEditing(contact)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TransactionBox)
