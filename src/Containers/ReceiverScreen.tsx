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
  navigateBack?: () => void
  contacts?: User[]
  selectedReceiver?: string,
  setReceiver?: (user: string) => void
  uiTraits?: UITraits
}

class ReceiverScreen extends RX.Component<Props, null> {
  handleSetReceiver(user: User) {
    this.props.setReceiver(user.address)
    if (this.props.uiTraits.horizontalIsCompact) {
      this.props.navigateBack()
    }
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          {orderBy(this.props.contacts, ['name'], ['asc']).map(user => <ListItem
            key={user.address}
            account={user}
            type={ListItem.type.Secondary}
            title={user.name}
            subTitle={user.shortId}
            selected={this.props.selectedReceiver
              && user.address === this.props.selectedReceiver}
            onPress={() => this.handleSetReceiver(user)}
            />)}
          {this.props.contacts.length === 0 && <RX.View style={Theme.Styles.infoBox.wrapper}>
            <RX.Text style={Theme.Styles.infoBox.title}>You don't have any contacts</RX.Text>
            <CallToAction
              type={CallToAction.type.Main}
              title='Add contact'
              onPress={() => this.props.navigate('ReceiversForm')}
            />
          </RX.View>}

        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    contacts: Selectors.Contacts.getListForTransfer(state),
    selectedReceiver: state.transactions.new.receiver,
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    setReceiver: (user: string) => dispatch(Actions.Transactions.setReceiver(user)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReceiverScreen)
