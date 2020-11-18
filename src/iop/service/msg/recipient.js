import path from '@/iop/api/index'
import BaseService from '@/service/base'

// 增删改查逻辑处理
class RecipientService extends BaseService {
  // 查询全部
  async getList (params = {}) {
    const { result } = await this.get({
      url: path.msg.recipient.table,
      params: params
    })
    return result
  }
  // 查询单个
  async getListId (id = '') {
    const { result } = await this.get({
      url: path.msg.recipient.query,
      variable: { id: id }
    })
    return result
  }
  // 增加
  async add (data = {}) {
    const { result } = await this.post({
      url: path.msg.recipient.add,
      data: data
    })
    return result
  }
  // 删除
  async del (id = '') {
    const { result } = await this.delete({
      url: path.msg.recipient.delete,
      variable: { id: id }
    })
    return result
  }
  // 删除
  async dels (data = {}) {
    const { result } = await this.post({
      url: path.msg.recipient.deletes,
      data
    })
    return result
  }
  // 修改
  async modif (id = '', data = {}) {
    const { result } = await this.get({
      url: path.msg.recipient.modif,
      variable: { id: id },
      data: data
    })
    return result
  }
  async modifput (id = '', data = {}) {
    const { result } = await this.put({
      url: path.msg.recipient.modif,
      variable: { id: id },
      data: data
    })
    return result
  }
  // 查询树形
  async getTree (id = '') {
    const { result } = await this.get({
      url: path.msg.recipient.tree,
      params: { id: id }
    })
    return result
  }
  async batch (data = {}) {
    const { result } = await this.post({
      url: path.msg.recipient.batch,
      data
    })
    return result
  }
}
export default new RecipientService()
