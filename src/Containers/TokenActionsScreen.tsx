import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Theme from '../Theme'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  balance?: Balance
  selectedToken?: string,
  uiTraits?: UITraits
  currentUser?: User
  isProcessing?: boolean
}

class TokenActionsScreen extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
        <ListItem
          account={this.props.balance.token}
          title={`${this.props.balance.token.name}`}
          details={utils.number.numberToString(this.props.balance.amount, this.props.balance.token.decimals)}
          subTitle={this.props.balance.token.type !== Enums.TokenType.ETH &&  utils.address.short(this.props.balance.token.address)}
          type={ListItem.type.Secondary}

        />
        </ScrollView>

      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    balance: Selectors.User.getBalanceByAddress(state, state.tokens.current),
    uiTraits: state.app.uiTraits,
    currentUser: state.user.current,
    isProcessing: Selectors.Process.isRunningProcess(state, Enums.ProcessType.BalanceUpdate),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TokenActionsScreen)
