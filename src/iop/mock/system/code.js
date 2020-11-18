import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock('/iop/base/code/dict/deptType', 'get', (options) => {
  consoleRequest(options)
  const data = [ { code: '1', name: '单位', parentId: null }, { code: '9', name: '部门', parentId: null } ]
  return builder(data)
})

Mock.mock('/iop/base/code/dict/deptLevel', 'get', (options) => {
  consoleRequest(options)
  const data = [
    { code: 'A', name: '国家', parentId: null },
    { code: 'B', name: '省级', parentId: null },
    { code: 'C', name: '市级', parentId: null },
    { code: 'D', name: '区县级', parentId: null }
  ]
  return builder(data)
})

Mock.mock('/iop/base/code/dict/deptStatus', 'get', (options) => {
  consoleRequest(options)
  const data = [
    { code: '1', name: '创建', parentId: null },
    { code: '2', name: '正常', parentId: null },
    { code: '9', name: '注销', parentId: null }
  ]
  return builder(data)
})

Mock.mock('/iop/base/code/dict/deptXinzhi', 'get', (options) => {
  consoleRequest(options)
  const data = []
  return builder(data)
})

Mock.mock('/iop/base/code/dict/deptKind', 'get', (options) => {
  consoleRequest(options)
  const data = [
    { code: '1', name: '大会', parentId: null },
    { code: '2', name: '常委会', parentId: null },
    { code: '3', name: '专委会', parentId: null },
    { code: '4', name: '其他', parentId: null },
    { code: '9', name: '代表团', parentId: null }
  ]
  return builder(data)
})

Mock.mock('/iop/base/code/dict/sex', 'get', (options) => {
  consoleRequest(options)
  const data = [ { code: '1', name: '男', parentId: null }, { code: '2', name: '女', parentId: null } ]
  return builder(data)
})

Mock.mock('/iop/base/code/dict/userType', 'get', (options) => {
  consoleRequest(options)
  const data = [
    { code: '1', name: '内部用户', parentId: null },
    { code: '0', name: '外部用户', parentId: null },
    { code: '2', name: '虚拟用户', parentId: null }
  ]
  return builder(data)
})

// nation
Mock.mock('/iop/base/code/dict/B109', 'get', (options) => {
  consoleRequest(options)
  const data = [
    { code: '1', name: '汉族', parentId: null },
    { code: '0', name: '满族', parentId: null },
    { code: '3', name: '维吾尔族', parentId: null }
  ]
  return builder(data)
})

// bank
Mock.mock('/iop/base/code/dict/B105', 'get', (options) => {
  consoleRequest(options)
  const data = []
  return builder(data)
})

Mock.mock('/iop/base/code/dict/attrEnviro', 'get', (options) => {
  consoleRequest(options)
  const data = [
    { code: '1', name: '开发环境', parentId: null },
    { code: '2', name: '测试环境', parentId: null },
    { code: '3', name: '正式环境', parentId: null }
  ]
  return builder(data)
})

Mock.mock('/iop/base/code/dict/attrDatatype', 'get', (options) => {
  consoleRequest(options)
  const data = [
    { code: '1', name: '参数类', parentId: null },
    { code: '2', name: '地址类', parentId: null },
    { code: '3', name: '系统类', parentId: null },
    { code: '4', name: '链接类', parentId: null },
    { code: '5', name: '文件类', parentId: null }
  ]
  return builder(data)
})

Mock.mock('/iop/base/code/dict/attrType', 'get', (options) => {
  consoleRequest(options)
  const data = [ { code: '0', name: '分组', parentId: null }, { code: '1', name: '参数', parentId: null } ]
  return builder(data)
})

// attrSystype
Mock.mock('/iop/base/code/dict/attrSystype', 'get', (options) => {
  consoleRequest(options)
  const data = [
    { code: '12', name: '通用', parentId: null },
    { code: '2', name: 'Windows', parentId: null },
    { code: '1', name: 'Linux', parentId: null }
  ]
  return builder(data)
})

Mock.mock(/\/iop\/base\/code/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    page: 1,
    size: 10,
    totalPages: 11,
    totalSizes: 109,
    data: [
      {
        codeId: '402881005552313d0155524186380003',
        claName: '人员信息类',
        codeType: '',
        claId: '402881005552313d01555240a2200002',
        codeName: '性别分类',
        codeNum: 'B101'
      },
      {
        codeId: '402881005552313d01555242079d0004',
        claName: '人员信息类',
        codeType: '列表',
        claId: '402881005552313d01555240a2200002',
        codeName: '政治面貌',
        codeNum: 'B102'
      },
      {
        codeId: '402881005552313d015552425f3d0005',
        claName: '人员信息类',
        codeType: '列表',
        claId: '402881005552313d01555240a2200002',
        codeName: '学历代码',
        codeNum: 'B103'
      },
      {
        codeId: '402881005552313d015552429f6d0006',
        claName: '人员信息类',
        codeType: '列表',
        claId: '402881005552313d01555240a2200002',
        codeName: '任职方式',
        codeNum: 'B104'
      },
      {
        codeId: '402881005552313d01555242e6fe0007',
        claName: '人员信息类',
        codeType: '列表',
        claId: '402881005552313d01555240a2200002',
        codeName: '职级',
        codeNum: 'B105'
      },
      {
        codeId: '402881005552313d01555244ac8b000a',
        claName: '人员信息类',
        codeType: '列表',
        claId: '402881005552313d01555240a2200002',
        codeName: '职称代码',
        codeNum: 'B108'
      },
      {
        codeId: '402881005552313d015552451024000b',
        claName: '人员信息类',
        codeType: '列表',
        claId: '402881005552313d01555240a2200002',
        codeName: '民族分类',
        codeNum: 'B109'
      },
      {
        codeId: '4028b88155868aa4015586acb7b10004',
        claName: '组织机构类',
        codeType: '列表',
        claId: '402881005551a72701555207daf60073',
        codeName: '机构性质',
        codeNum: 'A101'
      },
      {
        codeId: '4028b88155868aa4015586af2fa20007',
        claName: '组织机构类',
        codeType: '树形',
        claId: '402881005551a72701555207daf60073',
        codeName: '机构类别',
        codeNum: 'A102'
      },
      {
        codeId: '4028b88155868aa4015586cdba47002a',
        claName: '组织机构类',
        codeType: '列表',
        claId: '402881005551a72701555207daf60073',
        codeName: '是否',
        codeNum: 'A104'
      }
    ]
  }
  return builder(data)
})

Mock.mock(/\/iop\/base\/code/, 'post', (options) => {
  consoleRequest(options)
  return builder({
    codeId: '4028814186380003',
    claName: '人员信息类',
    codeType: '',
    claId: '402881005552313d01555240a2200002',
    codeName: '性别分类',
    codeNum: 'B101'
  })
})

Mock.mock(/\/iop\/base\/code/, 'delete', (options) => {
  consoleRequest(options)
  return builder({})
})
