import * as _ from 'lodash'
import { createSelector } from 'reselect'
import { CombinedState } from '../Reducers'
import { getList } from './ContactsSelectors'

export const getSelectedRoomId = (state: CombinedState) => state.matrix.selectedRoomId
export const getCurrentUser = (state: CombinedState) => state.matrix.currentUser
export const getSelectedRoom = (state: CombinedState) => {
  return _.find(state.matrix.rooms, {id: state.matrix.selectedRoomId})
}

// This is duplicated in ContactsSelectors
export const getRoomById = (state: CombinedState, roomId: string) => {
  return _.find(state.matrix.rooms, {id: roomId})
}

export const getRoomsRaw = (state: CombinedState) => _.filter(state.matrix.rooms, (room: MatrixRoom) => room.members.length > 0)
export const getRooms = createSelector(getRoomsRaw, getList, (rooms, contacts) => {
  return rooms.map((room: MatrixRoom) => {
    room.members = room.members.map( (member: MatrixMember) => {

      member.account = _.find(contacts,
        (contact: User) => {
          return contact.claims.matrixId && contact.claims.matrixId.claim && (contact.claims.matrixId.claim.matrixId === member.userId)
        })

      return member
    })
    return room
  })
})
