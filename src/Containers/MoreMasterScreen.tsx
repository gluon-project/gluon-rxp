import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Theme from '../Theme'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigation?: any
}

class MoreMasterScreen extends RX.Component<Props, null> {
  render() {
    const tabIndex = this.props.navigation.state.index
    const index = tabIndex && this.props.navigation.state.routes[tabIndex].index
    const routeName = tabIndex ? this.props.navigation.state.routes[tabIndex].routes[index].routeName : ''
    return (
      <RX.ScrollView style={[Theme.Styles.scrollContainer, Theme.Styles.masterViewContainer]}>
        <RX.View style={Theme.Styles.container}>
          <CallToAction
            type={routeName === 'Help' ? CallToAction.type.Branded : CallToAction.type.Default}
            title={'Help'}
            onPress={() => this.props.navigate('Help')}
          />
          <CallToAction
            type={routeName === 'Settings' ? CallToAction.type.Branded : CallToAction.type.Default}
            title={'Settings'}
            onPress={() => this.props.navigate('Settings')}
          />
        </RX.View>
      </RX.ScrollView>
    )
  }
}
const styles = {
  image: RX.Styles.createImageStyle({
    flex: 1,
  }),
}
const mapStateToProps = (state: CombinedState): Props => {
  return {
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MoreMasterScreen)
