import RX = require('reactxp')
import * as Theme from '../Theme'
import * as Enums from '../Enums'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  hideMainVisual?: () => void
  type: Enums.VisualType
}

export default class VisualBox extends RX.Component<Props, null> {
  public static type = Enums.VisualType

  render() {
    let source
    switch (this.props.type) {
      case Enums.VisualType.Main:
        source = require('../../src/Assets/visual_1.jpg')
        break
      case Enums.VisualType.About1:
        source = require('../../src/Assets/visual_1.jpg')
        break
      case Enums.VisualType.About2:
        source = require('../../src/Assets/visual_2.jpg')
        break
      case Enums.VisualType.About3:
        source = require('../../src/Assets/visual_3.jpg')
        break
      case Enums.VisualType.About4:
        source = require('../../src/Assets/visual_4.jpg')
        break
    }
    return (
      <RX.Image
        style={Theme.Styles.visual.image}
        source={source}
        resizeMode='cover'
        >

        {this.props.type === Enums.VisualType.Main && <RX.Button
          style={Theme.Styles.visual.closeButton}
          onPress={this.props.hideMainVisual}>
          <RX.Text style={Theme.Styles.visual.closeButtonLabel}>Close</RX.Text>
        </RX.Button>}

        {(this.props.type === Enums.VisualType.Main || this.props.type === Enums.VisualType.About1)
          && <RX.View style={Theme.Styles.visual.info}>
          <RX.Button onPress={() => this.props.navigate('AboutTab')}>
            <RX.Image
              style={Theme.Styles.visual.logo}
              source={require('../../src/Assets/feed_logo.png')}
              />
            {this.props.type !== Enums.VisualType.About1 && <RX.Text style={Theme.Styles.visual.button}>
              Learn more
            </RX.Text>}
          </RX.Button>
        </RX.View>}
      </RX.Image>
    )
  }
}
