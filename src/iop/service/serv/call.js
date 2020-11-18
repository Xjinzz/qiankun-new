import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 调用服务Service
 *
 * @class
 * @extends BaseService
 */
class ServCallService extends BaseService {
  /** 查看token */
  async tokenInfo (params = {}) {
    const { result } = await this.get({ url: path.serv.call.tokenInfo, params })
    return result
  }
}

export default new ServCallService()
