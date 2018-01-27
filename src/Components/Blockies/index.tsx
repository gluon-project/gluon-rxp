import RX = require('reactxp')
import * as Theme from '../../Theme'
const blockies = require('blockies')

interface Props extends RX.CommonProps {
  seed?: string
  style?: any
  width?: number
}

function createIdentityImage (address: string, scale = 8) {
  return blockies({
    seed: (address || '').toLowerCase(),
    size: 8,
    scale,
  }).toDataURL()
}

class Blockies extends RX.Component<Props, null> {

  render() {
    return (
      <RX.Image
        style={this.props.style}
        source={createIdentityImage(this.props.seed)}
        />
    )
  }
}

export default Blockies
