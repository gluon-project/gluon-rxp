import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import { orderBy } from 'lodash'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  startLogin?: () => void
  navigateBack?: () => void
  accounts?: User[]
  selectedSender?: string,
  setSender?: (user: string) => void
  uiTraits?: UITraits
}

class SenderScreen extends RX.Component<Props, null> {
  handleSetReceiver(user: User) {
    this.props.setSender(user.address)
    if (this.props.uiTraits.horizontalIsCompact) {
      this.props.navigateBack()
    }
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          {orderBy(this.props.accounts, ['name'], ['asc']).map(user => <ListItem
            key={user.address}
            account={user}
            type={ListItem.type.Secondary}
            title={user.name}
            subTitle={utils.address.short(user.address)}
            selected={this.props.selectedSender
              && user.address === this.props.selectedSender}
            onPress={() => this.handleSetReceiver(user)}
            />)}
          {this.props.accounts.length === 0 && <RX.View style={Theme.Styles.infoBox.wrapper}>
            {RX.Platform.getType() === 'web' && <RX.Text style={Theme.Styles.infoBox.title}>
              No Web3 provider detected. Please use Metamask, Parity, Cipher or:
            </RX.Text>}
            <CallToAction
              type={CallToAction.type.Main}
              title='Login with uPort'
              onPress={this.props.startLogin}
            />
          </RX.View>}

        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    accounts: Selectors.User.getUserAccounts(state),
    selectedSender: state.transactions.new.sender,
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    startLogin: () => dispatch(Actions.User.startLogin()),
    setSender: (user: string) => dispatch(Actions.Transactions.setSender(user)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SenderScreen)
