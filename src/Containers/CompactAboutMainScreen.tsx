import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, AboutDetails, ScrollView } from '../Components'
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
  uiTraits?: UITraits
}

class CompactAboutMasterScreen extends RX.Component<Props, null> {
  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>

          <AboutDetails
              navigate={this.props.navigate}
              routeName={''}
            />

        </ScrollView>
      </RX.View>
    )
  }
}
const styles = {
  cta: RX.Styles.createViewStyle({
    marginTop: Theme.Metrics.baseMargin,
  }),
}
const mapStateToProps = (state: CombinedState): Props => {
  return {
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateHome: () => dispatch(Actions.Navigation.navigateHome()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompactAboutMasterScreen)
