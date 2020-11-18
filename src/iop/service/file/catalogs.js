import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 增删改查逻辑处理
 */
class CatalogsService extends BaseService {
  /**
   * 查询全部
   */
  async getList (params = {}) {
    const { result } = await this.get({
      url: path.file.catalogs.table,
      params: params
    })
    return result
  }
  /**
   * 查询单个
   */
  async getListId (id = '') {
    const { result } = await this.get({
      url: path.file.catalogs.query,
      variable: { id: id }
    })
    return result
  }
  /**
   * 新增
   */
  async add (data = {}) {
    const { result } = await this.post({
      url: path.file.catalogs.add,
      data: data
    })
    return result
  }
  /**
   * 删除
   */
  async del (id = '') {
    return this.delete({
      url: path.file.catalogs.delete,
      variable: { id: id }
    })
  }
  // 文档库管理 删除目录
  async deleteCatalogs (id = '') {
    return this.delete({
      url: `${path.file.manage.add}/${id}`
    })
  }
  // 文档库管理 删除文件
  async deleteFiles (id = '') {
    return this.post({
      url: `${path.file.manage.delFiles}`,
      params: {
        fileIds: id
      }
    })
  }
  // 发布
  async issue (params) {
    const { result } = this.post({
      url: path.file.catalogs.issue,
      params
    })
    return result
  }
  /**
   * 修改
   */
  async modif (id = '', data = {}) {
    const { result } = await this.put({
      url: path.file.catalogs.modify,
      variable: { id: id },
      data: data
    })
    return result
  }
  // 统计
  async statistics (id) {
    const { result } = await this.get({
      url: `${path.file.manage.statistics}/${id}`
    })
    return result
  }
  // 重命名
  async putName (id, data) {
    const { result } = await this.put({
      url: `${path.file.manage.putName}/${id}`,
      params: data
    })
    return result
  }
  async putFileName (id, data) {
    const { result } = await this.put({
      url: `${path.file.manage.putFileName}/${id}`,
      params: data
    })
    return result
  }
  // 移动文件 目录
  async move (data) {
    const { result } = await this.put({
      url: path.file.manage.move,
      params: data
    })
    return result
  }
  async merge (data) {
    const { result } = await this.put({
      url: path.file.manage.merge,
      params: data
    })
    return result
  }
  async batchDel (data) {
    const { result } = await this.delete({
      url: path.file.manage.batchDel,
      params: data
    })
    return result
  }
  async getFileTypesTreeData (parentId, ctlgId) {
    const { result } = await this.get({
      url: `${path.file.fileTypes.treeUrl}/?parentId=${parentId}&ctlgId=${ctlgId}`
    })
    return result
  }
  async saveTypes (params = {}) {
    const { result } = await this.post({
      url: path.file.fileTypes.saveType,
      params: params
    })
    return result
  }
}
export default new CatalogsService()
