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
        d={'M9.5 6V4A1.5 1.5 0 0 1 11 2.5h6A1.5 1.5 0 0 1 18.5 4v2H24v1H4V6h5.5zm1 0h7V4a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5v2zm.5 16h-1V8h1v14zm7 0h-1V8h1v14zm-3.5 0h-1V8h1v14zm6-14h1v14a2.5 2.5 0 0 1-2.5 2.5H9A2.5 2.5 0 0 1 6.5 22V8h1v14A1.5 1.5 0 0 0 9 23.5h10a1.5 1.5 0 0 0 1.5-1.5V8z'}
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
