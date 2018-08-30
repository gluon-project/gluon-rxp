import RX = require('reactxp')
import { connect } from 'react-redux'
import { CallToAction, ScrollView, ListItem, TextInput, SegmentedControl } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Selectors from '../Selectors'
import * as Theme from '../Theme'
import * as Enums from '../Enums'
import * as S from 'string'
import utils from '../Utils'
import * as _ from 'lodash'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  createRoom?: (options: MatrixNewRoomOptions) => void
  isCreatingNewRoom?: boolean
  matrixContacts?: VerifiableClaim[]
}

interface State {
  isNew?: boolean,
  roomName?: string,
  roomAddress?: string,
  selectedMatrixIds?: string[]
}

class RoomNewFormScreen extends RX.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isNew: true,
      roomName: '',
      roomAddress: '',
      selectedMatrixIds: [],
    }
  }

  private handleCreate = () => {
    this.props.createRoom({
      name: this.state.roomName,
      visibility: 'private',
      invite: this.state.selectedMatrixIds,
    })
  }

  private isValidNewRoom = () => {
    return this.state.roomName !== ''
  }

  private toggleSelectedMatrixId = (matrixId: string) => {
    if (_.includes(this.state.selectedMatrixIds, matrixId)) {
      this.setState({selectedMatrixIds: _.without(this.state.selectedMatrixIds, matrixId)})
    } else {
      const selectedMatrixIds =  this.state.selectedMatrixIds
      selectedMatrixIds.push(matrixId)
      this.setState({selectedMatrixIds})
    }
  }

  render() {
    return (
      <RX.View style={Theme.Styles.scrollContainerNoMargins}>
        <ScrollView>
          <SegmentedControl
              titles={['Create room', 'Join existing']}
              selectedIndex={this.state.isNew ? 0 : 1}
              handleSelection={(index) => this.setState({isNew: index === 0 ? true : false})}
              />
          {this.state.isNew && <RX.View>
            <TextInput
            label='Room name'
            value={this.state.roomName}
            onChangeText={(value) => this.setState({ roomName: value })}
            />

            {this.props.matrixContacts.map((claim: VerifiableClaim, key) => {
              return <ListItem
                key={key}
                account={claim.subject}
                title={`${claim.subject.name}`}
                subTitle={claim.claimValue}
                type={ListItem.type.Secondary}
                selected={_.includes(this.state.selectedMatrixIds, claim.claimValue)}
                onPress={() => this.toggleSelectedMatrixId(claim.claimValue)}
              />
            })}

            <CallToAction
              type={CallToAction.type.Main}
              title={'Create new room'}
              onPress={this.handleCreate}
              disabled={!this.isValidNewRoom()}
              inProgress={this.props.isCreatingNewRoom}
            />
          </RX.View>}

        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    isCreatingNewRoom: Selectors.Process.isRunningProcess(state, Enums.ProcessType.MatrixCreateRoom),
    matrixContacts: Selectors.Contacts.getMatricContacts(state),
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    createRoom: (options: MatrixNewRoomOptions) => dispatch(Actions.Matrix.createRoom(options)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomNewFormScreen)
