import RX = require('reactxp')
import { connect } from 'react-redux'
import {
  CallToAction,
  ToggleSwitch,
  ScrollView,
} from '../Components'
import { CombinedState } from '../Reducers'
import * as AppReducer from '../Reducers/AppReducer'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import WebOfTrust from '../Components/Graphs/WebOfTrust'

interface Props extends RX.CommonProps {
  claims?: VerifiableClaim[]
  navigateBack?: () => void
  selectContact?: (did: string) => void
  selectedContact?: string,
}

class WebOfTrustScreen extends RX.Component<Props, null> {
  private handleSelectContact = (did: string) => {
    this.props.selectContact(did)
    this.props.navigateBack()
  }
  render() {
    return (
      <ScrollView>
          <WebOfTrust
          selectedContact={this.props.selectedContact}
          handleSelectContact={this.handleSelectContact}
          claims={this.props.claims}/>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    claims: Selectors.Contacts.getAllClaimsExtended(state),
    selectedContact: Selectors.Contacts.getSelectedContact(state),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    selectContact: (did: string) => dispatch(Actions.Contacts.selectContact(did)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WebOfTrustScreen)
