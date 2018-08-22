import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem, ClaimBox, AccountIcon } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as moment from 'moment'
import { map, forEach, groupBy, isNumber, keys, countBy, orderBy } from 'lodash'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  claims?: VerifiableClaim[]
  selectedContact?: string,
  uiTraits?: UITraits,
  setNewClaimType?: (type: string) => void
  setNewClaimValue?: (value: string) => void
}

interface State {
  showDetails: boolean
}
class ClaimActionsScreen extends RX.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      showDetails: false,
    }
    this.getGroupedClaims = this.getGroupedClaims.bind(this)
    this.handleSignClaim = this.handleSignClaim.bind(this)
  }

  getGroupedClaims() {
    let result: any = []
    const grouped = groupBy(orderBy(this.props.claims, 'claimType'), 'claimType')
    result = map(grouped, (group, title) => {
      const groupedValues = groupBy(group, 'claimValue')
      return {
        title,
        items: groupedValues,
      }
    })
    return result
  }

  handleSignClaim(claim: VerifiableClaim) {
    this.props.setNewClaimType(claim.claimType)
    this.props.setNewClaimValue(claim.claimValue)
    this.props.navigate('ContactForm')
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <RX.View style={Theme.Styles.scrollContainer}>

            {map(this.getGroupedClaims(), (group: any, key: any) => <RX.View key={key} style={Theme.Styles.contact.group}>
              <RX.Text style={Theme.Styles.contact.groupTitle}>{group.title}</RX.Text>
              <RX.View>
                {map(group.items, (claims: any, value: string) =>
                <GroupItem key={value} title={value} claims={claims} signClaim={() => this.handleSignClaim(claims[0])}/>)}
              </RX.View>
            </RX.View>)}

            {this.state.showDetails && <RX.View>
              {this.props.selectedContact !== null && map(this.props.claims, (claim, key) => <ClaimBox
              key={key}
              hideSubject
              claim={claim}
              />)}
              <RX.Text style={Theme.Styles.sectionTitle}>Decentralized Identifier: {this.props.selectedContact}</RX.Text>
            </RX.View>}
          </RX.View>
          {/* <CallToAction
            type={CallToAction.type.Secondary}
            title={this.state.showDetails ? 'Hide details' : 'Show details'}
            onPress={() => this.setState({showDetails: !this.state.showDetails})}
          /> */}
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

interface GroupItemProps extends RX.CommonProps {
  title: string,
  claims: VerifiableClaim[]
  signClaim: () => void
}
class GroupItem extends RX.Component<GroupItemProps, State> {

  constructor(props: GroupItemProps) {
    super(props)
    this.state = {
      showDetails: false,
    }
    this.getGroupedClaims = this.getGroupedClaims.bind(this)
  }

  getGroupedClaims() {
    let result: any = []
    result = groupBy(this.props.claims, 'jwt')
    // console.log({grouped})
    return result
  }

  render() {
    // this.getGroupedClaims()
    const numberOfUniqSigners = keys(countBy(this.props.claims, (claim: VerifiableClaim) => claim.iss)).length
    const claimsBySigner = groupBy(this.props.claims, (claim: VerifiableClaim) => claim.iss)
    const signers: User[] = []
    forEach(claimsBySigner, (claims: VerifiableClaim[]) => {
      signers.push(claims[0].issuer)
    })
    const numberOfSignings = keys(countBy(this.props.claims, (claim: VerifiableClaim) => claim.jwt)).length
    const claimType = this.props.claims[0].claimType
    return (
      <RX.View style={Theme.Styles.contact.groupListItem}>
        {claimType === 'Avatar' && <RX.View style={Theme.Styles.contact.groupListItemAvatar}>
          <AccountIcon  account={{avatar: this.props.title}} type={AccountIcon.type.Large} />
        </RX.View>}
        {claimType !== 'Avatar' && <RX.Text style={Theme.Styles.contact.groupListItemTitle}>{this.props.title}</RX.Text>}

        {this.state.showDetails && <RX.View>
          {map(this.getGroupedClaims(), (group: VerifiableClaim[], key: any) =>
          <RX.View key={key} style={Theme.Styles.contact.detailsWrapper}>

            <RX.Text style={Theme.Styles.contact.detailsBoxLabel}>Issued by: </RX.Text>
            <RX.View style={Theme.Styles.contact.row}>
              <AccountIcon account={group[0].issuer} type={AccountIcon.type.Small}/>
              <RX.Text style={Theme.Styles.contact.detailsBoxValue}> {group[0].issuer.name} </RX.Text>
            </RX.View>
            <RX.Text style={Theme.Styles.contact.detailsBoxLabel}>Issued: </RX.Text>
            <RX.Text style={Theme.Styles.contact.detailsBoxValue}>{moment.unix(group[0].iat).calendar()}</RX.Text>
            {isNumber(group[0].exp) &&
            <RX.Text style={Theme.Styles.contact.detailsBoxLabel}>Expires: </RX.Text>}
            {isNumber(group[0].exp) &&
            <RX.Text style={Theme.Styles.contact.detailsBoxValue}>{moment.unix(group[0].exp).calendar()}</RX.Text>}
            <RX.Text style={Theme.Styles.contact.detailsBoxLabel}>Source: </RX.Text>
            {map(group, (claim, key2) => <RX.View style={Theme.Styles.contact.row} key={key2}>
                <AccountIcon
                account={claim.source.account}
                type={AccountIcon.type.Small}/>
              <RX.Text style={Theme.Styles.contact.detailsBoxValue}>{claim.source.account.name} </RX.Text>
            </RX.View>)}

          </RX.View>)}
        </RX.View>}

        <RX.View style={Theme.Styles.contact.detailsInfoRow}>
          <RX.View style={Theme.Styles.row}>
            {map(signers, (issuer: User) => <AccountIcon
                key={issuer.did}
                account={issuer}
                type={AccountIcon.type.Micro}/>)}
            <RX.Button style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}
            onPress={this.props.signClaim}>
              <RX.Text style={Theme.Styles.contact.detailsLabel}>Sign</RX.Text>
            </RX.Button>
          </RX.View>

          <RX.Button style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}
          onPress={() => this.setState({showDetails: !this.state.showDetails})}>
            <RX.Text style={Theme.Styles.contact.detailsLabel}>{this.state.showDetails ? 'Hide' : 'Details'}</RX.Text>
          </RX.Button>

        </RX.View>

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
    setNewClaimType: (type: string) => dispatch(Actions.Contacts.setNewClaimType(type)),
    setNewClaimValue: (value: string) => dispatch(Actions.Contacts.setNewClaimValue(value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimActionsScreen)
