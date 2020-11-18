import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/system\/dept\/tree/, 'get', (options) => {
  consoleRequest(options)
  const data = [
    {
      id: 'f63e47ac7086acd601708ff14a7f00f8',
      bh: 'SD000000000000000000000000000001-f63e47ac7086acd601708ff14a7f00f8',
      code: 'daibiaotuan',
      name: '代表团',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: 'dbt00000000000000000000000000001',
      leaf: false,
      icon: null,
      checked: null
    },
    {
      id: '2c9180847065b4fa017066b7e58a0007',
      bh: '0',
      code: 'PPP',
      name: 'pppsss',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '2c9180847065b4fa017066b7e57d0006',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: '2c9180847065b4fa017066b7e5920008',
      bh: 'SD000000000000000000000000000001',
      code: 'PPP',
      name: 'pppsss',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '2c9180847065b4fa017066b7e57d0006',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: '2c9180847065b4fa017066b8ec0e000b',
      bh: 'SD000000000000000000000000000001',
      code: 'CASD',
      name: 'C',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '2c9180847065b4fa017066b8eba00009',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: '2c9180847065b4fa017066beab5a000d',
      bh: '',
      code: '1',
      name: '1',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '2c9180847065b4fa017066beab4d000c',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: '2c9180847065b4fa017066beab62000e',
      bh: 'SD000000000000000000000000000001',
      code: '1',
      name: '1',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '2c9180847065b4fa017066beab4d000c',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: '2c9180847065b4fa017066c0de770010',
      bh: '',
      code: '2',
      name: '2',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '2c9180847065b4fa017066c0de63000f',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: '2c9180847065b4fa017066c0de7f0011',
      bh: 'SD000000000000000000000000000001',
      code: '2',
      name: '2',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '2c9180847065b4fa017066c0de63000f',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: '2c9180847065b4fa017066c7ecaa0013',
      bh: '0',
      code: 'CCC测试BBB',
      name: 'CCC测试BBB',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '2c9180847065b4fa017066c7ec9e0012',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: '2c9180847065b4fa017066c7ecb10014',
      bh: 'SD000000000000000000000000000001',
      code: 'CCC测试BBB',
      name: 'CCC测试BBB',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '2c9180847065b4fa017066c7ec9e0012',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: 'f63e47ac707cd97a017081f33ef403f6',
      bh: 'SD000000000000000000000000000001-f63e47ac707cd97a017081f33ef403f6',
      code: 'CCC测试1',
      name: 'CCC测试1',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: 'f63e47ac707cd97a017081b2b36603ef',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: 'ff8080816d62db6d016d66384ab90054',
      bh: 'SD000000000000000000000000000001-ff8080816d62db6d016d66384ab90054',
      code: '302001B0',
      name: '全国人大',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '2c909fc26c3c6efa016c3c7694380030',
      leaf: false,
      icon: null,
      checked: null
    },
    {
      id: 'SD000000000000000000000000000011',
      bh: 'SD000000000000000000000000000001-SD000000000000000000000000000011',
      code: '000010',
      name: '平台一级机构',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: 'D0000000000000000000000000000011',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: 'f63e47ac707cd97a017081373af40000',
      bh: 'SD000000000000000000000000000001-f63e47ac707cd97a017081373af40000',
      code: '000020',
      name: '各地方人民代表大会',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: '40284b82588a199001588a34a674001f',
      leaf: false,
      icon: null,
      checked: null
    },
    {
      id: 'ff8080816d00e2a3016d010ea68a0021',
      bh: 'SD000000000000000000000000000001-ff8080816d00e2a3016d010ea68a0021',
      code: 'wsxflsjg',
      name: '网上信访临时机构',
      p_bh: 'SD000000000000000000000000000001',
      lev: '1',
      type: 'ff8080816c50025d016c5fc8d237063e',
      leaf: true,
      icon: null,
      checked: null
    }
  ]
  return builder(data)
})

Mock.mock(/\/iop\/system\/dept\//, 'get', (options) => {
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

Mock.mock(/\/iop\/system\/dept/, 'post', (options) => {
  consoleRequest(options)

  return builder(
    Object.assign(options.body, {
      deptId: 'D0000000000000000000000000000011'
    })
  )
})

Mock.mock(/\/iop\/system\/dept/, 'delete', (options) => {
  consoleRequest(options)
  return builder({})
})

Mock.mock(/\/iop\/system\/dept/, 'put', (options) => {
  consoleRequest(options)
  return builder(options.body)
})
