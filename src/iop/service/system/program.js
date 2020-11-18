import path from '@/iop/api/index'
import BaseService from '@/service/base'

// 增删改查逻辑处理
class ProgramService extends BaseService {
  // 查询全部
  async getList (params = {}) {
    const { result } = await this.get({
      url: path.system.program.table,
      params: params
    })
    return result
  }
  // 查询单个
  async getListId (id = '') {
    const { result } = await this.get({
      url: path.system.program.query,
      variable: { id: id }
    })
    return result
  }
  // 增加
  async add (data = {}) {
    const { result } = await this.post({
      url: path.system.program.add,
      data: data
    })
    return result
  }
  // 删除
  async del (id = '') {
    const { result } = await this.delete({
      url: path.system.program.delete,
      variable: { id: id }
    })
    return result
  }
  // 批量删除
  async delAll (data = '') {
    const { result } = await this.post({
      url: path.system.program.delAll,
      data
    })
    return result
  }
  // 修改
  async modif (id = '', data = {}) {
    const { result } = await this.put({
      url: path.system.program.modif,
      variable: { id: id },
      data: data
    })
    return result
  }
  // 查询树形
  async getTree (params = {}) {
    const { result } = await this.get({
      url: path.system.program.tree,
      params
    })
    return result
  }
  async logLeve (id = {}, params = {}) {
    const { result } = await this.put({
      url: path.system.program.logLeve,
      variable: { id: id },
      params
    })
    return result
  }
}
export default new ProgramService()
