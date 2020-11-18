import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/base\/code\/dict/, 'get', (options) => {
  consoleRequest(options)
  const data = [
    {
      code: 'code',
      name: 'code',
      parentId: null
    },
    {
      code: 'code2',
      name: 'code2',
      parentId: null
    },
    {
      code: 'code3',
      name: 'code3',
      disabled: true,
      parentId: null
    }
  ]
  setTimeout(() => {}, 10000)
  return builder(data)
})
