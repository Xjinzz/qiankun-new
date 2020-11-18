import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/system\/user\//, 'get', (options) => {
  consoleRequest(options)
  const data = {
    sysUserId: '2c918084703e9e1501703ee1680b0001',
    sysDeptId: 'SD000000000000000000000000000001',
    appId: 'APP00000000000000000000000000001',
    userId: '2c918084703e9e1501703ee167fa0000',
    userCode: '11',
    userName: '11',
    sex: '1',
    nationality: '111',
    birthplace: '11',
    nation: '11',
    userType: '1',
    userStatus: '2',
    paperType: '0',
    paperNum: '11',
    birthday: '2020-02-07',
    orderNum: 11,
    loginName: 'admin',
    loginPwd: null,
    isDel: '0',
    source: '111',
    ldapFlag: null,
    ldapLastTime: null,
    remark: '1',
    rank: null,
    duty: null,
    entryTime: null,
    retirementTime: null,
    beginDate: null,
    endDate: null
  }
  return builder(data)
})

Mock.mock(/\/iop\/system\/user/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    page: 1,
    size: 10,
    totalPages: 1,
    totalSizes: 5,
    data: [
      {
        birthday: '2020-02-07',
        deptName: '平台全部机构',
        paperType: '',
        userStatus: '',
        ldapLastTime: null,
        nation: '11',
        sex: '',
        orderNum: 11,
        remark: '1',
        sysDeptId: 'SD000000000000000000000000000001',
        source: '111',
        userName: '11',
        ldapFlag: null,
        userId: '2c918084703e9e1501703ee167fa0000',
        userCode: '11',
        nationality: '111',
        birthplace: '11',
        appId: 'APP00000000000000000000000000001',
        loginName: 'admin',
        paperNum: '11',
        sysUserId: '2c918084703e9e1501703ee1680b0001',
        userType: '',
        isDel: '否'
      },
      {
        birthday: '2020-02-12',
        deptName: '平台全部机构',
        paperType: '',
        userStatus: '',
        ldapLastTime: null,
        nation: '123',
        sex: '',
        orderNum: 12,
        remark: '22',
        sysDeptId: 'SD000000000000000000000000000001',
        source: '22',
        userName: '1',
        ldapFlag: null,
        userId: '2c9180847041ef4f0170427e68ba0015',
        userCode: '12',
        nationality: '12',
        birthplace: '12',
        appId: 'APP00000000000000000000000000001',
        loginName: 'admin',
        paperNum: '22',
        sysUserId: '2c9180847041ef4f0170427e68c80016',
        userType: '',
        isDel: '是'
      },
      {
        birthday: '2020-02-19',
        deptName: '平台全部机构',
        paperType: '',
        userStatus: '',
        ldapLastTime: null,
        nation: '22',
        sex: '',
        orderNum: 22,
        remark: '1',
        sysDeptId: 'SD000000000000000000000000000001',
        source: '22',
        userName: 'q1',
        ldapFlag: null,
        userId: '2c9180847041ef4f0170428e24380017',
        userCode: 'q',
        nationality: '11',
        birthplace: '22',
        appId: 'APP00000000000000000000000000001',
        loginName: 'admin',
        paperNum: '22',
        sysUserId: '2c9180847041ef4f0170428e243f0018',
        userType: '',
        isDel: '是'
      },
      {
        birthday: '2020-02-12',
        deptName: '平台全部机构',
        paperType: '',
        userStatus: '',
        ldapLastTime: null,
        nation: '汉',
        sex: '',
        orderNum: 33,
        remark: '22',
        sysDeptId: 'SD000000000000000000000000000001',
        source: '333',
        userName: '测试test',
        ldapFlag: null,
        userId: '2c9180847042a639017042ae72d40002',
        userCode: '1111',
        nationality: '111',
        birthplace: '22',
        appId: 'APP00000000000000000000000000001',
        loginName: 'test',
        paperNum: '333',
        sysUserId: '2c9180847042a639017042ae72dd0003',
        userType: '',
        isDel: ''
      },
      {
        birthday: '2020-02-12',
        deptName: '平台全部机构',
        paperType: '',
        userStatus: '在职',
        ldapLastTime: null,
        nation: null,
        sex: '男',
        orderNum: 1,
        remark: '123fdsfdsgfd',
        sysDeptId: 'SD000000000000000000000000000001',
        source: null,
        userName: '超级管理员',
        ldapFlag: null,
        userId: 'U0000000000000000000000000000001',
        userCode: '10',
        nationality: '中国',
        birthplace: null,
        appId: 'APP00000000000000000000000000001',
        loginName: 'admin',
        paperNum: 'aaaaa1111111111111',
        sysUserId: 'SU000000000000000000000000000001',
        userType: '内部用户',
        isDel: ''
      }
    ]
  }
  return builder(data)
})

Mock.mock(/\/iop\/system\/user/, 'post', (options) => {
  consoleRequest(options)
  return builder({})
})

Mock.mock(/\/iop\/system\/user/, 'put', (options) => {
  consoleRequest(options)
  return builder({})
})

Mock.mock(/\/iop\/system\/user/, 'delete', (options) => {
  consoleRequest(options)
  return builder({})
})
