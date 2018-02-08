import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView } from '../Components'
import { FeedItem } from '../Containers'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'
import * as Theme from '../Theme'
import * as _ from 'lodash'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  loadFeed?: () => void
  hideMainVisual?: () => void
  transactions?: Transaction[]
  selectedToken?: string
  isLoading?: boolean
  showMainVisual?: boolean
}

class FeedScreen extends RX.Component<Props, null> {
  componentDidMount() {
    this.props.loadFeed()
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView
          hideMainVisual={this.props.hideMainVisual}
          visualBoxType={!this.props.selectedToken && this.props.showMainVisual ? Enums.VisualType.Main : null}
          navigate={this.props.navigate}
          >
          {this.props.isLoading && <RX.View style={Theme.Styles.activityIndicator}>
          <RX.ActivityIndicator
            size='small'
            color='white'
            /></RX.View>}
          {this.props.transactions && this.props.transactions.map(item => (
            <FeedItem key={item.hash} transaction={item} />
          ))}
        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    transactions: Selectors.Feed.getSelectedList(state),
    selectedToken: Selectors.Feed.getSelectedToken(state),
    showMainVisual: Selectors.Settings.getShowMainVisual(state),
    isLoading: Selectors.Process.isRunningProcess(state, Enums.ProcessType.LoadTransactions),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    loadFeed: () => dispatch(Actions.Feed.fetchTransactions()),
    hideMainVisual: () => dispatch(Actions.Settings.setShowMainVisual(false)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)
