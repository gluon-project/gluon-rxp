import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem, TextInput, SegmentedControl, Graphs } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import * as Theme from '../Theme'
import * as Services from '../Services'
import Config from '../Config'
import utils from '../Utils'
import { includes } from 'lodash'

interface Props extends RX.CommonProps {
  navigateBack?: () => void
  addToken?: (token: Token) => void
  createNewToken?: (token: Token) => void
  setToken?: (token: string) => void
  getTokenInfo?: (address: string) => void
  isProcessing?: boolean
  formValues?: Token
  reserveToken?: Token,
  uiTraits?: UITraits
}

interface State {
  name?: string
  address?: string
  decimals?: number,
  exponent?: string,
  code?: string
  isNew?: boolean,
  type?: Enums.TokenType,
  network?: string,
}

class TokensFormScreen extends RX.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      decimals: 0,
      exponent: '2',
      code: '',
      isNew: true,
      type: Enums.TokenType.Erc223,
      network: null,
    }
    this.handleAddressChange = this.handleAddressChange.bind(this)
  }

  componentDidMount() {
    Services.Web3.ethSingleton.getWeb3().version.getNetwork((err: any, data: string) => {
      this.setState({network: data})
    })
  }

  private handleSave = () => {
    if (!this.state.isNew) {
      this.props.addToken({
        name: this.state.name,
        code: this.state.code,
        address: this.state.address,
        networkId: this.state.network,
        type: this.state.type,
        reserveToken: this.props.reserveToken.address,
        exponent: parseFloat(this.state.exponent),
      })
      this.props.setToken(this.state.address)
      this.props.navigateBack()
    } else {
      this.props.createNewToken({
        name: this.state.name,
        code: this.state.code,
        address: this.state.address,
        networkId: this.state.network,
        decimals: this.state.decimals,
        exponent: parseFloat(this.state.exponent),
        reserveToken: Config.tokens.gluonAddress,
      })
    }
  }
  componentWillReceiveProps(newProps: Props) {
    if (this.props.isProcessing && !newProps.isProcessing) {
      this.props.navigateBack()
    }

    if (!this.props.formValues && newProps.formValues) {
      const formValues = {
        ...newProps.formValues,
        exponent: newProps.formValues.exponent,
      } as any
      this.setState({
        ...formValues,
      })
    }
  }

  private isValid = () => {
    if (this.state.isNew) {
      return (this.state.network === '4' || this.state.network === '1')
        && this.state.name !== '' && this.state.code !== '' && this.state.decimals > -1 && parseFloat(this.state.exponent) > 0
    } else {
      return this.state.name !== '' && this.state.code !== '' && Services.Web3.ethSingleton.getWeb3().isAddress(this.state.address)
    }
  }

  handleAddressChange (value: string) {
    this.setState({ address: value })
    if (value.length === 42) {
      this.props.getTokenInfo(value)
    }
  }

  render() {
    console.log(this.state.exponent)
    console.log(this.state.code)
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <SegmentedControl
            titles={['Create new', 'Add existing']}
            selectedIndex={this.state.isNew ? 0 : 1}
            handleSelection={(index) => this.setState({isNew: index === 0 ? true : false})}
            />
          {!this.state.isNew && <TextInput
            label='Address'
            value={this.state.address}
            onChangeText={this.handleAddressChange}
            />}
          <TextInput
            label='Name (BecKoin)'
            value={this.state.name}
            onChangeText={(value) => this.setState({ name: value })}
            />
          <TextInput
            label='Symbol (BCK)'
            value={this.state.code}
            onChangeText={(value) => this.setState({ code: value })}
            />
          {this.state.isNew && <TextInput
            label='Exponent'
            keyboardType='numeric'
            value={this.state.exponent.toString()}
            onChangeText={(value) => this.setState({ exponent: value })}
            />}

          {this.state.isNew && <RX.View style={{marginTop: Theme.Metrics.baseMargin}}><Graphs.BondingCurveGraph
              priceDecimals={this.props.reserveToken.decimals}
              xTicks={this.props.uiTraits.horizontalIsCompact ? 3 : 4}
              yTicks={this.props.uiTraits.horizontalIsCompact ? 3 : 4}
              height={this.props.uiTraits.horizontalIsCompact ? 120 : 300}
              priceCode={this.props.reserveToken.code}
              supplyCode={this.state.code}
              isMint={true}
              exponent={parseFloat(this.state.exponent)}
              totalSupply={0}
              numTokens={0}
              /></RX.View>}
          <CallToAction
            type={CallToAction.type.Main}
            title={this.state.isNew ? 'Create token' : 'Add'}
            onPress={this.handleSave}
            disabled={!this.isValid() || this.props.isProcessing}
            inProgress={this.props.isProcessing}
          />
          {this.state.isNew && !includes(['4', '1'], this.state.network) && <RX.Text style={Theme.Styles.about.warning}>
            Token creation currently supported only on Mainnet or Rinkeby networks
          </RX.Text>}
        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    isProcessing: Selectors.Process.isRunningProcess(state, Enums.ProcessType.CreateNewToken),
    formValues: Selectors.Tokens.getNew(state),
    reserveToken: Selectors.Tokens.getTokenByAddress(state, Config.tokens.gluonAddress),
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    setToken: (token: string) => dispatch(Actions.Transactions.setToken(token)),
    addToken: (token: Token) => dispatch(Actions.Tokens.addToken(token)),
    createNewToken: (token: Token) => dispatch(Actions.Tokens.createNewToken(token)),
    getTokenInfo: (address: string) => dispatch(Actions.Tokens.getTokenInfo(address)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TokensFormScreen)
