import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterArray } from '@/config/router'

// 解决在路由中添加了相同的路由出现message: "Navigating to current location (XXX) is not allowed"的问题
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch((error) => error)
}

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: 'index.html',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterArray
})
