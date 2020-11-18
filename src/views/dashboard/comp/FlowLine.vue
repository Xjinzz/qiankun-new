<template>
  <div :ref="'FlowLine_'+businessId" :id="'FlowLine_'+businessId"></div>
</template>
<script>
import G6 from '@antv/g6'
import Business from './business'
const afterDrawForCircle = (cfg, group) => {
  // get the first shape in the group, it is the edge's path here=
  const shape = group.get('children')[0]
  // the start position of the edge's path
  const startPoint = shape.getPoint(0)
  // add red circle shape
  const circle = group.addShape('circle', {
    attrs: {
      x: startPoint.x,
      y: startPoint.y,
      fill: cfg.style.circle,
      r: cfg.style.circleWidth
    },
    name: 'circle-shape'
  })
  circle.cfg.visible = false

  circle.animate(
    ratio => {
      const tmpPoint = shape.getPoint(ratio)
      circle.cfg.visible = true
      return {
        x: tmpPoint.x,
        y: tmpPoint.y
      }
    },
    {
      repeat: false,
      duration: cfg.duration,
      delay: cfg.delay,
      callback: (a, b) => {
        circle.cfg.visible = false
      }
    }
  )
}
export default {
  props: {
    dataSource: {
      type: Array,
      require: true,
      default: () => []
    },
    referNumber: {
      type: Number,
      require: true,
      default: () => 100000
    },
    alg: {
      type: Number,
      require: true,
      default: () => 1
    }
  },
  name: 'FlowLine',
  data () {
    return {
      businessId: Business.newId()
    }
  },
  mounted () {
    this.registerEdge()
    const data = this.makeData(this.dataSource)
    const graph = this.bindData(data)
    graph.render()
    this.loopEvent(graph)
  },
  methods: {
    loopEvent (graph) {
      setTimeout(() => {
        graph.clear()
        graph.render()
        this.loopEvent(graph)
      }, this.referNumber)
    },
    // 组册一种新的Edge动画
    registerEdge () {
      G6.registerEdge(
        'flow-line',
        {
          afterDraw () {
            afterDrawForCircle.apply(this, arguments)
            // afterDrawForLine.apply(this, arguments)
          }
        },
        'line'
      )
    },
    // 绑定数据
    bindData (data) {
      const id = 'FlowLine_' + this.businessId
      const dom = this.$refs[id]
      const graph = new G6.Graph({
        container: id,
        width: dom.clientWidth,
        height: dom.clientHeight,
        defaultNode: {
          size: 1
        },
        defaultEdge: {
          type: 'flow-line'
        }
      })
      graph.data(data)
      return graph
    },
    // 制作合规的data
    makeData (data) {
      const nodes = []
      const edges = []
      data.forEach(x => {
        x.__id = Business.newId()
        nodes.push(...Business.makeNodes(x, this.alg))
        edges.push(Business.makeEdges(x))
      })
      return {
        nodes, edges
      }
    }
  }
}
</script>
