import path from '@/iop/api/index'
import BaseService from '@/service/base'

class PubUserService extends BaseService {
  async setFlag (userId = '', status = '1') {
    await this.put({
      url: `${path.system.pubUser.flag}/${userId}`,
      params: { status }
    })
  }
}
export default new PubUserService()
