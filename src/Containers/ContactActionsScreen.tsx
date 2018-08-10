import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem, ClaimBox, AccountIcon } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as moment from 'moment'
import { map, groupBy, isNumber, keys, countBy } from 'lodash'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  claims?: VerifiableClaim[]
  selectedContact?: string,
  uiTraits?: UITraits
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
  }

  getGroupedClaims() {
    let result: any = []
    const grouped = groupBy(this.props.claims, 'claimType')
    result = map(grouped, (group, title) => {
      const groupedValues = groupBy(group, 'claimValue')
      return {
        title,
        items: groupedValues,
      }
    })
    return result
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <RX.View style={Theme.Styles.scrollContainer}>

            {map(this.getGroupedClaims(), (group: any, key: any) => <RX.View key={key}>
              <RX.Text style={Theme.Styles.contact.groupTitle}>{group.title}</RX.Text>
              <RX.View>
                {map(group.items, (claims: any, value: string) =>
                <GroupItem key={value} title={value} claims={claims} />)}
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
          <CallToAction
            type={CallToAction.type.Secondary}
            title={this.state.showDetails ? 'Hide details' : 'Show details'}
            onPress={() => this.setState({showDetails: !this.state.showDetails})}
          />
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
    const numberOfSignings = keys(countBy(this.props.claims, (claim: VerifiableClaim) => claim.jwt)).length
    return (
      <RX.View>
        <RX.Button style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}
        onPress={() => this.setState({showDetails: !this.state.showDetails})}>
          <RX.Text style={Theme.Styles.contact.groupListItem}>{this.props.title}</RX.Text>
          <RX.Text style={Theme.Styles.contact.info}>({numberOfUniqSigners} / {numberOfSignings})</RX.Text>
        </RX.Button>
        {this.state.showDetails && <RX.View>
          {map(this.getGroupedClaims(), (group: VerifiableClaim[], key: any) =>
          <RX.View key={key} style={Theme.Styles.contact.detailsWrapper}>
            <RX.View style={Theme.Styles.row}>
              <RX.Text style={Theme.Styles.claimBox.issuer}>Issued by: </RX.Text>
              <AccountIcon account={group[0].issuer} type={AccountIcon.type.Micro}/>
              <RX.Text style={Theme.Styles.claimBox.issuer}> {group[0].issuer.name} </RX.Text>
            </RX.View>
            <RX.Text style={Theme.Styles.claimBox.issuer}>Issued: {moment.unix(group[0].iat).calendar()}</RX.Text>
            {isNumber(group[0].exp) &&
            <RX.Text style={Theme.Styles.claimBox.issuer}>Issued: {moment.unix(group[0].exp).calendar()}</RX.Text>}
            <RX.Text style={Theme.Styles.claimBox.issuer}>Source: </RX.Text>
            {map(group, (claim, key2) => <RX.View style={Theme.Styles.contact.sourceRow} key={key2}>
                <AccountIcon
                account={claim.source.account}
                type={AccountIcon.type.Micro}/>
              <RX.Text style={Theme.Styles.claimBox.issuer}>{claim.source.account.name} </RX.Text>
            </RX.View>)}

          </RX.View>)}
        </RX.View>}
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimActionsScreen)
