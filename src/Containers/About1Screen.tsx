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

class About1Screen extends RX.Component<Props, null> {
  render() {
    return (
      <ScrollView visualBoxType={Enums.VisualType.About1}>
        <RX.View style={Theme.Styles.about.wrapper}>
          <RX.Text style={Theme.Styles.about.h1}>
            What is Gluon?
          </RX.Text>
          <RX.Text style={Theme.Styles.about.h2}>
            Gluon is a decentralized app
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
            Gluon uses decentralized networks such as Ethereum and IPFS
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
export default connect(mapStateToProps, mapDispatchToProps)(About1Screen)
