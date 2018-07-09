import {
  delay,
  SagaIterator,
  eventChannel,
} from 'redux-saga'
import {
  call,
  put,
  select,
  spawn,
  take,
} from 'redux-saga/effects'
const URL = require('url-parse')
import RX = require('reactxp')
const Matrix = require('matrix-js-sdk')

const client = Matrix.createClient({
  baseUrl: 'https://matrix.org',
  userId: '@colis:matrix.org',
  accessToken: 'MDAxOGxvY2F0aW9uIG1hdHJpeC5vcmcKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID\
0gMQowMDI0Y2lkIHVzZXJfaWQgPSBAY29saXM6bWF0cml4Lm9yZwowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWN\
pZCBub25jZSA9IHlCQzlXLCN1TjI2T2lrVVMKMDAyZnNpZ25hdHVyZSACh7IzteI-jyeBbTwX0_Hcn-iNpwOMTHcC\
FxECVVOSNgo',
})

const matrixEventToArgs = (event: any) => ({
  roomId: event.getRoomId(),
  id: event.getId(),
  type: event.getType(),
  content: event.getContent(),
  prevContent: event.getPrevContent(),
  ts: event.getTs(),
  sender: event.getSender(),
  stateKey: event.getStateKey(),
  redactedBecause: event.getUnsigned().redacted_because,
})

const emittedEventToEmittedArgs = {
  sync: (state: any) => ({ state }),
  Room: (room: any) => ({ roomId: room.roomId }),
  'Room.timeline': matrixEventToArgs,
  'Room.name': (room: any) => ({
      roomId: room.roomId,
      name: room.name,
  }),
  'Room.receipt': (event: any) => ({
      roomId: event.getRoomId(),
      content: event.getContent(),
  }),
  'Room.redaction': (event: any) => ({
      redactedBecause: {
          sender: event.getSender(),
          content: event.getContent(),
          ts: event.getTs(),
      },
      redactedEventId: event.event.redacts,
      roomId: event.getRoomId(),
  }),
  'RoomState.events': matrixEventToArgs,
  'RoomMember.membership': (event: any, member: any) => ({
      roomId: event.getRoomId(),
      userId: member.userId,
      name: member.name,
      membership: member.membership,
      avatarUrl: member.events.member ?
          member.events.member.getContent().avatar_url :
          null,
  }),
  'RoomMember.name': (event: any, member: any) => ({
      roomId: event.getRoomId(),
      userId: member.userId,
      name: member.name,
  }),
}

export function * watchMatrixUpdates () {
  const matrixChannel = yield eventChannel(emitter => {
    client.on('event', emitter)
    return () => client.off('event', emitter)
  })

  while (true) {
    const action = yield take(matrixChannel)
    // console.log(matrixEventToArgs(action))
    console.log(action)
  }
}

client.startClient()
