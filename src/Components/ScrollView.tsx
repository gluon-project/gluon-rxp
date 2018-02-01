import RX = require('reactxp')
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import { VisualBox } from '../Components'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  visualBoxType?: Enums.VisualType
}

export default class ScrollView extends RX.Component<Props, null> {

  render() {
    return (
      <RX.ScrollView style={Theme.Styles.containerFull}>
        {this.props.visualBoxType !== undefined && this.props.visualBoxType !== null && <VisualBox
          type={this.props.visualBoxType}
          navigate={this.props.navigate}
        />}
        <RX.View style={Theme.Styles.containerWrapper}>
          <RX.View style={Theme.Styles.container}>
            {this.props.children}
          </RX.View>
        </RX.View>
      </RX.ScrollView>
    )
  }
}
