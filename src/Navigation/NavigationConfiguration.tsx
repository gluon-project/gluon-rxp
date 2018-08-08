import RX = require('reactxp')
import Router = require('reactxp-navigation')
const { StackNavigator } = Router
import TabNavigator from './Navigators/TabNavigator'
import * as Screens from '../Containers'
import { Icons } from '../Components'
import * as Theme from '../Theme'

const LeftButton = ({navigation}: { navigation: any }) => {
  const {navigate, state, goBack} = navigation.navigation
  //currently React-Navigation doesnt expose scene index - dirty hack until this occurs to identify if on first scene.
  if (state.key.substring(0, 4) === 'Init') {
    return <RX.View/>
  } else {
    let backLabel = RX.Platform.getType() === 'android' ? '' : 'Back'
    switch (state.routeName) {
      case 'Feed':
        backLabel = RX.Platform.getType() === 'android' ? '' : 'Filter'
    }
    return (
      <RX.Button
        style={Theme.Styles.navBarItem}
        onPress={() => {
          goBack()
        }}
      >
        <Icons.ChevronLeftIcon />
        <RX.Text style={Theme.Styles.navBarItemLabel}>
          {backLabel}
        </RX.Text>
      </RX.Button>
    )
  }
}

const RightButton = ({navigation}: { navigation: any }) => {
  const {navigate, state, goBack} = navigation.navigation
  //currently React-Navigation doesnt expose scene index - dirty hack until this occurs to identify if on first scene.
  if (state.routeName === 'Receiver' || state.routeName === 'Tokens') {
    return (
      <RX.Button
      style={Theme.Styles.navBarItem}
      onPress={() => {
          navigate(state.routeName === 'Receiver' ? 'NewContactForm' : 'TokensForm')
        }}
      >
        <RX.Text style={Theme.Styles.navBarItemLabel}>
          Add
        </RX.Text>
      </RX.Button>
    )
  } else {
    return <RX.View/>
  }
}

const navigationOptions = {
  navigationOptions: (navigation: any) => {
    return {
      headerTitleStyle: {color: Theme.Colors.buttonLabel},
      headerStyle: {backgroundColor: Theme.Colors.navBarBackground},
      headerLeft: <LeftButton navigation={navigation}/>,
      headerRight: <RightButton navigation={navigation} />,
    }
  },
  cardStyle: {backgroundColor: 'transparent'},
}

const Sender = {screen: Screens.SenderScreen, navigationOptions: {title: 'Sender'}}
const RequestReceiver = {screen: Screens.SenderScreen, navigationOptions: {title: 'Receiver'}}
const Receiver = {screen: Screens.ReceiverScreen, navigationOptions: {title: 'Receiver'}}
const NewContactForm = {screen: Screens.ContactNewFormScreen, navigationOptions: {title: 'New Contact'}}
const ContactForm = {screen: Screens.ContactFormScreen, navigationOptions: {title: 'New Claim'}}
const ContactActions = {screen: Screens.ContactActionsScreen, navigationOptions: {title: 'Contact'}}
const LoginStack = {screen: Screens.LoginScreen, navigationOptions: {title: 'Login'}}
const Settings = { screen: Screens.SettingsScreen, navigationOptions: { title: 'Settings' } }
const More = { screen: Screens.MoreMasterScreen, navigationOptions: { title: 'Settings' } }
const About1 = { screen: Screens.About1Screen, navigationOptions: { title: 'What is Gluon?' } }
const About2 = { screen: Screens.About2Screen, navigationOptions: { title: 'What can you do with Gluon?' } }
const About3 = { screen: Screens.About3Screen, navigationOptions: { title: 'Who can use Gluon?' } }
const About4 = { screen: Screens.About4Screen, navigationOptions: { title: 'How Gluon works?' } }

const Tokens = {screen: Screens.TokensScreen, navigationOptions: {title: 'Tokens'}}
const TokensForm = {screen: Screens.TokensFormScreen, navigationOptions: {title: 'Add Token'}}
const TokenActions = {screen: Screens.TokenActionsScreen, navigationOptions: {title: 'Token'}}
const Amount = {screen: Screens.AmountScreen, navigationOptions: {title: 'Amount'}}
const Attachment = {screen: Screens.AttachmentScreen, navigationOptions: {title: 'Attachment'}}
const Feed = {screen: Screens.FeedScreen, navigationOptions: {title: 'Feed'}}

const RoomActions = {screen: Screens.RoomActionsScreen, navigationOptions: {title: 'Room'}}
const Rooms = {screen: Screens.RoomsScreen, navigationOptions: {title: 'Rooms'}}

