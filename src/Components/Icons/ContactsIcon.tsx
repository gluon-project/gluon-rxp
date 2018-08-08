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
        d={'M3 19.98h1V22a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H5c-.564 0-1 .435-1 1v2.013H3V4C3 2.883 3.883 2 5 2h15a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.02zM2 12v-1h3v1H2zm0-3V8h3v1H2zm0 6v-1h3v1H2zm0 3v-1h3v1H2zm16.5 1.5h-1a5 5 0 0 0-10 0h-1a6 6 0 1 1 12 0zm-6-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'}
      />

    </RXImageSvg>
    )
  }
}

ContactsIcon.defaultProps = {
  width: 25,
  height: 25,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: 'transparent',
}

export default ContactsIcon
