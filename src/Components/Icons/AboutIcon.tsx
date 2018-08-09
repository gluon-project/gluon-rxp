import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
}

class AboutIcon extends RX.Component <Props, null> {
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
        d={'M14 25c6.075 0 11-4.925 11-11S20.075 3 14 3 3 7.925 3 14s4.925 11 11 11zm0 1C7.373 26 2 20.627 2 14S7.373 2 14 2s12 5.373 12 12-5.373 12-12 12zm.422-8.986l-1-.028c.038-1.37.578-2.26 1.846-3.577l.435-.45c.814-.858 1.133-1.399 1.133-2.082 0-1.822-1.222-2.867-2.914-2.867-1.834 0-3.157 1.001-3.157 2.867h-1c0-2.488 1.822-3.867 4.157-3.867 2.212 0 3.914 1.455 3.914 3.867 0 1.01-.431 1.741-1.408 2.77-.101.107-.497.516-.44.456-1.109 1.151-1.537 1.857-1.566 2.91zM14 21a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'}
      />

    </RXImageSvg>
    )
  }
}

AboutIcon.defaultProps = {
  width: 28,
  height: 28,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: 'transparent',
}

export default AboutIcon
