import path from '@/iop/api/index'
import BaseService from '@/service/base'

class PubDeptService extends BaseService {
  async transfer (deptIdFrom = '', deptIdTo = '') {
    await this.put({
      url: path.system.pubDept.transfer,
      params: { deptIdFrom, deptIdTo }
    })
  }

  async getById (deptId = '') {
    const { result } = await this.get({
      url: `${path.system.pubDept.index}/${deptId}`
    })
    return result
  }

  async setFlag (deptId = '', status = '1') {
    await this.put({
      url: `${path.system.pubDept.flag}/${deptId}`,
      params: { status }
    })
  }
}
export default new PubDeptService()
