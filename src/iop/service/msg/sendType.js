import path from '@/iop/api/index'
import BaseService from '@/service/base'
class SendTypeService extends BaseService {
  async sendTypeDetail (id) {
    const { result } = await this.get({
      url: `${path.msg.sendType.table}/${id}`
    })
    return result
  }
  sendTypeSubmit (data) {
    return this.post({
      url: `${path.msg.sendType.table}`,
      data
    })
  }
  sendTypeEdit (id, data) {
    return this.put({
      url: `${path.msg.sendType.table}/${id}`,
      data
    })
  }
}
export default new SendTypeService()
