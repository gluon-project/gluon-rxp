import RX = require('reactxp')
import * as Theme from '../Theme'
import Icons from '../Components/Icons'

interface Props extends RX.CommonProps {
  type?: ButtonType
  iconType?: IconType
  title: string
  onPress?: (e: RX.Types.SyntheticEvent) => void
  selected?: boolean
}

export enum ButtonType {
  Horizontal,
  Vertical,
  VerticalWide,
}

export enum IconType {
  Feed,
  Send,
  Request,
  About,
  Settings,
  Wallet,
  Transfers,
  Contacts,
}

export default class TabBarButton extends RX.Component<Props, null> {
  static type = ButtonType
  static icon = IconType

  render() {
    let buttonStyle, buttonLabelStyle, iconStyle
    switch (this.props.type) {
      case ButtonType.Horizontal:
        buttonStyle = [styles.tabBarButtonHorizontal, this.props.selected && styles.selectedButton]
        buttonLabelStyle = [styles.tabBarButtonLabelHorizontal, this.props.selected && styles.selectedButtonLabel]
        iconStyle = [styles.tabBarButtonIconHorizontal, this.props.selected && styles.selectedButtonLabel]
        break
      case ButtonType.Vertical:
        buttonStyle = [styles.tabBarButtonVertical, this.props.selected && styles.selectedButton]
        buttonLabelStyle = [styles.tabBarButtonLabelVertical, this.props.selected && styles.selectedButtonLabel]
        iconStyle = [styles.tabBarButtonIconVertical, this.props.selected && styles.selectedButtonLabel]
        break
      case ButtonType.VerticalWide:
        buttonStyle = [styles.tabBarButtonVerticalWide, this.props.selected && styles.selectedButton]
        buttonLabelStyle = [styles.tabBarButtonLabelVerticalWide, this.props.selected && styles.selectedButtonLabel]
        iconStyle = [styles.tabBarButtonIconVerticalWide, this.props.selected && styles.selectedButtonLabel]
        break
    }

    let Icon
    switch (this.props.iconType) {
      case IconType.About:
        Icon = Icons.AboutIcon
        break
      case IconType.Feed:
        Icon = Icons.FeedIcon
        break
      case IconType.Request:
        Icon = Icons.RequestIcon
        break
      case IconType.Send:
        Icon = Icons.SendIcon
        break
      case IconType.Settings:
        Icon = Icons.SettingsIcon
        break
      case IconType.Wallet:
        Icon = Icons.WalletIcon
        break
      case IconType.Transfers:
        Icon = Icons.TransfersIcon
        break
      case IconType.Contacts:
        Icon = Icons.ContactsIcon
        break
    }

    return (
      <RX.Button style={buttonStyle} onPress={this.props.onPress}>
        <Icon
          height={28} width={28} fill={this.props.selected ? Theme.Colors.brand : Theme.Colors.tabBarIcon}
          />
        <RX.Text style={buttonLabelStyle}>{this.props.title}</RX.Text>
      </RX.Button>
    )
  }
}

const styles = {
  selectedButton: RX.Styles.createViewStyle({
    backgroundColor: Theme.Colors.tabBarButtonSelected,
  }),

  selectedButtonLabel: RX.Styles.createTextStyle({
    color: Theme.Colors.brand,
  }),

  tabBarButtonVertical: RX.Styles.createViewStyle({
    justifyContent: 'center',
    alignItems: 'center',
    width: Theme.Metrics.tabBar.width,
    flex: 1,
    minHeight: Theme.Metrics.tabBar.height + Theme.Metrics.mediumMargin,
    maxHeight: Theme.Metrics.tabBar.width,
  }),

  tabBarButtonLabelVertical: RX.Styles.createTextStyle({
    color: Theme.Colors.tabBarIcon,
    textAlign: 'center',
    fontSize: Theme.Fonts.size.small,
    marginTop: 2,
  }),

  tabBarButtonIconVertical: RX.Styles.createTextStyle({
    color: Theme.Colors.tabBarIcon,
    fontSize: 25,
    flexDirection: 'column',
    textAlign: 'center',
    margin: Theme.Metrics.smallMargin,
  }),

  tabBarButtonVerticalWide: RX.Styles.createViewStyle({
    width: Theme.Metrics.tabBar.widthWide,
    flex: 1,
    minHeight: Theme.Metrics.tabBar.height + Theme.Metrics.mediumMargin,
    maxHeight: Theme.Metrics.tabBar.heightWide,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: Theme.Metrics.menuPadding,
  }),

  tabBarButtonLabelVerticalWide: RX.Styles.createTextStyle({
    color: Theme.Colors.tabBarIcon,
    textAlign: 'left',
    fontSize: Theme.Fonts.size.h6,
  }),

  tabBarButtonIconVerticalWide: RX.Styles.createTextStyle({
    color: Theme.Colors.tabBarIcon,
    fontSize: 50,
    flexDirection: 'column',
    textAlign: 'center',
    marginRight: Theme.Metrics.menuIconRightMargin,
  }),

  tabBarButtonHorizontal: RX.Styles.createViewStyle({
    justifyContent: 'center',
    alignItems: 'center',
    height: Theme.Metrics.tabBar.height,
    flex: 1,
  }),

  tabBarButtonLabelHorizontal: RX.Styles.createTextStyle({
    color: Theme.Colors.tabBarIcon,
    textAlign: 'center',
    fontSize: Theme.Fonts.size.micro,
    marginTop: 2,
  }),

  tabBarButtonIconHorizontal: RX.Styles.createTextStyle({
    color: Theme.Colors.tabBarIcon,
    fontSize: 20,
    flexDirection: 'column',
    textAlign: 'center',
    margin: Theme.Metrics.smallMargin,
  }),
}
