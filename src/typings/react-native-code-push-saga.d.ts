declare module 'react-native-code-push-saga' {
  const codePushSaga: any
  export default codePushSaga
}

declare module 'react-native-code-push' {
  const getUpdateMetadata: any
  const UpdateState: any
  const sync: any
  export {
    getUpdateMetadata,
    UpdateState,
    sync,
  }
}
