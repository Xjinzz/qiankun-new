import path from '@/iop/api/index'
import BaseService from '@/service/base'
class ContactUserService extends BaseService {
  async contactUserDetail (id) {
    const { result } = await this.get({
      url: `${path.msg.contactUser.index}/${id}`
    })
    return result
  }
  contactUserSubmit (data) {
    return this.post({
      url: `${path.msg.contactUser.index}`,
      data
    })
  }
  contactUserEdit (id, data) {
    return this.put({
      url: `${path.msg.contactUser.index}/${id}`,
      data
    })
  }
  // 删除分组
  contactDelete (id) {
    return this.delete({
      url: `${path.msg.contact.index}/${id}`
    })
  }
  // 删除人员
  contactUserDelete (id) {
    return this.delete({
      url: `${path.msg.contactUser.index}/${id}`
    })
  }
  packetSwitch (parentId, data) {
    return this.post({
      url: `${path.msg.contactUser.switch}/?parentId=${parentId}`,
      data
    })
  }
}
export default new ContactUserService()
