const Matrix = require('matrix-js-sdk')
import request from './Request'

export let client: any = null
export let fileFilter: any = null

export const login = (username: string, password: string, baseUrl: string) => {
  const tmpClient = Matrix.createClient({baseUrl, request})
  return new Promise<MatrixUser>((resolve, reject) => {
    tmpClient.login('m.login.password', {user: username, password: password}, (err: any, resp: any) => {
      console.log(err)
      if (err) {
        reject(err)
      } else {
        console.log(resp)

        client = Matrix.createClient({
            baseUrl,
            userId: resp.user_id,
            accessToken: resp.access_token,
            request,
            timelineSupport: true,
        })
        createFileFilter()
        // client.startClient()
        resolve(resp)
      }
    })
  })
}

export const startClient = (options: MatrixUser) => {
  client = Matrix.createClient({
    baseUrl: `https://${options.home_server}`,
    userId: options.user_id,
    accessToken: options.access_token,
    deviceId: options.device_id,
    request,
    timelineSupport: true,
  })
  createFileFilter()
  // client.startClient()
  return true
}

export const sendTextMessage = (roomId: string, message: string) => {
  return client.sendTextMessage(roomId, message)
}

export const sendMessage = (roomId: string, content: any) => {
  return client.sendMessage(roomId, content)
}

export const uploadFile = (roomId: string, file: any) => {
  const { fileContent, fileName } = file
  return client.uploadContent(fileContent, {name: fileName, type: 'application/json'})
  .done(function(url: string) {
    var content = {
        msgtype: 'm.file',
        body: fileName,
        url: url,
        info: {
          size: fileContent.length,
          mimetype: 'application/json',
        },
        fileContent: JSON.parse(fileContent),
    }
    return client.sendMessage(roomId, content)
})
}

export const getEventData = (event: any): MatrixTimelineEvent => {
  return {
    roomId: event.getRoomId(),
    eventId: event.getId(),
    type: event.getType(),
    content: event.getContent(),
    // prevContent: event.getPrevContent(),
    ts: event.getTs(),
    sender: event.getSender(),
    // stateKey: event.getStateKey(),
    // redactedBecause: event.getUnsigned().redacted_because,
  }
}

export const getRooms = (): MatrixRoom[] => {
  const rooms = client.getRooms()
  const data = rooms.map((room: any) => {

    const members: MatrixMember[] = room.getJoinedMembers().map((member: any) => {
      const avatarUrl = member.getAvatarUrl(client.baseUrl, 50, 50, 'scale', true, true)
      return {
        userId: member.userId,
        displayname: member.name,
        membership: member.membership,
        avatarUrl,
      } as MatrixMember
    })

    const timeline: MatrixTimelineEvent[] = room.getLiveTimeline().getEvents().map(getEventData)
    const avatarUrl = room.getAvatarUrl(client.baseUrl, 50, 50, 'scale', true)

    return {
      avatarUrl,
      id: room.roomId,
      name: room.name,
      members,
      timeline,
    }
  })

  return data
}

export const getClaims = (): any[] => {
  const rooms = client.getRooms()
  let result: any[] = []
  rooms.forEach((room: any) => {
    const urls: string[] = []
    const timelineSet = room.getOrCreateFilteredTimelineSet(fileFilter)
    const events: MatrixTimelineEvent[] = timelineSet.getLiveTimeline().getEvents().map(getEventData)
    events.forEach((event) => {
      // console.log(event)
      if (event.content.info && event.content.info.mimetype === 'application/json') {
        urls.push(client.mxcUrlToHttp(event.content.url))
      }
    })
    room.removeFilteredTimelineSet(fileFilter)
    result.push({roomId: room.roomId, urls})
  })

  return result
}

export const createFileFilter = () => {
  fileFilter = new Matrix.Filter(client.credentials.userId)
  fileFilter.setDefinition(
    {
      room: {
        timeline: {
          contains_url: true,
          types: [
              'm.room.message',
          ],
        },
      },
    },
  )

  client.getOrCreateFilter('FILTER_FILES_' + client.credentials.userId, fileFilter).then(
      (filterId: string) => {
        fileFilter.filterId = filterId
        console.log('filterId', filterId)
      },
      (error: any) => {
          console.error('Failed to get or create file filter', error)
      },
  )
}
