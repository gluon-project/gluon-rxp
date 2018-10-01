import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ContactListDetails, ScrollView } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateHome?: () => void
  selectContact?: (did: string) => void
  currentUser?: User,
  navigation?: any,
  selectedContact?: string,
  uiTraits?: UITraits,
  contacts?: User[],
  isLoadingMatrixClaims?: boolean
  selectedDataSources?: DataSource[]
}

class CompactContactsMasterScreen extends RX.Component<Props, null> {
  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <ContactListDetails
            navigate={this.props.navigate}
            uiTraits={this.props.uiTraits}
            contacts={this.props.contacts}
            selectedContact={this.props.selectedContact}
            selectContact={this.props.selectContact}
            isLoadingMatrixClaims={this.props.isLoadingMatrixClaims}
            currentUser={this.props.currentUser}
            selectedDataSources={this.props.selectedDataSources}
            />
        </ScrollView>
      </RX.View>
    )
  }
}
const mapStateToProps = (state: CombinedState): Props => {
  return {
    uiTraits: state.app.uiTraits,
    contacts: Selectors.Contacts.getList(state),
    selectedContact: Selectors.Contacts.getSelectedContact(state),
    isLoadingMatrixClaims: Selectors.Process.isRunningProcess(state, Enums.ProcessType.LoadMatrixClaims),
    currentUser: Selectors.Contacts.getAccountByDid(state, state.user.current.did),
    selectedDataSources: Selectors.Contacts.getSelectedDataSources(state),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateHome: () => dispatch(Actions.Navigation.navigateHome()),
    selectContact: (did: string) => dispatch(Actions.Contacts.selectContact(did)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompactContactsMasterScreen)
