
import { builder, getBody } from '@/mock/util'
import Mock from 'mockjs2'

const consoleRequest = (options) => {
  console.log('request', options)
}

Mock.mock(/\/iop\/system\/dbjndi\//, 'get', (options) => {
  consoleRequest(options)
  console.log('get by id')
  return builder({
    createId: null,
    createTime: null,
    modifyId: null,
    modifyTime: '2020-02-05T11:22:37.000+0000',
    skinId: 'SKIN0000000000000000000000000001',
    skinCode: 'CLASSICS',
    skinName: '经典皮肤',
    skinExample: null,
    css: '/css/skins/classicssss',
    remark: null,
    pk: 'SKIN0000000000000000000000000001'
  })
})

const list = (options) => {
  consoleRequest(options)
  return builder({
    size: 10,
    data: [
      {
        jndiName: '本地数据库',
        dbType: 'oralce',
        loginName: 'admin',
        jndiId: '2c90e4b267d5921b0167df3eac1403f4',
        connUrl: 'dbc:oracle:thin:@//localhost'
      },
      {
        jndiName: ' ',
        dbType: '1',
        loginName: '1',
        jndiId: '2c90e4b267d5921b6y67df3ea2dc3tf7',
        connUrl: '登录'
      }
    ],
    totalSizes: '82',
    totalPages: 9,
    page: 1
  })
}
Mock.mock(/\/iop\/system\/dbjndi/, 'get', list)

Mock.mock(/\/iop\/system\/dbjndi\//, 'delete', (options) => {
  consoleRequest(options)
  return builder()
})

Mock.mock(/\/iop\/system\/dbjndi\//, 'put', (options) => {
  consoleRequest(options)
  const body = getBody(options)
  return builder(body)
})

Mock.mock(/\/iop\/system\/dbjndi/, 'post', (options) => {
  consoleRequest(options)
  const body = getBody(options)
  return builder(body)
})
