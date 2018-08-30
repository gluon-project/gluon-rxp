import RX = require('reactxp')
import { connect } from 'react-redux'
import {
  CallToAction,
  ScrollView,
  ListItem,
  SegmentedControl,
  TextInput,
  Graphs } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Theme from '../Theme'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  setMintNumTokens?: (amount: string) => void
  setBurnNumTokens?: (amount: string) => void
  mintTokens?: () => void
  burnTokens?: () => void
  balance?: Balance
  reserveTokenBalance?: Balance
  selectedToken?: string,
  uiTraits?: UITraits
  currentUser?: User
  isProcessingMintPrice?: boolean
  isProcessingBurnReward?: boolean
  isProcessingMint?: boolean
  isProcessingBurn?: boolean
  mintTransaction?: MintTransaction
  burnTransaction?: BurnTransaction
  transactions?: Transaction[]
}

interface State {
  isMint?: boolean
  amount?: string
}

class TokenActionsScreen extends RX.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      isMint: true,
      amount: '0',
    }
  }

  private isValid = (): boolean => {
    if (this.state.isMint) {
      return parseInt(this.props.mintTransaction.numTokens, 10) > 0
        && parseInt(this.props.mintTransaction.price, 10) <= parseInt(this.props.reserveTokenBalance.amount, 10)
    } else {
      return parseInt(this.props.burnTransaction.numTokens, 10) > 0
        && parseInt(this.props.burnTransaction.numTokens, 10) <= parseInt(this.props.balance.amount, 10)
    }

  }

  private handleConfirm = () => {
    if (this.state.isMint) {
      this.props.mintTokens()
    } else {
      this.props.burnTokens()
    }
  }

  private setAmount = (amount: string) => {
    if (this.state.isMint) {
      this.props.setMintNumTokens(amount)
    } else {
      this.props.setBurnNumTokens(amount)
    }
  }

  render() {
    console.log(this.props)
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          {this.props.balance && <ListItem
            account={this.props.balance.token}
            title={`${this.props.balance.token.name}`}
            details={utils.number.numberToString(this.props.balance.amount, this.props.balance.token.decimals)}
            subTitle={this.props.balance.token.type !== Enums.TokenType.ETH &&  utils.address.short(this.props.balance.token.address)}
            type={ListItem.type.Secondary}
          />}
          {this.props.balance && this.props.balance.token.type === Enums.TokenType.Erc223 && <RX.View style={{
            marginBottom: this.props.uiTraits.horizontalIsCompact ? 600 : 0,
          }}>

            <SegmentedControl
              titles={['Buy', 'Sell']}
              selectedIndex={this.state.isMint ? 0 : 1}
              handleSelection={(index) => this.setState({isMint: index === 0 ? true : false})}
              />
            <Graphs.BondingCurveGraph
              priceDecimals={this.props.reserveTokenBalance.token.decimals}
              xTicks={this.props.uiTraits.horizontalIsCompact ? 3 : 4}
              yTicks={this.props.uiTraits.horizontalIsCompact ? 3 : 4}
              height={this.props.uiTraits.horizontalIsCompact ? 120 : 300}
              priceCode={this.props.reserveTokenBalance.token.code}
              supplyCode={this.props.balance.token.code}
              isMint={this.state.isMint}
              exponent={this.props.balance.token.exponent}
              totalSupply={this.props.balance.token.totalSupply}
              numTokens={parseInt(this.state.isMint ? this.props.mintTransaction.numTokens : this.props.burnTransaction.numTokens, 10)}
              />
            <RX.View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                label={`Reserve pool`}
                value={`${utils.number.numberToString(
                  this.props.balance.token.poolBalance.toString(),
                  this.props.reserveTokenBalance.token.decimals)} ${this.props.reserveTokenBalance.token.code}`}
                editable={false}
                />
              <TextInput
                label={`Total supply`}
                value={`${(this.props.balance.token.totalSupply || 0).toString()} ${this.props.balance.token.code}`}
                editable={false}
                />
            </RX.View>
            <RX.View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                editable={false}
                brand
                label={this.state.isMint ? 'Price' : 'Reward'}
                value={(this.props.isProcessingMintPrice || this.props.isProcessingBurnReward) ? 'Loading...' :
                `${utils.number.numberToString(
                  this.state.isMint ? this.props.mintTransaction.price : this.props.burnTransaction.reward,
                  this.props.reserveTokenBalance.token.decimals)} ${this.props.reserveTokenBalance.token.code}`}
                onChangeText={this.setAmount}
                />
              <TextInput
                label={this.state.isMint ? `Amount` : 'Amount'}
                value={this.state.isMint ? this.props.mintTransaction.numTokens : this.props.burnTransaction.numTokens}
                onChangeText={this.setAmount}
                keyboardType='numeric'
                />
              </RX.View>

            <CallToAction
              type={CallToAction.type.Main}
              title={this.state.isMint ? 'Buy' : 'Sell'}
              onPress={this.handleConfirm}
              disabled={!this.isValid() || this.props.isProcessingMint || this.props.isProcessingBurn}
              inProgress={this.props.isProcessingMint || this.props.isProcessingBurn}
            />
          </RX.View>}
          {this.props.transactions.map((transaction: Transaction, key: any) => <RX.View key={transaction.hash}>
            <RX.Text>{transaction.hash}</RX.Text>
          </RX.View>)}
        </ScrollView>

      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    balance: Selectors.User.getBalanceByAddress(state, state.tokens.current),
    reserveTokenBalance: Selectors.User.getReserveBalanceByAddress(state, state.tokens.current),
    mintTransaction: Selectors.Tokens.getMintTransaction(state),
    burnTransaction: Selectors.Tokens.getBurnTransaction(state),
    uiTraits: state.app.uiTraits,
    currentUser: state.user.current,
    isProcessingMintPrice: Selectors.Process.isRunningProcess(state, Enums.ProcessType.GetPriceToMint),
    isProcessingBurnReward: Selectors.Process.isRunningProcess(state, Enums.ProcessType.GetRewardForBurn),
    isProcessingMint: Selectors.Process.isRunningProcess(state, Enums.ProcessType.MintTokens),
    isProcessingBurn: Selectors.Process.isRunningProcess(state, Enums.ProcessType.BurnTokens),
    transactions: Selectors.Feed.getSelectedList(state),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    setMintNumTokens: (amount: string) => dispatch(Actions.Tokens.setMintNumTokens(amount)),
    setBurnNumTokens: (amount: string) => dispatch(Actions.Tokens.setBurnNumTokens(amount)),
    mintTokens: () => dispatch(Actions.Tokens.mintTokens()),
    burnTokens: () => dispatch(Actions.Tokens.burnTokens()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TokenActionsScreen)
