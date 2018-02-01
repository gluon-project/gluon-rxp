import RX = require('reactxp')
import * as Theme from '../Theme'
import { ListItem, CallToAction } from '../Components'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  selectToken?: (tokenAddress: string) => void
  selectedToken?: string
  tokens: Token[]
  uiTraits?: UITraits
}

export default class FeedDetails extends RX.Component<Props, null> {

  constructor(props: Props) {
    super(props)
    this.handleSelectToken = this.handleSelectToken.bind(this)
  }

  handleSelectToken(token: string) {
    this.props.selectToken(token)
    if (this.props.uiTraits.horizontalIsCompact) {
      this.props.navigate('Feed')
    }
  }

  render() {
    return (
      <RX.View style={Theme.Styles.container}>
        <ListItem
          type={ListItem.type.Default}
          title={'All tokens'}
          // subTitle={'Latest public posts'}
          isOff={!!this.props.selectedToken}
          isOn={!this.props.selectedToken}
          selected={!this.props.selectedToken}
          onPress={() => this.handleSelectToken(null)}
          />
        {this.props.tokens.map(token => (
          <ListItem
            key={token.address}
            type={ListItem.type.Default}
            title={token.name}
            account={token}
            selected={this.props.selectedToken === token.address}
            isOn={this.props.selectedToken === token.address}
            onPress={() => this.handleSelectToken(token.address)}
            smallSeedIcon
            isOff={this.props.selectedToken !== token.address}
          />
        ))}
      </RX.View>
    )
  }
}
