import RX = require('reactxp')
const propTypes = require('prop-types')

declare interface Props {
  navigation: any
  screenProps: any
  component: any
}

class SceneView extends RX.Component<Props, null> {
  static childContextTypes = {
    navigation: propTypes.object.isRequired,
  }

  getChildContext() {
    return {
      navigation: this.props.navigation,
    }
  }

  render() {
    const {
      screenProps,
      navigation,
      component: Component,
    } = this.props

    return <Component screenProps={screenProps} navigation={navigation} />
  }
}
module.exports = SceneView
