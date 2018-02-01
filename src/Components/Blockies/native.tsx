import RX = require('reactxp')
import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'

interface Props extends RX.CommonProps {
  seed?: string
  style?: any
  width?: number
}

const randseed = new Array(4)

class Blockies extends RX.Component<Props, null> {

  seedrand(seed: string) {
    for (let i = 0; i < randseed.length; i++) {
      randseed[i] = 0
    }

    for (let i = 0; i < seed.length; i++) {
      randseed[i % 4] = ((randseed[i % 4] << 5) - randseed[i % 4]) + seed.charCodeAt(i)
    }
  }

  rand() {
    const t = randseed[0] ^ (randseed[0] << 11)

    randseed[0] = randseed[1]
    randseed[1] = randseed[2]
    randseed[2] = randseed[3]
    randseed[3] = (randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8))

    return (randseed[3] >>> 0) / ((1 << 31) >>> 0)
  }

  createColor() {
    const h = Math.floor(this.rand() * 360)
    const s = ((this.rand() * 60) + 40) + '%'
    const l = ((this.rand() + this.rand() + this.rand() + this.rand()) * 25) + '%'

    const color = 'hsl(' + h + ',' + s + ',' + l + ')'

    return color
  }

  createImageData(size: number) {
    const width = size
    const height = size

    const dataWidth = Math.ceil(width / 2)
    const mirrorWidth = width - dataWidth

    const data = []

    for (let y = 0; y < height; y++) {
      let row = []

      for (let x = 0; x < dataWidth; x++) {
        row[x] = Math.floor(this.rand() * 2.3)
      }

      let r = row.slice(0, mirrorWidth)

      r.reverse()

      row = row.concat(r)

      for (let i = 0; i < row.length; i++) {
        data.push(row[i])
      }
    }

    return data
  }

  renderIcon(size: number, scale: number) {
    const seed = this.props.seed || Math.floor((Math.random() * Math.pow(10, 16))).toString(16)

    this.seedrand(seed)

    const color = this.createColor()
    const bgcolor = this.createColor()
    const spotcolor = this.createColor()

    const imageData = this.createImageData(size)
    const width = Math.sqrt(imageData.length)

    return imageData.map((item, i) => {
      let fill = bgcolor

      if (item) {
        if (item === 1) {
          fill = color
        } else {
          fill = spotcolor
        }
      }

      let row = Math.floor(i / size)
      let col = i % size

      return (
        <RXSvgPath
          key={i}
          d={`M${col * scale} ${row * scale} h${scale} v${scale} h-${scale} v-${scale}z`}
          fillColor={fill}
        />
      )
    })
  }

  render() {
    const size = 8
    const scale = this.props.width / size
    return (
      <RXImageSvg
        style={this.props.style}
        width={this.props.width}
        height={this.props.width}
      >
      {this.renderIcon(size, scale)}

    </RXImageSvg>
    )
  }
}

export default Blockies
