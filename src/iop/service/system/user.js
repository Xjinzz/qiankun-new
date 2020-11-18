import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 子系统用户service
 *
 * @class
 * @extends BaseService
 */
class UserService extends BaseService {
  async syncPubDept (deptId = '') {
    const { result } = await this.put({ url: path.system.user.sync, params: { deptId } })
    return result
  }

  async resetPwd (voucherId = '') {
    await this.put({ url: `${path.system.pubUser.voucher.reset}/${voucherId}` })
  }
}
export default new UserService()
