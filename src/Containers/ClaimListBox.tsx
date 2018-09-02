import RX = require('reactxp')
import { connect } from 'react-redux'
import * as Theme from '../Theme'
import { CombinedState } from '../Reducers'
import { AccountIcon, ClaimBox } from '../Components'
import Actions from '../Reducers/Actions'
import * as moment from 'moment'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import Utils from '../Utils'
import { map } from 'lodash'

interface Props extends RX.CommonProps {
  encodedClaims?: string[]
  decodedClaims?: VerifiableClaim[]
  extendedClaims?: VerifiableClaim[]
  navigate?: (routeName: string) => void
  selectContact?: (did: string) => void
  showDetails?: boolean
  setNewClaimType?: (type: string) => void
  setNewClaimValue?: (value: string) => void
  currentUser?: User
}

interface State {
  showDetails: boolean
}

class ClaimListBox extends RX.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showDetails: props.showDetails ? props.showDetails : false,
    }
    this.handleContactPress = this.handleContactPress.bind(this)
    this.handleSignClaim = this.handleSignClaim.bind(this)
  }

  handleContactPress(contact: User) {
    this.props.selectContact(contact.did)
    this.props.navigate('ContactForm')
  }

  handleSignClaim(claim: VerifiableClaim) {
    this.props.selectContact(claim.subject.did)
    this.props.setNewClaimType(claim.claimType)
    this.props.setNewClaimValue(claim.claimValue)
    this.props.navigate('ContactForm')
  }

  render() {
    return (
      <RX.View>
        {!this.props.showDetails && <RX.Button onPress={() => this.setState({showDetails: !this.state.showDetails})}>
          <RX.Text style={Theme.Styles.chat.showClaimsLabel}>
            {this.state.showDetails ? `Hide ${this.props.encodedClaims.length} claims` : `Show ${this.props.encodedClaims.length} claims`}
          </RX.Text>
        </RX.Button>}
        {this.state.showDetails && <RX.View>
          {map(this.props.extendedClaims, (claim: VerifiableClaim, key: number) => <ClaimBox
            handleSignClaim={this.handleSignClaim}
            handleContactPress={this.handleContactPress}
            currentUser={this.props.currentUser}
            key={key} claim={claim} />)}
        </RX.View>}
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState, ownProps: Props): Props => {
  return {
    extendedClaims: Selectors.Contacts.decodeAndExtendClaims(state, ownProps.encodedClaims),
    currentUser: Selectors.Contacts.getAccountByAddress(state, state.transactions.new.sender),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    selectContact: (did: string) => dispatch(Actions.Contacts.selectContact(did)),
    setNewClaimType: (type: string) => dispatch(Actions.Contacts.setNewClaimType(type)),
    setNewClaimValue: (value: string) => dispatch(Actions.Contacts.setNewClaimValue(value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimListBox)
