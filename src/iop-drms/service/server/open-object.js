import path from '@/iop-drms/api/index'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class OpenObjectService extends BaseService {
  /* 查询列表数据 */
  async getList (params = {}) {
    const { result } = await this.get({
      url: path.server.openData.table,
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
  async attrList (id = '') {
    const { result } = await this.get({
      url: `/iop/drms/server/open-data/${id}/attr-list`
    })
    return result
  }
  async headList (code = '', id = '') {
    const { result } = await this.get({
      url: `/iop/drms/server/data/${code}/test/list-head/${id}`
    })
    return result
  }
  async dataList (code = '', id = '') {
    const { result } = await this.get({
      url: `/iop/drms/server/data/${code}/test/list-data/${id}`
    })
    return result
  }
  async relationList (id = '') {
    const { result } = await this.get({
      url: `/iop/drms/server/open-data/relation-list/${id}`
    })
    return result
  }
  // 查询区域
  async objectDomain (params = {}) {
    const { result } = await this.get({
      url: path.server.openData.objectDomain,
      params
    })
    return result
  }
  // 导出树形
  async export (params = {}) {
    const { result } = await this.get({
      url: path.manage.auth.treeVisit,
      params
    })
    return result
  }
}
export default new OpenObjectService()
