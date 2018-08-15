import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem, TextInput } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as S from 'string'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  selectedContact?: string
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  subject?: User
  addContact?: (user: User) => void
  signAnonymousClaim?: (claim: any) => void
  signAnonymousClaimAndShareInRoom?: (payload: any) => void
  setReceiver?: (user: string) => void
  room?: MatrixRoom
  newClaimType?: string
  newClaimValue?: string
}

interface State {
  claimType?: string,
  claimValue?: string,
}

class ContactFormScreen extends RX.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      claimType: props.newClaimType ? props.newClaimType : 'Skill',
      claimValue: props.newClaimValue ? props.newClaimValue : '',
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
    claim[S(this.state.claimType).camelize().s] = this.state.claimValue
    const unsigned = {
      sub: this.props.selectedContact,
      claim,
    }

    if (this.props.room) {
      this.props.signAnonymousClaimAndShareInRoom({unsigned, roomId: this.props.room.id})
    } else {
      this.props.signAnonymousClaim(unsigned)
    }

    this.props.navigateBack()
  }

  private isValid = () => {
    return this.state.claimType !== '' && this.state.claimValue !== ''
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <ListItem
            // disabled={!this.props.currentUser || !this.props.transaction.token || !this.props.transaction.amount}
            type={ListItem.type.Default}
            title={this.props.subject ? `${this.props.subject.name}` : 'Select subject'}
            subTitle={'Who is the subject of this claim?'}
            onPress={() => this.props.navigate('ContactSelection')}
            account={this.props.subject}
          />
          <ListItem
            //disabled={!this.props.currentUser}
            type={ListItem.type.Default}
            title={this.props.room ? this.props.room.name : 'Room'}
            subTitle={'Where do you want to share?'}
            onPress={() => this.props.navigate('RoomSelection')}
            account={this.props.room && {avatar: this.props.room.avatarUrl}}
            isOff={!this.props.room}
          />

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
            title={this.props.room ? 'Sign, Save and Share' : 'Sign and Save'}
            onPress={this.handleSaveAnonymous}
            disabled={!this.isValid()}
          />
        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  const contact = Selectors.Contacts.getSelectedContact(state)
  return {
    subject: Selectors.Contacts.getAccountByAddress(state, utils.address.universalIdToNetworkAddress(contact)),

    selectedContact: contact,
    room: Selectors.Matrix.getRoomById(state, state.matrix.selectedRoomId),
    newClaimType: state.contacts.newClaimType,
    newClaimValue: state.contacts.newClaimValue,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    setReceiver: (user: string) => dispatch(Actions.Transactions.setReceiver(user)),
    addContact: (user: User) => dispatch(Actions.Contacts.addContact(user)),
    signAnonymousClaim: (claim: any) => dispatch(Actions.Contacts.signAnonymousClaim(claim)),
    signAnonymousClaimAndShareInRoom: (payload: any) => dispatch(Actions.Contacts.signAnonymousClaimAndShareInRoom(payload)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactFormScreen)
