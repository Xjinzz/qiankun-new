import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/system\/pub-dept-admin/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    size: 10,
    data: [
      {
        deptName: '全部机构',
        adminId: 'f63e47ac7086acd60',
        userName: '张三',
        userId: '123',
        userCode: '11'
      },
      {
        deptName: '全部机构',
        adminId: 'f63e47ac708a1d8a1c0011',
        userName: '李四',
        userId: '345',
        userCode: '111'
      },
      {
        deptName: '全部机构',
        adminId: 'f63e47ac7086acd6017011',
        userName: '王二小',
        userId: '456',
        userCode: '1111'
      }
    ],
    totalSizes: '2528',
    totalPages: 253,
    page: 1
  }
  return builder(data)
})

Mock.mock(/\/iop\/system\/pub-dept-admin\/save-admin/, 'post', (options) => {
  consoleRequest(options)
  return builder({})
})
