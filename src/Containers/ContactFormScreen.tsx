import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem, TextInput, AccountIcon, Icons, ClaimTypeButton, SectionHeader } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import Config from '../Config'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as S from 'string'
import utils from '../Utils'
import { AccountIconType } from '../Components/AccountIcon'

interface Props extends RX.CommonProps {
  selectedContact?: string
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  subject?: User
  addContact?: (user: User) => void
  signAnonymousClaim?: (claim: any) => void
  signAnonymousClaimAndShareInRoom?: (payload: any) => void
  signClaimAndShareInRoom?: (payload: any) => void
  setReceiver?: (user: string) => void
  room?: MatrixRoom
  newClaimType?: string
  newClaimValue?: string
  currentUser?: User
}

interface State {
  claimType?: string,
  claimValue?: string,
  selectedType?: string,
  signAnonymously?: boolean,
}

class ContactFormScreen extends RX.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      claimType: props.newClaimType ? props.newClaimType : 'name',
      claimValue: props.newClaimValue ? props.newClaimValue : '',
      selectedType: props.newClaimType ? props.newClaimType.toLowerCase() : 'name',
      signAnonymously: false,
    }
  }

  private handleSave = () => {
    if (this.state.signAnonymously) {
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
    } else {
      const claim: any = {}
      claim[S(this.state.claimType).camelize().s] = this.state.claimValue
      const unsigned = {
        // riss: `did:ethr:${this.props.currentUser.address}`,
        riss: `${this.props.currentUser.mnid}`,
        sub: this.props.selectedContact,
        unsignedClaim: claim,
      }

      if (this.props.room) {
        this.props.signClaimAndShareInRoom({unsigned, roomId: this.props.room.id})
      } else {
        this.props.signClaimAndShareInRoom({unsigned, roomId: null})
      }
    }

    this.props.navigateBack()
  }

  private isValid = () => {
    return this.state.claimType !== '' && this.state.claimValue !== ''
  }

  private selectType = (type: string) => {
    this.setState({claimType: type !== 'custom' ? type : '', selectedType: type})
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>

          <RX.View style={[Theme.Styles.accountInfo.wrapper, {marginBottom: Theme.Metrics.baseMargin * 2}]}>
            <AccountIcon
              account={this.props.subject}
              type={AccountIcon.type.Large}
              />
            <RX.Text style={Theme.Styles.accountInfo.title}>
              {this.props.subject.name}
            </RX.Text>
          </RX.View>

          <RX.View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>

            <ClaimTypeButton
              icon={Icons.AvatarIcon}
              title='Avatar'
              selected={this.state.selectedType === 'avatar'}
              onPress={() => this.selectType('avatar')}
              />

            <ClaimTypeButton
              icon={Icons.NameTagIcon}
              title='Name'
              selected={this.state.selectedType === 'name'}
              onPress={() => this.selectType('name')}
              />

            <ClaimTypeButton
              icon={Icons.EmailIcon}
              title='Email'
              selected={this.state.selectedType === 'email'}
              onPress={() => this.selectType('email')}
              />

            <ClaimTypeButton
              icon={Icons.PhoneIcon}
              title='Phone'
              selected={this.state.selectedType === 'phone'}
              onPress={() => this.selectType('phone')}
              />

            <ClaimTypeButton
              icon={Icons.MatrixIcon}
              title='Matrix'
              selected={this.state.selectedType === 'matrixId'}
              onPress={() => this.selectType('matrixId')}
              />

            <ClaimTypeButton
              icon={Icons.TwitterIcon}
              title='Twitter'
              selected={this.state.selectedType === 'twitter'}
              onPress={() => this.selectType('twitter')}
              />

            <ClaimTypeButton
              icon={Icons.FacebookIcon}
              title='Facebook'
              selected={this.state.selectedType === 'facebook'}
              onPress={() => this.selectType('facebook')}
              />

            <ClaimTypeButton
              icon={Icons.InstagramIcon}
              title='Instagram'
              selected={this.state.selectedType === 'instagram'}
              onPress={() => this.selectType('instagram')}
              />

            <ClaimTypeButton
              icon={Icons.PhotoIcon}
              title='Photo'
              selected={this.state.selectedType === 'photo'}
              onPress={() => this.selectType('photo')}
              />

            <ClaimTypeButton
              icon={Icons.LinkIcon}
              title='URL'
              selected={this.state.selectedType === 'url'}
              onPress={() => this.selectType('url')}
              />

            <ClaimTypeButton
              icon={Icons.SkillIcon}
              title='Skill'
              selected={this.state.selectedType === 'skill'}
              onPress={() => this.selectType('skill')}
              />

            <ClaimTypeButton
              icon={Icons.AwardIcon}
              title='Award'
              selected={this.state.selectedType === 'award'}
              onPress={() => this.selectType('award')}
              />

            <ClaimTypeButton
              icon={Icons.HashTagIcon}
              title='# hashtag'
              selected={this.state.selectedType === 'hashtag'}
              onPress={() => this.selectType('hashtag')}
              />

            <ClaimTypeButton
              icon={Icons.CustomIcon}
              title='Custom'
              selected={this.state.selectedType === 'custom'}
              onPress={() => this.selectType('custom')}
              />

          </RX.View>

          <RX.View style={Theme.Styles.claimInputBox.wrapper}>

            {this.state.selectedType !== 'custom' && <RX.View style={Theme.Styles.claimInputBox.titleRow}>
              <Icons.MultiIcon type={this.state.claimType} fill={Theme.Colors.light} />
              <RX.Text style={Theme.Styles.claimInputBox.title}>{S(this.state.claimType).humanize().s}</RX.Text>
            </RX.View>}

            {this.state.selectedType === 'custom' && <TextInput
              label='Type'
              placeholder='Enter type'
              value={this.state.claimType}
              onChangeText={(value) => this.setState({ claimType: value })}
              />}
            <TextInput
              label={this.state.selectedType === 'custom' && 'Value'}
              placeholder='Enter value'
              value={this.state.claimValue}
              onChangeText={(value) => this.setState({ claimValue: value })}
              />
            <RX.View style={{padding: Theme.Metrics.baseMargin}}>
              <SectionHeader title='Sign as' />

              <RX.Button
                onPress={() => this.setState({signAnonymously: false})}
                style={[Theme.Styles.row, {justifyContent: 'flex-start', alignItems: 'center',
                  marginBottom: Theme.Metrics.smallMargin * 2}]}>
                  <RX.View style={{marginRight: Theme.Metrics.baseMargin}}>
                    <Icons.RadioButton
                      strokeColor={Theme.Colors.light}
                      fill={Theme.Colors.brand}
                      selected={!this.state.signAnonymously}
                      />
                  </RX.View>
                <AccountIcon account={this.props.currentUser} type={AccountIconType.Small}/>
                <RX.Text style={Theme.Styles.claimInputBox.signerLabel}>{this.props.currentUser.name}</RX.Text>
              </RX.Button>

              <RX.Button
                onPress={() => this.setState({signAnonymously: true})}
                style={[Theme.Styles.row, {justifyContent: 'flex-start', alignItems: 'center'}]}>
                  <RX.View style={{marginRight: Theme.Metrics.baseMargin}}>
                    <Icons.RadioButton
                      strokeColor={Theme.Colors.light}
                      fill={Theme.Colors.brand}
                      selected={this.state.signAnonymously}
                      />
                  </RX.View>
                <AccountIcon account={{address: utils.address.universalIdToNetworkAddress(Config.uport.app.address)}}
                type={AccountIconType.Small}/>
                <RX.Text style={Theme.Styles.claimInputBox.signerLabel}>Anonymous</RX.Text>
              </RX.Button>

            </RX.View>
          </RX.View>

            <SectionHeader title='Share in room' padded />
            <ListItem
              //disabled={!this.props.currentUser}
              type={ListItem.type.Default}
              title={this.props.room ? this.props.room.name : 'Room'}
              subTitle={'Where do you want to share?'}
              onPress={() => this.props.navigate('RoomSelection')}
              account={this.props.room && {avatar: this.props.room.avatarUrl}}
              isOff={!this.props.room}
              />

          <RX.View style={{height: Theme.Metrics.baseMargin * 4}} />

          <CallToAction
            type={CallToAction.type.Main}
            title={this.props.room ? 'Sign, Save and Share' : 'Sign and Save'}
            onPress={this.handleSave}
            disabled={!this.isValid()}
          />
          <CallToAction
            type={CallToAction.type.Secondary}
            title={'Cancel'}
            onPress={this.props.navigateBack}
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
    currentUser: Selectors.User.getCurrent(state),
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
    signClaimAndShareInRoom: (payload: any) => dispatch(Actions.Contacts.signClaimAndShareInRoom(payload)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactFormScreen)
