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
        d={'M20.857 3.746a.466.466 0 0 0-.676 0L14.15 9.777h-.142L8.001 3.746a.466.466 0 0 0-.677 0L3.818 7.252a.466.466 0 0 0 0 .677l6.03 6.031v.142l-4.3 4.254c-.041.04-.041.04-.055.08a.26.26 0 0 1-.044.05.59.59 0 0 0-.018.065l-1.753 5.26a.487.487 0 0 0 .108.497.57.57 0 0 0 .514.124l5.29-1.759c.011 0 .029-.012.073-.03-.024.02-.032.035-.032.06l.039-.062c.036-.037.05-.046.064-.059.009-.009.009-.009.09-.049l-.07.03 4.254-4.278h.142l6.03 6.03a.463.463 0 0 0 .35.135.463.463 0 0 0 .35-.134l3.507-3.507a.466.466 0 0 0 0-.676l-6.054-6.031v-.142l6.007-6.007a.515.515 0 0 0 .022-.703l-3.505-3.504zm-10.284 9.325l-1.378-1.378 1.261-1.261c.274-.274.274-.714-.003-.964-.27-.27-.71-.27-.96.008l-1.258 1.258L7.161 9.66l1.262-1.262c.273-.274.273-.714-.004-.963-.27-.27-.71-.27-.96.007L6.201 8.7 5.104 7.602 7.65 5.056l5.468 5.468-2.546 2.547zm-2.43 8.84l-2.055.678-.567-.567.678-2.055 1.944 1.944zm9.442-6.92l5.47 5.468-2.548 2.547-1.074-1.075 1.263-1.285c.272-.273.272-.713-.005-.962-.27-.27-.71-.27-.96.007l-1.258 1.259-1.096-1.076 1.26-1.26c.274-.274.274-.715-.003-.964-.27-.27-.71-.27-.96.007l-1.257 1.258-1.378-1.378 2.546-2.547zm5.47-7.389L9.403 21.252l-2.547-2.546 13.65-13.65 2.547 2.546z'}
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
