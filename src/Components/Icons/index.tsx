import RX = require('reactxp')
import RequestIcon from './RequestIcon'
import SendIcon from './SendIcon'
import AboutIcon from './AboutIcon'
import About1Icon from './About1Icon'
import About2Icon from './About2Icon'
import About3Icon from './About3Icon'
import About4Icon from './About4Icon'
import ContactsIcon from './ContactsIcon'
import SettingsIcon from './SettingsIcon'
import FeedIcon from './FeedIcon'
import OnIcon from './OnIcon'
import OffIcon from './OffIcon'
import ChevronLeftIcon from './ChevronLeftIcon'
import ChevronRightIcon from './ChevronRightIcon'
import BackSpaceIcon from './BackSpaceIcon'
import WalletIcon from './WalletIcon'
import TransfersIcon from './TransfersIcon'
import LogoIcon from './LogoIcon'
import MoreIcon from './MoreIcon'
import RadioButton from './RadioButton'

import AvatarIcon from './AvatarIcon'
import AwardIcon from './AwardIcon'
import ClaimIcon from './ClaimIcon'
import CustomIcon from './CustomIcon'
import DeleteIcon from './DeleteIcon'
import EmailIcon from './EmailIcon'
import FacebookIcon from './FacebookIcon'
import HashTagIcon from './HashTagIcon'
import InstagramIcon from './InstagramIcon'
import LinkIcon from './LinkIcon'
import NameTagIcon from './NameTagIcon'
import PhoneIcon from './PhoneIcon'
import PhotoIcon from './PhotoIcon'
import PlusIcon from './PlusIcon'
import SaveIcon from './SaveIcon'
import SkillIcon from './SkillIcon'
import TwitterIcon from './TwitterIcon'

const iconByName = (name: string) => {
  return TwitterIcon
}

interface Props extends RX.CommonProps {
  type?: string
  fill?: string
}

class MultiIcon extends RX.Component <Props, null> {

  render () {
    let Icon: any = null
    switch (this.props.type.toLowerCase()) {
      case 'avatar':
        Icon = AvatarIcon
        break
      case 'name':
        Icon = NameTagIcon
        break
      case 'email':
        Icon = EmailIcon
        break
      case 'phone':
        Icon = PhoneIcon
        break
      case 'twitter':
        Icon = TwitterIcon
        break
      case 'facebook':
        Icon = FacebookIcon
        break
      case 'instagram':
        Icon = InstagramIcon
        break
      case 'photo':
        Icon = PhotoIcon
        break
      case 'url':
        Icon = LinkIcon
        break
      case 'skill':
        Icon = SkillIcon
        break
      case 'award':
        Icon = AwardIcon
        break
      case 'hashtag':
        Icon = HashTagIcon
        break
    }
    return(
      <Icon {...this.props} />
    )
  }
}

export default {
  RequestIcon,
  SendIcon,
  AboutIcon,
  About1Icon,
  About2Icon,
  About3Icon,
  About4Icon,
  ContactsIcon,
  SettingsIcon,
  FeedIcon,
  OnIcon,
  OffIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BackSpaceIcon,
  WalletIcon,
  TransfersIcon,
  LogoIcon,
  MoreIcon,
  RadioButton,

  AvatarIcon,
  AwardIcon,
  ClaimIcon,
  CustomIcon,
  DeleteIcon,
  EmailIcon,
  FacebookIcon,
  HashTagIcon,
  InstagramIcon,
  LinkIcon,
  NameTagIcon,
  PhoneIcon,
  PhotoIcon,
  PlusIcon,
  SaveIcon,
  SkillIcon,
  TwitterIcon,

  MultiIcon,
}
