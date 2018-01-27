import RX = require('reactxp')
import Router = require('reactxp-navigation')
const { StackNavigator } = Router
import { TabRouter, StackRouter, addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import { CombinedState } from '../Reducers'
import * as Selectors from '../Selectors'
import * as Screens from '../Containers'
import * as Theme from '../Theme'
import { TabBar } from '../Components'
import TabNavigator from './Navigators/TabNavigator'
import Actions from '../Reducers/Actions'

import { WideNavigationConfiguration, CompactNavigationConfiguration} from './NavigationConfiguration'

interface Props extends RX.CommonProps {
  uiTraits?: UITraits
  dispatch?: any
  compactNavigation?: any
  wideNavigation?: any
  navigate?: (routeName: string) => void
  screenProps?: any
}

const WideApp = TabNavigator(WideNavigationConfiguration, {})
export const WideRouter = WideApp.router

const CompactApp = TabNavigator(CompactNavigationConfiguration, {})
export const CompactRouter = CompactApp.router

class MasterDetailNavigator extends RX.Component<Props, null> {
  render() {
    const { wideNavigation, compactNavigation, dispatch } = this.props

    const navigation = this.props.uiTraits.horizontalIsCompact ? compactNavigation : wideNavigation

    const tabIndex = navigation.index
    const tabRouteName = navigation.routes[tabIndex].routeName
    const MasterComponent = WideNavigationConfiguration[tabRouteName] && WideNavigationConfiguration[tabRouteName].masterScreen || null

    return (
      <RX.View style={[Theme.Styles.scrollContainerNoMargins, !this.props.uiTraits.horizontalIsCompact && Theme.Styles.row]}>
        {!this.props.uiTraits.horizontalIsCompact && <TabBar
          // type={MasterComponent ? TabBar.type.Vertical : TabBar.type.VerticalWide}
          type={TabBar.type.Vertical}
          navigation={{ state: navigation }}
          navigate={this.props.navigate}
        />}

        {!this.props.uiTraits.horizontalIsCompact && MasterComponent && <RX.View style={Theme.Styles.masterView}>
          <MasterComponent navigation={{ state: navigation }}/>
        </RX.View>}
        <RX.View style={Theme.Styles.detailView}>
          {!this.props.uiTraits.horizontalIsCompact && <WideApp navigation={addNavigationHelpers({ dispatch, state: navigation })} />}
          {this.props.uiTraits.horizontalIsCompact && <CompactApp navigation={addNavigationHelpers({ dispatch, state: navigation })} />}
        </RX.View>

        {this.props.uiTraits.horizontalIsCompact && <TabBar
          type={TabBar.type.Horizontal}
          navigation={{ state: navigation }}
          navigate={this.props.navigate}
        />}

      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    uiTraits: state.app.uiTraits,
    compactNavigation: state.compactNavigation,
    wideNavigation: state.wideNavigation,
  }
}

const mapDispatchToProps = (dispatch: any): Props => {
  return {
    dispatch,
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterDetailNavigator)
