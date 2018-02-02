import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ListItem, NavBar, FeedDetails } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  selectToken?: (tokenAddress: string) => void
  selectedToken?: string,
  uiTraits?: UITraits
  tokens?: Token[]
}

class FeedMasterScreen extends RX.Component<Props, null> {
  render() {
    return (
      <RX.View style={Theme.Styles.containerFull}>
        <NavBar title='Filter' />
        <RX.ScrollView style={[Theme.Styles.scrollContainerNoMargins, Theme.Styles.masterViewContainer]}>
          <RX.View style={Theme.Styles.container}>
            <FeedDetails
              uiTraits={this.props.uiTraits}
              tokens={this.props.tokens}
              selectedToken={this.props.selectedToken}
              selectToken={this.props.selectToken}
              />
          </RX.View>
        </RX.ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    uiTraits: state.app.uiTraits,
    tokens: Selectors.Tokens.getListForFeed(state),
    selectedToken: Selectors.Feed.getSelectedToken(state),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    selectToken: (tokenAddress: string) => dispatch(Actions.Feed.selectToken(tokenAddress)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedMasterScreen)
