import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, WalletDetails, NavBar } from '../Components'
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

class SendMasterScreen extends RX.Component<Props, null> {
  render() {
    const tabIndex = this.props.navigation.state.index
    const index = this.props.navigation.state.routes[tabIndex].index
    const routeName = this.props.navigation.state.routes[tabIndex].routes[index].routeName
    return (
      <RX.View style={Theme.Styles.containerFull}>
        <NavBar title='Wallet' />
        <RX.ScrollView style={[Theme.Styles.scrollContainerNoMargins, Theme.Styles.masterViewContainer]}>
          <WalletDetails
            navigate={this.props.navigate}
            startLogin={this.props.startLogin}
            routeName={routeName}
            currentUser={this.props.currentUser}
            handleSelectToken={this.props.handleSelectToken}
            selectedToken={this.props.selectedToken}
            balances={this.props.balances}
            uiTraits={this.props.uiTraits}
          />
        </RX.ScrollView>
      </RX.View>
    )
  }
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
    handleSelectToken: (token: Token) => {
      dispatch(Actions.Navigation.navigate('TokenActions'))
      dispatch(Actions.Tokens.selectToken(token.address))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SendMasterScreen)
