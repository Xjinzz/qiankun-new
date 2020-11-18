import path from '@/iop-drms/api'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class AuthService extends BaseService {
  /**
   * 树形 选中取消功能
   */
  async save (params = {}) {
    const { result } = await this.post({
      url: path.manage.auth.save,
      params
    })
    return result
  }
}
export default new AuthService()
