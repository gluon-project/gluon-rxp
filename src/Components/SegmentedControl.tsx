import RX = require('reactxp')
import * as Theme from '../Theme'

interface Props extends RX.CommonProps {
  titles: string[]
  selectedIndex: number
  handleSelection: (index: number) => void
}

export default class SegmentedControl extends RX.Component<Props, null> {

  render() {
    return (
      <RX.View style={Theme.Styles.segmentedControl.wrapper}>
        {this.props.titles.map((title, index) => (
          <RX.Button
            key={index}
            onPress={() => this.props.handleSelection(index)}
            style={this.props.selectedIndex === index ?
              Theme.Styles.segmentedControl.selectedButton
            : Theme.Styles.segmentedControl.button}
            >
            <RX.Text
              style={this.props.selectedIndex === index ?
                Theme.Styles.segmentedControl.selectedLabel
              : Theme.Styles.segmentedControl.label}>{title}</RX.Text>
          </RX.Button>
        ))}
      </RX.View>
    )
  }
}
