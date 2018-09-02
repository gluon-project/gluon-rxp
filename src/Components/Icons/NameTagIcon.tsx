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
        d={'M12 7V5h4v2h7c.906 0 2 1.045 2 2v10c0 .955-1.094 2-2 2H5c-.906 0-2-1.045-2-2V9c0-.955 1.094-2 2-2h7zm0 1H5c-.363 0-1 .608-1 1v10c0 .392.637 1 1 1h18c.363 0 1-.608 1-1V9c0-.392-.637-1-1-1h-7v2h-4V8zm1-2v3h2V6h-2zm-7 8v-1h13v1H6zm0 3v-1h10v1H6z'}
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
