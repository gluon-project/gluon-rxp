import * as dagre from 'dagre'
import * as _ from 'lodash'

const size = {
  width: 250,
  height: 20,
}

export function distributeElements(model: any) {
  let clonedModel = _.cloneDeep(model)
  let nodes = distributeGraph(clonedModel)
  nodes.forEach((node: any) => {
    let modelNode = clonedModel.nodes.find((item: any) => item.id === node.id)
    modelNode.x = node.x
    modelNode.y = node.y
  })
  return clonedModel
}

function distributeGraph(model: any) {
  let nodes = mapElements(model)

  let edges = mapEdges(model)
  let graph = new dagre.graphlib.Graph()
  graph.setGraph({rankdir: 'LR', align: 'UL', ranker: 'longest-path'})
  graph.setDefaultEdgeLabel(() => ({}))
  //add elements to dagre graph
  nodes.forEach((node: any) => {
    graph.setNode(node.id, node.metadata)
  })
  edges.forEach((edge: any) => {
    if (edge.from && edge.to) {
      graph.setEdge(edge.from, edge.to)
    }
  })
  //auto-distribute
  dagre.layout(graph)
  return graph.nodes().map((node: any) => graph.node(node))
}

function mapElements(model: any) {
  // dagre compatible format
  return model.nodes.map((node: any) =>
  ({ id: node.id, metadata: { width: size.width, height: size.height + 15 * node.ports.length, id: node.id } }))
}

function mapEdges(model: any) {
  // returns links which connects nodes
  // we check are there both from and to nodes in the model. Sometimes links can be detached
  return model.links
    .map((link: any) => ({
      from: link.source,
      to: link.target,
    }))
    .filter(
      (item: any) => model.nodes.find((node: any) => node.id === item.from) && model.nodes.find((node: any) => node.id === item.to),
    )
}
