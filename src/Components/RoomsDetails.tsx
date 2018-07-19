import RX = require('reactxp')
import * as Theme from '../Theme'
import { ListItem, AccountIcon, MatrixLogin } from '../Components'

interface Props extends RX.CommonProps {
  startLogin?: () => void
  navigate?: (routeName: string) => void
  routeName: string,
  currentUser?: User
  selectedRoomId?: string
  rooms?: MatrixRoom[]
  currentMatrixUser?: MatrixUser
  handleSelectRoom: (roomId: String) => void
  uiTraits?: UITraits
  matrixLogin?: (username: string, password: string, baseUrl: string) => void
  isLoggingIn?: boolean
}

export default class RoomsDetails extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.container}>
        {this.props.currentMatrixUser && <RX.View style={Theme.Styles.accountInfo.wrapper}>
          <RX.Text style={Theme.Styles.accountInfo.title}>
            {this.props.currentMatrixUser.user_id}
          </RX.Text>
        </RX.View>}
        {!this.props.currentMatrixUser && <MatrixLogin login={this.props.matrixLogin} isLoggingIn={this.props.isLoggingIn} />}

        {this.props.rooms.length > 0 && <RX.View>
            {/* <ListItem
              key='new'
              isOff
              title={`New room`}
              subTitle={`Create or join existing`}
              type={ListItem.type.Default}
              selected={this.props.routeName === 'NewRoomForm'}
            /> */}
            {this.props.rooms.map((room, key) => {
              return <ListItem
                key={key}
                account={{avatar: room.avatarUrl}}
                title={`${room.name}`}
                subTitle={`${room.members.length} Members`}
                type={ListItem.type.Default}
                selected={!this.props.uiTraits.horizontalIsCompact && this.props.routeName !== 'NewRoomForm' && this.props.selectedRoomId
                  && room.id === this.props.selectedRoomId}
                onPress={() => this.props.handleSelectRoom(room.id)}
              />
            })}
          </RX.View>}

    </RX.View>
    )
  }
}
