import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, TextInput, KeyPad } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import Utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  setAmount?: (amount: string) => void
  token?: Token
  amount?: string
  uiTraits?: UITraits
}

const styles = {
  textInput: RX.Styles.createTextInputStyle({
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: 'white',
    marginTop: 30,
    height: 50,
    borderRadius: 3,
    textAlign: 'center',
    justifyContent: 'center',
  }),
  medium: RX.Styles.createTextInputStyle({
    fontSize: 35,
  }),
  small: RX.Styles.createTextInputStyle({
    fontSize: 28,
  }),
  image: RX.Styles.createImageStyle({
    flex: 1,
  }),
}

class AmountScreen extends RX.Component<Props, null> {
  constructor(props: Props) {
    super(props)
    this.handleAmountChange = this.handleAmountChange.bind(this)
  }
  handleAmountChange(value: string) {
    let amount = value
    if (!amount || amount === '' ) {
      amount = '0'
    }
    this.props.setAmount(amount)
  }
  render() {
    const amount = Utils.number.numberToString(this.props.amount, this.props.token ? this.props.token.decimals : 0)
    return (
      <RX.View style={Theme.Styles.containerOpaque}>
        <RX.View style={Theme.Styles.containerFull}>
          <RX.View style={Theme.Styles.containerWrapper}>
            <RX.View style={Theme.Styles.container}>
              <RX.Text
                style={[
                  styles.textInput,
                  amount.length > 8 && amount.length < 13 && styles.medium,
                  amount.length >= 13 && styles.small,
                ]}
                numberOfLines={1}
              >{amount}</RX.Text>
              <RX.Text
                style={Theme.Styles.amountCode}
              >{this.props.token && this.props.token.code}</RX.Text>
              <KeyPad
                value={this.props.amount.toString()}
                onChangeText={this.handleAmountChange}
                />
              {(this.props.uiTraits.horizontalIsCompact) && <CallToAction
                type={CallToAction.type.Main}
                title='Set Amount'
                onPress={() => this.props.navigateBack()}
                disabled={!this.props.amount}
                />}
            </RX.View>
          </RX.View>
        </RX.View>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    amount: state.transactions.new.amount,
    token: Selectors.Tokens.getTokenByAddress(state, state.transactions.new.token),
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    setAmount: (amount: string) => dispatch(Actions.Transactions.setAmount(amount)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AmountScreen)
