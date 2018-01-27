const codePushSaga = function* () {
  return true
}

const getCodePushUpdateMetadata = () => {
  return ''
}

const sync = (key: string, options: any) => {
  console.log('Pretending to sync', key)
  return true
}

export default {
  codePushSaga,
  getCodePushUpdateMetadata,
  sync,
}
