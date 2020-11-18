const serviceListVO = [
  {
    title: '服务编码',
    dataIndex: 'serviceCode',
    width: 120
  },
  {
    title: '服务名称',
    dataIndex: 'chName',
    width: 200
  },
  {
    title: '提供单位',
    dataIndex: 'deptName',
    width: 150,
    sorter: false
  },
  {
    title: '入口地址',
    dataIndex: 'inAddr',
    sorter: false,
    hidden: true
  },
  {
    title: '出口地址',
    dataIndex: 'outAddr',
    sorter: false,
    width: 150,
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
  },
  {
    title: '启用状态',
    dataIndex: 'isValide',
    width: 120,
    sorter: false
  }
]
export default serviceListVO
