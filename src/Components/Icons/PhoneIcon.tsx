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
        d={'M21.745 22.556l-2.322 2.322c-1.881 1.881-8.333-.558-12.048-4.274C3.66 16.89 1.22 10.438 3.102 8.557l2.322-2.322a1.407 1.407 0 0 1 2.112.109l3.08 3.764a1.658 1.658 0 0 1-.107 2.19l-1.467 1.468c-.253.253-.312.74-.116 1.07.017.035.052.1.096.178.092.161.202.337.326.52.39.58.862 1.15 1.404 1.693a11.52 11.52 0 0 0 1.695 1.406c.184.124.36.234.522.326.08.046.14.078.21.114.301.176.787.112 1.035-.135l1.467-1.467a1.659 1.659 0 0 1 2.19-.107l3.765 3.08c.668.546.718 1.503.109 2.112zm-4.491-4.437a.684.684 0 0 0-.883.041l-1.467 1.468c-.558.558-1.528.689-2.186.305a4.563 4.563 0 0 1-.233-.126 9.289 9.289 0 0 1-.584-.365 12.493 12.493 0 0 1-1.839-1.525 12.486 12.486 0 0 1-1.523-1.836c-.138-.205-.26-.401-.364-.584a2.67 2.67 0 0 1-.106-.196c-.41-.682-.283-1.659.283-2.225l1.467-1.467a.683.683 0 0 0 .041-.883L6.78 6.962c-.18-.221-.467-.237-.666-.037L3.792 9.247c-1.39 1.39 1.012 7.406 4.273 10.667 3.261 3.262 9.278 5.664 10.668 4.274l2.322-2.322c.2-.2.185-.486-.037-.667l-3.764-3.08zM25.497 14a.488.488 0 1 1-.976 0c0-5.835-4.73-10.565-10.565-10.565a.488.488 0 1 1 0-.976c6.374 0 11.54 5.167 11.54 11.541zm-4.145 0a.488.488 0 1 1-.976 0 6.42 6.42 0 0 0-6.42-6.42.488.488 0 1 1 0-.976A7.396 7.396 0 0 1 21.352 14z'}
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
