import path from '@/iop-drms/api/index'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class OpenCatalogService extends BaseService {
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
  // 查询区域
  async objectDomain (params = {}) {
    const { result } = await this.get({
      url: path.server.openData.objectDomain,
      params
    })
    return result
  }
  async dataCount (code = '') {
    const { result } = await this.get({
      url: `/iop/drms/server/data/${code}/data-count`
    })
    return result
  }
  async attrList (id = '') {
    const { result } = await this.get({
      url: `/iop/drms/server/open-data/${id}/attr-list`
    })
    return result
  }
  async openDataList (id = '') {
    const { result } = await this.get({
      url: `/iop/drms/server/open-data/${id}`
    })
    return result
  }
}
export default new OpenCatalogService()
