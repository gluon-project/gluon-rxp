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
        d={'M3.961 6.064v2.431c0 1.994 1.041 3.84 2.717 4.935l.06.074c.126.348.286.677.496 1.027l.246.41-.436-.196a6.857 6.857 0 0 1-4.062-6.25v-2.92a.47.47 0 0 1 .49-.49h2.547l.15.15v.68l-.15.15H3.96zm18.02 0l-.15-.15v-.68l.15-.15h2.547a.47.47 0 0 1 .49.49v2.921a6.857 6.857 0 0 1-4.062 6.25l-.436.196.246-.41c.21-.35.37-.68.558-1.102a5.83 5.83 0 0 0 2.715-4.934v-2.43H21.98zm-1.39 17.417a.553.553 0 0 1-.047.482.492.492 0 0 1-.397.237H7.853c-.171 0-.36-.11-.397-.237-.09-.135-.1-.274-.045-.485a7.232 7.232 0 0 1 4.367-3.919v-1.783a7.435 7.435 0 0 1-5.196-7.073V4.59a.47.47 0 0 1 .49-.49h13.89a.47.47 0 0 1 .49.49v6.045c0 3.238-2.118 6.099-5.196 7.073v1.786c1.963.684 3.53 2.11 4.335 3.987zm-4.963-3.09a.487.487 0 0 1-.352-.484v-2.548c0-.232.143-.433.351-.485 2.837-.725 4.812-3.3 4.812-6.24V5.08H7.527v5.556c0 2.923 1.994 5.51 4.811 6.24a.487.487 0 0 1 .352.484v2.548c0 .218-.12.373-.35.484-1.557.405-2.87 1.4-3.717 2.796h10.72c-.847-1.395-2.16-2.39-3.715-2.795z'}
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
