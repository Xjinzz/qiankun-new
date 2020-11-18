import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 字典定义类型service
 *
 * @class
 * @extends BaseService
 */

class CodeclaService extends BaseService {
  async getById (id = '') {
    const { result } = await this.get({ url: `${path.system.codecla.index}/${id}` })
    return result
  }

  async remove (id = '') {
    const { result } = await this.delete({ url: `${path.system.codecla.index}/${id}` })
    return result
  }
}
export default new CodeclaService()