const CompactSendMainScreen = {screen: Screens.CompactSendMainScreen, navigationOptions: {title: 'Transfers'}}
const CompactRequestMainScreen = {screen: Screens.CompactRequestMainScreen, navigationOptions: {title: 'Request'}}
const CompactAboutMainScreen = {screen: Screens.CompactAboutMainScreen, navigationOptions: {title: 'About'}}
const CompactContactsMainScreen = {screen: Screens.CompactContactsMainScreen, navigationOptions: {title: 'Contacts'}}
const CompactRoomsMainScreen = {screen: Screens.CompactRoomsMainScreen, navigationOptions: {title: 'Rooms'}}
const CompactWalletMainScreen = {screen: Screens.CompactWalletMainScreen, navigationOptions: {title: 'Wallet'}}

export const WideNavigationConfiguration = {
  RoomsTab: {
    masterScreen: Screens.RoomsMasterScreen,
    screen: TabNavigator(
      {
        RoomActions: {screen: StackNavigator({ RoomActions, ContactForm }, navigationOptions)},
      },
      navigationOptions,
    ),
  },
  ContactsTab: {
    masterScreen: Screens.ContactsMasterScreen,
    screen: StackNavigator({ ContactActions, ContactForm, NewContactForm }, navigationOptions),
  },
  WalletTab: {
    masterScreen: Screens.WalletMasterScreen,
    screen: TabNavigator(
      {
        TokenActions: {screen: StackNavigator({ TokenActions }, navigationOptions)},
        TokensForm: {screen: StackNavigator({ TokensForm }, navigationOptions)},
      },
      navigationOptions,
    ),
  },
  SendTab: {
    masterScreen: Screens.SendMasterScreen,
    screen: TabNavigator(
      {
        // Sender: {screen: StackNavigator({ Sender }, navigationOptions)},
        Tokens: {screen: StackNavigator({ Tokens, TokensForm }, navigationOptions)},
        Amount: {screen: StackNavigator({ Amount }, navigationOptions)},
        Receiver: {screen: StackNavigator({ Receiver, NewContactForm }, navigationOptions)},
        Rooms: {screen: StackNavigator({ Rooms }, navigationOptions)},
        Attachment: {screen: StackNavigator({ Attachment }, navigationOptions)},
      },
      navigationOptions,
    ),
  },
  RequestTab: {
    masterScreen: Screens.RequestMasterScreen,
    screen: TabNavigator(
      {
        RequestReceiver: {screen: StackNavigator({ RequestReceiver }, navigationOptions)},
        Tokens: {screen: StackNavigator({ Tokens, TokensForm }, navigationOptions)},
        Amount: {screen: StackNavigator({ Amount }, navigationOptions)},
        Attachment: {screen: StackNavigator({ Attachment }, navigationOptions)},
      },
      navigationOptions,
    ),
  },
  AboutTab: {
    masterScreen: Screens.AboutMasterScreen,
    screen: TabNavigator(
      {
        About1: {screen: StackNavigator({ About1 }, navigationOptions)},
        About2: {screen: StackNavigator({ About2 }, navigationOptions)},
        About3: {screen: StackNavigator({ About3 }, navigationOptions)},
        About4: {screen: StackNavigator({ About4 }, navigationOptions)},
      },
      navigationOptions,
    ),
  },
  Settings: { screen: StackNavigator({ Settings }, navigationOptions) },
} as any

export const moreStack = {  }

export const CompactNavigationConfiguration = {
  RoomsTab: {
    screen: StackNavigator(
      { CompactRoomsMainScreen, RoomActions, ContactForm },
      navigationOptions,
    ),
  },
  ContactsTab: {
    screen: StackNavigator({ CompactContactsMainScreen, ContactActions, ContactForm }, navigationOptions),
  },
  WalletTab: {
    screen: StackNavigator(
      { CompactWalletMainScreen, TokenActions, TokensForm },
      navigationOptions,
    ),
  },
  SendTab: {
    screen: StackNavigator(
      { CompactSendMainScreen, Sender, Tokens, TokensForm, Amount, Receiver, NewContactForm, Rooms, Attachment },
      navigationOptions,
    ),
  },
  RequestTab: {
    screen: StackNavigator(
      { CompactRequestMainScreen, RequestReceiver, Tokens, TokensForm, Amount, Attachment },
      navigationOptions,
    ),
  },
  AboutTab: {
    screen: StackNavigator(
      { CompactAboutMainScreen, About1, About2, About3, About4 },
      navigationOptions,
    ),
  },
  Settings: { screen: StackNavigator({ Settings }, navigationOptions) },
  // More: {
  //   screen: StackNavigator(moreStack, navigationOptions),
  // },
} as any
