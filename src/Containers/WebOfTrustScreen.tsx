import RX = require('reactxp')
import { connect } from 'react-redux'
import {
  CallToAction,
  ToggleSwitch,
  ScrollView,
} from '../Components'
import { CombinedState } from '../Reducers'
import * as AppReducer from '../Reducers/AppReducer'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import WebOfTrust from '../Components/Graphs/WebOfTrust'

interface Props extends RX.CommonProps {
}

class WebOfTrustScreen extends RX.Component<Props, null> {
  render() {
    return (
      <RX.View>
        <WebOfTrust />
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WebOfTrustScreen)
