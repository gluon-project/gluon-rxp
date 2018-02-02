import RX = require('reactxp')
import * as Theme from '../Theme'
import Blockies from './Blockies'

interface Props extends RX.CommonProps {
  account?: User
  type: AccountIconType
}

export enum AccountIconType {
  Micro,
  Small,
  Medium,
  Large,
}

class AccountIcon extends RX.Component<Props, null> {
  static type = AccountIconType

  render() {
    let style
    let size
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
    }
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
            />
          <Blockies
            style={style}
            width={size}
            seed={this.props.account.address}
            />
        </RX.View>
      )
    } else {
      return (
        <RX.View style={Theme.Styles.row}>
          <RX.Image
            style={style}
            source={this.props.account.avatar}
            />
          <Blockies
            style={Theme.Styles.accountIconSmallAbsolute}
            width={20}
            seed={this.props.account.address}
            />
        </RX.View>
      )
    }
  }
}

export default AccountIcon
