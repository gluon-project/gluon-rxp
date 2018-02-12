import RX = require('reactxp')
import * as Theme from '../Theme'
import { Icons, AccountIcon } from '../Components'
import * as _ from 'lodash'
import Utils from '../Utils'

interface Props extends RX.CommonProps {
  attachment?: Attachment
}

export default class AttachmentCard extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.attachment.card}>

        {this.props.attachment.data.links.thumbnail && <RX.Image
          style={Theme.Styles.attachment.image}
          resizeMode={'cover'}
          source={this.props.attachment.data.links.thumbnail[0].href}
        />}

        {this.props.attachment.data.meta && <RX.View style={Theme.Styles.attachment.siteRow}>
          {this.props.attachment.data.links.icon && <RX.Image
            style={Theme.Styles.attachment.icon}
            source={this.props.attachment.data.links.icon[0].href}
          />}
          <RX.View style={Theme.Styles.column}>
            <RX.Text style={Theme.Styles.attachment.title}>{this.props.attachment.data.meta.title}</RX.Text>
            <RX.Text style={Theme.Styles.attachment.description}>{this.props.attachment.data.meta.description}</RX.Text>
            <RX.Text style={Theme.Styles.attachment.description}>{Utils.url.getHost(this.props.attachment.data.url)}</RX.Text>
          </RX.View>
        </RX.View>}
      </RX.View>
    )
  }
}
