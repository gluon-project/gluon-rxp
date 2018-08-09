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
  transactionPreview?: Transaction
  transaction?: Transaction
  receiver?: User
  sender?: User
  amount?: number
  token?: Token
  isProcessing?: boolean
  startLoadingTransaction?: (hash: string) => void
  setContactFormValue?: (contact: User) => void
  navigate?: (routeName: string) => void
  selectContact?: (did: string) => void
}

class TransactionBox extends RX.Component<Props, null> {
  constructor(props: Props) {
    super(props)
    this.handleContactPress = this.handleContactPress.bind(this)
  }

  componentDidMount() {
    if (!this.props.transaction && !this.props.isProcessing) {
      this.props.startLoadingTransaction(this.props.transactionPreview.hash)
    }
  }

  handleContactPress(contact: User) {
    this.props.selectContact(contact.did)
    this.props.navigate('ContactForm')
  }

  render() {
    //{moment(this.props.transaction.date).fromNow()}
    const transaction = this.props.transaction ? this.props.transaction
      : ( this.props.transactionPreview ? this.props.transactionPreview : null)
    return (
      <RX.View style={[{
        backgroundColor: Theme.Colors.lightBackground,
        borderRadius: Theme.Metrics.borderRadius,
        }]}>
        {transaction && this.props.sender && <RX.View style={[Theme.Styles.row, {
          justifyContent: 'flex-start',
          padding: Theme.Metrics.baseMargin,
        }]}>
          <RX.View style={{flex: 1}}>
            <RX.Button style={{alignItems: 'center', flex: 1}} onPress={() => this.handleContactPress(this.props.sender)}>
              <AccountIcon type={AccountIcon.type.Medium} account={this.props.sender} />
              <RX.Text numberOfLines={2} style={[Theme.Styles.feed.title, {textAlign: 'center'}]}>{this.props.sender.name}</RX.Text>
            </RX.Button>
          </RX.View>

          <RX.View style={{alignItems: 'center', justifyContent: 'flex-start', flex: 1}}>
            <RX.Text style={Theme.Styles.feed.subTitle}>
                Sent
            </RX.Text>

            {this.props.token && transaction.amount && <RX.Text style={Theme.Styles.feed.amount}>
                {Utils.number.numberToString(transaction.amount, this.props.token.decimals)} {this.props.token.code}
            </RX.Text>}

            <RX.Text
              style={Theme.Styles.feed.subTitle}>to</RX.Text>

          </RX.View>

          <RX.View style={{alignItems: 'center', flex: 1}}>
            <RX.Button style={{alignItems: 'center'}} onPress={() => this.handleContactPress(this.props.receiver)}>
              <AccountIcon type={AccountIcon.type.Medium} account={this.props.receiver} />
              <RX.Text numberOfLines={2} style={[Theme.Styles.feed.title, {textAlign: 'center'}]}>{this.props.receiver.name}</RX.Text>
            </RX.Button>
          </RX.View>

        </RX.View>}
        <RX.View style={{backgroundColor: Theme.Colors.backgroundSelected}}>
          {this.props.isProcessing && <RX.View style={[{
            padding: Theme.Metrics.smallMargin,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            }]}>
            <RX.Link
              url={`https://rinkeby.etherscan.io/tx/${transaction.hash}`}
              style={Theme.Styles.feed.subTitle}>
              <RX.ActivityIndicator
              size='tiny'
              color={Theme.Colors.light}
              /></RX.Link>
          </RX.View>}

          {!this.props.isProcessing && <RX.View style={[{
            padding: Theme.Metrics.smallMargin,
            alignItems: 'center',
            }]}>
            <RX.Link
              url={`https://rinkeby.etherscan.io/tx/${transaction.hash}`}
              style={Theme.Styles.feed.title}>Confirmed</RX.Link>
          </RX.View>}

        </RX.View>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState, ownProps: Props): Props => {
  const transaction = Selectors.Transactions.getTransactionByHash(state, ownProps.transactionPreview.hash)
  const lookupData = transaction ? transaction : (ownProps.transactionPreview ? ownProps.transactionPreview : null)
  return {
    transaction,
    token: Selectors.Tokens.getTokenByAddress(state, lookupData && lookupData.token),
    receiver: Selectors.Contacts.getAccountByAddress(state, lookupData && lookupData.receiver),
    sender: Selectors.Contacts.getAccountByAddress(state, lookupData && lookupData.sender),
    isProcessing: Selectors.Process.isRunningProcess(state, Enums.ProcessType.LoadTransactionInfo, ownProps.transactionPreview.hash),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    startLoadingTransaction: (hash: string) => dispatch(Actions.Transactions.startLoading(hash)),
    selectContact: (did: string) => dispatch(Actions.Contacts.selectContact(did)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TransactionBox)
