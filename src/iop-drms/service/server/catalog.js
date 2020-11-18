import path from '@/iop-drms/api/index'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class CatalogService extends BaseService {
  /* 查询列表数据 */
  async allList (params = {}) {
    const { result } = await this.get({
      url: path.manage.catalog.allList,
      params
    })
    return result
  }
  /* 查询详细数据 */
  async query (id = '') {
    const { result } = await this.get({
      url: path.manage.catalog.query,
      variable: { id }
    })
    return result
  }
  /* 新增 */
  async add (params = {}) {
    const { result } = await this.post({
      url: path.manage.catalog.add,
      params
    })
    return result
  }
  /* 修改 */
  async modif (id = '', params = {}) {
    const { result } = await this.put({
      url: path.manage.catalog.modif,
      variable: { id },
      params
    })
    return result
  }
  /* 删除 */
  async remove (id = '') {
    const { result } = await this.delete({
      url: path.manage.catalog.delete,
      variable: { id }
    })
    return result
  }
  /* 查询树形数据 */
  async getTree (params = {}) {
    const { result } = await this.get({
      url: path.manage.catalog.tree,
      params
    })
    return result
  }
  async rele (id = '', params = {}) {
    const { result } = await this.put({
      url: path.manage.catalog.rele,
      variable: { id },
      params
    })
    return result
  }
}
export default new CatalogService()
