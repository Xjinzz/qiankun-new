import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 增删改查逻辑处理
 */
class FilesService extends BaseService {
  // 关联物理库
  async storeTree (params = {}) {
    const { result } = await this.get({
      url: path.file.types.storeTree,
      params: params
    })
    return result
  }
  async storeTreeCheck (params = {}) {
    const { result } = await this.post({
      url: path.file.types.storeTreeCheck,
      params: params
    })
    return result
  }
  // 模板管理
  async template (params = {}) {
    const { result } = await this.get({
      url: path.file.types.template,
      params: params
    })
    return result
  }
  async tempDele (id = '') {
    const { result } = await this.delete({
      url: path.file.types.tempDele,
      variable: { id: id }
    })
    return result
  }
  // 关联逻辑库
  async ctlgsTree (params = {}) {
    const { result } = await this.get({
      url: path.file.types.ctlgsTree,
      params
    })
    return result
  }
  async ctlgsTreeCheck (params = {}) {
    const { result } = await this.post({
      url: path.file.types.ctlgsTreeCheck,
      params
    })
    return result
  }
  // 模板
  async tempSwitch (id = '', params = {}) {
    const { result } = await this.put({
      url: path.file.types.tempSwitch,
      variable: { id: id },
      params
    })
    return result
  }
  // 生命周期
  async lifeSwitch (id = '', params = {}) {
    const { result } = await this.put({
      url: path.file.types.lifeSwitch,
      variable: { id: id },
      params
    })
    return result
  }
  // 模板上传后的关联
  async operation (params = {}, data = {}) {
    const { result } = await this.post({
      url: path.file.types.operation,
      params,
      data
    })
    return result
  }
  // 列表
  async fileSwitch (id = '', params = {}) {
    const { result } = await this.put({
      url: path.file.types.fileSwitch,
      variable: { id: id },
      params
    })
    return result
  }
}
export default new FilesService()
