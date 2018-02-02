import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')
import * as Theme from '../../Theme'

interface Props extends RX.CommonProps {
}

class About4Icon extends RX.Component <Props, null> {

  render() {
    return(
      <RX.Image
        style={Theme.Styles.icon}
        source={require('../../../src/Assets/about4_icon.png')}
      />
    )
  }
}

export default About4Icon
