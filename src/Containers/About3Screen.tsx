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

class About3Screen extends RX.Component<Props, null> {
  render() {
    return (
      <ScrollView visualBoxType={Enums.VisualType.About3}>
        <RX.View style={Theme.Styles.about.wrapper}>
          <RX.Text style={Theme.Styles.about.h1}>
            Who can use Gluon?
          </RX.Text>
          <RX.Text style={Theme.Styles.about.h2}>
            Anyone. Some of the ideas:
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
            Employer creates company coins and sends to his employees as a bonus for a good work.
            At the end of the month, employees exchange these coins to fiat currency.
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
            Influencer / celebrity creates his coins and periodically sends them to his followers
            for anything...
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
            Parents create their own token, and send them to their children for good deeds.
            After some period children can exchange these coins back to some tangible prices.
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
            Etc. Imagination is the only limitation here :)
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
export default connect(mapStateToProps, mapDispatchToProps)(About3Screen)
