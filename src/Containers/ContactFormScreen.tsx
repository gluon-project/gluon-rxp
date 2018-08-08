import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem, TextInput } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  selectedContact?: string
  navigateBack?: () => void
  receiver?: User
  addContact?: (user: User) => void
  signAnonymousClaim?: (claim: any) => void
  setReceiver?: (user: string) => void
}

interface State {
  claimType?: string,
  claimValue?: string,
}

class ContactFormScreen extends RX.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      claimType: 'skill',
      claimValue: '',
    }
  }

  private handleSave = () => {
    // this.props.addContact(this.state)
    // if (!this.props.formValues) {
    //   this.props.setReceiver(this.state.address)
    // }

    // this.props.navigateBack()
  }

  private handleSaveAnonymous = () => {
    const claim: any = {}
    claim[this.state.claimType] = this.state.claimValue
    this.props.signAnonymousClaim({
      sub: this.props.selectedContact,
      claim,
    })

    this.props.setReceiver(this.props.selectedContact)
    this.props.navigateBack()

  }

  private isValid = () => {
    return this.state.claimType !== '' && this.state.claimValue !== ''
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <TextInput
            label='Claim Type'
            value={this.state.claimType}
            onChangeText={(value) => this.setState({ claimType: value })}
            />
          <TextInput
            label='Claim Value'
            value={this.state.claimValue}
            onChangeText={(value) => this.setState({ claimValue: value })}
            />
          {/* <CallToAction
            type={CallToAction.type.Main}
            title='Save'
            onPress={this.handleSave}
            disabled={!this.isValid()}
          /> */}
          <CallToAction
            type={CallToAction.type.Main}
            title='Sign Anonymously and Save'
            onPress={this.handleSaveAnonymous}
            disabled={!this.isValid()}
          />
        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    selectedContact: Selectors.Contacts.getSelectedContact(state),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    setReceiver: (user: string) => dispatch(Actions.Transactions.setReceiver(user)),
    addContact: (user: User) => dispatch(Actions.Contacts.addContact(user)),
    signAnonymousClaim: (claim: any) => dispatch(Actions.Contacts.signAnonymousClaim(claim)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactFormScreen)
