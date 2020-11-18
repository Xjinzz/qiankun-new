import path from '@/iop/api/index'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class SettingService extends BaseService {
  /* 基本信息 */
  async getPubUser (params = {}) {
    const { result } = await this.get({
      url: path.settings.info,
      params
    })
    return result
  }

  /**
   * 保存基本信息
   * @param {string} id 用户id
   * @param {Object} data 基本信息
   */
  async savePubUser (data = {}, id = '') {
    const { result } = await this.put({
      url: `${path.settings.savePubUserData}/${id}`,
      data
    })
    return result
  }
  /* 个人凭证列表 */
  async getPList (params = {}) {
    const { result } = await this.get({
      url: path.settings.plist,
      params
    })
    return result
  }
  /* 获取个人通讯方式 */
  async getUserContact (params = {}) {
    const { result } = await this.get({
      url: path.settings.userContactLine,
      params
    })
    return result
  }
  /* 保存个人通讯方式 */
  async saveUserContact (data = {}) {
    const { result } = await this.post({
      url: path.settings.saveUserContact,
      data
    })
    return result
  }
  /* 获取个人设置皮肤自定义 */
  async getSkin (params = {}) {
    const { result } = await this.get({
      url: path.settings.settingsSkinData,
      params
    })
    return result
  }
  /* 保存皮肤自定义 */
  async saveSkin (params = {}) {
    const { result } = await this.post({
      url: path.settings.saveSettingsSkinData,
      params
    })
    return result
  }
  /* 系统消息是否开启 */
  async getUserSysmsg (data = {}) {
    const { result } = await this.get({
      url: path.settings.userSysmsg,
      data
    })
    return result
  }
  /* 保存系统消息是否开启 */
  async saveuserSysmsg (params = {}) {
    const { result } = await this.post({
      url: path.settings.saveuserSysmsg,
      params
    })
    return result
  }
  /* 保存代办消息是否开启 */
  async saveserTodoConf (params = {}) {
    const { result } = await this.post({
      url: path.settings.saveserTodoConf,
      params
    })
    return result
  }
  /* 代办消息是否开启 */
  async getagencySysmsg (data = {}) {
    const { result } = await this.get({
      url: path.settings.agencySysmsg,
      data
    })
    return result
  }
  /* 头像 */
  async upload (params = {}) {
    const { result } = await this.post({
      url: path.settings.upload,
      params
    })
    return result
  }
  // 获取皮肤主题
  async getSkinV2 (id) {
    const { result } = await this.get({
      url: path.settings.saveSkinV2 + '/' + id
    })
    return result
  }
  /* 保存皮肤主题 */
  async saveSkinV2 (data = {}) {
    let url = path.settings.saveSkinV2
    let ajaxType = 'post'
    if (data.skinId) {
      url += '/' + data.skinId
      delete data.skinId
      ajaxType = 'put'
    }
    const { result } = await this[ajaxType]({
      url,
      data
    })
    return result
  }
  /* 获取定义好的皮肤列表 */
  async getThemeList (data = {}) {
    const { result } = await this.get({
      url: path.settings.getThemeList
    })
    return result
  }
  async saveUserTheme (params = {}) {
    const { result } = await this.post({
      url: path.settings.saveUserTheme,
      params
    })
    return result
  }
}
export default new SettingService()
