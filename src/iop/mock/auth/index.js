import { builder, getBody } from '@/mock/util'
import Mock from 'mockjs2'

// 子系统
const apps = [
  {
    appId: 'APP00000000000000000000000000001',
    appCode: 'iop',
    appName: '应用支撑开发平台',
    indexPath: '/iop',
    currApp: 1
  },
  {
    appId: 'APP00000000000000000000000000002',
    appCode: 'oa',
    appName: 'OA办公系统',
    indexPath: '/oa',
    currApp: 0
  }
]

// 用户信息
const userInfo = {
  userId: 'U0000000000000000000000000000001',
  deptId: null,
  userCode: '10',
  userName: '系统管理员',
  sex: '1',
  nationality: '中国',
  birthplace: null,
  nation: null,
  userType: '1',
  userStatus: '1',
  paperType: '1',
  paperNum: '10',
  birthday: null,
  orderNum: 1,
  loginName: 'admin',
  isDel: '1',
  source: null,
  remark: null,
  rank: null,
  duty: null,
  entryTime: null,
  retirementTime: null
}

// 登录认证信息
const loginResponse = {
  userInfo: userInfo,
  appInfo: apps,
  token: 'iop-' + Math.ceil(Math.random() * 10)
}

// 用户登录认证
Mock.mock(/\/iop\/auth\/login/, 'post', (options) => {
  const body = getBody(options)
  if (body.loginName === 'token') {
    return builder({}, '登录超时', 200, { code: 3009, success: false })
  }
  if (body.loginName === '401') {
    return builder({}, '', 401)
  }
  if (body.loginName === '404') {
    return builder({}, '', 404)
  }
  if (body.loginName === '403') {
    return builder({}, '', 403)
  }
  if (body.loginName === '500') {
    return builder({}, '', 500)
  }
  if (body.loginName !== 'admin') {
    return builder({}, '用户名或密码错误，请使用`admin`登录', 200, { code: 3004, success: false })
  }
  return builder(loginResponse)
})

// 用户通过TOKEN登录认证
Mock.mock(/\/iop\/auth\/login\//, 'get', (request) => {
  const result = { ...loginResponse }
  delete result.token
  const token = getTokenPrefix(request.url, request.url.lastIndexOf('/'))
  // 根据token前缀设置当前子系统
  result.appInfo.forEach((app) => {
    if (app.appCode === token) {
      app.currApp = 1
    } else {
      app.currApp = 0
    }
  })
  return builder(result)
})

function getTokenPrefix (url, index) {
  let token
  if (index === -1) {
    token = 'iop'
  } else {
    token = url.substring(index + 1, url.indexOf('-'))
  }
  return token
}

