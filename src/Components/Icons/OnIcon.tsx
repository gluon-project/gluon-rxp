import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
}

class OnIcon extends RX.Component <Props, null> {
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
        d={'M22.0515267,31.3494841 L36.6989682,16.7020426 L33.9969256,14 L19.3494841,28.6474415 L11.7020426,21 L9,23.7020426 L19.3577184,34.059761 L22.059761,31.3577184 L22.0515267,31.3494841 Z M23,46 C10.2974508,46 0,35.7025492 0,23 C0,10.2974508 10.2974508,0 23,0 C35.7025492,0 46,10.2974508 46,23 C46,35.7025492 35.7025492,46 23,46 Z'}
      />

    </RXImageSvg>
    )
  }
}

OnIcon.defaultProps = {
  width: 46,
  height: 46,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: '#fff',
}

export default OnIcon
