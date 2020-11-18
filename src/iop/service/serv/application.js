import path from '@/iop/api/index'
import BaseService from '@/service/base'

class ServApplicationService extends BaseService {
  async remove (id = '') {
    const { result } = await this.delete({ url: `${path.serv.app.application}/${id}` })
    return result
  }
}

export default new ServApplicationService()
