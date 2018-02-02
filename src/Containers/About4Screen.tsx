import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Theme from '../Theme'
import * as Enums from '../Enums'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
}

class About4Screen extends RX.Component<Props, null> {
  render() {
    return (
      <ScrollView visualBoxType={Enums.VisualType.About4}>
        <RX.View style={Theme.Styles.about.wrapper}>
          <RX.Text style={Theme.Styles.about.h1}>
            How Gluon works?
          </RX.Text>
          <RX.Text style={Theme.Styles.about.h2}>
            Technical specifications
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
            Gluon Dapp works with uPort Self Sovereign Identity or any other Web3.0 provider (Metamask, Parity, Cipher, etc.)
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
            New tokens are created using <RX.Link
            style={Theme.Styles.about.link}
            url={'https://github.com/Dexaran/ERC223-token-standard/tree/Recommended'}>ERC223 standard</RX.Link>
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
            Message attachments are stored in IPFS using Infura as a gateway
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
            Transaction feed is retrieved using Etherscan API
          </RX.Text>
        </RX.View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(About4Screen)
