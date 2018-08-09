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
}

interface State {
  showDetails: boolean
}

class ClaimListBox extends RX.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showDetails: false,
    }
    this.handleContactPress = this.handleContactPress.bind(this)
  }

  handleContactPress(contact: User) {
    this.props.selectContact(contact.did)
    this.props.navigate('ContactForm')
  }

  render() {
    return (
      <RX.View>
        <RX.Button onPress={() => this.setState({showDetails: !this.state.showDetails})}>
          <RX.Text style={Theme.Styles.chat.messageBody}>
            {this.state.showDetails ? 'Hide claims ▴' : `${this.props.encodedClaims.length} claims ▾`}
          </RX.Text>
        </RX.Button>
        {this.state.showDetails && <RX.View>
          {map(this.props.extendedClaims, (claim: VerifiableClaim, key: number) => <ClaimBox key={key} claim={claim} />)}
        </RX.View>}
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState, ownProps: Props): Props => {
  return {
    extendedClaims: Selectors.Contacts.decodeAndExtendClaims(state, ownProps.encodedClaims),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    selectContact: (did: string) => dispatch(Actions.Contacts.selectContact(did)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimListBox)
