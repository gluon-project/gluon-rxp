import RX = require('reactxp')
const {TabRouter, createNavigator, createNavigationContainer} = require('react-navigation')

const TabView =  require('./TabView')

const TabNavigator = ( routeConfigs: any, config: any): any => {

  const router = TabRouter(routeConfigs, config)

  const navigator = createNavigator( router, routeConfigs, config)((props: any) => {
    return (<TabView {...props} />)
  })

  return createNavigationContainer(navigator, config.containerOptions)
}

export default TabNavigator
