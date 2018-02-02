import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem, TextInput, SegmentedControl } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import * as Theme from '../Theme'
import * as Services from '../Services'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigateBack?: () => void
  addToken?: (token: Token) => void
  createNewToken?: (token: Token) => void
  setToken?: (token: string) => void
  getTokenInfo?: (address: string) => void
  isProcessing?: boolean
  formValues?: Token
  network?: any
}

interface State {
  name?: string
  address?: string
  decimals?: number,
  totalSupply?: number,
  code?: string
  isNew?: boolean,
  type?: Enums.TokenType,
}

class TokensFormScreen extends RX.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      decimals: 0,
      totalSupply: 1000000,
      code: '',
      isNew: true,
      type: Enums.TokenType.Erc223,
    }
    this.handleAddressChange = this.handleAddressChange.bind(this)
  }

  private handleSave = () => {
    if (!this.state.isNew) {
      this.props.addToken({
        name: this.state.name,
        code: this.state.code,
        address: this.state.address,
        type: this.state.type,
      })
      this.props.setToken(this.state.address)
      this.props.navigateBack()
    } else {
      this.props.createNewToken({
        name: this.state.name,
        code: this.state.code,
        address: this.state.address,
        decimals: this.state.decimals,
        initialAmount: utils.number.powToString(this.state.totalSupply, this.state.decimals),
      })
    }
  }
  componentWillReceiveProps(newProps: Props) {
    if (this.props.isProcessing && !newProps.isProcessing) {
      this.props.navigateBack()
    }

    if (!this.props.formValues && newProps.formValues) {
      this.setState(newProps.formValues)
    }
  }

  private isValid = () => {
    if (this.state.isNew) {
      return this.props.network === 4
        && this.state.name !== '' && this.state.code !== '' && this.state.decimals > -1 && this.state.totalSupply > 0
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
    console.log(this.props.network)
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
            label='Decimals'
            keyboardType='numeric'
            value={this.state.decimals.toString()}
            onChangeText={(value) => this.setState({ decimals: parseInt(value, 10) || 0 })}
            />}
          {this.state.isNew && <TextInput
            label='Total supply'
            keyboardType='numeric'
            value={this.state.totalSupply.toString()}
            onChangeText={(value) => this.setState({ totalSupply: parseInt(value, 10) || 0 })}
            />}
          <CallToAction
            type={CallToAction.type.Main}
            title={this.state.isNew ? 'Create token' : 'Add'}
            onPress={this.handleSave}
            disabled={!this.isValid()}
            inProgress={this.props.isProcessing}
          />
          {this.state.isNew && this.props.network !== '4' && <RX.Text style={Theme.Styles.about.warning}>
            Token creation currently supported only on Rinkeby network
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
    network: Services.Web3.ethSingleton.getWeb3().version.network,
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
