import { IOP_ACCESS_TOKEN, IOP_TOKEN_VALIDITY, IOP_OLD_TOKENS } from '@/iop/constants/index'
import Vue from 'vue'
import appService from './app'

/**
 * token存取服务
 *
 * @class
 */
class TokenService {
  /**
   * 保存token
   *
   * @param {string} appCode 系统编码
   * @param {string} value token值
   */
  static setToken (appCode = '', value = '') {
    Vue.ls.set(
      IOP_ACCESS_TOKEN,
      Object.assign({}, Vue.ls.get(IOP_ACCESS_TOKEN), { [appCode]: value }),
      IOP_TOKEN_VALIDITY
    )
  }

  static getToken (appCode = '') {
    const token = Vue.ls.get(IOP_ACCESS_TOKEN)
    if (token) {
      return token[appCode]
    }
    return ''
  }

  static getCurrentToken () {
    const app = appService.getCurrentAppCode()
    return this.getToken(app)
  }

  static clean () {
    Vue.ls.remove(IOP_ACCESS_TOKEN)
  }

  static getOldTokens () {
    return Vue.ls.get(IOP_OLD_TOKENS)
  }
}
export default TokenService
