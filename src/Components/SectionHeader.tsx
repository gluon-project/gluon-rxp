import RX = require('reactxp')
import * as Theme from '../Theme'

interface Props extends RX.CommonProps {
  title: string
  padded?: boolean
}

export default class ClaimTypeButton extends RX.Component<Props, null> {

  render() {

    return (
      <RX.View style={[Theme.Styles.section.row, this.props.padded && Theme.Styles.section.padded]}>
        <RX.Text style={Theme.Styles.section.title}>
          {this.props.title}
        </RX.Text>
      </RX.View>
    )
  }
}
