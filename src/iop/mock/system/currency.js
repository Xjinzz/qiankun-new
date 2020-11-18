import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/serv\/app/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    page: 1,
    size: 10,
    totalPages: 1,
    totalSizes: 1,
    data: [
      {
        id: 'f63e47ac70d9a2390170dbbedcc30006',
        code: '1',
        name: '系统名字1',
        updown: '上下文根1',
        ip: 'IP地址1'
      },
      {
        id: 'f63e47ac70d9a2390170fbbedcc30006',
        code: '2',
        name: '系统名字2',
        updown: '上下文跟2',
        ip: 'IP地址2'
      },
      {
        id: 'f63e47ac70d9a2390170dbbedcc30016',
        code: '3',
        name: '系统名字3',
        updown: '上下文跟3',
        ip: 'IP地址3'
      }
    ]
  }
  return builder(data)
})

Mock.mock(/\/iop\/serv\/detail/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    page: 1,
    size: 10,
    totalPages: 1,
    totalSizes: 1,
    data: [
      {
        id: 'f63e47ac70d9a2390170dbbedcc30006',
        code: '1111',
        title: '这是个标题',
        name: '系统名字1',
        updown: '上下文根1',
        sysfirst: '系统首页1',
        ip: 'IP地址1'
      },
      {
        id: 'f63e47ac70d9a2390170fbbedcc30006',
        code: '22222',
        name: '系统名字2',
        updown: '上下文跟2',
        sysfirst: '系统首页2',
        ip: 'IP地址2'
      },
      {
        id: 'f63e47ac70d9a2390170dbbedcc30016',
        code: '3333',
        name: '系统名字3',
        updown: '上下文跟3',
        sysfirst: '系统首页3',
        ip: 'IP地址3'
      }
    ]
  }
  return builder(data)
})
