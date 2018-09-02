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
        d={'M13.524 15.881a.5.5 0 0 1 .5.5V24a.5.5 0 0 1-.5.5H5.429A1.928 1.928 0 0 1 3.5 22.571V5.43c0-1.066.863-1.929 1.929-1.929H22.57c1.066 0 1.929.863 1.929 1.929V22.57a1.928 1.928 0 0 1-1.929 1.929h-6.19a.5.5 0 0 1-.5-.5v-7.619a.5.5 0 0 1 .5-.5h2.91l.31-1.857h-3.22a.5.5 0 0 1-.5-.5v-1.905c0-.802.65-1.452 1.452-1.452h2.357V8.31h-2.357a3.31 3.31 0 0 0-3.31 3.309v1.905a.5.5 0 0 1-.5.5H12.14v1.857h1.385zM16.88 23.5h5.69a.928.928 0 0 0 .929-.929V5.43a.928.928 0 0 0-.929-.929H5.43a.928.928 0 0 0-.929.929V22.57c0 .514.415.929.929.929h7.595v-6.619h-1.385a.5.5 0 0 1-.5-.5v-2.857a.5.5 0 0 1 .5-.5h1.385v-1.405a4.31 4.31 0 0 1 4.31-4.31h2.856a.5.5 0 0 1 .5.5v2.858a.5.5 0 0 1-.5.5h-2.857a.453.453 0 0 0-.452.452v1.405h3.31a.5.5 0 0 1 .493.582l-.477 2.857a.5.5 0 0 1-.493.418h-2.833V23.5z'}
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
