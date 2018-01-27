import RX = require('reactxp')
import * as Theme from '../Theme'
import * as _ from 'lodash'
import Icons from './Icons'

interface Props extends RX.CommonProps {
  value: string
  onChangeText: (value: string) => void
}

const styles = {
  wrapper: RX.Styles.createViewStyle({
    flex: 1,
  }),
  buttonRow: RX.Styles.createViewStyle({
    flex: 1,
    flexDirection: 'row',
  }),
  button: RX.Styles.createButtonStyle({
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    // borderColor: 'black',
    // borderWidth: 1,
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 1,
  }),
  buttonLabel: RX.Styles.createTextStyle({
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
    fontWeight: '100',
  }),
  empty: RX.Styles.createViewStyle({
    margin: 5,
    flex: 1,
    flexBasis: 1,
  }),
}

export default class KeyPad extends RX.Component<Props, null> {

  handleButtonPress (value: number) {
    this.props.onChangeText(`${this.props.value}${value}`)
  }

  handleBackspacePress () {
    this.props.onChangeText(this.props.value.slice(0, -1))
  }

  render() {

    return (
      <RX.View style={styles.wrapper}>
        <RX.View style={styles.buttonRow}>
        <RX.Button
          onPress={() => this.handleButtonPress(1)}
          style={styles.button}>
            <RX.Text style={styles.buttonLabel}>1</RX.Text>
        </RX.Button>
        <RX.Button
          onPress={() => this.handleButtonPress(2)}
          style={styles.button}>
            <RX.Text style={styles.buttonLabel}>2</RX.Text>
        </RX.Button>
        <RX.Button
          onPress={() => this.handleButtonPress(3)}
          style={styles.button}>
            <RX.Text style={styles.buttonLabel}>3</RX.Text>
        </RX.Button>
      </RX.View>
      <RX.View style={styles.buttonRow}>
          <RX.Button
            onPress={() => this.handleButtonPress(4)}
            style={styles.button}>
              <RX.Text style={styles.buttonLabel}>4</RX.Text>
          </RX.Button>
          <RX.Button
            onPress={() => this.handleButtonPress(5)}
            style={styles.button}>
              <RX.Text style={styles.buttonLabel}>5</RX.Text>
          </RX.Button>
          <RX.Button
            onPress={() => this.handleButtonPress(6)}
            style={styles.button}>
              <RX.Text style={styles.buttonLabel}>6</RX.Text>
          </RX.Button>
        </RX.View>
        <RX.View style={styles.buttonRow}>
          <RX.Button
            onPress={() => this.handleButtonPress(7)}
            style={styles.button}>
              <RX.Text style={styles.buttonLabel}>7</RX.Text>
          </RX.Button>
          <RX.Button
            onPress={() => this.handleButtonPress(8)}
            style={styles.button}>
              <RX.Text style={styles.buttonLabel}>8</RX.Text>
          </RX.Button>
          <RX.Button
            onPress={() => this.handleButtonPress(9)}
            style={styles.button}>
              <RX.Text style={styles.buttonLabel}>9</RX.Text>
          </RX.Button>
        </RX.View>
        <RX.View style={styles.buttonRow}>
          <RX.View style={styles.empty} />
          <RX.Button
            onPress={() => this.handleButtonPress(0)}
            style={styles.button}>
              <RX.Text style={styles.buttonLabel}>0</RX.Text>
          </RX.Button>
          <RX.Button
            onPress={() => this.handleBackspacePress()}
            style={styles.button}>
              <Icons.BackSpaceIcon />
          </RX.Button>
        </RX.View>
    </RX.View>
    )
  }
}
