import BaseService from '@/service/index'

/**
 * Data组件service
 *
 * @class
 * @extends BaseService
 */
class DataService extends BaseService {
  async getSysGraphData (url) {
    const { result } = await this.get({
      url
    })
    return result
  }
}

export default new DataService()
