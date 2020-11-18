import path from '@/iop-drms/api/index'
import BaseService from '@/service/base'
import Enum from '@/iop-drms/views/resource-definition/tool/enum'
import { objectTool } from 'mwutil'
/* 增删改查逻辑处理 */
class ResourceDefinition extends BaseService {
  getTimeUnitList () {
    return Enum.TIMEUNIT
  }
  getChangeIndexList () {
    return Enum.CHANGEINDEX || []
  }
  getIndicatorsList () {
    return Enum.INDICATOR || []
  }
  getThemeList () {
    return Enum.THEME || []
  }
  getChartTypeList () {
    return Enum.CHARTTYPELIST || []
  }
  // 获取维度和选择指标下拉
  getDimesionList (objectId) {
    return new Promise((resolve, reject) => {
      this.get({
        url: path.resource.getDimesionList + '/' + objectId
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  getList (id, params) {
    params = Object.assign({
      page: 1,
      size: 10
    }, params)
    return new Promise((resolve, reject) => {
      this.get({
        url: path.resource.list + '/' + id,
        params
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 获取tab列表
  getTabList (query) {
    return new Promise((resolve, reject) => {
      this.get({
        url: path.resource.tabList + '?' + objectTool.toQueryString(query),
        params: {
          id: 0
        }
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 获取search信息
  getConstructList (id, params) {
    return new Promise((resolve, reject) => {
      this.get({
        url: path.resource.constructList + '/' + id,
        params
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 获取form信息
  getConstructForm (id, params) {
    return new Promise((resolve, reject) => {
      this.get({
        url: path.resource.constructForm + '/' + id,
        params
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 获取数据详情
  getInfo (url, id) {
    return new Promise((resolve, reject) => {
      this.get({
        url: url + id
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 新增
  doCreate (url, data) {
    return new Promise((resolve, reject) => {
      this.post({
        url: url,
        data
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 更新
  doEdit (url, id, data) {
    return new Promise((resolve, reject) => {
      this.put({
        url: url + id,
        data
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 选中删除
  doRemoveSelect (url, data) {
    return new Promise((resolve, reject) => {
      this.post({
        url: url,
        data: data.items
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 行内删除
  doRemove (url) {
    return new Promise((resolve, reject) => {
      this.delete({
        url: url
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 获取selectname
  getSelectorName (objectCode, id) {
    return new Promise((resolve, reject) => {
      this.get({
        url: `${path.resource.getSelectorName}/${objectCode}/${id}`
      })
        .then(x => {
          resolve(x.result ? x.result : '')
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 获取资源关联对象目录
  getRelationList (data) {
    return new Promise((resolve, reject) => {
      this.get({
        url: path.resource.getRelationList + '/' + data.objectId + '/' + data.id
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 获取分析数据
  getAnalysis (data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      this.post({
        url: path.resource.getAnalysis,
        data: data
      })
        .then(x => {
          resolve(x.result ? x.result : [])
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 添加到菜单
  doAddToMenu (data) {
    return new Promise((resolve, reject) => {
      this.post({
        url: path.resource.doAddToMenu,
        params: data
      })
        .then(() => {
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}
export default new ResourceDefinition()
