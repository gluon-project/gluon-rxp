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
  balances?: Balance[]
  selectedToken?: string,
  setToken?: (token: string) => void
  setNetworkId?: (networkId: string) => void
  uiTraits?: UITraits
  currentUser?: User
  refreshBalances?: () => void
  startLogin?: () => void
  isProcessing?: boolean
}

class TokensScreen extends RX.Component<Props, null> {
  handleSelectToken(token: Token) {
    this.props.setToken(token.address)
    this.props.setNetworkId(token.networkId)
    if (this.props.uiTraits.horizontalIsCompact) {
      this.props.navigateBack()
    }
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.refreshBalances()
    }
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          {this.props.balances && <RX.View>
            {this.props.balances.map((account, key) => {
              return <ListItem
                key={key}
                account={account.token}
                title={`${account.token.name}`}
                details={utils.number.numberToString(account.amount, account.token.decimals)}
                subTitle={account.token.type !== Enums.TokenType.ETH &&  utils.address.short(account.token.address)}
                type={ListItem.type.Secondary}
                selected={this.props.selectedToken
                  && account.token.address === this.props.selectedToken}
                onPress={() => this.handleSelectToken(account.token)}
              />
            })}
          </RX.View>}
        {this.props.balances.length === 0 && <RX.View style={Theme.Styles.infoBox.wrapper}>
          <RX.Text style={Theme.Styles.infoBox.title}>You don't have any tokens registered</RX.Text>
          <CallToAction
            type={CallToAction.type.Main}
            title='Add or Create your Token'
            onPress={() => this.props.navigate('TokensForm')}
          />
        </RX.View>}
        </ScrollView>

      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    balances: state.user.balances,
    selectedToken: state.transactions.new.token,
    uiTraits: state.app.uiTraits,
    currentUser: state.user.current,
    isProcessing: Selectors.Process.isRunningProcess(state, Enums.ProcessType.BalanceUpdate),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    setToken: (token: string) => dispatch(Actions.Transactions.setToken(token)),
    setNetworkId: (networkId: string) => dispatch(Actions.Transactions.setNetworkId(networkId)),
    refreshBalances: () => dispatch(Actions.User.refreshBalances()),
    startLogin: () => dispatch(Actions.User.startLogin()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TokensScreen)
