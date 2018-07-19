import { combineReducers } from 'redux'
import { CompactReducer, WideReducer} from '../Navigation/NavigationReducer'
import * as App from './AppReducer'
import * as Attachment from './AttachmentReducer'
import * as Contacts from './ContactsReducer'
import * as Feed from './FeedReducer'
import * as Matrix from './MatrixReducer'
import * as ModalMessage from './ModalMessageReducer'
import * as OsExtensionsReducer from './OsExtensionsReducer'
import * as Process from './ProcessReducer'
import * as Services from '../Services'
import * as Settings from './SettingsReducer'
import * as Tokens from './TokensReducer'
import * as Transactions from './TransactionsReducer'
import * as User from './UserReducer'

export default combineReducers({
  app: App.reducer,
  attachment: Attachment.reducer,
  compactNavigation: CompactReducer,
  contacts: Contacts.reducer,
  feed: Feed.reducer,
  matrix: Matrix.reducer,
  modalMessage: ModalMessage.reducer,
  osExtensions: OsExtensionsReducer.reducer,
  process: Process.reducer,
  settings: Settings.reducer,
  tokens: Tokens.reducer,
  transactions: Transactions.reducer,
  user: User.reducer,
  wideNavigation: WideReducer,
})

export interface CombinedState {
  app: App.AppState,
  attachment: Attachment.AttachmentState,
  compactNavigation: any,
  contacts: Contacts.ContactsState,
  feed: Feed.FeedState,
  matrix: Matrix.MatrixState,
  modalMessage: ModalMessageConfig,
  osExtensions: OsExtensionsReducer.OsExtensionState,
  process: Process.ProcessState,
  settings: Settings.SettingsState,
  transactions: Transactions.TransactionState,
  tokens: Tokens.TokensState,
  user: User.UserState,
  wideNavigation: any,
}
