import RX = require('reactxp')
import * as Theme from '../Theme'
import { TabBarButton } from '../Components'

enum TabBarType {
  Horizontal,
  Vertical,
  VerticalWide,
}

interface Props extends RX.CommonProps {
  type?: TabBarType
  navigation?: any
  navigate?: (routeName: string) => void
}

export default class TabBar extends RX.Component<Props, null> {

  static type = TabBarType

  render() {
    const tabIndex = this.props.navigation.state.index
    const tabRouteName = this.props.navigation.state.routes[tabIndex].routeName
    const index = this.props.navigation.state.routes[tabIndex].index
    const routeName = this.props.navigation.state.routes[tabIndex].routes[index].routeName

    let type
    switch (this.props.type) {
      case TabBarType.Horizontal:
        type = TabBarButton.type.Horizontal
        break
      case TabBarType.Vertical:
        type = TabBarButton.type.Vertical
        break
      case TabBarType.VerticalWide:
        type = TabBarButton.type.VerticalWide
        break
    }
    return (
      <RX.View
        style={[
          styles.tabBar,
          this.props.type === TabBarType.Vertical && styles.verticalTabBar,
          this.props.type === TabBarType.VerticalWide && styles.verticalWideTabBar,
          this.props.type === TabBarType.Horizontal && styles.horizontalTabBar,
        ]}
      >
        {this.props.type === TabBarType.Vertical && <RX.Button
          onPress={() => this.props.navigate('AboutTab')}
          >
          <RX.Image
            source={require('../../src/Assets/logo.png')}
            style={Theme.Styles.logo}
          />
        </RX.Button>}

        <TabBarButton
          type={type}
          title='Rooms'
          iconType={TabBarButton.icon.Feed}
          onPress={() => this.props.navigate('RoomsTab')}
          selected={tabRouteName === 'RoomsTab'}
        />
        <TabBarButton
          type={type}
          title='Wallet'
          iconType={TabBarButton.icon.Wallet}
          onPress={() => this.props.navigate('WalletTab')}
          selected={tabRouteName === 'WalletTab'}
        />
        <TabBarButton
          type={type}
          title='Transfers'
          iconType={TabBarButton.icon.Transfers}
          onPress={() => this.props.navigate('SendTab')}
          selected={tabRouteName === 'SendTab'}
        />
        {/* <TabBarButton
          type={type}
          title='About'
          iconType={TabBarButton.icon.About}
          onPress={() => this.props.navigate('AboutTab')}
          selected={tabRouteName === 'AboutTab'}
        /> */}
        <TabBarButton
          type={type}
          title='Settings'
          iconType={TabBarButton.icon.Settings}
          onPress={() => this.props.navigate('Settings')}
          selected={tabRouteName === 'Settings'}
        />
    </RX.View>
    )
  }
}

const styles = {
  tabBar: RX.Styles.createViewStyle({
    backgroundColor: Theme.Colors.tabBarBackground,
  }),
  verticalTabBar: RX.Styles.createViewStyle({
    width: Theme.Metrics.tabBar.width,
    flexDirection: 'column',
  }),

  verticalWideTabBar: RX.Styles.createViewStyle({
    width: Theme.Metrics.tabBar.widthWide,
    flexDirection: 'column',
  }),

  horizontalTabBar: RX.Styles.createViewStyle({
    height: Theme.Metrics.tabBar.height + (RX.UserInterface.measureWindow().height === 812 ? 40 : 0),
    flexDirection: 'row',
  }),
}
