import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  fill?: string
  strokeColor?: string
  strokeWidth?: number
}

class SendIcon extends RX.Component <Props, null> {
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
        d={'M6.097 11.675a.5.5 0 0 1-.155.92c-.558.114-1.185-.05-1.82-.403.487 1.734 2.067 3.079 3.197 3.206a.5.5 0 0 1 .27.876c-.432.371-.97.474-1.681.375.907 1.237 2.319 2.03 3.735 2.062a.5.5 0 0 1 .325.87c-1.18 1.075-2.943 1.797-4.79 2.014 1.603.623 3.233.906 4.927.905 6.935-.007 12.63-6.737 11.932-12.987a.5.5 0 0 1 .219-.471 7.7 7.7 0 0 0 1.095-.92c-.417.09-.814.15-1.084.15-.55.003-.7-.756-.19-.963.293-.118.667-.465.988-.882-.582.225-1.198.418-1.608.477a.5.5 0 0 1-.418-.133c-.943-.9-1.8-1.271-2.881-1.271-.79 0-1.5.232-2.361.744-1.336.793-1.773 2.838-1.416 4.323a.5.5 0 0 1-.513.616c-3.803-.203-7.113-1.862-9.324-4.315-.661 1.882.218 4.016 1.553 4.807zm-2.108-5.98a.5.5 0 0 1 .825-.057c1.908 2.423 4.933 4.143 8.48 4.499-.194-1.753.405-3.81 1.992-4.753 1.006-.597 1.884-.884 2.872-.884 1.271 0 2.323.424 3.38 1.371.746-.173 2.024-.694 2.375-.944a.5.5 0 0 1 .774.533c-.124.477-.405 1.007-.756 1.48.267-.08.495-.162.626-.231.451-.237.926.274.657.707-.512.822-1.397 1.72-2.155 2.282.557 6.742-5.518 13.795-12.953 13.802-2.548.002-4.972-.6-7.354-1.96-.473-.27-.235-.995.306-.931 1.853.217 3.85-.22 5.305-1.085-1.671-.458-3.168-1.724-3.925-3.426a.5.5 0 0 1 .605-.68l.133.04c-1.2-.955-2.202-2.538-2.202-4.32a.5.5 0 0 1 .818-.386c.093.077.187.15.28.218-.876-1.48-1.102-3.53-.083-5.275z'}
      />

    </RXImageSvg>
    )
  }
}

SendIcon.defaultProps = {
  width: 25,
  height: 25,
  strokeColor: '#fff',
  strokeWidth: 0,
  fill: 'transparent',
}

export default SendIcon
