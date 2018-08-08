import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import { map } from 'lodash'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  claims?: VerifiableClaim[]
  selectedContact?: string,
  uiTraits?: UITraits
}

class ClaimActionsScreen extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <RX.Text style={Theme.Styles.sectionTitle}>Decentralized Identifier: {this.props.selectedContact}</RX.Text>
          {this.props.selectedContact !== null && map(this.props.claims, (claim, key) => <ListItem
            key={key}
            type={ListItem.type.Secondary}
            title={JSON.stringify(claim.claim)}
            subTitle={`Issued by: ${utils.address.short(claim.iss)},\
 source: ${claim.source.type} ${claim.source.id ? claim.source.id : ''}`}
            />)}
          <CallToAction
            type={CallToAction.type.Main}
            title='New Claim'
            onPress={() => this.props.navigate('ContactForm')}
          />
        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    claims: Selectors.Contacts.getSelectedContactClaims(state),
    selectedContact: Selectors.Contacts.getSelectedContact(state),
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimActionsScreen)
