import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 子系统机构(单位管理)Service
 *
 * @class
 * @extends BaseService
 */
class DeptService extends BaseService {
  async syncPubDept (deptId = '') {
    const { result } = await this.put({
      url: path.system.dept.sync,
      params: { deptId }
    })
    return result
  }

  async getById (deptId = '') {
    const { result } = await this.get({
      url: `${path.system.dept.index}/${deptId}`
    })
    return result
  }
}
export default new DeptService()
