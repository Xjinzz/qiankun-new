import { welcome } from '@/utils/util'
import types from './types'

const GETTER = types.GETTER
const MUTATION = types.MUTATION

const user = {
  state: {
    nickname: '',
    welcome: '',
    avatar: '/avatar.png',
    detail: {},
    menus: [],
    apps: [],
    currentApp: {}
  },
  namespaced: true,
  mutations: {
    [MUTATION.SET_MENUS] (state, menus) {
      state.menus = menus
    },
    [MUTATION.SET_DETAIL] (state, detail) {
      state.detail = detail
      state.nickname = detail.userName
      state.welcome = welcome()
    },
    [MUTATION.SET_APPS] (state, apps) {
      state.apps = apps
      if (apps && apps.length > 0) {
        apps.forEach((app) => {
          if (app.currApp === 1) {
            state.currentApp = app
          }
        })
      } else {
        state.currentApp = {}
      }
    }
  },
  getters: {
    [GETTER.AVATAR]: (state) => state.avatar,
    [GETTER.NICKNAME]: (state) => state.nickname,
    [GETTER.WELCOME]: (state) => state.welcome,
    [GETTER.ROLES]: (state) => state.roles,
    [GETTER.USERINFO]: (state) => state.detail,
    [GETTER.MENUS]: (state) => state.menus,
    [GETTER.APPS]: (state) => state.apps,
    [GETTER.CURRENT_APP]: (state) => state.currentApp
  }
}

export default user
