import RX = require('reactxp')
import * as Theme from '../Theme'
import Blockies from './Blockies'

interface Props extends RX.CommonProps {
  account?: User
  type: AccountIconType
  size?: number
}

export enum AccountIconType {
  Micro,
  Small,
  Medium,
  Large,
  Custom,
}

class AccountIcon extends RX.Component<Props, null> {
  static type = AccountIconType

  render() {
    let style
    let size
    const blockieRatio = 0.3
    switch (this.props.type) {
      case AccountIconType.Micro:
        style = Theme.Styles.accountIconMicro
        size = 14
        break
      case AccountIconType.Small:
        style = Theme.Styles.accountIconSmall
        size = 20
        break
      case AccountIconType.Medium:
        style = Theme.Styles.accountIconMedium
        size = 48
        break
      case AccountIconType.Large:
        style = Theme.Styles.accountIconLarge
        size = 100
        break
      case AccountIconType.Custom:
        style = [{
          width: this.props.size,
          height: this.props.size,
          borderRadius: this.props.size / 2,
          overflow: 'hidden',
        }]
        size = this.props.size
        break
    }
    const blockieStyle = [{
      width: size * blockieRatio,
      height: size * blockieRatio,
      borderRadius: size * blockieRatio / 2,
      overflow: 'hidden',
      position: 'absolute',
      left: 0,
      top: 0,
    }]
    if (!this.props.account.avatar) {
      return (
        <Blockies
          style={style}
          width={size}
          seed={this.props.account.address}
          />
      )
    } else if (this.props.type === AccountIconType.Small || this.props.type === AccountIconType.Micro) {
      return (
        <RX.View style={Theme.Styles.row}>
          <RX.Image
            style={style}
            source={this.props.account.avatar}
            resizeMode={'cover'}
            />
          {this.props.account.address && <Blockies
            style={style}
            width={size}
            seed={this.props.account.address}
            />}
        </RX.View>
      )
    } else {
      return (
        <RX.View style={Theme.Styles.row}>
          <RX.Image
            style={style}
            source={this.props.account.avatar}
            resizeMode={'cover'}
            />
          {this.props.account.address && <Blockies
            style={blockieStyle}
            width={size * blockieRatio}
            seed={this.props.account.address}
            />}
        </RX.View>
      )
    }
  }
}

export default AccountIcon
