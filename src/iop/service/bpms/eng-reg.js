import path from '@/iop/api/index'
import BaseService from '@/service/base'

// 增删改查逻辑处理
class BpmsService extends BaseService {
  // 查询全部
  async getList (params = {}) {
    const { result } = await this.get({
      url: path.bpms.engreg.table,
      params: params
    })
    return result
  }
  // 查询单个
  async getListId (id = '') {
    const { result } = await this.get({
      url: path.system.area.query,
      variable: { id: id }
    })
    return result
  }
  // 增加
  async add (data = {}) {
    const { result } = await this.post({
      url: path.system.area.add,
      data: data
    })
    return result
  }
  // 删除
  async del (id = '') {
    const { result } = await this.delete({
      url: path.system.area.delete,
      variable: { id: id }
    })
    return result
  }
  // 修改
  async modif (id = '', data = {}) {
    const { result } = await this.get({
      url: path.system.area.modif,
      variable: { id: id },
      data: data
    })
    return result
  }
  async modifput (id = '', data = {}) {
    const { result } = await this.put({
      url: path.system.area.modif,
      variable: { id: id },
      data: data
    })
    return result
  }
  // 查询树形
  async getTree (id = '') {
    const { result } = await this.get({
      url: path.system.area.tree,
      params: { id: id }
    })
    return result
  }
}
export default new BpmsService()
