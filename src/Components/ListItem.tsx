import RX = require('reactxp')
import * as Theme from '../Theme'
import { Icons, AccountIcon, VisualBox } from '../Components'
import * as _ from 'lodash'
import * as Enums from '../Enums'

interface Props extends RX.CommonProps {
  account?: User
  type?: ListItemType
  title: string
  details?: string
  subTitle?: string
  icon?: string
  onPress?: (e: RX.Types.SyntheticEvent) => void
  disabled?: boolean
  selected?: boolean
  isOn?: boolean
  isOff?: boolean
  smallSeedIcon?: boolean
  iconType?: Enums.VisualType
  isRadioButton?: boolean
}

export enum ListItemType {
  Default,
  Secondary,
}

export default class ListItem extends RX.Component<Props, null> {
  static type = ListItemType

  render() {
    return (
      <RX.Button style={[Theme.Styles.listItem, this.props.selected && !this.props.isRadioButton && Theme.Styles.listItemSelected]}
        onPress={this.props.onPress}
        disabled={this.props.disabled}>
        <RX.View style={Theme.Styles.listItemIconWrapper}>
        {(this.props.iconType || this.props.isOn || this.props.isOff || (this.props.account && !this.props.smallSeedIcon))
          && <RX.View style={[Theme.Styles.listItemIcon]}>
            {this.props.account && !this.props.smallSeedIcon && <AccountIcon
              account={this.props.account}
              type={AccountIcon.type.Medium}
              />}
            {this.props.isOn && <Icons.OnIcon />}
            {this.props.isOff && <Icons.OffIcon />}
            {this.props.iconType && this.props.iconType === Enums.VisualType.About1 && <Icons.About1Icon />}
            {this.props.iconType && this.props.iconType === Enums.VisualType.About2 && <Icons.About2Icon />}
            {this.props.iconType && this.props.iconType === Enums.VisualType.About3 && <Icons.About3Icon />}
            {this.props.iconType && this.props.iconType === Enums.VisualType.About4 && <Icons.About4Icon />}

          </RX.View>}
          <RX.View>
            <RX.View style={Theme.Styles.row}>
              {this.props.account && this.props.smallSeedIcon && <AccountIcon
                account={this.props.account}
                type={AccountIcon.type.Small}
              />}
              <RX.Text style={Theme.Styles.listItemTitle}>{this.props.title}</RX.Text>
            </RX.View>
            <RX.Text style={Theme.Styles.listItemSubTitle}>{this.props.subTitle}</RX.Text>
          </RX.View>
        </RX.View>

        {this.props.details && <RX.View style={Theme.Styles.listItemBalance}>
          <RX.Text style={Theme.Styles.listItemAmount}>{this.props.details}</RX.Text>
        </RX.View>}
        <RX.View>
          {this.props.type === ListItemType.Default && <Icons.ChevronRightIcon />}
          {this.props.isRadioButton && <Icons.CheckBox selected={this.props.selected} />}
        </RX.View>
      </RX.Button>
    )
  }
}
