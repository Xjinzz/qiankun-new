import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/system\/pub-user\/app-list/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    size: 10,
    data: [
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '综合办公系统',
        appCode: 'gongwen',
        parentName: null,
        sysUserId: '1'
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '门户网站',
        appCode: 'dhccms',
        parentName: null,
        sysUserId: '2'
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '法律法规库',
        appCode: 'flk',
        parentName: null,
        sysUserId: '3'
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '信息化管理系统',
        appCode: 'xxh',
        parentName: null,
        sysUserId: '5'
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '办公门户',
        appCode: 'work',
        parentName: null,
        sysUserId: '6'
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '可视化报表组件',
        appCode: 'UReport2',
        parentName: null,
        sysUserId: '9'
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '数据资源信息平台',
        appCode: 'zyk',
        parentName: null,
        sysUserId: '10'
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '法规备案审查平台',
        appCode: 'fgba',
        parentName: null,
        sysUserId: '21'
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '平台全部机构',
        appName: '应用支撑开发平台',
        appCode: 'iop',
        parentName: null,
        sysUserId: '222'
      }
    ],
    totalSizes: '28',
    totalPages: 3,
    page: 1
  }
  return builder(data)
})

Mock.mock('/iop/system/pub-user/delete-app', 'post', (options) => {
  consoleRequest(options)
  return builder({})
})

Mock.mock(/\/iop\/system\/pub-user\//, 'get', (options) => {
  consoleRequest(options)
  const data = {
    userId: '2c918084703e9e1501703eef0bd20002',
    deptId: 'D0000000000000000000000000000001',
    userCode: '22',
    userName: '11',
    sex: '1',
    nationality: '1',
    birthplace: '22',
    nation: '22',
    userType: '1',
    userStatus: '1',
    paperType: '0',
    paperNum: '22',
    birthday: '2020-02-25',
    orderNum: 1,
    loginName: 'admin',
    loginPwd: '1234',
    isDel: '1',
    source: '22',
    ldapFlag: null,
    ldapLastTime: null,
    remark: '1',
    rank: null,
    duty: null,
    entryTime: null,
    retirementTime: null
  }
  return builder(data)
})

Mock.mock(/\/iop\/system\/pub-user/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    page: 1,
    size: 10,
    totalPages: 1,
    totalSizes: 7,
    data: [
      {
        birthday: '1581004800000',
        deptName: '平台全部机构',
        userStatus: '',
        appId: null,
        sex: '',
        orderNum: 11,
        sysUserId: '2c918084703e9e1501703ee1680b0001',
        sysDeptId: null,
        userName: '11',
        userId: '2c918084703e9e1501703ee167fa0000',
        userCode: '11'
      },
      {
        birthday: '1582726987000',
        deptName: '平台全部机构',
        userStatus: '',
        appId: null,
        sex: '',
        orderNum: 1,
        sysUserId: '2c918084703e9e1501703eef0bdb0003',
        sysDeptId: null,
        userName: '11',
        userId: '2c918084703e9e1501703eef0bd20002',
        userCode: '22'
      },
      {
        birthday: '1581490721000',
        deptName: '平台全部机构',
        userStatus: '',
        appId: null,
        sex: '',
        orderNum: 12,
        sysUserId: '2c9180847041ef4f0170427e68c80016',
        sysDeptId: null,
        userName: '1',
        userId: '2c9180847041ef4f0170427e68ba0015',
        userCode: '12'
      },
      {
        birthday: '1582096563000',
        deptName: '平台全部机构',
        userStatus: '',
        appId: null,
        sex: '',
        orderNum: 22,
        sysUserId: '2c9180847041ef4f0170428e243f0018',
        sysDeptId: null,
        userName: 'q1',
        userId: '2c9180847041ef4f0170428e24380017',
        userCode: 'q'
      },
      {
        birthday: '1581436800000',
        deptName: '平台全部机构',
        userStatus: '',
        appId: null,
        sex: '',
        orderNum: 33,
        sysUserId: '2c9180847042a639017042ae72dd0003',
        sysDeptId: null,
        userName: '测试test',
        userId: '2c9180847042a639017042ae72d40002',
        userCode: '1111'
      },
      {
        birthday: '1582099221000',
        deptName: '平台全部机构',
        userStatus: '',
        appId: null,
        sex: '',
        orderNum: 11,
        sysUserId: '2c9180847042a639017042b6c3840009',
        sysDeptId: null,
        userName: '1212',
        userId: '2c9180847042a639017042b6c37c0008',
        userCode: '111'
      },
      {
        birthday: '1581436800000',
        deptName: '平台全部机构',
        userStatus: '在职',
        appId: null,
        sex: '男',
        orderNum: 1,
        sysUserId: 'SU000000000000000000000000000001',
        sysDeptId: null,
        userName: '系统管理员',
        userId: 'U0000000000000000000000000000001',
        userCode: '10'
      }
    ]
  }
  return builder(data)
})

Mock.mock(/\/iop\/system\/pub-user/, 'post', (options) => {
  consoleRequest(options)
  return builder({})
})

Mock.mock(/\/iop\/system\/pub-user/, 'put', (options) => {
  consoleRequest(options)
  return builder({})
})

Mock.mock(/\/iop\/system\/pub-user/, 'delete', (options) => {
  consoleRequest(options)
  return builder({})
})
