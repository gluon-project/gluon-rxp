import RX = require('reactxp')
import { connect } from 'react-redux'
import {
  CallToAction,
  AccountIcon,
  ScrollView,
  FilePicker,
  SectionHeader,
} from '../Components'
import { CombinedState } from '../Reducers'
import * as AppReducer from '../Reducers/AppReducer'
import Actions from '../Reducers/Actions'
import { FileSaver } from '../Services'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import Utils from '../Utils'
import { uniqBy, forEach, isArray } from 'lodash'
import * as moment from 'moment'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  syncCodePushDeployment?: (codePushDeployment: CodePushDeployment) => void
  codePushDeployments?: CodePushDeployment[]
  appVersion?: string
  resetToInitialState?: () => void
  environment?: string
  showEnvironmentPicker?: () => void
  deleteLocalClaims?: () => void
  logout?: () => void
  currentMatrixUser?: MatrixUser
  currentUser?: User,
  claims?: VerifiableClaim[]
  saveClaimsLocally?: (jwts: string[]) => void
  startLogin?: (networkId: string) => void
}

class SettingsScreen extends RX.Component<Props, null> {
  private handleDeleteClaims = () => {
    this.props.deleteLocalClaims()
  }

  private handleExportClaims = () => {
    //
    FileSaver.save( moment().format() + '-claims.json',
    JSON.stringify({claims: uniqBy(this.props.claims, claim => claim.jwt).map(claim => claim.jwt)}))
  }

  private handleImportClaims = (data: any) => {
    try {
      let jwts: string[] = []
      forEach(data, (item: any) => {
        const json = JSON.parse(item.contents)
        if (isArray(json.claims)) {
          jwts = jwts.concat(json.claims)
        }
      })
      this.props.saveClaimsLocally(jwts)
    } catch (e) {
      console.log(e)
    }

  }

  render() {
    return (
      <ScrollView>
        <RX.View style={Theme.Styles.containerFull}>
          {this.props.currentUser && <RX.View style={[Theme.Styles.accountInfo.wrapper, Theme.Styles.accountInfo.wrapperNoBorder]}>
            <AccountIcon
              account={this.props.currentUser}
              type={AccountIcon.type.Large}
              />
            <RX.Text style={Theme.Styles.accountInfo.title}>
              {this.props.currentUser.name}
            </RX.Text>
            {this.props.currentUser.address !== this.props.currentUser.name && <RX.Text style={Theme.Styles.accountInfo.subTitle}>
              {Utils.address.short(this.props.currentUser.address)} {Utils.address.mnidToNetworkName(this.props.currentUser.mnid)}
            </RX.Text>}
            {this.props.currentMatrixUser && <RX.Text style={Theme.Styles.accountInfo.subTitle}>
              {this.props.currentMatrixUser.user_id}
            </RX.Text>}

          </RX.View>}

          <SectionHeader title='Networks' padded/>

          <CallToAction
            type={CallToAction.type.Main}
            title={'Switch to Mainnet'}
            onPress={() => this.props.startLogin('mainnet')}
          />

          <CallToAction
            type={CallToAction.type.Main}
            title={'Switch to Rinkeby'}
            onPress={() => this.props.startLogin('rinkeby')}
          />

          <SectionHeader title='Claims' padded/>

          <CallToAction
            type={CallToAction.type.Main}
            title={'Export all local claims'}
            onPress={this.handleExportClaims}
          />

          <FilePicker
            title={'Import claims'}
            onChange={this.handleImportClaims}
          />

          <CallToAction
            type={CallToAction.type.Secondary}
            title={'Delete all local claims'}
            onPress={this.handleDeleteClaims}
          />

          <SectionHeader title='Access' padded/>

          {this.props.currentMatrixUser && <CallToAction
              type={CallToAction.type.Secondary}
              title={'Logout'}
              onPress={() => this.props.logout()}
            />}

          <RX.Text style={Theme.Styles.about.warning}>
            All your contacts and token lists are stored locally.
          </RX.Text>
          {/* {RX.Platform.getType() !== 'web' && <RX.View><RX.Text style={Theme.Styles.sectionTitle}>
            APP DEPLOYMENTS
          </RX.Text>
          {this.props.codePushDeployments.map(codePushDeployment => <CallToAction
            type={CallToAction.type.Default}
            key={codePushDeployment.key}
            title={codePushDeployment.name}
            onPress={() => this.props.syncCodePushDeployment(codePushDeployment)}
          />)}
          <RX.Text style={Theme.Styles.sectionTitle}>
            {this.props.appVersion}
          </RX.Text></RX.View>} */}
        </RX.View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    currentUser: Selectors.Contacts.getAccountByAddress(state, state.transactions.new.sender),
    claims: Selectors.Contacts.getLocalClaims(state),
    currentMatrixUser: Selectors.Matrix.getCurrentUser(state),
    codePushDeployments: Selectors.App.getCodePushDeployments(state),
    appVersion: state.app.version,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    syncCodePushDeployment: (codePushDeployment: CodePushDeployment) =>
      dispatch(AppReducer.syncCodePushDeployment(codePushDeployment)),
    resetToInitialState: () => dispatch(Actions.App.resetToInitialState()),
    logout: () => dispatch(Actions.User.logout()),
    saveClaimsLocally: (jwts: string[]) => dispatch(Actions.Contacts.saveClaimsLocally(jwts)),
    deleteLocalClaims: () => dispatch(Actions.Contacts.deleteLocalClaims()),
    startLogin: (networkId: string) => dispatch(Actions.User.startLogin(networkId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
