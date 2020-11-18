import path from '@/iop/api/index'
import BaseService from '@/service/base'

// 增删改查逻辑处理
class StoresService extends BaseService {
  // 查询树
  async typeTree (params = {}) {
    const { result } = await this.get({
      url: path.file.stores.typeTree,
      params: params
    })
    return result
  }
  async treeCkeck (params = {}) {
    const { result } = await this.post({
      url: path.file.stores.treeCkeck,
      params: params
    })
    return result
  }
  // 统计概览
  async analysis (id = '') {
    const { result } = await this.get({
      url: path.file.stores.analysis,
      variable: { id: id }
    })
    return result
  }
  async getDefiList (objectId) {
    const { result } = await this.get({
      url: path.file.stores.getDefiList + objectId
    })
    return result
  }
}
export default new StoresService()
