import { IOP_LOGIN_PATH } from '@/iop/constants/index'
import { BasicLayout, BlankLayout, IframeView, PageView, RouteView, UserLayout } from '@/layouts'

const settingPath = '/account/center'
const notificationPath = '/account/settings/notification'
/**
 * 基础路由，包含个人信息相关页面
 * @type {Object}
 */
const dashbordRouter = {
  path: '/dashboard',
  name: 'home',
  component: BasicLayout,
  meta: { title: '首页' },
  redirect: '/dashboard/workplace',
  children: [
    {
      path: '/',
      component: PageView,
      redirect: '/system/app',
      name: 'account',
      hidden: true,
      meta: { title: '个人中心', icon: 'user', keepAlive: true },
      children: [
        {
          path: settingPath,
          name: 'center',
          component: () => import('@/iop/views/settings/SettingCenter'),
          meta: { title: '个人设置', keepAlive: true }
        },
        {
          path: notificationPath,
          name: 'notification',
          component: () => import('@/iop/views/msg/recipient/RecipientList'),
          meta: { title: '消息通知', hidden: true, keepAlive: true }
        }
      ]
    }
  ]
}

/**
 * 基础路由，包含登录页、403、404、500
 * @type {Array<Object>}
 */
const constantRouterArray = [
  {
    path: '/',
    component: UserLayout,
    redirect: IOP_LOGIN_PATH,
    children: [
      {
        path: IOP_LOGIN_PATH,
        name: 'login',
        component: () => import('@/iop/views/auth/Login'),
        meta: { title: '登录' }
      },
      {
        path: '/iop/403',
        component: () => import('@/views/exception/403'),
        meta: { title: '403' }
      },
      {
        path: '/iop/404',
        component: () => import('@/views/exception/404'),
        meta: { title: '404' }
      },
      {
        path: '/iop/500',
        component: () => import('@/views/exception/500'),
        meta: { title: '500' }
      }
    ]
  }
]

/**
 * 页面布局基础组件，必须引入
 * @type {Map<string, Object>}
 */
const constantRouterComponents = new Map([
  [ 'BasicLayout', BasicLayout ],
  [ 'BlankLayout', BlankLayout ],
  [ 'RouteView', RouteView ],
  [ 'PageView', PageView ],
  [ 'IframeView', IframeView ]
])

const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}

export { dashbordRouter, constantRouterArray, constantRouterComponents, notFoundRouter, settingPath, notificationPath }
