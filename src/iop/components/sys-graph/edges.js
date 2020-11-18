/**
 * @description 线、线中文字配置实例
 */
import Business from './business'
export default class Edges {
  constructor () {
    this.dataSource = []
    this.textEdges = null
    this.edges = null
  }
  setDataSource (data) {
    this.dataSource = this.getDataSource().concat(data)
  }
  getDataSource () {
    return this.dataSource
  }
  getConfig (context) {
    const svgEdges = context.select('#lineAndText')
      .selectAll('line')
      .data(this.getDataSource())
      .enter()
      .append('line')
      .attr('id', function (d) {
        return d.index
      })
      // 线的样式
      .style('stroke', Business.getStockLineColorByType)
      .style('stroke-width', 2)
      // 线结束的样式（箭头）
      .attr('marker-end', function (d) {
        return 'url(#' + d.index + ')'
      })
      .attr('stroke', Business.getStockLineColorByType)
      .attr('stroke_width', 2)
    return svgEdges
  }
  /**
   * @description 添加线上的文字
   */
  addTextEdges (context) {
    var svgTextEdges = context.select('#lineAndText')
      .selectAll('line.text')
      .data(this.dataSource)
      .enter()
      .append('text')
      .attr('id', (d) => {
        return d.index
      })
      .style('fill', '#000')
      .attr('x', function (d) {
        return (d.source.x + d.target.x) / 2
      })
      .attr('y', function (d) {
        return (d.source.y + d.target.y) / 2
      })
      .text((d) => {
        return d.name
      })
    return svgTextEdges
  }
  assignment (data) {
    this.edges = data
  }
  getInstance () {
    return this.edges
  }

  setText (textEdges) {
    this.textEdges = textEdges
  }
  getText () {
    return this.textEdges
  }
  reset () {
    this.dataSource = []
  }
}
