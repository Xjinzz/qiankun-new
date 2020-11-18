import path from '@/iop-drms/api/index'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class ObjectService extends BaseService {
  /* 查询列表数据 */
  async allList (params = {}) {
    const { result } = await this.get({
      url: path.manage.object.allList,
      params
    })
    return result
  }
  /* 查询详细数据 */
  async query (id = '') {
    const { result } = await this.get({
      url: path.manage.object.query,
      variable: { id }
    })
    return result
  }
  /* 新增 */
  async add (params = {}) {
    const { result } = await this.post({
      url: path.manage.object.add,
      params
    })
    return result
  }
  /* 修改 */
  async modif (id = '', params = {}) {
    const { result } = await this.put({
      url: path.manage.object.modif,
      variable: { id },
      params
    })
    return result
  }
  /* 删除 */
  async remove (id = '') {
    const { result } = await this.delete({
      url: path.manage.object.delete,
      variable: { id }
    })
    return result
  }
  /* 查询树形数据 */
  async getTree (params = {}) {
    const { result } = await this.get({
      url: path.manage.object.tree,
      params
    })
    return result
  }
  async rele (id = '', params = {}) {
    const { result } = await this.put({
      url: path.manage.object.rele,
      variable: { id },
      params
    })
    return result
  }
  async releAll (id = '', params = {}) {
    const { result } = await this.put({
      url: path.manage.object.releAll,
      variable: { id },
      params
    })
    return result
  }
  async authTree (params = {}) {
    const { result } = await this.get({
      url: path.manage.object.authTree,
      params
    })
    return result
  }
  async codeTree (params = {}) {
    const { result } = await this.get({
      url: path.manage.object.codeTree,
      params
    })
    return result
  }
  async servTree (params = {}) {
    const { result } = await this.get({
      url: path.manage.object.servTree,
      params
    })
    return result
  }
  async servRele (id = '', params = {}) {
    const { result } = await this.post({
      url: path.manage.object.servRele,
      variable: { id },
      params
    })
    return result
  }
  async rulesTree (params = {}) {
    const { result } = await this.get({
      url: path.manage.object.rulesTree,
      params
    })
    return result
  }
  async cataChange (data = [], params = {}) {
    const { result } = await this.post({
      url: path.manage.object.cataChange,
      data,
      params
    })
    return result
  }
  async exportTree (params = {}) {
    const { result } = await this.get({
      url: path.manage.object.exportTree,
      params
    })
    return result
  }
}
export default new ObjectService()
