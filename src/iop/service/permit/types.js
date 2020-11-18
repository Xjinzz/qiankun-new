import path from '@/iop/api/index'
import BaseService from '@/service/base'

class PermitService extends BaseService {
  async getTree (params) {
    const { result } = await this.get({
      url: path.permit.types.tree,
      params
    })
    return result
  }
  async getList (params) {
    const { result } = await this.get({
      url: path.permit.types.list,
      params
    })
    return result
  }
  async deleteData (id) {
    const { result } = await this.delete({
      url: `${path.permit.types.index}/${id}`
    })
    return result
  }
}
export default new PermitService()
