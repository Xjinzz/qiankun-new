import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/serv\/adopt/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    page: 1,
    size: 10,
    totalPages: 1,
    totalSizes: 1,
    data: [
      {
        id: '1',
        title: '这是一个标题',
        code: '19522',
        person: '审核人',
        starttime: '申请时间',
        endtime: '通过时间',
        type: '类型'
      },
      {
        id: '2',
        title: '这是一个标题',
        code: '19522',
        person: '审核人',
        starttime: '申请时间',
        endtime: '通过时间',
        type: '类型'
      },
      {
        id: '3',
        title: '这是一个标题',
        code: '19522',
        person: '审核人',
        starttime: '申请时间',
        endtime: '通过时间',
        type: '类型'
      },
      {
        id: '4',
        title: '这是一个标题',
        code: '19522',
        person: '审核人',
        starttime: '申请时间',
        endtime: '通过时间',
        type: '类型'
      }
    ]
  }
  return builder(data)
})
