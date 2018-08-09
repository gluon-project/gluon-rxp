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
        d={'M21.474 19.022l.122-.19A9 9 0 0 0 14 5a9 9 0 1 0 4.832 16.594l.19-.121 3.567 1.085-1.116-3.536zM24.002 24l-4.826-1.442A9.956 9.956 0 0 1 14.001 24C8.478 24 4 19.523 4 14S8.478 4 14 4c5.524 0 10.002 4.477 10.002 10 0 1.85-.505 3.628-1.442 5.175L24.002 24zM11 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'}
      />

    </RXImageSvg>
    )
  }
}

FeedIcon.defaultProps = {
  width: 28,
  height: 28,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: 'transparent',
}

export default FeedIcon
