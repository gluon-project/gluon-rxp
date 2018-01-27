import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
}

class RequestIcon extends RX.Component <Props, null> {
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
        d={'M12,10.0355339 L12,1 L13,1 L13,10.0355339 L16.3890873,6.64644661 L17.0961941,7.35355339 L12.5,11.9497475 L7.90380592,7.35355339 L8.6109127,6.64644661 L12,10.0355339 Z M5.2080584,2.23991529 L5.7919416,3.05175297 C2.8056914,5.19949918 1,8.64433409 1,12.3924719 C1,18.742381 6.14761839,23.8899994 12.4975275,23.8899994 C18.8474366,23.8899994 23.995055,18.742381 23.995055,12.3924719 C23.995055,8.64639616 22.1913643,5.20323235 19.207853,3.05516356 L19.792147,2.24362156 C23.0339579,4.5776608 24.995055,8.32130645 24.995055,12.3924719 C24.995055,19.2946657 19.3997213,24.8899994 12.4975275,24.8899994 C5.59533364,24.8899994 0,19.2946657 0,12.3924719 C0,8.31906422 1.96327096,4.57360452 5.2080584,2.23991529 Z'}
      />

    </RXImageSvg>
    )
  }
}

RequestIcon.defaultProps = {
  width: 26,
  height: 25,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: 'transparent',
}

export default RequestIcon
