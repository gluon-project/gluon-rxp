import RX = require('reactxp')
import { connect } from 'react-redux'
import { CombinedState } from '../Reducers'
import { setUiTraits } from '../Reducers/AppReducer'
import * as Theme from '../Theme'

interface Props extends RX.CommonProps {
  uiTraits?: UITraits
  setUiTraits?: (traits: UITraits) => void
}

class ResponsiveLayout extends RX.Component<Props, null> {
  private _onLayout = (e: RX.Types.ViewOnLayoutEvent) => {
    let newTraits: UITraits = {
      horizontalIsCompact: true,
      verticalIsCompact: true,
      displayScale: 2,
    }

    if (e.width > Theme.Metrics.compactScreenBreakpoint.horizontal) {
      newTraits.horizontalIsCompact = false
    }
    if (e.height > Theme.Metrics.compactScreenBreakpoint.vertical) {
      newTraits.verticalIsCompact = false
    }

    if (newTraits.verticalIsCompact !== this.props.uiTraits.verticalIsCompact
      || newTraits.horizontalIsCompact !== this.props.uiTraits.horizontalIsCompact) {
      this.props.setUiTraits(newTraits)
    }
  }

  render() {
    return (
      <RX.View
        onLayout={this._onLayout}
        style={Theme.Styles.containerFull}>
        <RX.View style={Theme.Styles.statusBar} />
        {this.props.children}
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    uiTraits: state.app.uiTraits,
  }
}

const mapDispatchToProps = (dispatch: any): Props => {
  return {
    setUiTraits: (traits: UITraits) => dispatch(setUiTraits(traits)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveLayout)
