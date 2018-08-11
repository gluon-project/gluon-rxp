export enum MessageType {
  Error,
  Loader,
  Success,
  Warning,
}

export enum ProcessType {
  BalanceUpdate,
  CreateNewToken,
  GetDataFromIpfs,
  LoadTransactions,
  Login,
  ProcessAttachment,
  SaveAttachment,
  SendTransaction,
  GetPriceToMint,
  GetRewardForBurn,
  MintTokens,
  BurnTokens,
  GetAvailableTokens,
  MatrixLogin,
  MatrixRegister,
  MatrixSendMessage,
  LoadTransactionInfo,
  SignClaim,
  LoadMatrixClaims,
  RequestInMatrix,
}

export enum VisualType {
  Main,
  About1,
  About2,
  About3,
  About4,
}

export enum TokenType {
  Erc223,
  Erc20,
  ETH,
}
