import RX = require('reactxp')
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import { VisualBox } from '../Components'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  hideMainVisual?: () => void
  visualBoxType?: Enums.VisualType
  autoScrollToBottom?: boolean
}

interface State {
  contentHeight?: number,
  wrapperHeight?: number,
}

export default class ScrollView extends RX.Component<Props, State> {
  private _ref: any

  constructor(props: Props) {
    super(props)
    this.state = {
      contentHeight: 0,
      wrapperHeight: 0,
    }
    this.handleAutoScroll = this.handleAutoScroll.bind(this)
  }

  handleAutoScroll(ref: any) {
    if (this.props.autoScrollToBottom && ref) {
      let scrollAmount = this.state.contentHeight - this.state.wrapperHeight
      if (RX.Platform.getType() === 'web') {
        scrollAmount = 1000000
      }
      ref.setScrollTop(scrollAmount, false)
    }
  }

  componentDidMount() {
    this.handleAutoScroll(this._ref)
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.contentHeight !== this.state.contentHeight
      || prevState.wrapperHeight !== this.state.wrapperHeight) {
        this.handleAutoScroll(this._ref)
      }
  }

  render() {
    return (
      <RX.ScrollView
        keyboardDismissMode='interactive'
        onContentSizeChange={(width: number, height: number) => this.setState({contentHeight: height})}
        onLayout={(e: RX.Types.ViewOnLayoutEvent) => this.setState({wrapperHeight: e.height})}
        ref={(ref: any) => this._ref = ref}
        style={Theme.Styles.containerFull}>
        {this.props.visualBoxType !== undefined && this.props.visualBoxType !== null && <VisualBox
          hideMainVisual={this.props.hideMainVisual}
          type={this.props.visualBoxType}
          navigate={this.props.navigate}
        />}
        <RX.View style={Theme.Styles.containerWrapper}>
          <RX.View style={Theme.Styles.container}>
            {this.props.children}
          </RX.View>
        </RX.View>
      </RX.ScrollView>
    )
  }
}
