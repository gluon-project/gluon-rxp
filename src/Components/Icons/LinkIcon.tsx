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
        d={'M14 25.008c6.08 0 11.008-4.928 11.008-11.008C25.008 7.92 20.08 2.993 14 2.993 7.92 2.993 2.992 7.92 2.992 14c0 6.08 4.928 11.008 11.008 11.008zm0 .958C7.392 25.966 2.035 20.609 2.035 14 2.035 7.392 7.392 2.035 14 2.035S25.965 7.392 25.965 14c0 6.609-5.357 11.966-11.965 11.966zM2.513 14.958V14h22.994v.958H2.513zM13.521 2.993h.958v22.993h-.958V2.993zm3.961.808l-.33-.346.693-.66.33.346c2.642 2.772 3.961 6.4 3.961 10.86 0 4.459-1.32 8.087-3.96 10.859l-.33.346-.694-.66.33-.346c2.464-2.586 3.697-5.976 3.697-10.2 0-4.223-1.233-7.613-3.697-10.199zm-7.162 0c-2.464 2.586-3.697 5.976-3.697 10.2 0 4.223 1.233 7.613 3.697 10.199l.33.346-.693.66-.33-.346C6.985 22.088 5.666 18.46 5.666 14c0-4.459 1.32-8.087 3.96-10.86l.33-.346.694.66-.33.347zm10.917 2.287l.353-.323.645.708-.354.322c-2.04 1.86-4.709 2.789-7.98 2.789-3.27 0-5.939-.928-7.98-2.789l-.354-.322.645-.708.354.323c1.855 1.69 4.292 2.538 7.335 2.538s5.48-.847 7.336-2.538zM6.566 22.662l-.354.323-.645-.708.354-.322c2.041-1.86 4.71-2.789 7.98-2.789 3.271 0 5.94.928 7.98 2.789l.354.322-.645.708-.353-.323c-1.856-1.69-4.293-2.538-7.336-2.538s-5.48.847-7.335 2.538z'}
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
