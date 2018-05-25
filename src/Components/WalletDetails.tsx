import RX = require('reactxp')
import * as Theme from '../Theme'
import { ListItem, CallToAction, AccountIcon } from '../Components'
import * as Enums from '../Enums'
import Utils from '../Utils'

interface Props extends RX.CommonProps {
  startLogin?: () => void
  navigate?: (routeName: string) => void
  routeName: string,
  currentUser?: User
  selectedToken?: string
  balances?: Balance[]
  handleSelectToken: (token: Token) => void
  uiTraits?: UITraits
}

export default class WalletDetails extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.container}>
        {this.props.currentUser && <RX.View style={Theme.Styles.accountInfo.wrapper}>
          <AccountIcon
            account={this.props.currentUser}
            type={AccountIcon.type.Large}
            />
          <RX.Text style={Theme.Styles.accountInfo.title}>
            {this.props.currentUser.name}
          </RX.Text>
        </RX.View>}
        {this.props.balances && <RX.View>
            <ListItem
              key='new'
              isOff
              title={`New token`}
              subTitle={`Create or add existing`}
              type={ListItem.type.Default}
              selected={this.props.routeName === 'TokensForm'}
              onPress={() => this.props.navigate('TokensForm')}
            />
            {this.props.balances.map((account, key) => {
              return <ListItem
                key={key}
                account={account.token}
                title={`${account.token.name}`}
                subTitle={`${Utils.number.numberToString(account.amount, account.token.decimals)} ${account.token.code}`}
                type={ListItem.type.Default}
                selected={!this.props.uiTraits.horizontalIsCompact && this.props.routeName !== 'TokensForm' && this.props.selectedToken
                  && account.token.address === this.props.selectedToken}
                onPress={() => this.props.handleSelectToken(account.token)}
              />
            })}
          </RX.View>}

    </RX.View>
    )
  }
}
