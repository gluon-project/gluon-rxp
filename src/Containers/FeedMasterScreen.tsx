import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ListItem, NavBar } from '../Components'
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
            <ListItem
              type={ListItem.type.Default}
              title={'All tokens'}
              // subTitle={'Latest public posts'}
              isOff={!!this.props.selectedToken}
              isOn={!this.props.selectedToken}
              selected={!this.props.selectedToken}
              onPress={() => this.props.selectToken(null)}
              />
            {this.props.tokens.map(token => (
              <ListItem
                key={token.address}
                type={ListItem.type.Default}
                title={token.name}
                account={token}
                selected={this.props.selectedToken === token.address}
                isOn={this.props.selectedToken === token.address}
                onPress={() => this.props.selectToken(token.address)}
                smallSeedIcon
                isOff={this.props.selectedToken !== token.address}
              />
            ))}
          </RX.View>
        </RX.ScrollView>
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
    selectToken: (tokenAddress: string) => dispatch(Actions.Feed.selectToken(tokenAddress)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedMasterScreen)
