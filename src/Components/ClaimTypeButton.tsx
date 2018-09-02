import RX = require('reactxp')
import * as Theme from '../Theme'

interface Props extends RX.CommonProps {
  icon?: any
  title: string
  onPress?: (e: RX.Types.SyntheticEvent) => void
  selected?: boolean
}

export default class ClaimTypeButton extends RX.Component<Props, null> {

  render() {

    return (
      <RX.Button
        onPress={this.props.onPress}
        style={[
          Theme.Styles.claimButton.button,
          this.props.selected && Theme.Styles.claimButton.selectedButton,
          ]}>
        <this.props.icon
          fill={this.props.selected ? Theme.Colors.brand : Theme.Colors.light}
          height={28}
          width={28}
          />
        <RX.Text style={[
          Theme.Styles.claimButton.label,
          this.props.selected && Theme.Styles.claimButton.selectedLabel,
          ]}>
          {this.props.title}
        </RX.Text>
      </RX.Button>
    )
  }
}
