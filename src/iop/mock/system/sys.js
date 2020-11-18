import { builder } from '@/mock/util'
import Mock from 'mockjs2'

const list = (options) => {
  console.log('request', options)
  return builder({
    size: 10,
    data: [
      {
        appName: ' ',
        operateUser: '档案管理员',
        operateType: '1',
        logId: '2c90e4b267d5921b0167df3eac1403f4',
        operateName: '登录',
        logNote: '1',
        logIp: '172.16.31.101',
        logTime: '2018-12-24T15:53:25.000+0000'
      },
      {
        appName: '应用支撑开发平台',
        operateUser: '0',
        operateType: '登录',
        logId: '2c90e4b267d5921b0167df229ac303c8',
        operateName: '登录系统',
        logNote: '成功',
        logIp: '172.16.31.111',
        logTime: '2018-12-24T15:34:06.000+0000'
      },
      {
        appName: ' ',
        operateUser: '档案管理员',
        operateType: '1',
        logId: '2c90e4b267d5921b0167df2a72de03e1',
        operateName: '登录',
        logNote: '1',
        logIp: '172.16.31.233',
        logTime: '2018-12-24T15:31:20.000+0000'
      },
      {
        appName: '应用支撑开发平台',
        operateUser: '0',
        operateType: '登录',
        logId: '2c90e4b267d5921b0167df1f4f2003c3',
        operateName: '登录系统',
        logNote: '成功',
        logIp: '172.16.31.105',
        logTime: '2018-12-24T15:30:30.000+0000'
      },
      {
        appName: ' ',
        operateUser: '档案管理员',
        operateType: '1',
        logId: '2c90e4b267d5921b0167df1f857b03c5',
        operateName: '登录',
        logNote: '1',
        logIp: '192.168.1.107',
        logTime: '2018-12-24T15:20:27.000+0000'
      },
      {
        appName: ' ',
        operateUser: '档案管理员',
        operateType: '1',
        logId: '2c90e4b267d5921b0167df1f96c303c6',
        operateName: '登录',
        logNote: '1',
        logIp: '172.16.31.233',
        logTime: '2018-12-24T15:19:29.000+0000'
      },
      {
        appName: ' ',
        operateUser: '业务人员1',
        operateType: '1',
        logId: '2c90e4b267d5921b0167df00d25d0374',
        operateName: '登录',
        logNote: '1',
        logIp: '172.16.31.233',
        logTime: '2018-12-24T14:45:52.000+0000'
      },
      {
        appName: ' ',
        operateUser: '档案管理员',
        operateType: '1',
        logId: '2c90e4b267d5921b0167de6641160213',
        operateName: '登录',
        logNote: '1',
        logIp: '172.16.31.233',
        logTime: '2018-12-24T11:57:03.000+0000'
      },
      {
        appName: ' ',
        operateUser: '业务人员1',
        operateType: '1',
        logId: '2c90e4b267d5921b0167de65e5f40210',
        operateName: '登录',
        logNote: '1',
        logIp: '172.16.31.233',
        logTime: '2018-12-24T11:56:40.000+0000'
      },
      {
        appName: ' ',
        operateUser: '兼职档案员1',
        operateType: '1',
        logId: '2c90e4b267d5921b0167d62a6f4c0044',
        operateName: '登录',
        logNote: '1',
        logIp: '172.16.31.101',
        logTime: '2018-12-22T21:34:54.000+0000'
      }
    ],
    totalSizes: 82,
    totalPages: 9,
    page: 1
  })
}
Mock.mock(/\/iop\/system\/log/, 'get', list)

const app = () => {
  return builder({
    size: 10,
    data: [
      {
        F_APP_CODE: '123',
        F_APP_CONTEXT: '123',
        F_APP_TYPE: '1',
        F_APP_ID: 'APP00000000000000000000000000001'
      }
    ]
  })
}
Mock.mock(/\/iop\/system\/app/, 'get', app)

const appcomp = () => {
  return builder({
    success: true,
    message: 'success',
    code: 200,
    result: {
      size: 10,
      data: [
        {
          F_APP_CONTEXT: 'plat',
          F_APP_IP: null,
          F_RULE_ID: null,
          F_APP_ID: 'APP00000000000000000000000000001',
          F_APP_TYPE: '0',
          F_APP_CODE: 'plat-iop-daas',
          F_SKIN_ID: null,
          F_JNDI_ID: null,
          F_APP_DOMAIN: null,
          F_APP_NAME: '统一数据访问组件',
          F_PARENT_ID: null,
          F_APPLICATION_ID: 'APPLICATION000000000000000000001',
          F_FLOW_ID: null
        },
        {
          F_APP_CONTEXT: 'plat',
          F_APP_IP: null,
          F_RULE_ID: null,
          F_APP_ID: 'APP00000000000000000000000000001',
          F_APP_TYPE: '0',
          F_APP_CODE: 'plat-iop-daas',
          F_SKIN_ID: null,
          F_JNDI_ID: null,
          F_APP_DOMAIN: null,
          F_APP_NAME: '统一数据访问组件2',
          F_PARENT_ID: null,
          F_APPLICATION_ID: 'APPLICATION000000000000000000002',
          F_FLOW_ID: null
        },
        {
          F_APP_CONTEXT: 'plat',
          F_APP_IP: null,
          F_RULE_ID: null,
          F_APP_ID: 'APP00000000000000000000000000001',
          F_APP_TYPE: '0',
          F_APP_CODE: 'plat-iop-daas',
          F_SKIN_ID: null,
          F_JNDI_ID: null,
          F_APP_DOMAIN: null,
          F_APP_NAME: '统一数据访问组件3',
          F_PARENT_ID: null,
          F_APPLICATION_ID: 'APPLICATION000000000000000000003',
          F_FLOW_ID: null
        },
        {
          F_APP_CONTEXT: 'plat',
          F_APP_IP: null,
          F_RULE_ID: null,
          F_APP_ID: 'APP00000000000000000000000000001',
          F_APP_TYPE: '0',
          F_APP_CODE: 'plat-iop-daas',
          F_SKIN_ID: null,
          F_JNDI_ID: null,
          F_APP_DOMAIN: null,
          F_APP_NAME: '统一数据访问组件4',
          F_PARENT_ID: null,
          F_APPLICATION_ID: 'APPLICATION000000000000000000004',
          F_FLOW_ID: null
        },
        {
          F_APP_CONTEXT: 'plat',
          F_APP_IP: null,
          F_RULE_ID: null,
          F_APP_ID: 'APP00000000000000000000000000001',
          F_APP_TYPE: '0',
          F_APP_CODE: 'plat-iop-daas',
          F_SKIN_ID: null,
          F_JNDI_ID: null,
          F_APP_DOMAIN: null,
          F_APP_NAME: '统一数据访问组件5',
          F_PARENT_ID: null,
          F_APPLICATION_ID: 'APPLICATION000000000000000000005',
          F_FLOW_ID: null
        }
      ],
      totalSizes: '5',
      totalPages: 1,
      page: 1
    },
    timestamp: 1579254189230
  })
}
Mock.mock(/\/iop\/system\/application/, 'get', appcomp)
