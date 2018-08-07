import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem, TextInput } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  formValues?: User
  navigateBack?: () => void
  receiver?: User
  addContact?: (user: User) => void
  signAnonymousClaim?: (claim: any) => void
  setReceiver?: (user: string) => void
}

class ReceiverFormScreen extends RX.Component<Props, User> {
  constructor(props: Props) {
    super(props)
    this.state = {
      name: props.formValues ? this.props.formValues.name : '',
      address: props.formValues ? this.props.formValues.address : '',
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
    const address = utils.address.universalIdToDID(this.state.address)

    this.props.signAnonymousClaim({
      sub: address,
      claim: {
        name: this.state.name,
      },
    })

    this.props.setReceiver(this.state.address)
    this.props.navigateBack()

  }

  private isValid = () => {
    return this.state.name !== '' && this.state.address !== ''
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <TextInput
            label='Name'
            value={this.state.name}
            onChangeText={(value) => this.setState({ name: value })}
            />
          <TextInput
            label='Address'
            value={this.state.address}
            onChangeText={(value) => this.setState({ address: value })}
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
    formValues: state.contacts.editing,
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
export default connect(mapStateToProps, mapDispatchToProps)(ReceiverFormScreen)
