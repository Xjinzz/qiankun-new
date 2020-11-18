import API from '@/iop/api/index'
import BaseService from '@/service/base'
import Enum from '@/iop/views/system/sys-definition/enum'
import { dateTool } from 'mwutil'

function _arrayToFreeJson (array, key, value) {
  const result = {}
  array.forEach(x => {
    result[x[key]] = x[value]
  })
  return result
}
// proxy拦截data
function _arrayToFreeJsonProxy (array, key, value, addTextList = [], addObjList = []) {
  const proxyResultArray = array.map(x => {
    if (addTextList.includes(x[key])) {
      x[value] = x[value] + x['unit']
    }
    if (addObjList.includes(x[key])) {
      x[value] = {
        unit: x['unit'],
        value: x[value]
      }
    }
    return x
  })
  return _arrayToFreeJson(proxyResultArray, key, value)
}
export class SysDefinition extends BaseService {
  constructor () {
    super()
    this.tomcatState = {}
    this.jvmState = {}
  }
  cleanState () {
    this.tomcatState = {}
    this.jvmState = {}
  }
  getSysType () {
    return Enum.sysType
  }
  getMenusList () {
    return Enum.menusList
  }
  getRoleList () {
    return Enum.roleList
  }
  getSyncList () {
    return Enum.syncList
  }
  getRektCompList () {
    return Enum.rektCompList
  }
  getSysStatusList () {
    return Enum.sysStatusList
  }
  // 首页查询
  async doSearch (params) {
    const { result } = await this.get({
      url: API.sysDefinition.currency,
      params
    })
    return result
  }
  // 新增保存
  async doSave (data) {
    const { result } = await this.post({
      url: API.sysDefinition.currency,
      data
    })
    return result
  }
  // 删除
  async doRemove (id) {
    const { result } = await this.delete({
      url: API.sysDefinition.currency + '/' + id
    })
    return result
  }
  // 详情
  async getInfo (id) {
    const { result } = await this.get({
      url: API.sysDefinition.currency + '/' + id
    })
    return result
  }
  // 获取物理部署列表
  async getPhyList (params) {
    const { result } = await this.get({
      url: API.sysDefinition.getPhyList,
      params
    })
    return result
  }
  // 获取子组件列表
  async getSubCompList (id) {
    if (id === '') return
    const { result } = await this.get({
      url: API.sysDefinition.getSubCompList + '/' + id,
      params: {
        size: 50
      }
    })
    return result
  }
  // 获取依赖组件列表
  async getDependList (id) {
    const { result } = await this.get({
      url: API.sysDefinition.getDependList + '/' + id
    })
    return result
  }
  // 获取被依赖组件列表
  async getBeDependList (id) {
    const { result } = await this.get({
      url: API.sysDefinition.getBeDependList + '/' + id
    })
    return result
  }
  // 保存依赖组件列表
  async doSaveDepend (data) {
    const { result } = await this.post({
      url: API.sysDefinition.doSaveDepend,
      data
    })
    return result
  }
  // 删除依赖
  async doDelDepend (id) {
    const { result } = await this.delete({
      url: API.sysDefinition.doDelDepend + '/' + id
    })
    return result
  }
  // 保存物理配置
  async doSavePgy (data) {
    const { result } = await this.post({
      url: API.sysDefinition.pgyCurrency,
      data
    })
    return result
  }
  // 删除物理配置
  async doDelPhy (id) {
    const { result } = await this.delete({
      url: API.sysDefinition.pgyCurrency + '/' + id
    })
    return result
  }
  // 获取物理配置详情
  async getPgyInfo (id) {
    const { result } = await this.get({
      url: API.sysDefinition.pgyCurrency + '/' + id
    })
    return result
  }
  // 更新物理配置详情
  async doUpdatePgy (id, data) {
    const { result } = await this.put({
      url: API.sysDefinition.pgyCurrency + '/' + id,
      data
    })
    return result
  }
  // 获取认证列表
  async getAuthList (params) {
    const { result } = await this.get({
      url: API.sysDefinition.authCurrency,
      params
    })
    return result
  }
  async getSkinList () {
    const { result } = await this.get({
      url: API.sysDefinition.getSkinList
    })
    result.map(item => {
      item.json = JSON.parse(item.json) || {}
    })
    return result
  }
  // 获取认证配置详情
  async getAuthInfo (id) {
    const { result } = await this.get({
      url: API.sysDefinition.authCurrency + '/' + id
    })
    return result
  }
  async doSaveAuth (data) {
    const { result } = await this.post({
      url: API.sysDefinition.authCurrency,
      data
    })
    return result
  }
  // 更新认证配置详情
  async doUpdateAuth (id, data) {
    const { result } = await this.put({
      url: API.sysDefinition.authCurrency + '/' + id,
      data
    })
    return result
  }
  // 删除物理配置
  async doDelAuth (id) {
    const { result } = await this.delete({
      url: API.sysDefinition.authCurrency + '/' + id
    })
    return result
  }
  // 切换认证的启用停用
  async doRela (params) {
    const { result } = await this.post({
      url: API.sysDefinition.relaCurrency,
      params
    })
    return result
  }
  // 获取认证配置详情
  async getRelaList (params) {
    const { result } = await this.get({
      url: API.sysDefinition.relaCurrency,
      params
    })
    return result
  }
  // 勾选/取消认证策略
  async relaChecked (params) {
    const { result } = await this.post({
      url: API.sysDefinition.relaChecked,
      params
    })
    return result
  }
  // 获取认证配置表单
  async getRelaFormInfo (params) {
    const { result } = await this.get({
      url: API.sysDefinition.relaFormInfo,
      params
    })
    return result
  }
  // 保存策略表单
  async doSavePolic (data) {
    const { result } = await this.post({
      url: API.sysDefinition.relaFormSave,
      data
    })
    return result
  }
  // 更新策略表单
  async doUpdatePolic (id, data) {
    const { result } = await this.put({
      url: API.sysDefinition.relaFormSave + '/' + id,
      data
    })
    return result
  }
  async doEdit (id = '', data) {
    const { result } = await this.put({
      url: API.sysDefinition.currency + '/' + id,
      data: data
    })
    return result
  }
  // 获取服务器信息
  async getServerInfo (id = '') {
    const { result } = await this.get({
      url: API.sysDefinition.getServerInfo + '/' + id
    })
    return _arrayToFreeJson(result, 'paraName', 'paraValue')
  }
  // 处理activeSessionNum
  recordActiveSessionNum (session, state) {
    const timer = dateTool.time(new Date().valueOf())
    for (const key in session) {
      const item = session[key]
      if (!state[key]) {
        state[key] = []
      }
      state[key].push({
        timer,
        value: item
      })
      if (state[key].length > 5) {
        state[key].shift()
      }
    }
  }
  // 获取tomcat信息
  async getTomcatInfo (id = '') {
    const { result } = await this.get({
      url: API.sysDefinition.getTomcatInfo + '/' + id
    })
    const freeJson = _arrayToFreeJsonProxy(result, 'paraName', 'paraValue', [], [
      Enum.MonitorModal.TOMCAT.SENT,
      Enum.MonitorModal.TOMCAT.REQMAX,
      Enum.MonitorModal.TOMCAT.REQCOUNT,
      Enum.MonitorModal.TOMCAT.REQTOTAL
    ])
    this.recordActiveSessionNum({
      [Enum.MonitorModal.TOMCAT.ACTIVECURRENT]: freeJson[Enum.MonitorModal.TOMCAT.ACTIVECURRENT],
      [Enum.MonitorModal.TOMCAT.ACTIVEMAX]: freeJson[Enum.MonitorModal.TOMCAT.ACTIVEMAX],
      [Enum.MonitorModal.TOMCAT.CURRENT]: freeJson[Enum.MonitorModal.TOMCAT.CURRENT]
    }, this.tomcatState)
    return Object.assign(freeJson, this.tomcatState)
  }
  async getJvmInfo (id = '') {
    const { result } = await this.get({
      url: API.sysDefinition.getJvmInfo + '/' + id
    })
    const freeJson = _arrayToFreeJsonProxy(result, 'paraName', 'paraValue', [
      Enum.MonitorModal.JVM.GCTOTAL,
      Enum.MonitorModal.JVM.GCCOUNT,
      Enum.MonitorModal.JVM.FULLGCSIZE,
      Enum.MonitorModal.JVM.GCMAX,
      Enum.MonitorModal.JVM.GCPROMOTED,
      Enum.MonitorModal.JVM.GCALLOCATED
    ], [
      Enum.MonitorModal.JVM.MEMORYMAX,
      Enum.MonitorModal.JVM.MEMORYCOMMIT,
      Enum.MonitorModal.JVM.MEMORYUSED,
      Enum.MonitorModal.JVM.BUFFERUSED,
      Enum.MonitorModal.JVM.BUFFERCOUNT
    ])
    this.recordActiveSessionNum({
      [Enum.MonitorModal.JVM.THREADSLIVE]: freeJson[Enum.MonitorModal.JVM.THREADSLIVE],
      [Enum.MonitorModal.JVM.THREADSDAEMON]: freeJson[Enum.MonitorModal.JVM.THREADSDAEMON]
    }, this.jvmState)
    return Object.assign(freeJson, this.jvmState)
  }
}
export default new SysDefinition()
