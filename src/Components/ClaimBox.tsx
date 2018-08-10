import RX = require('reactxp')
import * as Theme from '../Theme'
import { Icons, AccountIcon, VisualBox } from '../Components'
import * as _ from 'lodash'
import * as Enums from '../Enums'
import * as moment from 'moment'

interface Props extends RX.CommonProps {
  claim?: VerifiableClaim
  hideSubject?: boolean
}

export default class ClaimBox extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.claimBox.wrapper}>
        <RX.Text style={Theme.Styles.claimBox.claimType}>{this.props.claim.claimType}</RX.Text>
        <RX.View style={Theme.Styles.claimBox.claimValueView}>
        {this.props.claim.claimType !== 'Avatar' && <RX.Text style={Theme.Styles.claimBox.claimValue}>
          {this.props.claim.claimValue}
        </RX.Text>}
        {this.props.claim.claimType === 'Avatar' && <AccountIcon
          account={{avatar: this.props.claim.claimValue}}
          type={AccountIcon.type.Large}
          />}
        </RX.View>
        <RX.View style={Theme.Styles.row}>
          <RX.Text style={Theme.Styles.claimBox.issuer}>Issued by: </RX.Text>
          <AccountIcon account={this.props.claim.issuer} type={AccountIcon.type.Micro}/>
          <RX.Text style={Theme.Styles.claimBox.issuer}> {this.props.claim.issuer.name} </RX.Text>
          <RX.Text style={Theme.Styles.claimBox.issuer}> {moment.unix(this.props.claim.iat).calendar()}</RX.Text>
        </RX.View>
        {!this.props.hideSubject && <RX.Text style={Theme.Styles.claimBox.issuer}>Subject: {this.props.claim.subject.name}</RX.Text>}
        {this.props.claim.source && <RX.View style={Theme.Styles.row}>
          <RX.Text style={Theme.Styles.claimBox.issuer}>Source: </RX.Text>
            <AccountIcon
            account={this.props.claim.source.account}
            type={AccountIcon.type.Micro}/>
          <RX.Text style={Theme.Styles.claimBox.issuer}>{this.props.claim.source.account.name} </RX.Text>
        </RX.View>}
      </RX.View>
    )
  }
}
