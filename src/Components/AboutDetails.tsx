import RX = require('reactxp')
import * as Theme from '../Theme'
import { ListItem, CallToAction } from '../Components'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  routeName: string,
}

export default class AboutDetails extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.container}>
        <ListItem
          type={ListItem.type.Default}
          selected={this.props.routeName === 'About1'}
          title={'What is Gluon?'}
          subTitle={'Idea and project'}
          isOff
          onPress={() => this.props.navigate('About1')}
          />
        <ListItem
          type={ListItem.type.Default}
          selected={this.props.routeName === 'About2'}
          title={'What can you do with Gluon?'}
          subTitle={'Functionality'}
          isOff
          onPress={() => this.props.navigate('About2')}
          />
        <ListItem
          type={ListItem.type.Default}
          selected={this.props.routeName === 'About3'}
          title={'Who can use Gluon?'}
          subTitle={'Some usage ideas'}
          isOff
          onPress={() => this.props.navigate('About3')}
          />
        <ListItem
          type={ListItem.type.Default}
          selected={this.props.routeName === 'About4'}
          title={'How Gluon works?'}
          subTitle={'Technical stuff'}
          isOff
          onPress={() => this.props.navigate('About4')}
          />

    </RX.View>
    )
  }
}
