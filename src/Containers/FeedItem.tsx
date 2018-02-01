import RX = require('reactxp')
import { connect } from 'react-redux'
import * as Theme from '../Theme'
import { CombinedState } from '../Reducers'
import { AttachmentCard, AccountIcon } from '../Components'
import Actions from '../Reducers/Actions'
import * as moment from 'moment'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  setContactFormValue?: (contact: User) => void
  transaction?: Transaction
  receiver?: User
  sender?: User
  amount?: number
  token?: Token
  attachment?: Attachment
  isProcessing?: boolean
  getDataFromIpfs?: (ipfsHash: string) => void
  setModalMessage?: (config: ModalMessageConfig) => void
}

class FeedItem extends RX.Component<Props, null> {
  constructor(props: Props) {
    super(props)
    this.handleContactPress = this.handleContactPress.bind(this)
  }

  componentDidMount() {
    if (!this.props.attachment
      && !this.props.isProcessing
      && this.props.transaction.attachment
      && this.props.transaction.attachment.length === 46
    ) {
      this.props.getDataFromIpfs(this.props.transaction.attachment)
    }
  }

  handleContactPress(contact: User) {
    this.props.setContactFormValue(contact)
    this.props.navigate('ContactForm')
  }

  render() {
    return (
      <RX.View style={Theme.Styles.containerWrapper}>
        <RX.View style={Theme.Styles.container}>
          <RX.View style={Theme.Styles.feed.item}>
            <RX.View style={Theme.Styles.feed.txInfo}>
              <AccountIcon type={AccountIcon.type.Medium} account={this.props.sender} />

              <RX.View style={Theme.Styles.feed.txTitle}>
                <RX.View style={Theme.Styles.row}>
                  <RX.Button onPress={() => this.handleContactPress(this.props.sender)}>
                    <RX.View>
                        <RX.Text style={Theme.Styles.feed.title}>{this.props.sender.name}</RX.Text>
                    </RX.View>
                  </RX.Button>
                  <RX.View style={Theme.Styles.feed.txDetails}>
                    <RX.Text style={Theme.Styles.feed.title}>{this.props.transaction.amount} {this.props.token.code}</RX.Text>
                  </RX.View>
                </RX.View>

                <RX.View style={Theme.Styles.row}>
                  <RX.Button onPress={() => this.handleContactPress(this.props.receiver)}>
                    <RX.View style={Theme.Styles.row}>
                      <RX.Text style={Theme.Styles.feed.subTitle}>
                        {'to '}
                      </RX.Text>
                      <AccountIcon type={AccountIcon.type.Micro} account={this.props.receiver} />
                      <RX.Text style={Theme.Styles.feed.subTitle}>
                        {this.props.receiver.name}
                      </RX.Text>
                    </RX.View>
                  </RX.Button>
                  <RX.View style={Theme.Styles.feed.txDetails}>
                  <RX.Text style={Theme.Styles.feed.subTitle}>{moment(this.props.transaction.date).fromNow()}</RX.Text>
                  </RX.View>
                </RX.View>
              </RX.View>
            </RX.View>
            {this.props.isProcessing && !this.props.attachment && <RX.ActivityIndicator
              type={'small'}
              style={Theme.Styles.attachment.spinner}
              color={Theme.Colors.light}
              />}
            {this.props.attachment
            && <RX.Text style={Theme.Styles.feed.message}>{this.props.attachment.message}</RX.Text>}
            {this.props.attachment && this.props.attachment.data
              && <RX.Button onPress={() => RX.Linking.openUrl(this.props.attachment.data.url)}>
              <AttachmentCard attachment={this.props.attachment} />
            </RX.Button>}
            {/* <RX.Link url={`https://rinkeby.etherscan.io/tx/${this.props.transaction.hash}`}>Etherscan</RX.Link> */}
            <RX.View style={Theme.Styles.feed.actionRow}>
              <RX.Button onPress={null}>
                <RX.Text style={Theme.Styles.feed.actionButton}>Send tokens</RX.Text>
              </RX.Button>
              <RX.Button onPress={() => this.props.setModalMessage({
                type: Enums.MessageType.Success,
                title: 'Share',
                message: 'Share this URL with your friends',
                inputText: `https://gluon.space/token/?t=${this.props.token.address}`,
                ctaTitle: 'Close',
              } as ModalMessageConfig)}>
                <RX.Text style={Theme.Styles.feed.actionButton}>Share post</RX.Text>
              </RX.Button>
            </RX.View>
          </RX.View>
        </RX.View>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState, ownProps: Props): Props => {
  return {
    attachment: Selectors.Attachment.getFromCache(state, ownProps.transaction.attachment),
    token: Selectors.Tokens.getTokenByAddress(state, ownProps.transaction.token),
    receiver: Selectors.Contacts.getAccountByAddress(state, ownProps.transaction.receiver),
    sender: Selectors.Contacts.getAccountByAddress(state, ownProps.transaction.sender),
    isProcessing: Selectors.Process.isRunningProcess(state, Enums.ProcessType.GetDataFromIpfs, ownProps.transaction.attachment),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    getDataFromIpfs: (ipfsHash: string) => dispatch(Actions.Attachment.getFromIpfs(ipfsHash)),
    setContactFormValue: (contact: User) => dispatch(Actions.Contacts.setForEditing(contact)),
    setModalMessage: (config: ModalMessageConfig) => dispatch(Actions.ModalMessage.setModalMessage(config)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedItem)
