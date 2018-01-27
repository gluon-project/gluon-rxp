import { WideRouter, CompactRouter } from '../Navigation/MasterDetailNavigator'
import { moreStack } from '../Navigation/NavigationConfiguration'
import { resetToInitialState } from '../Reducers/AppReducer'
import { navigateHome } from '../Reducers/NavigationActions'
import { NavigationActions } from 'react-navigation'
import * as _ from 'lodash'

const topRoutes = _.map(moreStack, (value, key) => { return key })

const initialAction = {
  type: 'Navigation/NAVIGATE',
  routeName: 'HomeTab',
}

const wideInitialState = WideRouter.getStateForAction(initialAction)
const compactInitialState = CompactRouter.getStateForAction(initialAction)

export const WideReducer = (state = wideInitialState, action: any) => {
  if (action.type === resetToInitialState().type || action.type === navigateHome().type) {
    return wideInitialState
  }

  const nextState = WideRouter.getStateForAction(action, state)

  return nextState || state
}

export const CompactReducer = (state = compactInitialState, action: any) => {
  if (
    action.type === resetToInitialState().type || action.type === navigateHome().type) {
    return compactInitialState
  }
  let nextState = CompactRouter.getStateForAction(action, state)

  if (state && action.type === 'Navigation/NAVIGATE'
    && (action.routeName === 'More' || action.routeName === 'SendTab')) {
    nextState.routes[nextState.index].routes = [nextState.routes[nextState.index].routes[0]]
    nextState.routes[nextState.index].index = 0
  } else if (action.type === 'Navigation/NAVIGATE'
    && nextState.routes[nextState.index].key === 'More'
    && _.findIndex(topRoutes, (route) => route === action.routeName) > -1) {

    const routesLength = nextState.routes[nextState.index].routes.length - 1
    nextState.routes[nextState.index].routes = [
      nextState.routes[nextState.index].routes[0],
      nextState.routes[nextState.index].routes[routesLength],
    ]
    nextState.routes[nextState.index].index = 1
  }

  return nextState || state
}
