import path from '@/iop/api/index'
import BaseService from '@/service/base'

// 增删改查逻辑处理
class SendService extends BaseService {
  // 查询全部
  async getList (params = {}) {
    const { result } = await this.get({
      url: path.msg.send.table,
      params: params
    })
    return result
  }
  // 查询单个
  async getListId (params = {}) {
    const { result } = await this.get({
      url: path.msg.send.query,
      params
    })
    return result
  }
  // 增加
  async addData (data = {}) {
    const { result } = await this.post({
      url: path.msg.send.add,
      data: data
    })
    return result
  }
  // 删除
  async del (id = '') {
    const { result } = await this.delete({
      url: path.msg.send.delete,
      variable: { id: id }
    })
    return result
  }
  // 修改
  async modif (id = '', data = {}) {
    const { result } = await this.get({
      url: path.msg.send.modif,
      variable: { id: id },
      data: data
    })
    return result
  }
  async modifput (id = '', data = {}) {
    const { result } = await this.put({
      url: path.msg.send.modif,
      variable: { id: id },
      data: data
    })
    return result
  }
  // 查询树形
  async getTree (id = '') {
    const { result } = await this.get({
      url: path.msg.send.tree,
      params: { id: id }
    })
    return result
  }
  // 查询单个
  async recipient (params = {}) {
    const { result } = await this.get({
      url: path.msg.send.recipient,
      params
    })
    return result
  }
}
export default new SendService()
