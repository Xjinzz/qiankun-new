import path from '@/iop-drms/api/index'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class OpenService extends BaseService {
  /* 查询列表数据 */
  async getList (params = {}) {
    const { result } = await this.get({
      url: path.server.openData.table,
      params
    })
    return result
  }
  /* 查询列表数据 */
  async getSerList (params = {}) {
    const { result } = await this.get({
      url: path.server.openData.serTable,
      params
    })
    return result
  }
  /* 查询树形数据 */
  async getTree (params = {}) {
    const { result } = await this.get({
      url: path.server.openData.tree,
      params
    })
    return result
  }
  /* 查询单个数据 */
  async getData (id = '') {
    const { result } = await this.get({
      url: path.server.openData.getData,
      variable: { id }
    })
    return result
  }
  // 详情
  async table (id = '') {
    const { result } = await this.get({
      url: path.server.serv.table,
      variable: { id }
    })
    return result
  }
  async methList (id = '') {
    const { result } = await this.get({
      url: path.server.serv.methList,
      variable: { id }
    })
    return result
  }
  async meth (id = '') {
    const { result } = await this.get({
      url: path.server.serv.meth,
      variable: { id }
    })
    return result
  }
  async para (id = '') {
    const { result } = await this.get({
      url: path.server.serv.para,
      variable: { id }
    })
    return result
  }
  async dataCount (code = '') {
    const { result } = await this.get({
      url: `/iop/drms/server/data/${code}/data-count`
    })
    return result
  }
  async servCount (code = '') {
    const { result } = await this.get({
      url: `/iop/drms/server/data/${code}/serv-count`
    })
    return result
  }
  // 查询区域
  async serviceDomain (params = {}) {
    const { result } = await this.get({
      url: path.server.openData.serviceDomain,
      params
    })
    return result
  }
}
export default new OpenService()
