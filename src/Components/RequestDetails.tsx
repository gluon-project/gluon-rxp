import RX = require('reactxp')
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import { ListItem, CallToAction } from '../Components'

interface Props extends RX.CommonProps {
  startLogin?: () => void
  navigate?: (routeName: string) => void
  routeName: string,
  sender?: User
  receiver?: User
  amount?: number
  token?: Token
  attachment?: Attachment
  isProcessing?: boolean
  setModalMessage?: (config: ModalMessageConfig) => void
}

export default class RequestDetails extends RX.Component<Props, null> {

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
          // disabled={!this.props.currentUser}
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
            ? `${this.props.amount} ${this.props.token ? this.props.token.code : ''}`
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
        onPress={() => this.props.setModalMessage({
          type: Enums.MessageType.Success,
          title: 'Request',
          message: 'Share this URL with your friends',
          inputText: `https://gluon.space/send/${this.props.sender.address}`,
          ctaTitle: 'Close',
        } as ModalMessageConfig)}
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
