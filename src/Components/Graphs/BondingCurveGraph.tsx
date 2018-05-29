import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')
import * as Theme from '../../Theme'
import { line, curveCatmullRom, area } from 'd3-shape'
import { path } from 'd3-path'
import { scaleLinear } from 'd3-scale'
import { range } from 'd3-array'

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  stakedColor?: string,
  isMint: boolean,
  totalSupply: number,
  exponent: number,
  numTokens: number,
  priceCode: string,
  supplyCode: string,
}

interface State {
  width: number
}

class BondingCurveGraph extends RX.Component <Props, State> {
  static defaultProps: Props

  constructor(props: Props) {
    super(props)
    this.state = {
      width: props.width,
    }
  }

  render() {

    const numTokens = this.props.numTokens
    const totalSupply = this.props.totalSupply
    let maxTotalSupply = (totalSupply + numTokens) > totalSupply * 2 ? (totalSupply + numTokens) * 1.3 : (totalSupply || 10) * 2
    maxTotalSupply = maxTotalSupply < 10 ? 10 : maxTotalSupply
    const numberOfDataPoints = 200
    const exponent = 2//this.props.exponent

    let data = range(0, maxTotalSupply, maxTotalSupply / numberOfDataPoints / 2)
    data.push(maxTotalSupply)

    let supplyData = range(0, totalSupply, totalSupply / numberOfDataPoints / 2)
    supplyData.push(totalSupply)

    let txData
    const step = numTokens / numberOfDataPoints
    if (this.props.isMint) {
      txData = range(totalSupply, totalSupply + numTokens, step)
      txData.push(totalSupply + numTokens)
    } else {
      txData = range(totalSupply - numTokens, totalSupply, step)
      txData.push(totalSupply)
    }

    const price = (supply: number) => Math.pow(supply, exponent)

    const x = scaleLinear().domain([0, maxTotalSupply]).range([0, this.state.width])
    const y = scaleLinear().domain([price(maxTotalSupply), 0]).range([0, this.props.height])

    const xTicks: any[] = x.ticks(4)
    xTicks[0] = ''
    xTicks[xTicks.length - 1] = `${this.props.supplyCode} Supply`
    const yTicks: any[] = y.ticks(4)
    yTicks[0] = `${this.props.priceCode} Price`

    const axisX = scaleLinear().domain([0, 1]).range([0, this.state.width])
    const axisY = scaleLinear().domain([1, 0]).range([0, this.props.height])

    const axisL: (any) = line()
      .x(function(d: any) { return axisX(d.x) })
      .y(function(d: any) { return axisY(d.y) })

    const l: (any) = line()
      .x(function(d: any) { return x(d) })
      .y(function(d: any) { return y(price(d)) })
      // .curve(curveCatmullRom.alpha(0.5))

    const a: (any) = area()
      .x(function(d: any) { return x(d) })
      .y1(function(d: any) { return y(price(d)) })
      .y0(y(0))
      // .curve(curveCatmullRom.alpha(0.5))

    // console.log('supplyData', supplyData)
    // console.log('txData', txData)
    // console.log('data', data)

    return(
      <RX.View
        style={Theme.Styles.scrollContainer}>
        <RX.View
          style={{flexDirection: 'row'}}
          >
          <RX.View style={{position: 'absolute', justifyContent: 'space-between', top: 0, bottom: 0}}>
            {yTicks.map((tick: number, index) => <RX.Text key={index} style={Theme.Styles.graph.yAxisLabel}>{tick}</RX.Text>)}
          </RX.View>
          <RX.View
            style={{flex: 1}}
            onLayout={(e: RX.Types.ViewOnLayoutEvent) => this.setState({width: e.width})}>
            <RXImageSvg
              style={{alignSelf: 'center'}}
              width={this.state.width}
              height={this.props.height}
              viewBox={`0 0 ${this.state.width} ${this.props.height}`}
            >
            <RXSvgPath
              fillColor={this.props.stakedColor}
              strokeColor={null}
              strokeWidth={0}
              d={a(supplyData)}
            />
            <RXSvgPath
              fillColor={Theme.Colors.brand}
              strokeColor={null}
              strokeWidth={0}
              d={a(txData)}
            />
            <RXSvgPath
              fillColor={'transparent'}
              strokeColor={Theme.Colors.brand}
              strokeWidth={1}
              d={l(data)}
            />

            <RXSvgPath
              fillColor={'transparent'}
              strokeColor={Theme.Colors.borderColor}
              strokeWidth={2}
              d={axisL([{x: 0, y: 0}, {x: 1, y: 0}])}
            />
            <RXSvgPath
              fillColor={'transparent'}
              strokeColor={Theme.Colors.borderColor}
              strokeWidth={2}
              d={axisL([{x: 0, y: 0}, {x: 0, y: 1}])}
            />
          </RXImageSvg>
          <RX.View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {xTicks.map((tick: number, index) => <RX.Text key={index} style={Theme.Styles.graph.xAxisLabel}>{tick}</RX.Text>)}
          </RX.View>
        </RX.View>
      </RX.View>
    </RX.View>
    )
  }
}

BondingCurveGraph.defaultProps = {
  width: 500,
  height: 300,
  stakedColor: '#424242',
  isMint: false,
  exponent: 2,
  totalSupply: 1,
  numTokens: 0,
  supplyCode: '',
  priceCode: '',
}

export default BondingCurveGraph
