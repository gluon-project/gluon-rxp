import RX = require('reactxp')
import * as Theme from '../Theme'

interface Props extends RX.CommonProps {
  title: string
}

export default class NavBar extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.navBar}>
        <RX.Text style={Theme.Styles.navBarLabel}>
          {this.props.title}
        </RX.Text>
      </RX.View>
    )
  }
}
