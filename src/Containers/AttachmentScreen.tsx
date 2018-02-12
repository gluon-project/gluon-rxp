import RX = require('reactxp')
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import Utils from '../Utils'
import { CallToAction, ScrollView, AttachmentCard, TextInput, ImagePicker } from '../Components'
import { CombinedState } from '../Reducers'
import Actions from '../Reducers/Actions'
import * as Theme from '../Theme'
import * as Selectors from '../Selectors'
import * as Enums from '../Enums'

interface Props extends RX.CommonProps {
  navigate?: (routeName: string) => void
  navigateBack?: () => void
  startDownload?: () => void
  saveAttachment?: () => void
  setUrl?: (url: string) => void
  setMessage?: (message: string) => void
  setParsedAttachmentData?: (data: AttachmentData) => void
  attachment?: Attachment
  transaction?: Transaction
  isProcessing?: boolean
  isSaving?: boolean
  uiTraits?: UITraits

}

const styles = {
  textInput: RX.Styles.createTextInputStyle({
    height: Theme.Metrics.buttonHeight * 2,
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'white',
    borderWidth: 1,
    borderColor: Theme.Colors.borderColor,
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: Theme.Metrics.baseMargin,
    marginTop: Theme.Metrics.baseMargin,
  }),
  link: RX.Styles.createViewStyle({
    backgroundColor: Theme.Colors.light,
    borderWidth: 1,
    borderRadius: 1,
    marginBottom: Theme.Metrics.baseMargin,
    padding: Theme.Metrics.baseMargin,
    borderColor: Theme.Colors.borderColor,
  }),

}

class AttachmentScreen extends RX.Component<Props, null> {
  private debouncedParseUrls: (message: string) => void

  constructor(props: Props) {
    super(props)
    this.debouncedParseUrls = debounce(this.parseUrls, 1000)
    this.handleImagePickerChange = this.handleImagePickerChange.bind(this)
  }

  private parseUrls = (message: string) => {
    const urls = Utils.url.getUrls(message, {stripWWW: false})
    if (urls.length > 0 && this.props.attachment.url !== urls[0]) {
      this.props.setUrl(urls[0])
      this.props.startDownload()
    }
  }

  private handleMessageChange = (message: string) => {
    this.props.setMessage(message)
    this.debouncedParseUrls(message)
  }
  componentDidUpdate(prevProps: Props) {
    if (this.props.uiTraits.horizontalIsCompact
    && this.props.attachment.ipfs
    && this.props.attachment.ipfs !== prevProps.attachment.ipfs) {
      this.props.navigateBack()
    }
  }
  handleImagePickerChange(files: ImagePickerFile[]) {
    const attachmentData: AttachmentData = {
      url: 'https://gluon.space',
      links: {
        thumbnail: [
          { href: files[0].dataUrl },
        ],
      },
    }
    this.props.setParsedAttachmentData(attachmentData)
  }

  render() {
    return (
      <RX.View style={Theme.Styles.containerOpaque}>
        <ScrollView >
          <TextInput
            multiline
            label={'Message'}
            placeholder={'Enter message and URL'}
            value={this.props.attachment.message}
            onChangeText={this.handleMessageChange}
          />

          {!this.props.isProcessing && this.props.attachment.data && <RX.View style={Theme.Styles.attachment.wrapper}>
            <AttachmentCard attachment={this.props.attachment} />
          </RX.View>}

          {this.props.isProcessing && <RX.ActivityIndicator color={Theme.Colors.light} type={'large'}/>}
          <ImagePicker
            onChange={this.handleImagePickerChange}
            />
          <CallToAction
            inProgress={this.props.isSaving}
            type={CallToAction.type.Main}
            title='Set Attachment'
            onPress={this.props.saveAttachment}
            disabled={!this.props.attachment.message}
            />
        </ScrollView>
      </RX.View>
    )
  }
}

const mapStateToProps = (state: CombinedState): Props => {
  return {
    transaction: state.transactions.new,
    attachment: state.attachment.new,
    isProcessing: Selectors.Process.isRunningProcess(state, Enums.ProcessType.ProcessAttachment),
    isSaving: Selectors.Process.isRunningProcess(state, Enums.ProcessType.SaveAttachment),
    uiTraits: state.app.uiTraits,
  }
}
const mapDispatchToProps = (dispatch: any): Props => {
  return {
    navigate: (routeName: string) => dispatch(Actions.Navigation.navigate(routeName)),
    navigateBack: () => dispatch(Actions.Navigation.navigateBack()),
    setUrl: (url: string) => dispatch(Actions.Attachment.setUrl(url)),
    setMessage: (message: string) => dispatch(Actions.Attachment.setMessage(message)),
    startDownload: () => dispatch(Actions.Attachment.startDownload()),
    saveAttachment: () => dispatch(Actions.Attachment.saveAttachment()),
    setParsedAttachmentData: (data: AttachmentData) => dispatch(Actions.Attachment.setParsed(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AttachmentScreen)
