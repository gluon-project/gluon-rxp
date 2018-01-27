const shell = require('shelljs')

const appName = 'Gluon'

let tagName = process.env.CI_BUILD_REF_NAME
  ? process.env.CI_BUILD_REF_NAME
  : shell.exec(`git name-rev --tags --name-only $(git rev-parse HEAD)`, {silent: true}).replace('\n', '')

let deploymentName = null

if (tagName.search('release') !== -1) {
  deploymentName = 'Production'
} else if (tagName.search('staging') !== -1) {
  deploymentName = 'Staging'
}

if (!deploymentName) {
  console.error('No release or staging tag found. To add run: git tag staging-example ')
  process.exit(0)
}

// noinspection TsLint
if (process.env.CI_BUILD_REF_NAME) {
  shell.exec(`NODE_TLS_REJECT_UNAUTHORIZED=0 code-push login --accessKey ${process.env.CODEPUSH_KEY}`)
  shell.exec(`npm run build`)
  shell.exec(`NODE_TLS_REJECT_UNAUTHORIZED=0 code-push release-react ${appName}-ios ios -d ${deploymentName} --description ${tagName}`)
  shell.exec(`NODE_TLS_REJECT_UNAUTHORIZED=0 code-push release-react ${appName}-android android -d ${deploymentName} --description ${tagName}`)
  shell.exec(`NODE_TLS_REJECT_UNAUTHORIZED=0 code-push logout`)
} else {
  shell.exec(`yarn run tsc && NODE_TLS_REJECT_UNAUTHORIZED=0 code-push release-react ${appName}-ios ios -d ${deploymentName} --description ${tagName}`)
  shell.exec(`yarn run tsc && NODE_TLS_REJECT_UNAUTHORIZED=0 code-push release-react ${appName}-android android -d ${deploymentName} --description ${tagName}`)
}
