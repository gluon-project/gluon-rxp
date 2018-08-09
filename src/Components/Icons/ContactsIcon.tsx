import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
}

class ContactsIcon extends RX.Component <Props, null> {
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
        d={'M5 20.98h1V23a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H7c-.564 0-1 .435-1 1v2.013H5V5C5 3.883 5.883 3 7 3h15a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2.02zM4 13v-1h3v1H4zm0-3V9h3v1H4zm0 6v-1h3v1H4zm0 3v-1h3v1H4zm16.5 1.5h-1a5 5 0 0 0-10 0h-1a6 6 0 1 1 12 0zm-6-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'}
      />

    </RXImageSvg>
    )
  }
}

ContactsIcon.defaultProps = {
  width: 28,
  height: 28,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: 'transparent',
}

export default ContactsIcon
