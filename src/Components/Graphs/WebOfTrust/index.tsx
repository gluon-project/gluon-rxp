import { default as RXImageSvg, SvgPath as RXSvgPath } from 'reactxp-imagesvg'
import RX = require('reactxp')
import { AccountIcon } from '../../../Components'
import * as Theme from '../../../Theme'
import { line, curveCatmullRom, area } from 'd3-shape'
import { path } from 'd3-path'
import { scaleLinear } from 'd3-scale'
import { range } from 'd3-array'
import utils from '../../../Utils'
import * as dagre from 'dagre'
import { reduce, forEach, keys } from 'lodash'

const size = 48
const sizeRatio = 0.8

interface Props extends RX.CommonProps {
  width?: number
  height?: number
  claims: VerifiableClaim[]
  handleSelectContact?: (did: string) => void
  selectedContact?: string,
}

interface State {
  width: number
  nodes?: any[]
  edges?: any[]
}

class WebOfTrust extends RX.Component <Props, State> {
  static defaultProps: Props

  constructor(props: Props) {
    super(props)
    const {nodes, edges} = this.buildGraph(props)
    this.state = {
      width: props.width,
      nodes,
      edges,
    }
  }

  buildGraph(props: Props) {
    let graph = new dagre.graphlib.Graph()
    graph.setGraph({rankdir: 'LR', align: 'UL', ranker: 'longest-path', marginx: 15, marginy: 15})

    const users = reduce(props.claims, function(result: any, claim: VerifiableClaim) {
      if (!result[claim.iss]) {
        const interactions: any = {}
        interactions[claim.sub] = 1
        result[claim.iss] = {
          account: claim.issuer,
          interactions,
        }
      } else {
        result[claim.iss].interactions[claim.sub] = result[claim.iss].interactions[claim.sub]
          ? result[claim.iss].interactions[claim.sub] + 1 : 1
      }

      if (!result[claim.sub]) {
        const interactions: any = {}
        interactions[claim.iss] = 1
        result[claim.sub] = {
          account: claim.subject,
          interactions,
        }
      } else {
        result[claim.sub].interactions[claim.iss] = result[claim.sub].interactions[claim.iss]
          ? result[claim.sub].interactions[claim.iss] + 1 : 1
      }
      return result
    }, {})

    const allClaimCount = props.claims.length
    const minSize = 1
    const maxSize = 10
    const calcEdgeWeight = (interactionCount: number) => {
      const ratio = interactionCount / allClaimCount
      return minSize + (maxSize - minSize) * ratio
    }

    const allUserCount = keys(users).length
    const minAvatarSize = 30
    const maxAvatarSize = 40
    const calcNodeSize = (uniqueIssuers: number) => {
      const ratio = uniqueIssuers / allUserCount
      return minAvatarSize + (maxAvatarSize - minAvatarSize) * ratio
    }

    const interactionCounts: any = {}
    // {start: 'did1', end: 'did2', count: 4}
    forEach(users, (user: any) => {
      const size = calcNodeSize(user.account.uniqueIssuers ? user.account.uniqueIssuers.length : 1)
      graph.setNode(user.account.did, {width: size * sizeRatio, height: size * sizeRatio, size: size, account: user.account})

      forEach(user.interactions, (count: number, did: string) => {
        const id1 = `${user.account.did}${did}`
        const id2 = `${did}${user.account.did}`
        if (interactionCounts[id1]) {
          interactionCounts[id1].count = interactionCounts[id1].count + count
        } else if (interactionCounts[id2]) {
          interactionCounts[id2].count = interactionCounts[id2].count + count
        } else {
          interactionCounts[id1] = {
            start: user.account.did,
            end: did,
            count: count,
          }
        }
      })
    })

    forEach(interactionCounts, (item: any, id: string) => {
      graph.setEdge(item.start, item.end, {weight: calcEdgeWeight(item.count), id: id})
    })

    dagre.layout(graph)

    const nodes = graph.nodes().map((node: any) => graph.node(node))
    const edges = graph.edges().map((node: any) => graph.edge(node))
    return {nodes, edges}
  }
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.props.selectedContact !== nextProps.selectedContact || this.state.width !== nextState.width
  }
  render() {
    const l: (any) = line()
    .x(function(d: any) { return d.x })
    .y(function(d: any) { return d.y })
    .curve(curveCatmullRom.alpha(0.5))
    return(
      <RX.View
        style={Theme.Styles.scrollContainer}>
          <RX.View
            style={{flex: 1}}
            onLayout={(e: RX.Types.ViewOnLayoutEvent) => this.setState({width: e.width})}>
            <RXImageSvg
              style={{alignSelf: 'center'}}
              width={this.state.width}
              height={this.props.height}
              viewBox={`0 0 ${this.state.width} ${this.props.height}`}
            >
            {this.state.edges.map((edge: any) => {
              return (<RXSvgPath
                key={edge.id}
                fillColor={'transparent'}
                strokeColor={Theme.Colors.light}
                strokeWidth={edge.weight}
                d={l(edge.points)}
              />)
            })}

          </RXImageSvg>
        {this.state.nodes.map((node: any) => node !== undefined && <RX.Button key={node.account.did}
          onPress={() => this.props.handleSelectContact(node.account.did)}
          style={{position: 'absolute',
          top: node.y - node.size * (node.account.did === this.props.selectedContact ? 2 : 1) / 2,
          left: node.x - node.size * (node.account.did === this.props.selectedContact ? 2 : 1) / 2}}>
          <AccountIcon account={node.account} type={AccountIcon.type.Custom}
          size={node.size * (node.account.did === this.props.selectedContact ? 2 : 1)}/>
        </RX.Button>)}
      </RX.View>
    </RX.View>
    )
  }
}

WebOfTrust.defaultProps = {
  width: 500,
  height: 800,
  claims: [],
}

export default WebOfTrust
