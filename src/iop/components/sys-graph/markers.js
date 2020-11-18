/**
 * @description 箭头配置实例
 */
import Business from './business'
export default class Marker {
  constructor () {
    this.dataSource = []
    this.markers = null
  }
  setDataSource (data) {
    this.dataSource = this.dataSource.concat(data)
  }
  assignment (context) {
    this.markers = context.append('g')
      .attr('id', 'lineAndText')
      .selectAll('marker')
      .data(this.dataSource)
      .enter()
      .append('marker')
      .attr('id', function (d) {
        return d.index
      })
      .attr('viewBox', '0 -5 10 10') // 坐标系的区域
      .attr('class', 'arrow')
      .attr('refX', 32) // refX,refY在viewBox内的基准点，绘制时此点在直线端点上（要注意大小写）//箭头与终点的距离
      .attr('refY', 0)
      .attr('markerWidth', 10) // 标识的大小
      .attr('markerHeight', 18) // 标识的大小
      .attr('markerUnits', 'userSpaceOnUse') // 标识大小的基准，有两个值：strokeWidth（线的宽度）和userSpaceOnUse（图形最前端的大小）
      .attr('orient', 'auto') // 绘制方向，可设定为：auto（自动确认方向）和 角度值
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', Business.getStockLineColorByType)
  }
  getInstance () {
    return this.markers
  }
  reset () {
    this.dataSource = []
  }
}
