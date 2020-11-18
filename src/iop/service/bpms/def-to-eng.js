import path from '@/iop/api/index'
import BaseService from '@/service/base'

// 增删改查逻辑处理
class BpmsDefToEngService extends BaseService {
  // 查询全部
  async getList (params = {}) {
    // TODO
    const { result } = await this.get({ url: path.bpms.act.process, params: params })
    // const { result } = await this.get({ url: `${path.bpms.act.process}/${params}` })
    return result
  }
  // // 查询单个
  async getListId (id = '') {
    const { result } = await this.get({
      url: path.bpms.act._query,
      variable: { id: id }
    })
    return result
  }
  // 增加
  async add (params = {}) {
    const { result } = await this.post({ url: path.bpms.act._add, params })
    return result
  }
  // 删除
  async del (id = '') {
    const { result } = await this.delete({
      url: path.bpms.act._delete,
      variable: { id: id }
    })
    return result
  }
  // 修改
  // async modif (id = '', data = {}) {
  //   const { result } = await this.get({
  //     url: path.bpms.act._modif,
  //     variable: { id: id },
  //     data: data
  //   })
  //   return result
  // }
}
export default new BpmsDefToEngService()
