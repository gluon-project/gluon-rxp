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
        d={'M18.833 10.323l-.179.062a5.895 5.895 0 1 0 .215 6.938l.177.022a3.453 3.453 0 0 0 3.241 2.265 3.33 3.33 0 0 0 2.254-.875 3.934 3.934 0 0 0 1.18-2.042c.203-.892.304-1.785.304-2.693 0-6.641-5.384-12.025-12.025-12.025S1.975 7.358 1.975 14c0 6.641 5.384 12.025 12.025 12.025 1.972 0 3.89-.476 5.614-1.388a.53.53 0 1 0-.496-.938A10.911 10.911 0 0 1 14 24.964a10.926 10.926 0 0 1-7.753-3.211A10.926 10.926 0 0 1 3.037 14c0-2.927 1.152-5.693 3.21-7.753A10.926 10.926 0 0 1 14 3.037c2.927 0 5.693 1.151 7.753 3.21A10.926 10.926 0 0 1 24.963 14c0 .825-.09 1.64-.27 2.435a2.907 2.907 0 0 1-.864 1.512c-.438.395-.963.6-1.543.602-.639 0-1.24-.251-1.69-.701a2.38 2.38 0 0 1-.701-1.692v-6.54a.53.53 0 1 0-1.062 0v.707zM18.802 14a4.784 4.784 0 0 1-1.407 3.395A4.784 4.784 0 0 1 14 18.802a4.783 4.783 0 0 1-3.395-1.407A4.784 4.784 0 0 1 9.198 14c0-1.283.505-2.493 1.407-3.395A4.784 4.784 0 0 1 14 9.198c1.283 0 2.492.505 3.395 1.407A4.784 4.784 0 0 1 18.802 14z'}
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
