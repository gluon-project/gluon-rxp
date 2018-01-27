import RX = require('reactxp')
import * as Theme from '../Theme'

export default class LoadingScreen extends RX.Component<null, null> {
  private _translationValue: RX.Animated.Value
  private _animatedStyle: RX.Types.AnimatedTextStyleRuleSet

  constructor(props: any) {
    super(props)
    this._translationValue = new RX.Animated.Value(1)
    this._animatedStyle = RX.Styles.createAnimatedTextStyle({
      transform: [
        {
          scale: this._translationValue,
        },
      ],
    })
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    let animation = RX.Animated.sequence([
      RX.Animated.timing(this._translationValue, {
        toValue: 1.5,
        easing: RX.Animated.Easing.In(),
        duration: 500,
      }),
      RX.Animated.timing(this._translationValue, {
        toValue: 1,
        easing: RX.Animated.Easing.Out(),
        duration: 500,
      }),
    ])

    animation.start(() => {
      this.animate()
    })
  }

  render() {
    return (
      <RX.View style={styles.container}>
        <RX.Text>
          Loading...
        </RX.Text>
      </RX.View>
    )
  }
}

const styles = {
  container: RX.Styles.createViewStyle({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.Colors.loadingBackground,
  }),
}
