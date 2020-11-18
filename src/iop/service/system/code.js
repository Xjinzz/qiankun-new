import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 字典Service
 */
class CodeService extends BaseService {
  async getDict (codeNum = '') {
    const { result } = await this.get({ url: `${path.system.code.dict}/${codeNum}` })
    return result
  }

  async getDetailByCode (code = '') {
    const { result } = await this.get({ url: `${path.system.code.detailByCode}?dictCode=${code}` })
    return result
  }
}
export default new CodeService()
