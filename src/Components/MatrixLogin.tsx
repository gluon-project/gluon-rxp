import RX = require('reactxp')
import * as Theme from '../Theme'
import { TextInput, CallToAction } from '../Components'

interface Props extends RX.CommonProps {
  login?: (username: string, password: string, baseUrl: string) => void
  isLoggingIn?: boolean
}

interface State extends RX.CommonProps {
  baseUrl?: string
  username?: string
  password?: string
}

export default class MatrixLogin extends RX.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      baseUrl: 'https://matrix.org',
      username: '',
      password: '',
    }
  }

  render() {
    return (
      <RX.View >
        <TextInput
          label='Home server'
          value={this.state.baseUrl}
          onChangeText={(baseUrl) => this.setState({baseUrl})}
          />
        <TextInput
          label='User name'
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          />
        <TextInput
          secureTextEntry={true}
          label='Password'
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          />
        <CallToAction
          title={'Login'}
          onPress={() => this.props.login(this.state.username, this.state.password, this.state.baseUrl)}
          inProgress={this.props.isLoggingIn}
          />
      </RX.View>
    )
  }
}
