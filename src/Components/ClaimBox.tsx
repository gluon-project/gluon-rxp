import RX = require('reactxp')
import * as Theme from '../Theme'
import { Icons, AccountIcon, VisualBox } from '../Components'
import * as _ from 'lodash'
import * as Enums from '../Enums'
import * as moment from 'moment'

interface Props extends RX.CommonProps {
  claim?: VerifiableClaim
  hideSubject?: boolean
  handleSignClaim?: (claim: VerifiableClaim) => void
  handleContactPress?: (user: User) => void
  currentUser?: User
}

export default class ClaimBox extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.box.wrapper}>
        <RX.View style={Theme.Styles.claimBox.claimValueView}>
        <RX.View style={[Theme.Styles.row, {alignItems: 'center'}]}>
          <RX.View style={{marginRight: Theme.Metrics.smallMargin}}>
            <Icons.MultiIcon type={this.props.claim.claimType} fill={Theme.Colors.info}/>
          </RX.View>
          <RX.Text style={Theme.Styles.box.titleLabelInfo}>{this.props.claim.claimType}</RX.Text>
        </RX.View>
        {this.props.claim.claimType !== 'Avatar' && <RX.Text style={Theme.Styles.contact.groupListItemTitle}>
          {this.props.claim.claimValue}
        </RX.Text>}
        {this.props.claim.claimType === 'Avatar' && <AccountIcon
          account={{avatar: this.props.claim.claimValue}}
          type={AccountIcon.type.Large}
          />}
        </RX.View>

        <RX.View style={{flex: 1, flexDirection: 'row', marginBottom: 15,
          borderColor: Theme.Colors.borderColor,
          borderTopWidth: Theme.Metrics.borderWidth,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}>
          <RX.View style={{flex: 1}} />
          <RX.View style={{flex: 3}} >
            <RX.View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', height: 66}}>
              <RX.Button onPress={() => this.props.handleContactPress(this.props.claim.issuer)}>
                <AccountIcon
                  account={this.props.claim.issuer}
                  type={AccountIcon.type.Custom} size={46}/>
              </RX.Button>
              <RX.View style={{
                flex: 1, height: 46, alignItems: 'center', justifyContent: 'center'}}>
                <RX.View style={{
                  position: 'absolute', left: 0, right: 0, top: 24, height: 1, backgroundColor: Theme.Colors.borderColor,
                }} />
                <Icons.ChevronRightIcon />
              </RX.View>

              <RX.Button onPress={() => this.props.handleContactPress(this.props.claim.subject)}>
                <AccountIcon
                  account={this.props.claim.subject}
                  type={AccountIcon.type.Custom} size={46}/>
              </RX.Button>
            </RX.View>
          </RX.View>
          <RX.View style={{flex: 1}} />

          </RX.View>
          <RX.View style={Theme.Styles.row}>
                <RX.View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <RX.Text style={{color: Theme.Colors.light}}>{this.props.claim.issuer.name}</RX.Text>
                  <RX.Text style={{color: Theme.Colors.info}}>
                  {this.props.claim.issuer.uniqueIssuers ? this.props.claim.issuer.uniqueIssuers.length : 0} signers
                  </RX.Text>
                </RX.View>
                <RX.View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <RX.Text style={{color: Theme.Colors.light}}>{this.props.claim.subject.name}</RX.Text>
                  <RX.Text style={{color: Theme.Colors.info}}>
                  {this.props.claim.subject.uniqueIssuers ? this.props.claim.subject.uniqueIssuers.length : 0} signers
                  </RX.Text>
                </RX.View>

              </RX.View>

        <RX.View style={Theme.Styles.box.footerRow}>
          <RX.Text style={Theme.Styles.claimBox.issuer}>Issued: {moment.unix(this.props.claim.iat).calendar()}</RX.Text>
          {this.props.claim.exp && <RX.Text style={Theme.Styles.claimBox.issuer}>
          Expires: {moment.unix(this.props.claim.exp).calendar()}</RX.Text>}
        </RX.View>
        <RX.Button
            style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}
            onPress={() => this.props.handleSignClaim(this.props.claim)}>
            <AccountIcon account={this.props.currentUser} type={AccountIcon.type.Custom} size={20}/>
            <RX.Text style={Theme.Styles.contact.detailsLabel}>Sign</RX.Text>
          </RX.Button>
      </RX.View>
    )
  }
}
