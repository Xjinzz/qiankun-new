import config from '@/config/defaultSettings'
import { IOP_APPS, IOP_LOGIN_PATH } from '@/iop/constants/index'
import Vue from 'vue'

const DEFAULTAPPCODE = config.appCode

/**
 * 子系统Service
 */
class AppService {
  getCurrentAppCode () {
    const name = window.location.hash
    if (!name.startsWith(`#${IOP_LOGIN_PATH}`)) {
      const names = name.split('/')
      if (names.length > 1) {
        return names[1]
      }
    }
    return ''
  }

  getCurrentAppName () {
    return this.getCurrentApp().appName
  }

  getCurrentApp () {
    const appInfo = Vue.ls.get(IOP_APPS)
    return appInfo[this.getCurrentAppCode()]
  }

  getAllApps () {
    const appInfo = Vue.ls.get(IOP_APPS)
    const result = []
    for (const code of Object.keys(appInfo)) {
      result.push(appInfo[code])
    }
    return result
  }

  getDefaultAppCode () {
    return DEFAULTAPPCODE
  }

  setApps (apps = []) {
    const appInfo = {}
    apps.map((app) => {
      appInfo[app.appCode] = app
    })
    Vue.ls.set(IOP_APPS, appInfo)
  }

  clean () {
    Vue.ls.remove(IOP_APPS)
  }
}
export default new AppService()
