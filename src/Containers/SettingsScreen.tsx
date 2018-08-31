import RX = require('reactxp')
import { connect } from 'react-redux'
import {
  CallToAction,
  AccountIcon,
  ScrollView,
} from '../Components'
import { CombinedState } from '../Reducers'
import * as AppReducer from '../Reducers/AppReducer'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import Utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  syncCodePushDeployment?: (codePushDeployment: CodePushDeployment) => void
  codePushDeployments?: CodePushDeployment[]
  appVersion?: string
  resetToInitialState?: () => void
  environment?: string
  showEnvironmentPicker?: () => void
  logout?: () => void
  currentMatrixUser?: MatrixUser
  currentUser?: User,
}

class SettingsScreen extends RX.Component<Props, null> {
  render() {
    return (
      <ScrollView>
        <RX.View style={Theme.Styles.containerFull}>
          {this.props.currentUser && <RX.View style={Theme.Styles.accountInfo.wrapper}>
            <AccountIcon
              account={this.props.currentUser}
              type={AccountIcon.type.Large}
              />
            <RX.Text style={Theme.Styles.accountInfo.title}>
              {this.props.currentUser.name}
            </RX.Text>
            {this.props.currentUser.address !== this.props.currentUser.name && <RX.Text style={Theme.Styles.accountInfo.subTitle}>
              {Utils.address.short(this.props.currentUser.address)}
            </RX.Text>}
            {this.props.currentMatrixUser && <RX.Text style={Theme.Styles.accountInfo.subTitle}>
              {this.props.currentMatrixUser.user_id}
            </RX.Text>}

          </RX.View>}

          {this.props.currentMatrixUser && <CallToAction
              type={CallToAction.type.Default}
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
