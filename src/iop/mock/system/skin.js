import { builder, getBody } from '@/mock/util'
import Mock from 'mockjs2'

const consoleRequest = (options) => {
  console.log('request', options)
}

Mock.mock(/\/iop\/system\/skin\//, 'get', (options) => {
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
  const record = {
    css: 'css',
    skinCode: 'skinCode',
    skinName: 'skinName',
    skinId: 'skinId'
  }
  const datas = []
  for (let i = 1; i < 11; i++) {
    const data = { ...record }
    for (const key of Object.keys(data)) {
      if (key !== 'skinId') {
        data[key] += Math.ceil(Math.random() * i)
      } else {
        data[key] += i
      }
    }
    datas.push(data)
  }
  return builder({
    size: 10,
    data: datas,
    totalSizes: '20',
    totalPages: 2,
    page: 1
  })
}
Mock.mock(/\/iop\/system\/skin/, 'get', list)

Mock.mock(/\/iop\/system\/skin\//, 'delete', (options) => {
  consoleRequest(options)
  return builder()
})

Mock.mock(/\/iop\/system\/skin\//, 'put', (options) => {
  consoleRequest(options)
  const body = getBody(options)
  return builder(body)
})

Mock.mock(/\/iop\/system\/skin/, 'post', (options) => {
  consoleRequest(options)
  const body = getBody(options)
  return builder(body)
})
