import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 认证策略service
 *
 * @class
 * @extends BaseService
 */
class PubPolicyConfService extends BaseService {
  /**
   * 查看全部信息
   *
   * @public
   * @param {Object} data 请求信息参数
   */
  async getList (data = {}) {
    const { result } = await this.get({
      url: path.system.pubPolicyConf.table + `?page=1&size=10`
    })
    return result
  }
  /**
   * 搜索查询
   *
   * @public
   * @param {String} value 请求参数
   */
  async getQuery ({ current = 1, pageSize = 10, value = '' } = {}) {
    const { result } = await this.get({
      url: path.system.pubPolicyConf.table + `?page=${current}&size=${pageSize}` + value
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
      url: path.system.pubPolicyConf.query,
      variable: { id: id }
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
      url: path.system.pubPolicyConf.add,
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
      url: path.system.pubPolicyConf.delete,
      variable: { id: id }
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
      url: path.system.pubPolicyConf.modif,
      variable: { id: id },
      data: data
    })
    return result
  }
}
export default new PubPolicyConfService()
