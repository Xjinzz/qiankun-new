import path from '@/iop/api/index'
import BaseService from '@/service/base'

class ServAppService extends BaseService {
  async create (data = {}) {
    const { result } = await this.post({ url: `${path.serv.app.index}`, data })
    return result
  }

  async load (id = '') {
    const { result } = await this.get({ url: `${path.serv.app.index}/${id}` })
    return result
  }

  async update (id = '', data = {}) {
    const { result } = await this.put({ url: `${path.serv.app.index}/${id}`, data })
    return result
  }

  async remove (id = '') {
    const { result } = await this.delete({ url: `${path.serv.app.index}/${id}` })
    return result
  }
}

export default new ServAppService()
