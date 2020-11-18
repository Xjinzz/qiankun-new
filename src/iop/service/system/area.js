import path from '@/iop/api/index'
import BaseService from '@/service/base'

// 增删改查逻辑处理
class AreaService extends BaseService {
  async getById (areaId) {
    const { result } = await this.get({ url: `${path.system.area.index}/${areaId}` })
    return result
  }
}
export default new AreaService()
