import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
}

class FeedIcon extends RX.Component <Props, null> {
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
        d={'M10,4.5 L10,3.5 L23.0190975,3.5 L23.0190975,4.5 L10,4.5 Z M10,13.5 L10,12.5 L23.0190975,12.5 L23.0190975,13.5 L10,13.5 Z M10,22.5 L10,21.5 L23.0190975,21.5 L23.0190975,22.5 L10,22.5 Z M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z M4,7 C2.34314575,7 1,5.65685425 1,4 C1,2.34314575 2.34314575,1 4,1 C5.65685425,1 7,2.34314575 7,4 C7,5.65685425 5.65685425,7 4,7 Z M4,15 C5.1045695,15 6,14.1045695 6,13 C6,11.8954305 5.1045695,11 4,11 C2.8954305,11 2,11.8954305 2,13 C2,14.1045695 2.8954305,15 4,15 Z M4,16 C2.34314575,16 1,14.6568542 1,13 C1,11.3431458 2.34314575,10 4,10 C5.65685425,10 7,11.3431458 7,13 C7,14.6568542 5.65685425,16 4,16 Z M4,24 C5.1045695,24 6,23.1045695 6,22 C6,20.8954305 5.1045695,20 4,20 C2.8954305,20 2,20.8954305 2,22 C2,23.1045695 2.8954305,24 4,24 Z M4,25 C2.34314575,25 1,23.6568542 1,22 C1,20.3431458 2.34314575,19 4,19 C5.65685425,19 7,20.3431458 7,22 C7,23.6568542 5.65685425,25 4,25 Z'}
      />

    </RXImageSvg>
    )
  }
}

FeedIcon.defaultProps = {
  width: 26,
  height: 25,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: 'transparent',
}

export default FeedIcon
