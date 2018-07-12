import * as _ from 'lodash'
import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'

export const getRooms = (state: CombinedState) => state.matrix.rooms
export const getSelectedRoomId = (state: CombinedState) => state.matrix.selectedRoomId

export const getSelectedRoom = createSelector(
  [getSelectedRoomId, getRooms],
  (selectedRoomId, rooms) => {
    return _.find(rooms, {id: selectedRoomId})
  },
)
