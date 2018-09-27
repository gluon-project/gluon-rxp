import RX = require('reactxp')
import * as Theme from '../Theme'
import { ListItem, CallToAction, AccountIcon, SectionHeader } from '../Components'
import { filter } from 'lodash'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  selectContact?: (did: string) => void
  selectedContact?: string
  contacts: User[]
  uiTraits?: UITraits
  isLoadingMatrixClaims?: boolean
  currentUser?: User,
  routeName?: string
}

export default class ContactListDetails extends RX.Component<Props, null> {

  constructor(props: Props) {
    super(props)
    this.handleSelectContact = this.handleSelectContact.bind(this)
  }

  handleSelectContact(token: string) {
    this.props.selectContact(token)
    if (this.props.uiTraits.horizontalIsCompact) {
      this.props.navigate('ContactActions')
    }
  }

  render() {
    const contacts = filter(this.props.contacts, (contact: User) => { return this.props.currentUser &&
      contact.did !== this.props.currentUser.did})
    return (
      <RX.View style={Theme.Styles.container}>
        {this.props.currentUser &&
          <ListItem
            type={ListItem.type.Default}
            title={this.props.currentUser.name}
            account={this.props.currentUser}
            subTitle={`${this.props.currentUser.uniqueIssuers && this.props.currentUser.uniqueIssuers.length} signers`}
            selected={this.props.selectedContact === this.props.currentUser.did}
            onPress={() => this.handleSelectContact(this.props.currentUser.did)}
          />}

        {contacts.map(contact => (
          <ListItem
            key={contact.did}
            type={ListItem.type.Default}
            title={contact.name}
            subTitle={`${contact.uniqueIssuers.length} signers`}
            account={contact}
            selected={this.props.selectedContact === contact.did}
            onPress={() => this.handleSelectContact(contact.did)}
          />
        ))}
        <RX.View style={{marginTop: Theme.Metrics.baseMargin}}/>
        <CallToAction
          type={CallToAction.type.Main}
          title={'New Contact'}
          onPress={() => {
            this.props.selectContact(null)
            this.props.navigate('NewContactForm')
          }}
          disabled={this.props.routeName === 'NewContactForm'}
          />
        <CallToAction
          type={CallToAction.type.Main}
          title={'Web Of Trust'}
          onPress={() => this.props.navigate('WebOfTrust')}
          disabled={this.props.routeName === 'WebOfTrust'}
          />
        {this.props.isLoadingMatrixClaims && <RX.ActivityIndicator size='medium' color='white'/> }
      </RX.View>
    )
  }
}
