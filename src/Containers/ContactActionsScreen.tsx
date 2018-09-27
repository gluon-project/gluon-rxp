import RX = require('reactxp')
import { connect } from 'react-redux'
import { Icons, CallToAction, ScrollView, ListItem, ClaimBox, AccountIcon } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import Utils from '../Utils'
import * as moment from 'moment'
import { FileSaver } from '../Services'
import { map, forEach, groupBy, isNumber, keys, countBy, orderBy, uniqBy, without } from 'lodash'
import utils from '../Utils'
import { AccountIconType } from '../Components/AccountIcon'

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
  setGroupClaimsBy?: (options: any) => void
  selectedContactAcount?: User,
  setModalMessage?: (config: ModalMessageConfig) => void
  setIsSend?: (isSend: boolean) => void
  setReceiver?: (receiver: string) => void
}

class ClaimActionsScreen extends RX.Component<Props, null> {

  constructor(props: Props) {
    super(props)

    this.getGroupedClaims = this.getGroupedClaims.bind(this)
    this.handleSignClaim = this.handleSignClaim.bind(this)
    this.handleRequest = this.handleRequest.bind(this)
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
  handleRequest() {

    this.props.setModalMessage({
      type: Enums.MessageType.Success,
      title: 'Address',
      message: 'Copy address',
      inputText: this.props.selectedContactAcount.address,
      ctaTitle: 'Close',
    } as ModalMessageConfig)
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
                  navigate={this.props.navigate}
                  setGroupClaimsBy={this.props.setGroupClaimsBy}
                  setModalMessage={this.props.setModalMessage}
                  />)}
              </RX.View>
            </RX.View>)}

          {this.props.selectedContactAcount && <RX.View style={{flex: 1, justifyContent: 'center',
          alignItems: 'center', padding: Theme.Metrics.baseMargin}}>
            <RX.Text style={[Theme.Styles.contact.addressInfoDid, {marginTop: Theme.Metrics.smallMargin}]}>
                {this.props.selectedContactAcount.did}
              </RX.Text>
          </RX.View>}

          </RX.View>

          {this.props.claims && this.props.claims.length > 0 && <CallToAction
            type={CallToAction.type.Main}
            title='New Claim'
            onPress={() => this.props.navigate('ContactForm')}
          />}

          {this.props.claims && this.props.claims.length > 0 && <CallToAction
            type={CallToAction.type.Secondary}
            title='Export to file'
            onPress={() => FileSaver.save(this.props.claims[0].subject.name + '-claims.json',
              JSON.stringify({claims: uniqBy(this.props.claims, claim => claim.jwt).map(claim => claim.jwt)}),
            )}
          />}

          {this.props.claims && this.props.claims.length > 0 && <CallToAction
            type={CallToAction.type.Secondary}
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
  navigate?: (routeName: string) => void
  setGroupClaimsBy?: (options: any) => void
  setModalMessage?: (config: ModalMessageConfig) => void
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
    const claimsBySource = groupBy(this.props.claims, (claim: VerifiableClaim) => claim.source.account.name)
    const sources: any[] = []
    forEach(claimsBySource, (claims: VerifiableClaim[]) => {
      sources.push(claims[0].source)
    })
    const numberOfSignings = keys(countBy(this.props.claims, (claim: VerifiableClaim) => claim.jwt)).length
    const claimType = this.props.claims[0].claimType
    const claimValue = this.props.claims[0].claimValue
    return (
      <RX.View style={Theme.Styles.contact.groupListItem}>
        {claimType === 'Avatar' && <RX.View style={Theme.Styles.contact.groupListItemAvatar}>
          <AccountIcon  account={{avatar: this.props.title}} type={AccountIcon.type.Large} />
        </RX.View>}
        {claimType === 'Mnid' && <RX.View style={Theme.Styles.contact.groupListItemAvatar}>
          <RX.Text style={Theme.Styles.contact.addressInfoDid}>
            {utils.address.mnidToNetworkName(this.props.title)}
          </RX.Text>

          <RX.View style={[Theme.Styles.row, {justifyContent: 'center'}]}>
            <AccountIcon  account={{address: utils.address.universalIdToNetworkAddress(this.props.title)}} type={AccountIcon.type.Small} />
            <RX.Text style={Theme.Styles.contact.groupListItemTitle}>
              {utils.address.short(utils.address.universalIdToNetworkAddress(this.props.title))}
            </RX.Text>
          </RX.View>

          <RX.Button
          onPress={() => this.props.setModalMessage({
            type: Enums.MessageType.Success,
            title: 'Address',
            message: 'Copy address',
            inputText: utils.address.universalIdToNetworkAddress(this.props.title),
            ctaTitle: 'Close',
          } as ModalMessageConfig)}
          style={{flex: 1, justifyContent: 'center',
          alignItems: 'center'}}>
              <RX.Text style={[Theme.Styles.contact.detailsLabel]}>
                Copy address
              </RX.Text>
            </RX.Button>

        </RX.View>}
        {claimType !== 'Avatar' && claimType !== 'Mnid'
        && <RX.Text style={Theme.Styles.contact.groupListItemTitle}>{this.props.title}</RX.Text>}

        <RX.Button
          onPress={() => {
            this.props.setGroupClaimsBy({
              claimType,
              claimValue,
            })
            this.props.navigate('ContactClaimGroups')
          }}
          style={Theme.Styles.contact.detailsInfoRow}>

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

          <RX.View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}
          >
            <Icons.ChevronRightIcon />
          </RX.View>

        </RX.Button>

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
  const selectedContact = Selectors.Contacts.getSelectedContact(state)
  return {
    currentUser: Selectors.Contacts.getAccountByDid(state, state.user.current.did),
    claims: Selectors.Contacts.getSelectedContactClaims(state),
    selectedContact,
    selectedContactAcount: Selectors.Contacts.getAccountByDid(state, selectedContact),
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
    setModalMessage: (config: ModalMessageConfig) => dispatch(Actions.ModalMessage.setModalMessage(config)),
    setIsSend: (isSend: boolean) => dispatch(Actions.Transactions.setIsSend(isSend)),
    setReceiver: (receiver: string) => dispatch(Actions.Transactions.setReceiver(receiver)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimActionsScreen)
