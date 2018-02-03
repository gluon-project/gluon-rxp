import RX = require('reactxp')
import * as Theme from '../Theme'
import { ListItem, CallToAction } from '../Components'
import * as Enums from '../Enums'
import Utils from '../Utils'

interface Props extends RX.CommonProps {
  startLogin?: () => void
  navigate?: (routeName: string) => void
  send?: () => void
  routeName: string,
  sender?: User
  receiver?: User
  amount?: string
  token?: Token
  attachment?: Attachment
  isProcessing?: boolean
}

export default class SendDetails extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.container}>
        <ListItem
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Sender'}
          title={ this.props.sender ? this.props.sender.name : 'Select sender'}
          subTitle={'Which account are you sending from?'}
          isOn={!!this.props.sender}
          isOff={!this.props.sender}
          onPress={() => this.props.navigate('Sender')}
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
          // disabled={!this.props.currentUser || !this.props.transaction.token || !this.props.transaction.amount}
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Receiver'}
          title={this.props.receiver ? `${this.props.receiver.name}` : 'Select receiver'}
          subTitle={'Who will receive your tokens?'}
          isOn={!!this.props.receiver}
          isOff={!this.props.receiver}
          onPress={() => this.props.navigate('Receiver')}
          smallSeedIcon
          account={this.props.receiver}
        />

        {this.props.token && this.props.token.type === Enums.TokenType.Erc223 && <ListItem
          //disabled={!this.props.currentUser}
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Attachment'}
          title={this.props.attachment ? this.props.attachment.message : 'Attach something'}
          subTitle={'Why are you sending?'}
          onPress={() => this.props.navigate('Attachment')}
          isOn={!!this.props.attachment}
          isOff={!this.props.attachment}
        />}

      <RX.View style={styles.cta}><CallToAction
        disabled={!this.props.sender
          || !this.props.token
          || !this.props.amount
          || !this.props.receiver
          || this.props.isProcessing
        }
        type={CallToAction.type.Main}
        title='Send'
        onPress={this.props.send}
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
