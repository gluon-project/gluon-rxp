import RX = require('reactxp')
import * as Theme from '../Theme'
import { ListItem, CallToAction, AccountIcon, SegmentedControl } from '../Components'
import * as Enums from '../Enums'
import Utils from '../Utils'

interface Props extends RX.CommonProps {
  startLogin?: () => void
  navigate?: (routeName: string) => void
  send?: () => void
  request?: () => void
  routeName: string,
  sender?: User
  receiver?: User
  amount?: string
  room?: MatrixRoom
  token?: Token
  attachment?: Attachment
  isProcessing?: boolean
  isSend?: boolean
  setIsSend?: (isSend: boolean) => void
  setModalMessage?: (config: ModalMessageConfig) => void
  currentUser?: User,
}

export default class SendDetails extends RX.Component<Props, null> {

  handleRequest() {

    if (this.props.room) {
      this.props.request()
    } else {
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

      this.props.setModalMessage({
        type: Enums.MessageType.Success,
        title: 'Request',
        message: 'Share this URL with your friends',
        inputText: url,
        ctaTitle: 'Close',
      } as ModalMessageConfig)
    }

  }

  render() {
    return (
      <RX.View style={Theme.Styles.container}>
        {this.props.sender && <RX.View style={[Theme.Styles.accountInfo.wrapper, {borderWidth: 0}]}>
          <AccountIcon
            account={this.props.currentUser}
            type={AccountIcon.type.Large}
            />
          <RX.Text style={Theme.Styles.accountInfo.title}>
            {this.props.currentUser.name}
          </RX.Text>
          {this.props.currentUser.address !== this.props.currentUser.name && <RX.Text style={Theme.Styles.accountInfo.subTitle}>
            {Utils.address.short(this.props.currentUser.address)} {Utils.address.mnidToNetworkName(this.props.currentUser.mnid)}
          </RX.Text>}
        </RX.View>}
        {this.props.sender && <RX.View>
        <SegmentedControl
          titles={['Send', 'Request']}
          selectedIndex={this.props.isSend ? 0 : 1}
          handleSelection={(index) => this.props.setIsSend(index === 0 ? true : false)}
          />
        <ListItem
          disabled={!this.props.sender}
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Tokens'}
          title={this.props.token
            ? `${this.props.token.name}`
            : 'Select token'}
            subTitle={this.props.isSend ? 'What will you send?' : 'What will you request?'}
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
            subTitle={this.props.isSend ? 'How much will you send?' : 'How much you want to request?'}
          isOn={!!this.props.amount}
          isOff={!this.props.amount}
          onPress={() => this.props.navigate('Amount')}
          />
        {this.props.isSend && <ListItem
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
        />}

        <ListItem
          //disabled={!this.props.currentUser}
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Rooms'}
          title={this.props.room ? this.props.room.name : 'Room'}
          subTitle={this.props.isSend ? 'Where do you want to share this transaction?' : 'Where do you want to request?'}
          onPress={() => this.props.navigate('Rooms')}
          account={this.props.room && {avatar: this.props.room.avatarUrl}}
          isOff={!this.props.room}
          isOn={!!this.props.room}
          smallSeedIcon

        />

        {/* <ListItem
          //disabled={!this.props.currentUser}
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Attachment'}
          title={this.props.attachment && this.props.attachment.message ? this.props.attachment.message : 'Attach something'}
          subTitle={'Why are you sending?'}
          onPress={() => this.props.navigate('Attachment')}
          isOn={(!!this.props.attachment.message || !!this.props.attachment.data)}
          isOff={!(!!this.props.attachment.message || !!this.props.attachment.data)}
        /> */}

      <RX.View style={styles.cta}><CallToAction
        disabled={this.props.isSend && (!this.props.sender
          || !this.props.token
          || !this.props.amount
          || !this.props.receiver
          || this.props.isProcessing)
        }
        type={CallToAction.type.Main}
        title={this.props.isSend ? 'Send' : 'Request'}
        onPress={this.props.isSend ? this.props.send : this.handleRequest.bind(this)}
        inProgress={this.props.isProcessing}
      /></RX.View>

    </RX.View>}
    </RX.View>
    )
  }
}

const styles = {
  cta: RX.Styles.createViewStyle({
    marginTop: Theme.Metrics.baseMargin,
  }),
}
