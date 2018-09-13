import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')
import * as Theme from '../../Theme'

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
}

class Icon extends RX.Component <Props, null> {
  static defaultProps: Props

  render() {
    return(
      <RXImageSvg
        width={this.props.width}
        height={this.props.height}
        viewBox={`-${this.props.strokeWidth} -${this.props.strokeWidth} ${this.props.width + this.props.strokeWidth * 2} ${this.props.height + this.props.strokeWidth * 2}`}
      >
      <RXSvgPath
        fillColor={this.props.fill}
        strokeColor={this.props.strokeColor}
        strokeWidth={this.props.strokeWidth}
        d={'M20.998 20.999H24a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v13.999a1 1 0 0 0 1 1h12.036v3.369l2.465-1.277 2.497 1.283V21zm5.002-1a2 2 0 0 1-2 2h-2.002v4.013l-3.495-1.796-3.467 1.796V22H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v13.999zM18.5 21a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM4.95 9h18.1V8H4.95v1zm0 3h18.1v-1H4.95v1z'}
      />

    </RXImageSvg>
    )
  }
}

Icon.defaultProps = {
  width: 28,
  height: 28,
  strokeColor: Theme.Colors.brand,
  strokeWidth: 0,
  fill: Theme.Colors.brand,
}

export default Icon
