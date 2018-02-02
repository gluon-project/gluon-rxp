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
  setAmount?: (amount: number) => void
  token?: Token
  amount?: number
  uiTraits?: UITraits
}

const styles = {
  textInput: RX.Styles.createTextInputStyle({
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: 'white',
    marginRight: -60,
    marginLeft: -60,
    paddingRight: -10,
    paddingLeft: -10,
    paddingTop: 30,
    borderRadius: 3,
    textAlign: 'center',
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
    let amount = parseInt(value, 10)
    if (!amount || amount < 0 ) {
      amount = 0
    }
    this.props.setAmount(amount)
  }
  render() {

    return (
      <RX.View style={Theme.Styles.containerOpaque}>
        <RX.View style={Theme.Styles.containerFull}>
          <RX.View style={Theme.Styles.containerWrapper}>
            <RX.View style={Theme.Styles.container}>
              <RX.Text
                style={styles.textInput}
              >{Utils.number.numberToString(this.props.amount, this.props.token ? this.props.token.decimals : 0)}</RX.Text>
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
    setAmount: (amount: number) => dispatch(Actions.Transactions.setAmount(amount)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AmountScreen)
