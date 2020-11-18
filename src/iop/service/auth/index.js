import { constantRouterComponents, dashbordRouter, notFoundRouter } from '@/config/router'
import url from '@/iop/api/index'
import { IOP_LOGIN_PATH, IOP_NICK_NAME, IOP_OLD_TOKENS } from '@/iop/constants/index'
import { IOP_MUTATION, IOP_GETTER } from '@/iop/store/types'
import router from '@/router'
import BaseService from '@/service/index'
import store from '@/store'
import { Base64 } from 'js-base64'
import Vue from 'vue'
import appService from './app'
import tokenService from './token'

const APPCODE = appService.getDefaultAppCode()
const GETTER = IOP_GETTER.MENUS
/**
 * 用户认证service
 *
 * @class
 * @extends BaseService
 */
class AuthService extends BaseService {
  /**
   * 用户登录认证
   *
   * @public
   * @param {Object} data 登录参数
   * @param {string} data.appCode	子系统编码
   * @param {string} data.loginName	用户名/手机号
   * @param {string} data.password	密码/短信验证码
   * @param {string} data.type	认证方式编码,
   * @param {string} data.captcha 页面验证码
   * @todo 根据输入的用户名判断用户名类型，USER_PASSWORD:用户名密码;PHONE:手机号登录
   */
  async login (data = {}) {
    data.password = this.encodePassword(data.password)
    Object.assign(data, { type: 'USER_PASSWORD' })
    const { result } = await this.post({
      url: url.auth.login,
      data
    })
    await this.__loginSuccess(result, data.appCode)
  }

  encodePassword (password = '') {
    return Base64.encode(password)
  }

  /**
   * 用户退出登录
   *
   * @public
   */
  async logout () {
    tokenService.clean()
    Vue.ls.remove(IOP_NICK_NAME)
    window.location.href = `/#${IOP_LOGIN_PATH}`
    window.location.reload()
  }

  /**
  * 切换系统重新认证
  *
  * @public
  * @param {string} appCode 子系统编码
  */
  async switchToken (appCode = APPCODE) {
    const { result } = await this.post({
      url: url.auth.switch,
      variable: { appCode }
    })
    tokenService.setToken(appCode, result.token)

    this.setSkin(JSON.parse(result.userInfo.skinJson))
    await this.getCurrentMenus({ appCode, insertCommonRouters: false })
    const routes = store.getters[GETTER]
    await router.push({
      path: routes[0]?.children[0]?.path
    })
    window.location.reload()
  }
  /**
   * @description 设置皮肤
   * @param {*} json
   */
  setSkin (json) {
    store.dispatch('SetSkinByJson', json)
  }
  /**
   * 登录认证成功后的操作
   * 1. 缓存token
   * 2. 缓存系统信息
   * 3. 缓存用户信息
   * 4. 获取菜单
   * 5. 路由跳转
   *
   * @private
   * @param {Object} data 登录成功返回的数据
   * @param {string} data.token 认证token
   * @param {Object} data.appInfo 系统信息
   * @param {Object} data.userInfo 用户信息
   * @param {string} appCode 系统编码
   */
  async __loginSuccess (data = {}, appCode = APPCODE) {
    tokenService.setToken(appCode, data.token)
    Vue.ls.set(IOP_NICK_NAME, data.userInfo.userName)
    appService.setApps(data.appInfo)
    this.setSkin(JSON.parse(data.userInfo.skinJson))
    await this.getCurrentMenus({ appCode })
    const routes = store.getters[GETTER]
    await router.push({
      path: routes[0]?.children[0]?.path
    })
  }

  /**
   * 获取菜单，并缓存
   *
   * @public
   * @param {boolean=} insertCommonRouters 是否添加公共的路由数据
   */
  async getCurrentMenus ({ appCode = APPCODE, insertCommonRouters = true } = {}) {
    const { result } = await this.get({
      url: url.auth.menus,
      params: { token: tokenService.getToken(appCode) }
    })
    // 路由处理
    const routers = this.__generatorDynamicRouter({ data: result, common: insertCommonRouters, appCode })
    router.addRoutes(routers)
    store.commit(IOP_MUTATION.SET_MENUS, routers)
  }

  async getNickname () {
    let name = Vue.ls.get(IOP_NICK_NAME)
    if (!name) {
      const { userName } = await this.getCurrentUserInfo()
      name = userName
      Vue.ls.set(IOP_NICK_NAME, name)
    }
    return name
  }

  /**
   * 格式化树形结构数据 动态生成菜单
   * @param {Object} params
   * @param {Object} params.data 格式化树形结构数据
   * @param {boolean=} params.common 是否插入公共的静态路由
   */
  __generatorDynamicRouter ({ data = {}, common = true, appCode = APPCODE }) {
    const routers = this.generator([ data ], data.path)
    routers.push(this.__generateAppCodePath(appCode, dashbordRouter))
    if (common) {
      routers.push(notFoundRouter)
    }
    return routers
  }

  /**
   * @description 补充路由缺少关键信息（name\path\redirect）
   * @param {*} appCode
   * @param {*} router
   */
  __generateAppCodePath (appCode = APPCODE, router = {}) {
    if (router.name) {
      router.name = `${appCode}-${router.name}`
    }
    if (router.path) {
      router.path = `/${appCode}${router.path}`
    }
    if (router.redirect) {
      router.redirect = `/${appCode}${router.redirect}`
    }
    if (router.children) {
      router.children.map((item) => {
        this.__generateAppCodePath(appCode, item)
      })
    }
    return router
  }

  /**
  * 格式化树形结构数据 生成 vue-router 层级路由表
  *
  * @param {Array} routerMap 树形结构数据
  * @param {string} appCode 系统编码
  * @returns {Array} router
  */
  generator (routerArray = [], appCode = '') {
    return routerArray.map((item) => {
      const {
        title,
        icon,
        target,
        path,
        component,
        name,
        redirect,
        hidden,
        keepAlive,
        hiddenHeaderContent,
        serverUrl,
        appIndexUrl,
        para,
        ownAppCode
      } = item
      const currentRouter = {
        path: path ? (!path.startsWith('http') ? (appCode !== path ? appCode : '') : '') + path : `${appCode}/${name}`,
        name,
        redirect,
        component: constantRouterComponents.get(component) || (() => import('@/' + component)),
        hidden,
        meta: {
          redirect,
          title,
          icon,
          target,
          keepAlive,
          hiddenHeaderContent,
          serverUrl,
          appIndexUrl,
          para,
          ownAppCode
        }
      }

      if (currentRouter.path && !currentRouter.path.startsWith('http')) {
        currentRouter.path = currentRouter.path.replace('//', '/')
      }

      if (item.children && item.children.length > 0) {
        currentRouter.children = this.generator(item.children, appCode)
      }

      return currentRouter
    })
  }

  goPage (path = '', query = {}, params = {}) {
    router.push({ path: `/${appService.getCurrentAppCode()}/${path}`, query, params })
  }

  goName (name = '', query = {}, params = {}) {
    router.push({ name: `${appService.getCurrentAppCode()}-${name}`, query, params })
  }

  async getCurrentUserInfo () {
    const { result } = await this.get({ url: url.settings.info })
    return result
  }

  async getOldTokens () {
    const currentApp = appService.getCurrentApp().appCode
    if (currentApp) {
      const { result } = await this.get({ url: `${url.auth.oldTokens}/${currentApp}` })
      Vue.ls.set(IOP_OLD_TOKENS, result)
    }
  }
}

export default new AuthService()
