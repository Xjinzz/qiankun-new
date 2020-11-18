import API from '@/iop/api/index'
import BaseService from '@/service/base'
// import Enum from './enum'
const helper = {
  data: {},
  asyncSpareHelper: (name, fn, cb) => {
    return new Promise((resolve) => {
      if (helper.data[name]) {
        return resolve(helper.data[name])
      }
      fn.apply(fn).then(x => {
        helper.data[name] = cb(x) || x
        return resolve(helper.data[name])
      })
    })
  }
}
class DataSourceSet extends BaseService {
  // getVolumeUnit () {
  //   return Enum.VOLUMEUNITLIST
  // }
  // getTimeUnit () {
  //   return Enum.TIMEUNITLIST
  // }
  async getDataSource () {
    const { result } = await this.get({
      url: API.system.dbjndi.table + `?page=1&size=99`
    })
    return result.data.map(item => {
      return {
        name: item.jndiName,
        value: item.jndiId
      }
    })
  }
  getTypeList () {
    return helper.asyncSpareHelper('typeList', () => {
      return this.get({
        url: API.dataSourceSet.getTypeList + `?page=1&size=100`
      })
    }, (x) => {
      const result = {}
      x.result.data.forEach(item => {
        result[item.methodCode] = item.methodName
      })
      return result
    })
  }
  async getDataSourceById (id) {
    const { result } = await this.get({
      url: API.sysDefinition.currency + '/' + id
    })
    return result
  }
  setDataSource (data) {
    return this.put({
      url: API.dataSourceSet.setDataSource + `/${data.appId}/${data.jndiId}`
    })
  }
  getConfigList (data) {
    return this.get({
      url: API.dataSourceSet.getConfigList + `/${data.type}/${data.appId}`
    })
  }
  async addConfig (data) {
    const { result } = await this.post({
      url: API.dataSourceSet.saveConfig + `/${data.type}/${data.appId}`,
      data
    })
    return result
  }
  async delConfig (data) {
    const { result } = await this.post({
      url: API.dataSourceSet.delConfig + `/${data.type}/${data.appId}/${data.method}`
    })
    return result
  }
}
export default new DataSourceSet()
