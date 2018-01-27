import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
}

class OffIcon extends RX.Component <Props, null> {
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
        d={'M23,44 C34.5979797,44 44,34.5979797 44,23 C44,11.4020203 34.5979797,2 23,2 C11.4020203,2 2,11.4020203 2,23 C2,34.5979797 11.4020203,44 23,44 Z M23,46 C10.2974508,46 0,35.7025492 0,23 C0,10.2974508 10.2974508,0 23,0 C35.7025492,0 46,10.2974508 46,23 C46,35.7025492 35.7025492,46 23,46 Z'}
      />

    </RXImageSvg>
    )
  }
}

OffIcon.defaultProps = {
  width: 46,
  height: 46,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: '#fff',
}

export default OffIcon
