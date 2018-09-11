import RX = require('reactxp')
import * as Theme from '../Theme'
import { TextInput, CallToAction, SegmentedControl } from '../Components'

interface Props extends RX.CommonProps {
  login?: (username: string, password: string, baseUrl: string) => void
  register?: (username: string, password: string, baseUrl: string) => void
  isLoggingIn?: boolean
  isRegistering?: boolean
}

interface State {
  baseUrl?: string
  username?: string
  password?: string
  password2?: string
  register?: boolean
}

export default class MatrixLogin extends RX.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      baseUrl: 'https://matrix.org',
      username: '',
      password: '',
      password2: '',
      register: false,
    }
  }

  handleSubmit() {
    if (this.state.register) {
      this.props.register(this.state.username, this.state.password, this.state.baseUrl)
    } else {
      this.props.login(this.state.username, this.state.password, this.state.baseUrl)
    }
  }

  handleKeyPress(e: any) {
    if (e.key === 'Enter') {
      this.handleSubmit.bind(this)()
    }
  }

  render() {
    return (
      <RX.View style={RX.Platform.getType() !== 'web' && { paddingBottom: 500}}>
        <SegmentedControl
          titles={['Login', 'Register']}
          selectedIndex={this.state.register ? 1 : 0}
          handleSelection={(index) => this.setState({register: (index === 1 ? true : false)})}
          />
        {!this.state.register && <RX.View>
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
            onKeyPress={(e) => this.handleKeyPress(e)}
            />
          {this.state.register && <TextInput
            secureTextEntry={true}
            label='Confirm password'
            value={this.state.password2}
            onChangeText={(password2) => this.setState({password2})}
            />}
          <RX.View style={Theme.Styles.scrollContainer}>
            <CallToAction
              padded
              disabled={this.state.password === ''
              || this.state.username === ''
              || this.state.baseUrl === ''
              || this.state.register
              // || (this.state.register && this.state.password !== this.state.password2)
            }
              title={this.state.register ? 'Not supported' : 'Login'}
              onPress={this.handleSubmit.bind(this)}
              inProgress={this.props.isLoggingIn || this.props.isRegistering}
              />
          </RX.View>
        </RX.View>}
        {this.state.register && <RX.View style={[Theme.Styles.scrollContainer, {alignItems: 'center'}]}>
          <RX.View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
            <RX.Text style={Theme.Styles.about.p}>Register not supported. Please use Riot to create new user</RX.Text>
            <RX.View style={Theme.Styles.riotWrapper}>
              <RX.Image
                source={require('../../src/Assets/riot_logo.png')}
                style={{width: 110, height: 97}}
                />
            </RX.View>
          </RX.View>

          <CallToAction
              title={'Open Riot.im'}
              onPress={() => RX.Linking.openUrl('https://riot.im/app/#/register')}
              />
        </RX.View>}
      </RX.View>
    )
  }
}
