import codePushSaga from 'react-native-code-push-saga'
import codePush = require('react-native-code-push')

function getCodePushUpdateMetadata() {
  return codePush.getUpdateMetadata(codePush.UpdateState.RUNNING)
    .then((update: any) => {
      if (update) {
        return {
          version: `${update.appVersion} (${update.label}) ${update.description}`,
          deploymentKey: update.deploymentKey,
        } as CodePushDeploymentMetaData
      }
      return {
        version: ``,
        deploymentKey: null,
      } as CodePushDeploymentMetaData
    })
}

const sync = (key: string, options: any) => {
  codePush.sync({
    deploymentKey: key,
    updateDialog: true,
    installMode: 0,
    ...options,
  })
}

export default {
  codePushSaga,
  getCodePushUpdateMetadata,
  sync,
}
