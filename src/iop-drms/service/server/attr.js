import path from '@/iop-drms/api/index'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class AttrService extends BaseService {
  /* 查询树形数据 */
  async attrTree (id = '') {
    const { result } = await this.get({
      url: path.manage.attr.attrTree,
      variable: { id }
    })
    return result
  }
  async other (url = '') {
    const { result } = await this.put({
      url
    })
    return result
  }
}
export default new AttrService()
