import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 凭证定义service
 *
 * @class
 * @extends BaseService
 */
class PubVoucherService extends BaseService {
  /**
   * 查看全部信息
   *
   * @public
   * @param {Object} params 请求信息参数
   */
  async getList (params = {}) {
    const { result } = await this.get({
      url: path.system.pubVoucher.index,
      params
    })
    return result
  }
  /**
   * 搜索查询
   *
   * @public
   * @param {String} value 请求参数
   */
  async getQuery (params = {}) {
    const { result } = await this.get({
      url: path.system.pubVoucher.index,
      params
    })
    return result
  }
  /**
   * 查询单个
   *
   * @public
   * @param {String} id 请求参数id
   */
  async getListId (id = '') {
    const { result } = await this.get({
      url: `${path.system.pubVoucher.index}/${id}`
    })
    return result
  }
  /**
   * 新增数据
   *
   * @public
   * @param {Object} data 请求参数data
   */
  async add (data = {}) {
    const { result } = await this.post({
      url: path.system.pubVoucher.index,
      data: data
    })
    return result
  }
  /**
   * 删除数据
   *
   * @public
   * @param {String} id 请求参数id
   */
  async del (id = '') {
    const { result } = await this.delete({
      url: `${path.system.pubVoucher.index}/${id}`
    })
    return result
  }
  /**
   * 修改数据
   *
   * @public
   * @param {String} id 请求参数id
   * @param {Object} data 请求参数data
   */
  async modify (id = '', data = {}) {
    const { result } = await this.put({
      url: `${path.system.pubVoucher.index}/${id}`,
      data: data
    })
    return result
  }
}
export default new PubVoucherService()
