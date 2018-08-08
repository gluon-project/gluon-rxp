import RX = require('reactxp')
import * as Theme from '../Theme'
import { ListItem, CallToAction } from '../Components'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  selectContact?: (did: string) => void
  selectedContact?: string
  contacts: User[]
  uiTraits?: UITraits
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
    return (
      <RX.View style={Theme.Styles.container}>
        {this.props.contacts.map(contact => (
          <ListItem
            key={contact.address}
            type={ListItem.type.Default}
            title={contact.name}
            subTitle={contact.shortId}
            account={contact}
            selected={this.props.selectedContact === contact.did}
            onPress={() => this.handleSelectContact(contact.did)}
          />
        ))}
        <CallToAction
          type={CallToAction.type.Main}
          title={'New Contact'}
          onPress={() => this.props.navigate('NewContactForm')}
        />
      </RX.View>
    )
  }
}
