import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Theme from '../Theme'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  startLogin?: () => void
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
    return (
      <RX.View style={styles.screen}>
        <CallToAction
          title='Connect with uPort'
          onPress={this.props.startLogin}
        />
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    startLogin: () => dispatch(Actions.User.startLogin()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
