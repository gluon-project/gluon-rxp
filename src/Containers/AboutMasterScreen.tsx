import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, AboutDetails, NavBar } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateHome?: () => void
  navigation?: any,
}

class SendMasterScreen extends RX.Component<Props, null> {
  render() {
    const tabIndex = this.props.navigation.state.index
    const index = this.props.navigation.state.routes[tabIndex].index
    const routeName = this.props.navigation.state.routes[tabIndex].routes[index].routeName
    return (
      <RX.View style={Theme.Styles.containerFull}>
        <NavBar title='About' />
        <RX.ScrollView style={[Theme.Styles.scrollContainerNoMargins, Theme.Styles.masterViewContainer]}>
          <AboutDetails
            navigate={this.props.navigate}
            routeName={routeName}
          />
        </RX.ScrollView>
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
    navigateHome: () => dispatch(Actions.Navigation.navigateHome()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SendMasterScreen)
