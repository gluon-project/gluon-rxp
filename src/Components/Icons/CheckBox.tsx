import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')
import { Colors } from '../../Theme'

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
  selected?: boolean
}

class RadioButton extends RX.Component <Props, null> {
  static defaultProps: Props

  render() {
    return(
      <RXImageSvg
        width={this.props.width}
        height={this.props.height}
        viewBox={`-${this.props.strokeWidth} -${this.props.strokeWidth} ${this.props.width + this.props.strokeWidth * 2} ${this.props.height + this.props.strokeWidth * 2}`}
      >
      <RXSvgPath
        fillColor={this.props.strokeColor}
        strokeColor={this.props.strokeColor}
        strokeWidth={this.props.strokeWidth}
        d={'M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-1a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'}
      />

      {this.props.selected && <RXSvgPath
        fillColor={this.props.strokeColor}
        strokeColor={this.props.strokeColor}
        strokeWidth={this.props.strokeWidth}
        d={'M16.571 4L18 5.515l-8.571 9.092a1.94 1.94 0 0 1-2.858 0L3 10.819l1.429-1.516 2.857 3.03a.97.97 0 0 0 1.428 0L16.571 4z'}
      />}

    </RXImageSvg>
    )
  }
}

RadioButton.defaultProps = {
  width: 20,
  height: 20,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: '#fff',
  selected: false,
}

export default RadioButton
