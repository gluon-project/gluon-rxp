import { fork } from 'redux-saga/effects'
import * as AppSaga from './AppSaga'
import * as AttachmentSaga from './AttachmentSaga'
import * as ClaimsSaga from './ClaimsSaga'
import * as MatrixSaga from './MatrixSaga'
import * as ModalMessageSaga from './ModalMessageSaga'
import * as NavigationSaga from './NavigationSaga'
import * as UportSaga from './UportSaga'
import * as Web3Saga from './Web3Saga'

export default function* root() {
  yield fork(Web3Saga.watchLoadFeed)
  yield fork(AppSaga.watchHandleError)
  yield fork(AppSaga.watchResetToInitialState)
  yield fork(AppSaga.watchStoreReady)
  yield fork(AppSaga.watchSyncCodePushDeployment)
  yield fork(AppSaga.watchUrlChanges)
  yield fork(AttachmentSaga.watchGetFromIpfs)
  yield fork(AttachmentSaga.watchSaveAttachment)
  yield fork(AttachmentSaga.watchStartDownload)
  yield fork(ClaimsSaga.watchSignAnonymousClaim)
  yield fork(ClaimsSaga.watchSignAnonymousClaimAndShareInRoom)
  yield fork(ClaimsSaga.watchSignClaimAndShareInRoom)
  yield fork(ClaimsSaga.watchLoadMatrixClaims)
  yield fork(ClaimsSaga.watchLoadAndAppendMatrixClaims)
  yield fork(MatrixSaga.watchCreateRoom)
  yield fork(MatrixSaga.watchRequest)
  yield fork(MatrixSaga.watchStartRegister)
  yield fork(MatrixSaga.watchStartLogin)
  yield fork(MatrixSaga.watchSendTextMessage)
  yield fork(MatrixSaga.watchSendMessage)
  yield fork(MatrixSaga.watchSendFile)
  yield fork(MatrixSaga.watchLeaveRoom)
  yield fork(MatrixSaga.watchInviteToRoom)
  yield fork(ModalMessageSaga.watchCloseModalMessage)
  yield fork(NavigationSaga.watchNavigate)
  yield fork(UportSaga.watchStartLogin)
  yield fork(UportSaga.subscribeEvents)
  yield fork(UportSaga.watchLogout)
  yield fork(Web3Saga.watchAddToken)
  yield fork(Web3Saga.watchCreateNewToken)
  yield fork(Web3Saga.watchGetTokenInfo)
  yield fork(Web3Saga.watchRefreshBalances)
  yield fork(Web3Saga.watchStartSavingTransaction)
  yield fork(Web3Saga.watchSetMintNumTokens)
  yield fork(Web3Saga.watchSetBurnNumTokens)
  yield fork(Web3Saga.watchMintTokens)
  yield fork(Web3Saga.watchBurnTokens)
  yield fork(Web3Saga.watchGetAvailableTokens)
  yield fork(Web3Saga.watchLoadTransactionInfo)
}
