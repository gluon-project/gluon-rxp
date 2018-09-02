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
        d={'M23.5 18.783V9.217A4.718 4.718 0 0 0 18.783 4.5H9.217A4.718 4.718 0 0 0 4.5 9.217v9.566A4.718 4.718 0 0 0 9.217 23.5h9.566a4.718 4.718 0 0 0 4.717-4.717zm1 0a5.718 5.718 0 0 1-5.717 5.717H9.217A5.718 5.718 0 0 1 3.5 18.783V9.217A5.718 5.718 0 0 1 9.217 3.5h9.566A5.718 5.718 0 0 1 24.5 9.217v9.566zM18.5 14a4.5 4.5 0 1 0-8.999-.001A4.5 4.5 0 0 0 18.5 14zm1 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 1 1 11 0zm.75-6.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z'}
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
