import * as _ from 'lodash'
import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'

export const getRooms = (state: CombinedState) => state.matrix.rooms
export const getSelectedRoomId = (state: CombinedState) => state.matrix.selectedRoomId
export const getCurrentUser = (state: CombinedState) => state.matrix.currentUser
export const getSelectedRoom = (state: CombinedState) => {
  return _.find(state.matrix.rooms, {id: state.matrix.selectedRoomId})
}
export const getRoomById = (state: CombinedState, roomId: string) => {
  return _.find(state.matrix.rooms, {id: roomId})
}
