import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class MenuTreeService extends BaseService {
  /* 查询列表数据 */
  async getData (url = '') {
    const { result } = await this.get({
      url: url
    })
    return result
  }
}
export default new MenuTreeService()
