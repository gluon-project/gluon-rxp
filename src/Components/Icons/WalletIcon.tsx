import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
}

class WalletIcon extends RX.Component <Props, null> {
  static defaultProps: Props

  render() {
    return(
      <RXImageSvg
        width={this.props.width}
        height={this.props.height}
        viewBox={`-${this.props.strokeWidth} -${this.props.strokeWidth} ${this.props.width + this.props.strokeWidth * 2} ${this.props.height + this.props.strokeWidth * 2}`}
      >
      <RXSvgPath
        fillColor={'transparent'}
        strokeColor={this.props.fill}
        strokeWidth={this.props.strokeWidth}
        d={'M2.5 7.5h20v15h-20z'}
      />
      <RXSvgPath
        fillColor={'transparent'}
        strokeColor={this.props.fill}
        strokeWidth={this.props.strokeWidth}
        d={'M2.5 7.354l16-5.647v5.89l-16-.102v-.141zM19 15.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z'}
      />

    </RXImageSvg>
    )
  }
}

WalletIcon.defaultProps = {
  width: 25,
  height: 25,
  strokeColor: '#fff',
  strokeWidth: 2,
  fill: null,
}

export default WalletIcon
