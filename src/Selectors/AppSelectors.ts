import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import * as Enums from '../Enums'
import * as _ from 'lodash'

export const getCodePushDeployments = (state: CombinedState) => state.app.codePushDeployments
export const getCurrentCodePushDeploymentName = (state: CombinedState) => state.app.currentCodePushDeploymentName
export const getModalMessageConfig = (state: CombinedState) => state.modalMessage

export const getCurrentCodePushDeployment = createSelector(
  getCodePushDeployments,
  getCurrentCodePushDeploymentName,
  (codePushDeployments, currentCodePushDeploymentName) => {
    const filtered = codePushDeployments.filter(deployment => deployment.name === currentCodePushDeploymentName)
    return filtered ? filtered[0] : null
  },
)
