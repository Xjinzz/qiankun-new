import path from '@/iop-drms/api/index'
import BaseService from '@/service/base'
class DataManageService extends BaseService {
  async getList () {
    const { result } = await this.get({
      url: path.dataManage.searchList + '?page=1&size=10'
    })
    return result.data
  }
  async getTableDataSource (data) {
    const { result } = await this.get({
      url: `/iop/drms/meta-data/${data.jndiId}/tables`
    })
    return result
  }
  async importTablesMeta (data) {
    const { result } = await this.post({
      url: path.dataManage.importTablesMeta,
      data
    })
    return result
  }
  async saveResource (data) {
    const { result } = await this.post({
      url: path.dataManage.saveResource,
      data
    })
    return result
  }
}
export default new DataManageService()
