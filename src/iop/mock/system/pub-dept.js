import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/system\/pub-dept\/save-transfer/, 'put', (options) => {
  consoleRequest(options)
  return builder({})
})

Mock.mock(/\/iop\/system\/pub-dept\/app-list/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    size: 10,
    data: [
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '综合办公系统',
        appCode: 'gongwen',
        parentName: null
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '门户网站',
        appCode: 'dhccms',
        parentName: null
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '法律法规库',
        appCode: 'flk',
        parentName: null
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '信息化管理系统',
        appCode: 'xxh',
        parentName: null
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '办公门户',
        appCode: 'work',
        parentName: null
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '可视化报表组件',
        appCode: 'UReport2',
        parentName: null
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '数据资源信息平台',
        appCode: 'zyk',
        parentName: null
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '全部机构',
        appName: '法规备案审查平台',
        appCode: 'fgba',
        parentName: null
      },
      {
        deptId: 'D0000000000000000000000000000001',
        deptName: '平台全部机构',
        appName: '应用支撑开发平台',
        appCode: 'iop',
        parentName: null
      }
    ],
    totalSizes: '28',
    totalPages: 3,
    page: 1
  }
  return builder(data)
})

Mock.mock(/\/iop\/system\/pub-dept\/tree/, 'get', (options) => {
  consoleRequest(options)
  const data = [
    {
      id: 'dbt00000000000000000000000000001',
      bh: 'D0000000000000000000000000000001-dbt00000000000000000000000000001',
      code: 'daibiaotuan',
      name: '代表团',
      p_bh: '',
      lev: '1',
      type: null,
      leaf: false,
      icon: '../resources/images/default/tree/folder.gif',
      checked: null
    },
    {
      id: '40284b82588a199001588a34a674001f',
      bh: 'D0000000000000000000000000000001-40284b82588a199001588a34a674001f',
      code: '000020',
      name: '各地方人民代表大会',
      p_bh: '',
      lev: '1',
      type: '1',
      leaf: false,
      icon: '../resources/images/default/tree/folder.gif',
      checked: null
    },
    {
      id: 'ff8080816c50025d016c5fc8d237063e',
      bh: 'D0000000000000000000000000000001-ff8080816c50025d016c5fc8d237063e',
      code: 'wsxflsjg',
      name: '网上信访临时机构',
      p_bh: '',
      lev: '1',
      type: '1',
      leaf: true,
      icon: '../resources/images/default/tree/folder.gif',
      checked: null
    },
    {
      id: 'D0000000000000000000000000000011',
      bh: 'D0000000000000000000000000000001-D0000000000000000000000000000011',
      code: '000010',
      name: '一级机构',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: false,
      icon: '../resources/images/default/tree/main_dept.png',
      checked: null
    }
  ]
  return builder(data)
})

Mock.mock(/\/iop\/system\/pub-dept\//, 'get', (options) => {
  consoleRequest(options)
  const data = {
    deptId: 'D0000000000000000000000000000011',
    areaId: null,
    deptName: '一级机构',
    shortName: '一级机构',
    deptCode: '000010',
    parentId: 'D0000000000000000000000000000001',
    levelCode: 'D0000000000000000000000000000001-D0000000000000000000000000000011',
    deptKind: '1',
    isTrue: '1',
    deptXinzhi: '1',
    deptType: '0',
    deptLevel: 'A',
    deptStatus: '1',
    orderNum: 11,
    chargeName: '系统管理员',
    source: '平台',
    zjf: null,
    postCode: null,
    ldapFlag: null,
    ldapLastTime: null,
    isDel: '1',
    remark: null
  }
  return builder(data)
})

