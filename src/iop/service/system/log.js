import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 日志管理service
 *
 * @class
 * @extends BaseService
 */

class LogService extends BaseService {
  /**
   * 在线用户查看全部信息
   *
   * @public
   * @param {Object} data 请求信息参数
   */
  async getList (data = {}) {
    const { result } = await this.get({
      url: path.system.logAll.table
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
      url: path.system.logAll.query,
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
      url: path.system.logAll.add,
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
      url: path.system.logAll.delete,
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
      url: path.system.logAll.modify,
      variable: { id: id },
      data: data
    })
    return result
  }
}
export default new LogService()
