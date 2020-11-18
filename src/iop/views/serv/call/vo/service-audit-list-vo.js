const serviceAuditListVO = [
  {
    title: '服务名称',
    dataIndex: 'chName'
  },
  {
    title: '服务提供单位',
    dataIndex: 'deptName'
  },
  {
    title: '入口地址',
    dataIndex: 'inAddr',
    sorter: false,
    width: 150
  },
  {
    title: '出口地址',
    dataIndex: 'outAddr',
    sorter: false,
    width: 150
  },
  {
    title: '启用状态',
    dataIndex: 'isValide'
  },
  {
    title: '发布状态',
    dataIndex: 'isPub'
  },
  {
    title: '服务编码',
    dataIndex: 'serviceCode',
    hidden: true
  },
  {
    title: '授权方法',
    dataIndex: 'authType',
    hidden: true
  },
  {
    title: '服务分类',
    dataIndex: 'serviceKind',
    hidden: true
  }
]
export default serviceAuditListVO
