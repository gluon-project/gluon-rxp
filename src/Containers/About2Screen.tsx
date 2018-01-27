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

class About2Screen extends RX.Component<Props, null> {
  render() {
    return (
      <ScrollView visualBoxType={Enums.VisualType.About2}>
        <RX.View style={Theme.Styles.about.wrapper}>
          <RX.Text style={Theme.Styles.about.h1}>
            What can you do with Gluon?
          </RX.Text>
          <RX.Text style={Theme.Styles.about.h2}>
            Functionality
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
          Create your own tokens
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
          Send tokens to anyone for anything. Attach a message and provide a URL to some content on the internet, i.e.:
          - Picture on Instagram
          - Article on Medium
          - PR on Github
          - Post on Reddit
          - etc.
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
          Browse token transaction history
          </RX.Text>
          <RX.Text style={Theme.Styles.about.p}>
          Request tokens for any content on the internet
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
export default connect(mapStateToProps, mapDispatchToProps)(About2Screen)
