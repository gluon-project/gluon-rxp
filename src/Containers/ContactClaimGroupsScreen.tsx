import RX = require('reactxp')
import { connect } from 'react-redux'
import { Icons, CallToAction, ScrollView, ListItem, ClaimBox, AccountIcon } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as moment from 'moment'
import { FileSaver } from '../Services'
import { map, forEach, groupBy, isNumber, keys, countBy, orderBy, uniqBy, filter } from 'lodash'
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
  groupClaimsBy?: {
    claimType: string,
    claimValue: string,
  }
  setGroupClaimsBy?: (options: any) => void
}

class ContactClaimGroupsScreen extends RX.Component<Props, null> {

  constructor(props: Props) {
    super(props)

    this.getGroupedClaims = this.getGroupedClaims.bind(this)
    this.handleSignClaim = this.handleSignClaim.bind(this)
  }

  getGroupedClaims() {
    let result: any = []
    const claims = filter(this.props.claims, (claim: VerifiableClaim) => claim.claimType === this.props.groupClaimsBy.claimType
      && claim.claimValue === this.props.groupClaimsBy.claimValue)
    const grouped = groupBy(orderBy(claims, 'claimType'), 'claimType')
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
                  setGroupClaimsBy={this.props.setGroupClaimsBy}
                  navigate={this.props.navigate}
                  />)}
              </RX.View>
            </RX.View>)}

          </RX.View>

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
  navigate?: (routeName: string) => void
  setGroupClaimsBy?: (options: any) => void
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

    const claimsBySource = groupBy(this.props.claims, (claim: VerifiableClaim) => claim.source.account.name)
    const sources: any[] = []
    forEach(claimsBySource, (claims: VerifiableClaim[]) => {
      sources.push({
        source: claims[0].source,
        claims: uniqBy(claims, (claim: VerifiableClaim) => claim.iss),
      })
    })

    const numberOfSignings = keys(countBy(this.props.claims, (claim: VerifiableClaim) => claim.jwt)).length
    const claimType = this.props.claims[0].claimType
    return (
      <RX.View style={Theme.Styles.contact.groupListItem}>
        {claimType === 'Avatar' && <RX.View style={Theme.Styles.contact.groupListItemAvatar}>
          <AccountIcon  account={{avatar: this.props.title}} type={AccountIcon.type.Large} />
        </RX.View>}
        {claimType !== 'Avatar' && <RX.Text style={Theme.Styles.contact.groupListItemTitle}>{this.props.title}</RX.Text>}

          {map(sources, (source: any, key: any) => <RX.View
            key={key}>
            <RX.View style={Theme.Styles.contact.groupedClaimSourceTitleRow}>

              <AccountIcon
                key={key}
                account={source.source.account}
                type={AccountIcon.type.Custom}
                size={46}
                />
              <RX.View style={{marginLeft: Theme.Metrics.smallMargin}}>
                <RX.Text style={Theme.Styles.contact.groupedClaimSourceTitle}>{source.source.account.name}</RX.Text>
                <RX.Text style={Theme.Styles.contact.info}>{source.claims.length} signers</RX.Text>

              </RX.View>
            </RX.View>

            <RX.View style={{flex: 1, flexDirection: 'row', marginBottom: 30}}>
            <RX.View style={{flex: 1}} />
            <RX.View style={{flex: 3}} >
              {map(source.claims, (claim: VerifiableClaim, index: number) => <RX.Button
                style={{padding: 0}}
                onPress={() => {
                  this.props.setGroupClaimsBy({
                    claimType: claim.claimType,
                    claimValue: claim.claimValue,
                    source: claim.source,
                    issuer: claim.issuer,
                  })
                  this.props.navigate('ContactClaimDetails')
                }}
                key={claim.issuer.did}>
                <RX.View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', height: 66}}>

                <AccountIcon
                  account={claim.issuer}
                  type={AccountIcon.type.Custom} size={46}/>

                <RX.View style={{
                  flex: 1, height: 46, alignItems: 'center', justifyContent: 'center'}}>
                  <RX.View style={{
                    position: 'absolute', left: 0, right: 0, top: 24, height: 1, backgroundColor: Theme.Colors.borderColor,
                  }} />
                  <Icons.ChevronRightIcon />
                </RX.View>

                {index === 0 && <AccountIcon
                  account={claim.subject}
                  type={AccountIcon.type.Custom} size={46}/>}

                {index !== 0 && <RX.View style={{height: 66, width: 46}}>
                  <RX.View style={{
                    height: 45,
                    width: 23,
                    borderBottomRightRadius: 23,
                    borderColor: Theme.Colors.borderColor,
                    borderBottomWidth: Theme.Metrics.borderWidth,
                    borderRightWidth: Theme.Metrics.borderWidth,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                    }}/>
                    {index !== source.claims.length - 1 && <RX.View style={{
                      position: 'absolute',
                      height: 66,
                      width: Theme.Metrics.borderWidth,
                      top: 0,
                      bottom: 0,
                      left: 22,
                      backgroundColor: Theme.Colors.borderColor,
                      }}/>}
                </RX.View>}
                </RX.View>
              </RX.Button>)}
              </RX.View>
              <RX.View style={{flex: 1}} />

            </RX.View>

          </RX.View>)}

        {!this.state.showActions && <RX.View style={[Theme.Styles.row, {
          alignItems: 'center', justifyContent: 'space-between',
          borderColor: Theme.Colors.borderColor,
          borderTopWidth: Theme.Metrics.borderWidth,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingTop: 15,
        }]}>

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
        {this.state.showActions && <RX.View style={{
          borderColor: Theme.Colors.borderColor,
          borderTopWidth: Theme.Metrics.borderWidth,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingTop: 15,
        }}>
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
    groupClaimsBy: Selectors.Contacts.getGroupClaimsBy(state),
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
    setGroupClaimsBy: (options: any) => dispatch(Actions.Contacts.setGroupClaimsBy(options)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactClaimGroupsScreen)
