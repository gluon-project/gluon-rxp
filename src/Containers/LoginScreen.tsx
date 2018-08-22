import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, MatrixLogin, Icons } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  startLogin?: () => void
  currentUser?: User,
  currentMatrixUser?: MatrixUser,
  matrixLogin?: (username: string, password: string, baseUrl: string) => void
  matrixRegister?: (username: string, password: string, baseUrl: string) => void
  isLoggingIn?: boolean
  isRegistering?: boolean
  uiTraits?: UITraits
}

const styles = {
  screen: RX.Styles.createViewStyle({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  }),
}
class LoginScreen extends RX.Component<Props, null> {

  render() {
    const isWeb = RX.Platform.getType() === 'web'
    return (
      <RX.Image
        style={Theme.Styles.bgImage}
        source={require('../../src/Assets/bg_cloud.jpg')}
        resizeMode='cover'
        >
        <ScrollView transparent>
            <RX.View style={[Theme.Styles.container, {
              alignItems: 'center',
              marginBottom: this.props.uiTraits.horizontalIsCompact ? 44 : 80,
              marginTop: this.props.uiTraits.horizontalIsCompact ? 44 : 80,
              }]}>
              <Icons.LogoIcon
                width={this.props.uiTraits.horizontalIsCompact ? 64 : 120}
                height={this.props.uiTraits.horizontalIsCompact ? 74 : 139}
                fill='#fff'
                type={this.props.uiTraits.horizontalIsCompact ? 'medium' : 'large'}
                />
            </RX.View>
            {!this.props.currentUser && <RX.View style={Theme.Styles.scrollContainer}>
              {/* {isWeb && <RX.Text style={[Theme.Styles.about.p, {textAlign: 'center'}]}>No Web3 provider detected.</RX.Text>} */}
              {/* {isWeb && <RX.Text style={[Theme.Styles.about.p, {textAlign: 'center'}]}>
              Unlock your Metamask or login with uPort</RX.Text>} */}
              <CallToAction
                title='Login with uPort'
                onPress={this.props.startLogin}
              />
              <RX.View style={[Theme.Styles.row, {justifyContent: 'center', marginTop: 50}]}>
                <RX.Button onPress={() => RX.Linking.openUrl('https://itunes.apple.com/us/app/uport-id/id1123434510?mt=8')}>
                  <RX.Image
                    source={require('../../src/Assets/appstore.png')}
                    style={{width: 120, height: 40, marginRight: Theme.Metrics.smallMargin}}
                    />
                </RX.Button>
                <RX.Button onPress={() => RX.Linking.openUrl('https://play.google.com/store/apps/details?id=com.uportMobile')}>
                  <RX.Image
                    source={require('../../src/Assets/googleplay.png')}
                    style={{width: 135, height: 40}}
                    />
                </RX.Button>
              </RX.View>

            </RX.View>}
            {this.props.currentUser && !this.props.currentMatrixUser && <MatrixLogin
                login={this.props.matrixLogin}
                register={this.props.matrixRegister}
                isLoggingIn={this.props.isLoggingIn}
                isRegistering={this.props.isRegistering}
            />}
          </ScrollView>
      </RX.Image>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    isLoggingIn: Selectors.Process.isRunningProcess(state, Enums.ProcessType.MatrixLogin),
    isRegistering: Selectors.Process.isRunningProcess(state, Enums.ProcessType.MatrixRegister),
    currentMatrixUser: Selectors.Matrix.getCurrentUser(state),
    currentUser: state.user.current,
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    matrixLogin: (username: string, password: string, baseUrl: string) => dispatch(Actions.Matrix.login({username, password, baseUrl})),
    matrixRegister: (username: string, password: string, baseUrl: string) =>
    dispatch(Actions.Matrix.register({username, password, baseUrl})),
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    startLogin: () => dispatch(Actions.User.startLogin()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
