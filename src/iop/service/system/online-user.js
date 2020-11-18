import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 在线用户service
 *
 * @class
 * @extends BaseService
 */

class OlineService extends BaseService {
  /**
   * 强制用户下线
   *
   * @public
   * @param {String} string 请求参数
   */
  async tick (params = {}) {
    const { result } = await this.put({
      url: path.system.onlineUser.tick,
      params
    })
    return result
  }
}
export default new OlineService()
