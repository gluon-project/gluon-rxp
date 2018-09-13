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
        d={'M8.007 23l.003 1H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2.01v1H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h2.007zm11.996 0h2.007a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H20V4h2.01a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H20l.003-1zM8.852 17.633v-7.52h1.186v1.2h.028c.355-.795 1.121-1.33 2.134-1.33 1.026 0 1.786.52 2.11 1.431h.03c.42-.896 1.301-1.431 2.357-1.431 1.49 0 2.451.969 2.451 2.458v5.192H17.89V12.73c0-1.026-.571-1.634-1.562-1.634-.998 0-1.699.738-1.699 1.757v4.78h-1.258v-5.04c0-.904-.607-1.497-1.54-1.497-.998 0-1.721.781-1.721 1.822v4.715H8.852z'}
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
