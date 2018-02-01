import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, FeedDetails, ScrollView } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateHome?: () => void
  selectToken?: (tokenAddress: string) => void
  navigation?: any,
  selectedToken?: string,
  uiTraits?: UITraits
  tokens?: Token[]
}

class CompactFeedMasterScreen extends RX.Component<Props, null> {
  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <FeedDetails
            navigate={this.props.navigate}
            uiTraits={this.props.uiTraits}
            tokens={this.props.tokens}
            selectedToken={this.props.selectedToken}
            selectToken={this.props.selectToken}
            />
        </ScrollView>
      </RX.View>
    )
  }
}
const mapStateToProps = (state: CombinedState): Props => {
  return {
    uiTraits: state.app.uiTraits,
    tokens: Selectors.Tokens.getList(state),
    selectedToken: Selectors.Feed.getSelectedToken(state),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateHome: () => dispatch(Actions.Navigation.navigateHome()),
    selectToken: (tokenAddress: string) => dispatch(Actions.Feed.selectToken(tokenAddress)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompactFeedMasterScreen)
