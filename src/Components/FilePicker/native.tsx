import RX = require('reactxp')
import RNImagePicker = require('react-native-image-picker')
import { CallToAction } from '../../Components'

interface Props extends RX.CommonProps {
  onChange?: (files: ImagePickerFile[]) => void
}

class ImagePicker extends RX.Component<Props, null> {
  constructor(props: Props) {
    super(props)
    this.showImagePicker = this.showImagePicker.bind(this)
  }

  showImagePicker() {
    var options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    RNImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        throw(response.error)
      } else {
        this.props.onChange([{dataUrl: 'data:image/jpeg;base64,' + response.data}])
      }
    })
  }

  render() {
    return (
      <CallToAction
        type={CallToAction.type.Main}
        title='Choose photo'
        onPress={this.showImagePicker}
        />
    )
  }
}

export default ImagePicker