// 菜单信息
const menus = {
  iop: {
    name: 'iop',
    path: '/iop',
    title: '主页',
    component: 'BasicLayout',
    redirect: '/iop/dashboard/Workplace',
    children: [
      {
        name: 'dashboard',
        path: '/dashboard/workplace',
        title: '首页',
        icon: 'home',
        component: 'views/dashboard/Workplace'
      },
      {
        name: 'MENU0000000000000000000000000100',
        path: '/sys',
        title: '系统管理',
        icon: 'form',
        component: 'RouteView',
        children: [
          {
            name: 'MENU0000000000000000000000000110',
            path: '/sys/base',
            title: '基础管理',
            icon: 'form',
            component: 'PageView',
            children: [
              {
                name: 'MENU0000000000000000000000000111',
                path: '/sys/skin',
                title: '皮肤定义',
                icon: 'table',
                component: 'iop/views/system/skin/SkinList'
              },
              {
                name: 'MENU0000000000000000000000000112',
                path: '/sys/dbjndi',
                title: '数据源定义',
                icon: 'profile',
                component: 'views/iop/system/dbjndi/DbjndiIndex'
              },
              {
                name: 'MENU0000000000000000000000000113',
                path: '/sys/app',
                title: '系统定义',
                icon: 'check-circle-o',
                component: 'iop/views/system/sys-definition/index'
              },
              {
                name: 'MENU0000000000000000000000000114',
                path: '/sys/attr',
                title: '参数定义',
                icon: 'warning',
                component: 'iop/views/system/attr/SysUserAttrList'
              },
              {
                name: 'MENU0000000000000000000000000115',
                path: '/sys/area',
                title: '行政区划',
                icon: 'user',
                component: 'iop/views/system/area/AreaList'
              }
            ]
          },
          {
            name: 'MENU0000000000000000000000000120',
            path: '/sys/all',
            title: '全局管理',
            icon: 'slack',
            component: 'PageView',
            children: [
              {
                name: 'MENU0000000000000000000000000121',
                path: '/sys/voucher',
                title: '凭证定义',
                icon: 'table',
                component: 'views/iop/system/voucher'
              },
              {
                name: 'MENU0000000000000000000000000122',
                path: '/sys/policyway',
                title: '认证方式',
                icon: 'profile',
                component: 'views/iop/system/policyway'
              },
              {
                name: 'MENU0000000000000000000000000123',
                path: '/sys/policyconf',
                title: '认证策略',
                icon: 'bxAnaalyse',
                component: 'views/iop/system/policyconf'
              },
              {
                name: 'MENU0000000000000000000000000124',
                path: '/sys/pubdept',
                title: '统一机构',
                icon: 'form',
                component: 'iop/views/system/pub-dept/PubDeptList'
              },
              {
                name: 'MENU0000000000000000000000000125',
                path: '/sys/pubuser',
                title: '统一人员',
                icon: 'warning',
                component: 'iop/views/system/pub-user/PubUserList'
              }
            ]
          },
          {
            name: 'MENU0000000000000000000000000130',
            path: '/sys/au',
            title: '权限管理',
            icon: 'table',
            component: 'PageView',
            children: [
              {
                name: 'MENU0000000000000000000000000131',
                path: '/sys/program',
                title: '菜单管理',
                icon: 'form',
                component: 'views/iop/system/program/ProgramIndex'
              },
              {
                name: 'MENU0000000000000000000000000132',
                path: '/sys/role',
                title: '角色管理',
                icon: 'warning',
                component: 'iop/views/system/role/RoleIndex'
              },
              {
                name: 'MENU0000000000000000000000000133',
                path: '/sys/dept',
                title: '单位管理',
                icon: 'table',
                component: 'iop/views/system/dept/SysDeptList'
              },
              {
                name: 'MENU0000000000000000000000000134',
                path: '/sys/user',
                title: '用户管理',
                icon: 'profile',
                component: 'iop/views/system/user/UserList'
              },
              {
                name: 'MENU0000000000000000000000000135',
                path: '/sys/log',
                title: '日志管理',
                icon: 'form',
                component: 'views/iop/system/log/LogIndex'
              }
            ]
          },
          {
            name: 'MENU0000000000000000000000000140',
            path: '/sys/dir',
            title: '字典管理',
            icon: 'table',
            component: 'PageView',
            children: [
              {
                name: 'MENU0000000000000000000000000141',
                path: '/sys/codecla',
                title: '字典分类',
                icon: 'warning',
                component: 'views/iop/system/codecla'
              },
              {
                name: 'MENU0000000000000000000000000142',
                path: '/sys/code',
                title: '编码定义',
                icon: 'table',
                component: 'iop/views/system/code/BaseCodeList'
              }
            ]
          }
        ]
      },
      {
        name: 'MENU0000000000000000000000000200',
        path: '/serv',
        title: '服务组件',
        icon: 'form',
        component: 'RouteView',
        children: [
          {
            name: 'MENU0000000000000000000000000242',
            path: '/access',
            title: '接入管理',
            icon: 'table',
            component: 'PageView',
            children: [
              {
                name: 'MENU0000000000000000000000000243',
                path: '/sys/currency',
                title: '应用接入',
                component: 'iop/views/system/currency/CurrencyServiceList'
              },
              {
                name: 'MENU0000000000000000000000000244',
                path: '/sys/myapplication',
                title: '我的申请',
                component: 'iop/views/system/myapplication/MyApplicationList'
              },
              {
                name: 'MENU0000000000000000000000000225',
                path: '/sys/callingservice',
                title: '调用服务',
                component: 'iop/views/system/callingservice/CallingServiceList'
              }
            ]
          },
          {
            name: 'MENU0000000000000000000242',
            path: '/approval',
            title: '服务审批',
            icon: 'table',
            component: 'PageView'
          },
          {
            name: 'MENU000000242',
            path: '/serv/service',
            title: '服务管理',
            icon: 'table',
            component: 'PageView',
            children: [
              {
                name: 'MENU0000000000000000000000000243',
                path: '/serv/catalog',
                title: '服务目录',
                component: 'iop/views/serv/catalog/ServList'
              },
              {
                name: 'MENU0000000000000000000000000244',
                path: '/serv/service',
                title: '服务授权',
                component: 'iop/views/serv/service/ServiceList'
              },
              {
                name: 'MENU0000000000000000000000000245',
                path: '/serv/authority',
                title: '服务列表',
                component: 'iop/views/serv/authority/AuthorityList'
              }
            ]
          }
        ]
      }
    ]
  },
  oa: {
    name: 'oa',
    path: '/oa',
    title: '主页',
    component: 'BasicLayout',
    redirect: '/oa/dashboard/Workplace',
    children: [
      {
        name: 'dashboard',
        path: '/dashboard/workplace',
        title: '首页',
        component: 'views/dashboard/Workplace'
      },
      {
        name: 'MENU0000000000000000000000000200',
        path: '/sys',
        title: '办公管理',
        icon: 'bxAnaalyse',
        component: 'RouteView',
        children: [
          {
            name: 'MENU0000210',
            path: '/sys/normal',
            title: '日常办公',
            icon: 'form',
            component: 'PageView',
            children: [
              {
                name: 'MENU000000211',
                path: '/file/def',
                title: '车辆管理',
                icon: 'table',
                component: 'PageView'
              },
              {
                name: 'MENU000000000000000212',
                path: '/file/holiday',
                title: '请假管理',
                icon: 'profile',
                component: 'IframeView',
                serverUrl: 'http://118.190.199.44:8060/train/sys/pub-dept.do?method=list'
              },
              {
                name: 'MENU0000000000000000000000000215',
                path: 'http://www.baidu.com',
                title: '收文管理',
                icon: 'user',
                component: 'views/oa/bpms/RevDianList',
                target: '_blank'
              }
            ]
          }
        ]
      }
    ]
  }
}

// 获取菜单权限
const menu = (request) => {
  const token = getTokenPrefix(request.url, request.url.indexOf('='))
  return builder(menus[token])
}
Mock.mock(/\/iop\/auth\/menu/, 'get', menu)

// 登录验证码
Mock.mock(/\/iop\/auth\/captcha/, 'get', () => {
  return 'http://dummyimage.com/125x125'
})

// 用户退出登录
Mock.mock(/\/iop\/auth\/logout/, 'post', () => {
  return builder({})
})

// 切换系统重新认证
const switchToken = (request) => {
  const url = request.url
  const appCode = url.substring(url.lastIndexOf('/') + 1)
  const switchInfo = loginResponse
  // 根据url的appCode参数设置子系统
  switchInfo.appInfo.forEach((app) => {
    if (app.appCode === appCode) {
      app.currApp = 1
    } else {
      app.currApp = 0
    }
  })
  switchInfo.token = appCode + switchInfo.token.substring(switchInfo.token.indexOf('-'))
  return builder(switchInfo)
}
Mock.mock(/\/iop\/auth\/switch/, 'post', switchToken)
