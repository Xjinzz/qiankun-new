import path from '@/iop/api/index'
import BaseService from '@/service/base'

class ServService extends BaseService {
  // 批量发布
  async batchPub (data = {}) {
    const { result } = await this.post({ url: `${path.system.serv.batchPub}`, data })
    return result
  }

  // 批量取消发布
  async batchUnPub (data = {}) {
    const { result } = await this.post({ url: `${path.system.serv.batchUnPub}`, data })
    return result
  }

  // 批量启用
  async batchValide (data = {}) {
    const { result } = await this.post({ url: `${path.system.serv.batchValide}`, data })
    return result
  }

  // 批量停用
  async batchUnValide (data = {}) {
    const { result } = await this.post({ url: `${path.system.serv.batchUnValide}`, data })
    return result
  }

  // 服务详情
  async detail (id = '') {
    const { result } = await this.get({ url: `${path.system.serv.servindex}/${id}` })
    return result
  }
  // 授权方法  参数列表
  async paramList (id) {
    const { result } = await this.get({ url: `${path.system.serv.paramsIndex}?methodId=${id}` })
    return result
  }
  // 参数详情
  async paramDetail (id) {
    const { result } = await this.get({ url: `${path.system.serv.paramsIndex}/${id}` })
    return result
  }
  // 生成Token
  async createToken (id) {
    const { result } = await this.get({ url: `${path.system.serv.createToken}/?id=${id}` })
    return result
  }
  // 方法详情
  async methodDetail (id) {
    const { result } = await this.get({ url: `${path.system.serv.methodIndex}/${id}` })
    return result
  }
  // 服务导入
  async servImport (data) {
    const { result } = await this.post({ url: `${path.system.serv.servImport}`, data })
    return result
  }
  async fileImport (data) {
    const { result } = await this.post({ url: `${path.system.serv.fileImport}`, data })
    return result
  }

  // 批量删除授权
  async batchDeleteAuth (data) {
    const { result } = await this.post({ url: `${path.system.serv.batchDeleteAuth}`, data })
    return result
  }

  // 批量删除授权
  async batchDeleteService (data) {
    const { result } = await this.post({ url: `${path.system.serv.batchDeleteService}`, data })
    return result
  }
  // 删除服务列表单条
  async removeService (id) {
    const { result } = await this.delete({ url: `${path.system.serv.servindex}/${id}` })
    return result
  }

  // 切换目录
  async changeDir (params, data) {
    const { result } = await this.post({ url: `${path.system.serv.changeDir}`, params, data })
    return result
  }
}

export default new ServService()
