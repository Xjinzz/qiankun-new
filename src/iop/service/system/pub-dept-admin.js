import path from '@/iop/api/index'
import BaseService from '@/service/base'

class PubDeptAdminService extends BaseService {
  async save (deptId = '', userIds = []) {
    await this.post({
      url: `${path.system.pubDeptAdmin.batch}/${deptId}`,
      data: userIds
    })
  }
}

export default new PubDeptAdminService()
