import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock('/iop/system/user-attr/tree?id=0', 'get', (options) => {
  consoleRequest(options)
  const data = [
    {
      id: 'f63e47ac70d9a2390170dbbedcc30006',
      bh: null,
      code: 'baseAttr',
      name: '基础参数',
      p_bh: '0',
      lev: '1',
      type: null,
      leaf: false,
      icon: null,
      checked: null
    },
    {
      id: 'f63e47ac70d9a2390170dbc102820008',
      bh: null,
      code: 'msgAtrr',
      name: '消息参数',
      p_bh: '0',
      lev: '1',
      type: null,
      leaf: false,
      icon: null,
      checked: null
    }
  ]
  return builder(data)
})

Mock.mock(/\/iop\/system\/user-attr\/tree/, 'get', (options) => {
  consoleRequest(options)
  const data = [
    {
      id: 'f63e47ac70d9a2390170dbc03e010007',
      bh: null,
      code: 'dbAttr',
      name: '数据库参数11',
      p_bh: 'f63e47ac70d9a2390170dbbedcc30006',
      lev: '1',
      type: null,
      leaf: false,
      icon: null,
      checked: null
    }
  ]
  return builder(data)
})

Mock.mock(/\/iop\/system\/user-attr/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    page: 1,
    size: 10,
    totalPages: 1,
    totalSizes: 1,
    data: [
      {
        attrValId: '',
        attrId: 'f63e47ac70d9a2390170dbc102820008',
        attrCode: 'msgAtrr',
        appId: '',
        attrDataType: '',
        isUser: '',
        userVal: '',
        attrName: '消息参数',
        attrType: '分组'
      },
      {
        attrValId: '',
        attrId: 'f63e47ac70d9a2390170dbbedcc30006',
        attrCode: 'baseAttr',
        appId: '',
        attrDataType: '',
        isUser: '',
        userVal: '',
        attrName: '基础参数',
        attrType: '分组'
      }
    ]
  }
  return builder(data)
})
