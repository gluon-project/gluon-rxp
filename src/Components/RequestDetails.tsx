import RX = require('reactxp')
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import { ListItem, CallToAction } from '../Components'
import Utils from '../Utils'

interface Props extends RX.CommonProps {
  startLogin?: () => void
  navigate?: (routeName: string) => void
  routeName: string,
  sender?: User
  receiver?: User
  amount?: string
  token?: Token
  attachment?: Attachment
  isProcessing?: boolean
  setModalMessage?: (config: ModalMessageConfig) => void
}

export default class RequestDetails extends RX.Component<Props, null> {
  constructor(props: Props) {
    super(props)
  }

  handleRequest() {
    console.log(this.props)
    let url = 'https://gluon.space/send/?'
    if (this.props.sender) {
      url = `${url}r=${this.props.sender.address}&n=${encodeURIComponent(this.props.sender.name)}`
    }
    if (this.props.token) {
      url = `${url}&t=${this.props.token.address}`
    }
    if (this.props.token && this.props.token.networkId) {
      url = `${url}&nid=${this.props.token.networkId}`
    }
    if (this.props.amount) {
      url = `${url}&a=${this.props.amount}`
    }
    if (this.props.attachment) {
      url = `${url}&at=${this.props.attachment.ipfs}`
    }

    this.props.setModalMessage({
      type: Enums.MessageType.Success,
      title: 'Request',
      message: 'Share this URL with your friends',
      inputText: url,
      ctaTitle: 'Close',
    } as ModalMessageConfig)
  }

  render() {
    return (
      <RX.View style={Theme.Styles.container}>
        <ListItem
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Receiver'}
          title={ this.props.sender ? this.props.sender.name : 'Select receiver'}
          subTitle={'Which account are you requesting to?'}
          isOn={!!this.props.sender}
          isOff={!this.props.sender}
          onPress={() => this.props.navigate('RequestReceiver')}
          smallSeedIcon
          account={this.props.sender}
          />
        <ListItem
          disabled={!this.props.sender}
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Tokens'}
          title={this.props.token
            ? `${this.props.token.name}`
            : 'Select token'}
            subTitle={'What will you send?'}
          isOn={!!this.props.token}
          isOff={!this.props.token}
          onPress={() => this.props.navigate('Tokens')}
          smallSeedIcon
          account={this.props.token}
        />
        <ListItem
          // disabled={!this.props.currentUser || !this.props.transaction.token}
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Amount'}
          title={this.props.amount
            ? `${Utils.number.numberToString(this.props.amount, this.props.token ? this.props.token.decimals : 0)} ${this.props.token ?
              this.props.token.code : ''}`
            : 'Set amount'}
            subTitle={'How much will you send?'}
          isOn={!!this.props.amount}
          isOff={!this.props.amount}
          onPress={() => this.props.navigate('Amount')}
          />

        <ListItem
          //disabled={!this.props.currentUser}
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Attachment'}
          title={this.props.attachment ? this.props.attachment.message : 'Attach something'}
          subTitle={'Why are you sending?'}
          onPress={() => this.props.navigate('Attachment')}
          isOn={!!this.props.attachment}
          isOff={!this.props.attachment}
        />

      <RX.View style={styles.cta}><CallToAction
        disabled={!this.props.sender}
        type={CallToAction.type.Main}
        title='Request'
        onPress={this.handleRequest.bind(this)}
        inProgress={this.props.isProcessing}
      /></RX.View>

    </RX.View>
    )
  }
}

const styles = {
  cta: RX.Styles.createViewStyle({
    marginTop: Theme.Metrics.baseMargin,
  }),
}