Mock.mock(/\/iop\/system\/pub-dept/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    size: 10,
    data: [
      {
        deptName: '各地方人民代表大会',
        deptLevel: '省级',
        ldapLastTime: null,
        deptId: '40284b82588a199001588a34a674001f',
        deptKind: '大会',
        orderNum: 2,
        remark: null,
        deptType: '单位',
        source: '平台',
        ldapFlag: null,
        parentId: 'D0000000000000000000000000000001',
        deptStatus: '注销',
        deptXinzhi: '',
        levelCode: 'D0000000000000000000000000000001-40284b82588a199001588a34a674001f',
        isTrue: '否',
        areaId: null,
        zjf: null,
        postCode: null,
        shortName: null,
        chargeName: null,
        isDel: '否',
        deptCode: '000020'
      },
      {
        deptName: '全部机构',
        deptLevel: '国家',
        ldapLastTime: null,
        deptId: 'D0000000000000000000000000000001',
        deptKind: '大会',
        orderNum: 1,
        remark: null,
        deptType: '单位',
        source: '平台',
        ldapFlag: null,
        parentId: '0',
        deptStatus: '创建',
        deptXinzhi: '',
        levelCode: 'D0000000000000000000000000000001',
        isTrue: '否',
        areaId: null,
        zjf: null,
        postCode: null,
        shortName: '全部机构',
        chargeName: '系统管理员',
        isDel: '是',
        deptCode: '000000'
      },
      {
        deptName: '一级机构',
        deptLevel: '国家',
        ldapLastTime: null,
        deptId: 'D0000000000000000000000000000011',
        deptKind: '大会',
        orderNum: 11,
        remark: null,
        deptType: '',
        source: '平台',
        ldapFlag: null,
        parentId: 'D0000000000000000000000000000001',
        deptStatus: '创建',
        deptXinzhi: '',
        levelCode: 'D0000000000000000000000000000001-D0000000000000000000000000000011',
        isTrue: '是',
        areaId: null,
        zjf: null,
        postCode: null,
        shortName: '一级机构',
        chargeName: '系统管理员',
        isDel: '是',
        deptCode: '000010'
      },
      {
        deptName: '代表团',
        deptLevel: '国家',
        ldapLastTime: null,
        deptId: 'dbt00000000000000000000000000001',
        deptKind: '大会',
        orderNum: null,
        remark: null,
        deptType: '',
        source: null,
        ldapFlag: null,
        parentId: 'D0000000000000000000000000000001',
        deptStatus: '创建',
        deptXinzhi: '',
        levelCode: 'D0000000000000000000000000000001-dbt00000000000000000000000000001',
        isTrue: '否',
        areaId: null,
        zjf: null,
        postCode: null,
        shortName: '代表团',
        chargeName: null,
        isDel: '',
        deptCode: 'daibiaotuan'
      },
      {
        deptName: '网上信访临时机构',
        deptLevel: '国家',
        ldapLastTime: null,
        deptId: 'ff8080816c50025d016c5fc8d237063e',
        deptKind: '大会',
        orderNum: 9,
        remark: null,
        deptType: '单位',
        source: null,
        ldapFlag: null,
        parentId: 'D0000000000000000000000000000001',
        deptStatus: '创建',
        deptXinzhi: '',
        levelCode: 'D0000000000000000000000000000001-ff8080816c50025d016c5fc8d237063e',
        isTrue: '否',
        areaId: null,
        zjf: null,
        postCode: null,
        shortName: '临时机构',
        chargeName: null,
        isDel: '是',
        deptCode: 'wsxflsjg'
      }
    ],
    totalSizes: '2528',
    totalPages: 253,
    page: 1
  }
  return builder(data)
})

Mock.mock(/\/iop\/system\/pub-dept/, 'post', (options) => {
  consoleRequest(options)

  return builder(
    Object.assign(options.body, {
      deptId: 'D0000000000000000000000000000011'
    })
  )
})

Mock.mock(/\/iop\/system\/pub-dept/, 'delete', (options) => {
  consoleRequest(options)
  return builder({})
})

Mock.mock(/\/iop\/system\/pub-dept/, 'put', (options) => {
  consoleRequest(options)
  return builder(options.body)
})
