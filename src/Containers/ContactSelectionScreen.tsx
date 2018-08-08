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
  selectedContact?: string,
  selectContact?: (address: string) => void
  uiTraits?: UITraits
}

class ContactSelectionScreen extends RX.Component<Props, null> {
  handleSetReceiver(user: User) {
    this.props.selectContact(user.did)
    this.props.navigateBack()
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
            selected={this.props.selectedContact
              && user.did === this.props.selectedContact}
            onPress={() => this.handleSetReceiver(user)}
            />)}

        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    contacts: Selectors.Contacts.getList(state),
    selectedContact: Selectors.Contacts.getSelectedContact(state),
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    selectContact: (did: string) => dispatch(Actions.Contacts.selectContact(did)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactSelectionScreen)
