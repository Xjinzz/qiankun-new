import path from '@/iop/api/index'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class CurrencyService extends BaseService {
  /* 基本信息 */
  async getInfo (params = {}) {
    const { result } = await this.get({
      url: path.system.currency.info,
      params
    })
    return result
  }

  async save (data = {}) {
    const { result } = await this.post({
      url: path.system.currency.save,
      data
    })
    return result
  }

  async edit (id = '', data = {}) {
    const { result } = await this.put({
      url: path.system.currency.edit,
      variable: { id },
      data
    })
    return result
  }

  // 应用接入 新增
  async newadd (data = {}) {
    const { result } = await this.post({
      url: path.system.currency.newadd,
      data
    })
    return result
  }

  // 应用接入 查看
  async detail (id = '') {
    const { result } = await this.get({
      url: path.system.currency.detail,
      variable: { id }
    })
    return result
  }

  // 应用接入 删除
  async delete (id = '') {
    const { result } = await this.get({
      url: path.system.currency.delete,
      variable: { id }
    })
    return result
  }
}
export default new CurrencyService()
