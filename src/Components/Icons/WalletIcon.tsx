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
        fillColor={this.props.fill}
        strokeColor={this.props.strokeColor}
        strokeWidth={this.props.strokeWidth}
        d={'M23 8H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9c0-.564-.436-1-1-1zM3 8.98c-.01-1.635.86-2.643 2.61-3.024l13.415-2.92c.833-.146 1.693.168 1.92.701A.668.668 0 0 1 21 4v3h2c1.116 0 2 .884 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9v-.02zM5.552 7H20V4.109c-.094-.053-.431-.153-.762-.096L5.823 6.933A4.86 4.86 0 0 0 5.552 7zM20 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'}
      />

    </RXImageSvg>
    )
  }
}

WalletIcon.defaultProps = {
  width: 28,
  height: 28,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: 'transparent',
}

export default WalletIcon
