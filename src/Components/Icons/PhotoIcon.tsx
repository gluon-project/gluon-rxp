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
        d={'M5 4.942h4.099a.97.97 0 0 0 .97-.971A.97.97 0 0 1 11.04 3h5.829a.97.97 0 0 1 .97.97c0 .537.435.972.971.972H23a3 3 0 0 1 3 3V22a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7.942a3 3 0 0 1 3-3zM11.07 4a1.97 1.97 0 0 1-1.971 1.942H5a2 2 0 0 0-2 2V22a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7.942a2 2 0 0 0-2-2h-4.19A1.97 1.97 0 0 1 16.84 4h-5.77zM14 21a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10z'}
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
