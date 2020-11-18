import { builder } from '@/mock/util'
import Mock from 'mockjs2'

const list = () => {
  return builder({
    size: 10,
    data: [
      {
        F_PROGRAM_ID: 'MENU0000000000000000000000000100',
        F_ORDER_NUM: '100',
        F_PROGRAM_NAME: '系统管理',
        F_PROGRAM_URL: '/sys',
        F_LOG_LEVEL: '0'
      },
      {
        F_PROGRAM_ID: 'MENU0000000000000000000000000110',
        F_ORDER_NUM: '110',
        F_PROGRAM_NAME: '基础管理',
        F_PROGRAM_URL: '/sys/base',
        F_LOG_LEVEL: '0'
      },
      {
        F_PROGRAM_ID: 'MENU0000000000000000000000000111',
        F_ORDER_NUM: '111',
        F_PROGRAM_NAME: '皮肤定义',
        F_PROGRAM_URL: '/sys/skin',
        F_LOG_LEVEL: '0'
      },
      {
        F_PROGRAM_ID: 'MENU0000000000000000000000000112',
        F_ORDER_NUM: '112',
        F_PROGRAM_NAME: '数据源定义',
        F_PROGRAM_URL: '/sys/dbjndi',
        F_LOG_LEVEL: '0'
      },
      {
        F_PROGRAM_ID: 'MENU0000000000000000000000000113',
        F_ORDER_NUM: '113',
        F_PROGRAM_NAME: '系统定义',
        F_PROGRAM_URL: '/sys/app',
        F_LOG_LEVEL: '0'
      },
      {
        F_PROGRAM_ID: 'MENU0000000000000000000000000114',
        F_ORDER_NUM: '114',
        F_PROGRAM_NAME: '参数定义',
        F_PROGRAM_URL: '/sys/attr',
        F_LOG_LEVEL: '0'
      },
      {
        F_PROGRAM_ID: 'MENU0000000000000000000000000115',
        F_ORDER_NUM: '115',
        F_PROGRAM_NAME: '行政区划',
        F_PROGRAM_URL: 'http://www.baidu.com',
        F_LOG_LEVEL: '0'
      },
      {
        F_PROGRAM_ID: 'MENU0000000000000000000000000120',
        F_ORDER_NUM: '120',
        F_PROGRAM_NAME: '全局管理',
        F_PROGRAM_URL: '/sys/all',
        F_LOG_LEVEL: '0'
      },
      {
        F_PROGRAM_ID: 'MENU0000000000000000000000000121',
        F_ORDER_NUM: '121',
        F_PROGRAM_NAME: '凭证定义',
        F_PROGRAM_URL: '/sys/voucher',
        F_LOG_LEVEL: '0'
      },
      {
        F_PROGRAM_ID: 'MENU0000000000000000000000000122',
        F_ORDER_NUM: '122',
        F_PROGRAM_NAME: '认证方式',
        F_PROGRAM_URL: '/sys/policyway',
        F_LOG_LEVEL: '0'
      }
    ],
    totalSizes: '29',
    totalPages: 3,
    page: 1
  })
}
Mock.mock(/\/iop\/sys\/program/, 'get', list)
