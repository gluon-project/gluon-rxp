import RX = require('reactxp')
import { CallToAction, TextInput } from '../Components'
import { MessageType } from '../Enums'
import * as Theme from '../Theme'

interface Props extends RX.CommonProps {
  config: ModalMessageConfig
  onClose?: (e: RX.Types.SyntheticEvent) => void
  onAction?: (e: RX.Types.SyntheticEvent) => void
}

export default class ModalMessage extends RX.Component<Props, null> {
  static type: MessageType

  render() {
    let titleStyle
    switch (this.props.config.type) {
      case MessageType.Success:
        titleStyle = [Theme.Styles.modalMessageContainer, Theme.Styles.modalMessageTitleSuccess]
        break
      case MessageType.Warning:
        titleStyle = [Theme.Styles.modalMessageContainer, Theme.Styles.modalMessageTitleWarning]
        break
      case MessageType.Error:
        titleStyle = [Theme.Styles.modalMessageContainer, Theme.Styles.modalMessageTitleError]
        break
      case MessageType.Loader:
        return (
          <RX.View style={Theme.Styles.modalMessageBackgroundView}>
            <RX.ActivityIndicator size='large' color='white'/>
          </RX.View>
        )
      default:
        titleStyle = [Theme.Styles.modalMessageContainer, Theme.Styles.modalMessageTitleError]
        this.props.config.title = `Unknown modal type:` + this.props.config.type
        console.log(this.props.config)
    }

    return (
      <RX.View style={Theme.Styles.modalMessageBackgroundView}>
        <RX.View style={[Theme.Styles.modalMessagePanel, Theme.Styles.container]}>
          <RX.View style={titleStyle}>
            <RX.Text style={Theme.Styles.modalMessageTitle}>{this.props.config.title}</RX.Text>
          </RX.View>
            <RX.View style={Theme.Styles.modalMessageBody}>
              <RX.Text style={Theme.Styles.modalMessageLabel}>{this.props.config.message.slice(0, 200)}</RX.Text>
              {this.props.config.inputText && <RX.View>
                <TextInput
                  value={this.props.config.inputText}
                />
                <CallToAction
                  padded
                  onPress={() => RX.Clipboard.setText(this.props.config.inputText)}
                  type={CallToAction.type.Main}
                  title='Copy'
                />
                </RX.View>}
              <CallToAction
                onPress={this.props.onClose}
                type={CallToAction.type.Secondary}
                title={this.props.config.ctaTitle}
              />
              {this.props.config.nextAction && <CallToAction
                onPress={this.props.onAction}
                type={CallToAction.type.Secondary}
                title={this.props.config.nextActionCtaTitle}
              />}
            </RX.View>
        </RX.View>
      </RX.View>
    )
  }
}
