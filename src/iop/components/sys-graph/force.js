/**
 * @description 力图实例
 */
import d3 from './d3'
import { arrayTool } from 'mwutil'
// import Business from './business'
export default class Force {
  constructor () {
    this.force = null
    this.original = d3.layout.force()
  }
  /**
   * @description 判断数组数据是否包含空值
   * @param { Array } data 需要判断的数组
   * @returns { Boolean } 包含 true / 不包含 false
   */
  checkVoidForArray (data) {
    if (!arrayTool.isArray(data)) {
      return false
    }
    if (data.length === 0) {
      return true
    }
    let flag = false
    for (var i = 0; i < data.length; i++) { // 关系数据添加INDEX值（为了方便对应图形元素）
      var obj = data[i]
      if (obj !== 'undefined' && obj !== '' && obj !== null) {
        flag = true
        obj.index = i
      }
    }
    return flag
  }
  assignment (nodeDataSource, edgesDataSource, config) {
    if (edgesDataSource.length !== 0 && !this.checkVoidForArray(edgesDataSource)) {
      this.original
        .nodes(nodeDataSource) // 指定节点数组
        .size(config.size) // 指定范围
        .linkDistance(180) // 指定连线长度
        .friction(0.9) // 设置摩擦力速度衰减
        .charge(-400) // 相互之间的作用力
    } else {
      this.original
        .nodes(nodeDataSource) // 指定节点数组
        .links(edgesDataSource) // 指定连线数组
        .size(config.size) // 指定范围
        .linkDistance(180) // 指定连线长度
        .friction(0.9) // 设置摩擦力速度衰减
        .charge(-400) // 相互之间的作用力
    }
    this.force = this.original
  }
  getInstance () {
    return this.force
  }
  reset () {
    this.force = null
  }
}
