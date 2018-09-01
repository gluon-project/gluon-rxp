import RX = require('reactxp')
import { connect } from 'react-redux'
import { Icons, CallToAction, ScrollView, ListItem, ClaimBox, AccountIcon } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as moment from 'moment'
import { FileSaver } from '../Services'
import { map, forEach, groupBy, isNumber, keys, countBy, orderBy, uniqBy } from 'lodash'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  claims?: VerifiableClaim[]
  selectedContact?: string,
  uiTraits?: UITraits,
  setNewClaimType?: (type: string) => void
  setNewClaimValue?: (value: string) => void
  currentUser?: User,
  saveClaimsLocally?: (jwts: string[]) => void
}

class ClaimActionsScreen extends RX.Component<Props, null> {

  constructor(props: Props) {
    super(props)

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
                <GroupItem
                  key={value}
                  title={value}
                  claims={claims}
                  currentUser={this.props.currentUser}
                  signClaim={() => this.handleSignClaim(claims[0])}
                  saveClaimsLocally={this.props.saveClaimsLocally}
                  />)}
              </RX.View>
            </RX.View>)}

          </RX.View>

          <CallToAction
            type={CallToAction.type.Main}
            title='New Claim'
            onPress={() => this.props.navigate('ContactForm')}
          />

          {this.props.claims && this.props.claims.length > 0 && <CallToAction
            type={CallToAction.type.Main}
            title='Export to file'
            onPress={() => FileSaver.save(this.props.claims[0].subject.name + '-claims.json',
              JSON.stringify({claims: uniqBy(this.props.claims, claim => claim.jwt).map(claim => claim.jwt)}),
            )}
          />}

          {this.props.claims && this.props.claims.length > 0 && <CallToAction
            type={CallToAction.type.Main}
            title='Save locally'
            onPress={() => this.props.saveClaimsLocally(this.props.claims.map(claim => claim.jwt))}
          />}

        </ScrollView>
      </RX.View>
    )
  }
}

interface GroupItemProps extends RX.CommonProps {
  title: string,
  claims: VerifiableClaim[]
  signClaim: () => void
  currentUser?: User,
  saveClaimsLocally?: (jwts: string[]) => void
}
interface GroupItemState {
  showActions: boolean
}
class GroupItem extends RX.Component<GroupItemProps, GroupItemState> {

  constructor(props: GroupItemProps) {
    super(props)
    this.state = {
      showActions: false,
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
    const claimsBySource = groupBy(this.props.claims, (claim: VerifiableClaim) => claim.source.type)
    const sources: any[] = []
    forEach(claimsBySource, (claims: VerifiableClaim[]) => {
      sources.push(claims[0].source)
    })
    const numberOfSignings = keys(countBy(this.props.claims, (claim: VerifiableClaim) => claim.jwt)).length
    const claimType = this.props.claims[0].claimType
    return (
      <RX.View style={Theme.Styles.contact.groupListItem}>
        {claimType === 'Avatar' && <RX.View style={Theme.Styles.contact.groupListItemAvatar}>
          <AccountIcon  account={{avatar: this.props.title}} type={AccountIcon.type.Large} />
        </RX.View>}
        {claimType !== 'Avatar' && <RX.Text style={Theme.Styles.contact.groupListItemTitle}>{this.props.title}</RX.Text>}

        <RX.View style={Theme.Styles.contact.detailsInfoRow}>

          <RX.View>
            <RX.View style={[Theme.Styles.row, {alignItems: 'center'}]}>
              {map(sources, (source: any, key: any) => <AccountIcon
                  key={key}
                  account={source.account}
                  type={AccountIcon.type.Custom} size={20}/>)}
              <RX.Text style={Theme.Styles.contact.info}>Sources</RX.Text>
            </RX.View>
            <RX.View style={[Theme.Styles.row, {marginTop: 10, alignItems: 'center'}]}>
              {map(signers, (issuer: User) => <AccountIcon
                  key={issuer.did}
                  account={issuer}
                  type={AccountIcon.type.Custom} size={20}/>)}
                <RX.Text style={Theme.Styles.contact.info}>Signers</RX.Text>
            </RX.View>
          </RX.View>

          <RX.Button style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}
          >
            <Icons.ChevronRightIcon />
          </RX.Button>

        </RX.View>

        {!this.state.showActions && <RX.View style={[Theme.Styles.row, {alignItems: 'center', justifyContent: 'space-between'}]}>

          <RX.Button
            style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}
            onPress={this.props.signClaim}>
            <AccountIcon account={this.props.currentUser} type={AccountIcon.type.Custom} size={20}/>
            <RX.Text style={Theme.Styles.contact.detailsLabel}>Sign</RX.Text>
          </RX.Button>

          <RX.Button
            style={{justifyContent: 'center', alignItems: 'center', height: 20, width: Theme.Metrics.buttonHeight}}
            onPress={() => this.setState({showActions: true})}>
            <Icons.MoreIcon fill={Theme.Colors.brand}/>
          </RX.Button>

        </RX.View>}
        {this.state.showActions && <RX.View>
          <CallToAction
            account={this.props.currentUser}
            type={CallToAction.type.Main}
            title='Sign'
            onPress={this.props.signClaim}
          />
          <CallToAction
            type={CallToAction.type.Main}
            title='Export to file'
            onPress={() => FileSaver.save(this.props.claims[0].subject.name + '-' + this.props.claims[0].claimType + '-claims.json',
              JSON.stringify({claims: uniqBy(this.props.claims, claim => claim.jwt).map(claim => claim.jwt)}),
            )}
          />
          <CallToAction
            type={CallToAction.type.Main}
            title='Save locally'
            onPress={() => this.props.saveClaimsLocally(this.props.claims.map(claim => claim.jwt))}
          />
          <CallToAction
            type={CallToAction.type.Secondary}
            title='Cancel'
            onPress={() => this.setState({showActions: false})}
          />
        </RX.View>}
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    currentUser: Selectors.Contacts.getAccountByAddress(state, state.transactions.new.sender),
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
    saveClaimsLocally: (jwts: string[]) => dispatch(Actions.Contacts.saveClaimsLocally(jwts)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimActionsScreen)
