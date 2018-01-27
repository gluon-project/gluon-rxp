import RX = require('reactxp')
import * as Theme from '../Theme'

interface Props extends RX.CommonProps {
  label?: string
  placeholder?: string
  details?: string
  editable?: boolean
  value?: string
  secureTextEntry?: boolean
  onChangeText?: (newValue: string) => void
  onKeyPress?: (event: RX.Types.KeyboardEvent) => void
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'number-pad'
  onBlur?: () => void
  multiline?: boolean
  style?: any
  defaultValue?: string
}

export default class TextInput extends RX.Component<Props, null> {

  render() {

    return (
      <RX.View style={Theme.Styles.textInput.wrapper}>
        <RX.Text style={Theme.Styles.textInput.label}>{this.props.label}</RX.Text>
        <RX.TextInput
          style={[Theme.Styles.textInput.input, this.props.multiline && Theme.Styles.textInput.multiline]}
          defaultValue={this.props.defaultValue}
          multiline={this.props.multiline}
          placeholderTextColor={Theme.Colors.info}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChangeText={(newValue) => this.props.onChangeText ? this.props.onChangeText(newValue) : {}}
          onKeyPress={(event) => this.props.onKeyPress ? this.props.onKeyPress(event) : {}}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          editable={this.props.editable}
        />
      </RX.View>
    )
  }
}
