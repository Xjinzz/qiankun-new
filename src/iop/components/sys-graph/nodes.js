/**
 * @description node节点配置实例
 */
import Business from './business'
import Config from './config'
import d3 from './d3'
const img = require('@/assets/file.png')
const local = Config.urlFixed
/* eslint-disable */
export default class Nodes {
  constructor () {
    this.id = ''
    // 节点数据源
    this.dataSource = []
    // svg实例
    this.nodes = null
    // node节点文字key
    this.customNodeText = null
  }
  setCustomNodeText (fn) {
    this.customNodeText = fn
  }
  setId (id) {
    this.id = id
  }
  setDataSource (data) {
    this.dataSource = this.getDataSource().concat(data)
  }
  getDataSource () {
    return this.dataSource
  }
  renderNodes () {
    const svgNodes = Business.getContext().append('g')
      .attr('id', 'circleAndText')
      .selectAll('circle')
      .data(this.getDataSource())
      .enter()
      .append('g')
      // 控制拖动
      .call(Business.getForce().drag().on('dragstart', function (d) {
        d3.select('#eee').remove() // 删除节点扇形
        d3.select('#sel').remove() // 删除节点选中
        d3.event.sourceEvent.stopPropagation() // 画布拖动与节点拖动分离
        d3.select(this).attr('r', 25 * 2)
      })
        .on('dragend', function(d) {
          d3.select('#eee').remove() // 删除节点扇形
          d3.select('#sel').remove() // 删除节点选中
          d.fixed = true // 拖动结束后节点固定
          d3.select(this).attr('r', 25)
        })
      )
      // 添加item
    svgNodes.append('circle')
      .attr('id', (d) => {
        return d.index
      })
      .attr('r', 25)
      .attr('fill', (d, i) => {
        if (d.labels === 'DrmsObject') {  // 平台点
          return '#ff5757'
        } else {
          return '#000'
        }
      })
    // 修改中间的图片
    svgNodes.append('image')
      .attr('class', 'circle')
      .attr('xlink:href', (d) => {
        if (d.object_graph_show_id === this.id) {
          return img
        }
        if (d.labels === 'DrmsObject') { // 平台点
          return local + '/graph/path/images/2.png'
        } else {
          return local + '/graph/path/images/default.png'
        }
      })
      .attr('x', '-25px')
      .attr('y', '-25px')
      .attr('width', '50px')
      .attr('height', '50px')
      // 添加item下方文字
    svgNodes.append('svg:text')
      .style('fill', '#000')
      .attr('text-anchor', 'middle') // 在圈中心加文字
      .attr('dy', 50)
      .text((d) => {
        // if (d.labels === 'DrmsObject') { // 平台点
        //   return d.name
        // } else {
        //   return d.name
        // }
        return this.customNodeText(d)
      })
    return svgNodes
  }
  assignment (value) {
    this.nodes = value
  }
  getInstance () {
    return this.nodes
  }
  reset () {
    this.dataSource = []
  }
}
