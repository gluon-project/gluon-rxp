import RX = require('reactxp')
import * as Theme from '../Theme'
import * as _ from 'lodash'
import AccountIcon from './AccountIcon'

interface Props extends RX.CommonProps {
  type?: ButtonType
  styling?: ButtonStyling
  title: string
  onPress?: (e: RX.Types.SyntheticEvent) => void
  inProgress?: boolean
  disabled?: boolean
  account?: User
}

export enum ButtonType {
  Default,
  Secondary,
  Branded,
  Main,
}

export enum ButtonStyling {
  Default,
  Flat,
  AlignedBottom,
}

export default class CallToAction extends RX.Component<Props, null> {
  static type = ButtonType
  static styling = ButtonStyling

  render() {
    let buttonStyle, buttonLabelStyle, buttonView
    switch (this.props.type) {
      case ButtonType.Secondary:
        buttonStyle = [Theme.Styles.button, Theme.Styles.buttonSecondary]
        buttonLabelStyle = [Theme.Styles.buttonLabel, Theme.Styles.buttonLabelSecondary]
        break
      case ButtonType.Branded:
        buttonStyle = [Theme.Styles.button, Theme.Styles.buttonBranded]
        buttonLabelStyle = [Theme.Styles.buttonLabel, Theme.Styles.buttonLabelBranded]
        break
      case ButtonType.Main:
        buttonStyle = [Theme.Styles.button, Theme.Styles.buttonMain]
        buttonLabelStyle = [Theme.Styles.buttonLabel, Theme.Styles.buttonLabelMain]
        break

      default:
        buttonStyle = Theme.Styles.button
        buttonLabelStyle = Theme.Styles.buttonLabel
        break
    }
    return (
      <RX.Button style={[buttonStyle, this.props.disabled && {backgroundColor: Theme.Colors.borderColor}]}
        onPress={this.props.onPress} disabled={this.props.disabled}>
        {this.props.account && <AccountIcon account={this.props.account} type={AccountIcon.type.Custom} size={20}/>}
        {!this.props.inProgress && <RX.Text style={[
          buttonLabelStyle,
          this.props.account && {marginLeft: Theme.Metrics.smallMargin},
        ]}>{this.props.title}</RX.Text>}
        {this.props.inProgress && <RX.ActivityIndicator
          color={this.props.type === ButtonType.Branded ? Theme.Colors.buttonLabelDark : Theme.Colors.buttonLabel}
          size='small'
        />}
      </RX.Button>
    )
  }
}
