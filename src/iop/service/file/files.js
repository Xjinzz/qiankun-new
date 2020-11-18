import path from '@/iop/api/index'
import BaseService from '@/service/base'

// 增删改查逻辑处理
class FilesService extends BaseService {
  // 查询统计
  async filesTotal (params = {}) {
    const { result } = await this.get({
      url: path.file.files.filesTotal
    })
    return result
  }
  // 新增文件夹
  async filesAdd (params = {}) {
    const { result } = await this.post({
      url: path.file.files.filesAdd,
      params
    })
    return result
  }
  // 修改文件夹名称
  async filesRename (params = {}) {
    const { result } = await this.put({
      url: path.file.files.filesRename,
      params
    })
    return result
  }
  // 统计
  async folder (params = {}) {
    const { result } = await this.get({
      url: path.file.files.folder,
      params
    })
    return result
  }
  // 移动文件夹
  async filesMove (params = {}) {
    const { result } = await this.put({
      url: path.file.files.filesMove,
      params
    })
    return result
  }
  // 删除
  async filesDelete (params = {}) {
    const { result } = await this.delete({
      url: path.file.files.filesDelete,
      params
    })
    return result
  }
  // 合并
  async filesMerge (params = {}) {
    const { result } = await this.put({
      url: path.file.files.filesMerge,
      params
    })
    return result
  }
}
export default new FilesService()
