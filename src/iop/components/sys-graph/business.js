import d3 from './d3'
import Config from './config'
import Force from './force'
import Nodes from './nodes'
import Edges from './edges'
import Marker from './markers'
/* eslint-disable */
class Business {
  constructor () {
    // 当前节点id
    this.id = ''
    // 全局唯一实例instance
    this.instance = null
    // 线条关系数组
    this.edges = new Edges()
    // 节点
    this.nodes = new Nodes()
    // 力距图实例
    this.force = new Force()
    // 箭头
    this.markers = new Marker()
    this.symbalId = 9000
    // 全局一些配置存放
    this.config = {
      width: 0,
      height: 0,
      colorMap: {}
    }
  }
  /**
   * @description 设置当前节点
   * @param {*} code 
   */
  setCurrent (id) {
    this.id = id
    this.nodes.setId(id)
  }
  /**
   * @description 获取一个全局唯一id
   */
  newId () {
    return this.symbalId++
  }
  // 根据type获取笔触颜色
  getStockLineColorByType (d) {
    // 解决this指向问题必须这么return
    return (function () {
      const codeNum = d.code || 'default'
      return (this.config.colorMap[codeNum]) || '#333'
    }).apply(BusinessInstance)
  }
  /**
   * @description 设置config
   * @param { Object } x config
   */
  setConfig (x) {
    this.config.width = x.width || Config.width
    this.config.height = x.height || Config.height
    this.config.colorMap = x.colorMap || Config.colorMap
  }
  /**
   * @description 传入容器id 生成唯一content
   * @param { String } boxId 
   */
  setContext (boxId) {
    this.instance = d3.select('#' + boxId)
      .append('svg')
      .attr('id', 'svgGraph')
      .attr('width', this.config.width)
      .attr('height', this.config.height)
      .append('g')
      .attr('id', 'svgOne')
      .call(d3.behavior.zoom() // 自动创建事件侦听器
        .scaleExtent([0.1, 10]) // 缩放允许的级数
        .on('zoom', () => {
          this.getContext().attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')')
        })
      )
  }
  /**
   * @description 获取唯一实例 在外部只能通过该方法获取
   */
  getContext () {
    return this.instance
  }
  
  /**
   * @description 获取/设置线条数据源
   * @param { Array } edges 
   */
  setEdgesDataSource (edges) {
    this.edges.setDataSource(edges)
    this.markers.setDataSource(edges)
  }
  getEdgesDataSource () {
    return this.edges.getDataSource()
  }

  /**
   * @description 获取/设置节点数据源
   * @param { Array } nodes
   */
  getNodeDataSource () {
    return this.nodes.getDataSource()
  }
  setNodeDataSource (nodes) {
    this.nodes.setDataSource(nodes)
  }

  /**
   * @description 力距图设置/获取实例
   * @param { Array } nodeDataSource 
   * @param { Array } edgesDataSource 
   */
  setForce (nodeDataSource = this.getNodeDataSource(), edgesDataSource = this.getEdgesDataSource()) {
    this.force.assignment(nodeDataSource, edgesDataSource, {
      size: [this.config.width, this.config.height]
    })
  }
  getForce () {
    return this.force.getInstance()
  }

  /**
   * @description 获取/设置线条实例
   * @param { Array } data 
   */
  renderEdges (data) {
    this.edges.assignment(data)
  }
  getEdges () {
    return this.edges.getInstance()
  }

  /**
   * @description 绘制箭头
   * @param { Array } data 
   */
  renderMarkers (data) {
    this.markers.assignment(data)
  }

  /**
   * @description 设置/获取节点实例
   */
  renderNodes () {
    this.nodes.assignment(this.nodes.renderNodes())
  }
  getNodes () {
    return this.nodes.getInstance()
  }
  
  /**
   * @description 设置/获取线条上的文字实例
   * @param {Array} textEdges 
   */
  setSvgTextEdges (textEdges) {
    this.edges.setText(textEdges)
  }
  getSvgTextEdges () {
    return this.edges.getText()
  }

  // 重置canvas节点信息
  resetCanvas () {
    if (this.instance) {
      this.instance.selectAll("svg").remove()
    }
    // this.instance = null
    this.markers.reset()
    this.edges.reset()
    this.nodes.reset()
    // this.force.reset()
  }
  // 启动
  run () {
    this.getForce().stop().start()
  }
  // 初始化数据
  insertData (data, config) {
    this.setNodeDataSource(data.nodes)
    if (data.links) {
      // 设置线
      this.setEdgesDataSource(data.links)
    }
    this.setForce(this.getNodeDataSource(), this.getEdgesDataSource())
    this.nodes.setCustomNodeText(config.customNodeText)
  }
  // 增加节点、线条、箭头、图谱等
  build () {
    // list === 线条、箭头的数据源
    const isHasLinks = this._complianceArray(this.getEdgesDataSource())
    if (isHasLinks) {
      // 绘制连线
      this.renderMarkers(this.getContext())
      this.renderEdges(this.edges.getConfig(this.getContext()))
    }
    // 添加节点与文字
    this.renderNodes()
    if (isHasLinks) {
      // 添加描述关系的文字
      this.setSvgTextEdges(this.edges.addTextEdges(this.getContext()))
    }
  }
  // 动态更新规则
  polling () {
    const that = this
    that.getForce().on('tick', function () { // 对于每一个时间间隔
      // 更新连线坐标·
      const isHasLinks = that._complianceArray(that.getEdgesDataSource())
      if (isHasLinks) {
        that.getEdges().attr('x1', function (d) {
          return d.source.x
        })
          .attr('y1', function (d) {
            return d.source.y
          })
          .attr('x2', function (d) {
            return d.target.x
          })
          .attr('y2', function (d) {
            return d.target.y
          })
      }
      // 更新节点以及文字坐标
      that.getNodes()
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
      // 更新关系文字坐标
      if (isHasLinks) {
        that.getSvgTextEdges()
          .attr('x', function (d) {
            return (d.source.x + d.target.x) / 2
          })
          .attr('y', function (d) {
            return (d.source.y + d.target.y) / 2
          })
      }
    })
    this.getForce().resume()
  }
  /**
   * @description 校验数组是否非空，并且第一项存在
   * @param {Array} list
   * @private
   */
  _complianceArray (list) {
    return list.length > 0 && list[0] !== 'undefined' && list[0] !== '' && list[0] !== null
  }
  
}
const BusinessInstance = new Business ()
export default BusinessInstance
