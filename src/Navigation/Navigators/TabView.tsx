import RX = require('reactxp')
const SceneView = require('./SceneView')
const withCachedChildNavigation = require('react-navigation/lib/withCachedChildNavigation').default

declare interface Props {
  navigation?: any
  screenProps?: any
  component?: any
  childNavigationProps?: any
  router?: any
}

class TabView extends RX.Component<Props, null> {

  _renderScene = (route : any) => {
    const { screenProps } = this.props
    const childNavigation = this.props.childNavigationProps[route.key]
    const TabComponent = this.props.router.getComponentForRouteName(
      route.routeName,
    )
    return (
      <SceneView
        screenProps={screenProps}
        component={TabComponent}
        navigation={childNavigation}
      />
    )
  }

  render() {
    const {
      router,
      screenProps,
    } = this.props

    const { state } = this.props.navigation
    const options = router.getScreenOptions(
      this.props.childNavigationProps[state.routes[state.index].key],
      screenProps || {},
    )
    const route = state.routes[state.index]

    return <RX.View style={styles.container}>
      {this._renderScene(route)}
    </RX.View>
  }
}

const TabViewEnhanced = withCachedChildNavigation(TabView)

module.exports = TabViewEnhanced

const styles = {
  container: RX.Styles.createViewStyle({
    flex: 1,
  }),
}
