import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
}

class TransfersIcon extends RX.Component <Props, null> {
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
        d={'M5.821 20.022l3.282 3.325-.645.653L4 19.483 8.424 15l.645.653-3.32 3.364H23v1.005H5.821zm15.358-11H4V8.017h17.252l-3.32-3.364.644-.653L23 8.483 18.542 13l-.645-.653 3.282-3.325z'}
      />

    </RXImageSvg>
    )
  }
}

TransfersIcon.defaultProps = {
  width: 28,
  height: 28,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: 'transparent',
}

export default TransfersIcon
