import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 参数定义Service
 *
 * @class
 * @extends BaseService
 */
class UserAttrService extends BaseService {
  async copyCatalog (catalogId = '', sourceEnCode = '', targetEnCode = '') {
    await this.copyAttr([ catalogId ], sourceEnCode, targetEnCode)
  }

  async copyAttr (attrIds = [], sourceEnCode = '', targetEnCode = '') {
    await this.post({ url: path.system.userAttr.copy, data: attrIds, params: { sourceEnCode, targetEnCode } })
  }

  // 删除
  async del (id = '', params = {}) {
    const { result } = await this.delete({
      url: path.system.userAttr.dels,
      variable: { id: id },
      params
    })
    return result
  }

  // 删除已设定值
  async delte (id = '') {
    const { result } = await this.delete({
      url: path.system.userAttr.delete,
      variable: { id: id }
    })
    return result
  }

  // 删除已设定值
  async getInfo (id = '') {
    const { result } = await this.get({
      url: path.system.userAttr.delete,
      variable: { id: id }
    })
    return result
  }

  // 清空
  async clean (params = {}) {
    const { result } = await this.post({
      url: path.system.userAttr.clean,
      params
    })
    return result
  }

  // 参数值保存
  async save (id = '', data = {}) {
    const { result } = await this.put({
      url: path.system.userAttr.save,
      variable: { id: id },
      data
    })
    return result
  }

  // 参数定义 删除按钮
  async delParams (id = '') {
    const { result } = await this.delete({
      url: path.system.userAttr.delParams,
      variable: { id: id }
    })
    return result
  }

  // 删除
  async systemApp () {
    const { result } = await this.get({
      url: path.system.userAttr.systemApp
    })
    return result
  }

  // 删除
  async detials (id = '', params = {}) {
    const { result } = await this.get({
      url: path.system.userAttr.detials,
      variable: { id: id },
      params
    })
    return result
  }

  // 批量删除
  async batchDelete (data = {}) {
    const { result } = await this.post({
      url: path.system.userAttr.batchDelete,
      data
    })
    return result
  }

  // 批量删除
  async setdefin (data = {}) {
    const { result } = await this.post({
      url: path.system.userAttr.setdefin,
      data
    })
    return result
  }
}
export default new UserAttrService()
