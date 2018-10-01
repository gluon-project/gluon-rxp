import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import { find } from 'lodash'
import utils from '../Utils'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  dataSources?: DataSource[]
  hiddenDataSources?: DataSource[]
  toggleDataSource?: (source: DataSource) => void
  uiTraits?: UITraits
}

class DataSourcesScreen extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          {this.props.dataSources.map(source => <ListItem
            key={source.id}
            type={ListItem.type.Secondary}
            title={source.account.name}
            account={source.account}
            onPress={() => this.props.toggleDataSource(source)}
            selected={!find(this.props.hiddenDataSources, source)}
            isRadioButton
            />)}

        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    dataSources: Selectors.Contacts.getAvailableDataSources(state),
    hiddenDataSources: Selectors.Contacts.getHiddenDataSources(state),
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    toggleDataSource: (source: DataSource) => dispatch(Actions.Contacts.toggleHiddenDataSource(source)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataSourcesScreen)
