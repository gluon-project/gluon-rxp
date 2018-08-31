import RX = require('reactxp')
import * as Theme from '../Theme'
import { Icons } from '../Components'

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
        duration: 1000,
      }),
      RX.Animated.timing(this._translationValue, {
        toValue: 1,
        easing: RX.Animated.Easing.Out(),
        duration: 1000,
      }),
    ])

    animation.start(() => {
      this.animate()
    })
  }

  render() {
    return (
      <RX.View style={styles.container}>
        <RX.Animated.View style={this._animatedStyle} >
        <Icons.LogoIcon
          width={120}
          height={ 139}
          fill='#fff'
          type={'large'}
          />
        </RX.Animated.View>
      </RX.View>
    )
  }
}

const styles = {
  container: RX.Styles.createViewStyle({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.Colors.background,
  }),
}
