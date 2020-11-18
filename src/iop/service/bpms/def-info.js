import path from '@/iop/api/index'
import BaseService from '@/service/base'

// 增删改查逻辑处理
class BpmsService extends BaseService {
  /**
   * 活动定义
   */
  // 批量删除
  async delActAll (data = '') {
    const { result } = await this.post({
      url: path.bpms.definfo.act.deleteAll, data
    })
    return result
  }
  /**
   * 定义与引擎
   */
  // 查询全部
  async getDefToEngList (params = {}) {
    const { result } = await this.get({ url: `${path.bpms.definfo.defToEng.table}?bpmsDefId=${params}` })
    return result
  }
  // 查询引擎列表
  async getEngRegList (params = {}) {
    const { result } = await this.get({ url: path.bpms.engreg.index })
    return result
  }
  // 编辑
  async getDefToEngInfo (id = '') {
    const { result } = await this.get({
      url: path.bpms.definfo.defToEng.query,
      variable: { id: id }
    })
    return result
  }
  // 增加
  async addDefToEng (data = {}) {
    const { result } = await this.post({ url: path.bpms.definfo.defToEng.add, data })
    return result
  }
  // 修改
  async putDefToEng (id, data) {
    const { result } = await this.put({
      url: path.bpms.definfo.defToEng.modify + '/' + id,
      data
    })
    return result
  }
  // 删除
  async delDefToEng (id = '') {
    const { result } = await this.delete({ url: `${path.bpms.definfo.defToEng.delete}/${id}` })
    return result
  }
}
export default new BpmsService()
