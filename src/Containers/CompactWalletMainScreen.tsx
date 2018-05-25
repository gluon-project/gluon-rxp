import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, WalletDetails, ScrollView } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateHome?: () => void
  navigation?: any,
  currentUser?: User,
  uiTraits?: UITraits
  startLogin?: () => void
  selectedToken?: string
  balances?: Balance[]
  handleSelectToken?: (token: Token) => void
}

class CompactWalletMasterScreen extends RX.Component<Props, null> {

  handleSelectToken(token: Token) {
    this.props.handleSelectToken(token)
    if (this.props.uiTraits.horizontalIsCompact) {
      this.props.navigate('TokenActions')
    }
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>

          <WalletDetails
              navigate={this.props.navigate}
              startLogin={this.props.startLogin}
              routeName={''}
              currentUser={this.props.currentUser}
              handleSelectToken={this.handleSelectToken.bind(this)}
              selectedToken={this.props.selectedToken}
              balances={this.props.balances}
              uiTraits={this.props.uiTraits}
            />

        </ScrollView>
      </RX.View>
    )
  }
}
const styles = {
  cta: RX.Styles.createViewStyle({
    marginTop: Theme.Metrics.baseMargin,
  }),
}
const mapStateToProps = (state: CombinedState): Props => {
  return {
    currentUser: state.user.current,
    balances: state.user.balances,
    uiTraits: state.app.uiTraits,
    selectedToken: Selectors.Tokens.getCurrentToken(state),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateHome: () => dispatch(Actions.Navigation.navigateHome()),
    startLogin: () => dispatch(Actions.User.startLogin()),
    handleSelectToken: (token: Token) => dispatch(Actions.Tokens.selectToken(token.address)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompactWalletMasterScreen)
