import path from '@/iop/api/index'
import BaseService from '@/service/base'
// 增删改查逻辑处理
class UserRoleServe extends BaseService {
  // 新增保存
  async saveAll (data) {
    const { result } = await this.post({
      url: path.system.userRole.saveall,
      data
    })
    return result
  }
  // 删除
  async del (id) {
    const { result } = await this.delete({
      url: path.system.userRole.list + '/' + id
    })
    return result
  }
  // 批量删除
  async delAll (data = '') {
    const { result } = await this.post({
      url: path.system.userRole.delall,
      data
    })
    return result
  }
}
export default new UserRoleServe()
