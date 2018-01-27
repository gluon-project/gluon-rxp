import RX = require('reactxp')
import { connect } from 'react-redux'
import {
  CallToAction,
  ToggleSwitch,
  ScrollView,
} from '../Components'
import { CombinedState } from '../Reducers'
import * as AppReducer from '../Reducers/AppReducer'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'

interface Props extends RX.CommonProps {
  syncCodePushDeployment?: (codePushDeployment: CodePushDeployment) => void
  codePushDeployments?: CodePushDeployment[]
  appVersion?: string
  sampleFlag?: boolean,
  setSampleFlag?: (value: boolean) => void
  resetToInitialState?: () => void
  environment?: string
  showEnvironmentPicker?: () => void
}

class SettingsScreen extends RX.Component<Props, null> {
  render() {
    return (
      <ScrollView>
        <RX.Text style={Theme.Styles.sectionTitle}>
        DEBUG
        </RX.Text>
        <CallToAction
          type={CallToAction.type.Default}
          title={'Reset to initial state'}
          onPress={() => this.props.resetToInitialState()}
        />
        {/*<RX.Text style={Theme.Styles.sectionTitle}>
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
        </RX.Text>*/}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    codePushDeployments: Selectors.App.getCodePushDeployments(state),
    appVersion: state.app.version,
    sampleFlag: state.settings.sampleFlag,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    syncCodePushDeployment: (codePushDeployment: CodePushDeployment) =>
      dispatch(AppReducer.syncCodePushDeployment(codePushDeployment)),
    setSampleFlag: (value: boolean) => dispatch(Actions.Settings.setSampleFlag(value)),
    resetToInitialState: () => dispatch(Actions.App.resetToInitialState()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
