import '@/components/NProgress/nprogress.less' // progress bar custom style
import { IOP_LOGIN_PATH } from '@/iop/constants/index'
import { iopAuthService, iopTokenService } from '@/iop/service/index'
import { IOP_GETTER } from '@/iop/store/types'
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import MessageUtils from '@/utils/message'
import NProgress from 'nprogress'
import router from './router'
import store from './store'

NProgress.configure({ showSpinner: false })

const whiteList = [ IOP_LOGIN_PATH ]

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (to.path !== IOP_LOGIN_PATH) {
    const codes = to.path.split('/')
    const appCode = codes[1]
    const token = iopTokenService.getToken(appCode)
    if (token) {
      const getter = IOP_GETTER.MENUS
      if (store.getters[getter].length > 0) {
        next()
      } else {
        try {
          iopAuthService.getCurrentMenus({ appCode }).then(() => {
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              next({ ...to, replace: true })
            } else {
              next({ path: redirect })
            }
          })
        } catch (error) {
          console.error('get user info error ', error)
        }
      }
    } else {
      if (!whiteList.includes(to.path)) {
        MessageUtils.error('没有授权信息，请重新登录')
        // 登录页
        next({ path: IOP_LOGIN_PATH, query: { redirect: to.fullPath } })
        NProgress.done()
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
