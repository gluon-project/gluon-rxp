import RX = require('reactxp')
import * as Theme from '../Theme'
import { ListItem, CallToAction, AccountIcon } from '../Components'
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
  room?: MatrixRoom
  token?: Token
  attachment?: Attachment
  isProcessing?: boolean
}

export default class SendDetails extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.container}>
        {this.props.sender && <RX.View style={Theme.Styles.accountInfo.wrapper}>
          <AccountIcon
            account={this.props.sender}
            type={AccountIcon.type.Large}
            />
          <RX.Text style={Theme.Styles.accountInfo.title}>
            {this.props.sender.name}
          </RX.Text>
        </RX.View>}

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

        <ListItem
          //disabled={!this.props.currentUser}
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Rooms'}
          title={this.props.room ? this.props.room.name : 'Room'}
          subTitle={'Where do you want to share?'}
          onPress={() => this.props.navigate('Rooms')}
          account={this.props.room && {avatar: this.props.room.avatarUrl}}
          isOff={!this.props.room}
        />

        <ListItem
          //disabled={!this.props.currentUser}
          type={ListItem.type.Default}
          selected={this.props.routeName === 'Attachment'}
          title={this.props.attachment && this.props.attachment.message ? this.props.attachment.message : 'Attach something'}
          subTitle={'Why are you sending?'}
          onPress={() => this.props.navigate('Attachment')}
          isOn={(!!this.props.attachment.message || !!this.props.attachment.data)}
          isOff={!(!!this.props.attachment.message || !!this.props.attachment.data)}
        />

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
