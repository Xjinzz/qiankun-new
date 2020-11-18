const programAuditListVO = [
  {
    title: '菜单名称',
    dataIndex: 'programName'
  },
  {
    title: '路由地址',
    dataIndex: 'programUrl',
    sorter: false,
    width: 150
  },
  {
    title: '功能类型',
    dataIndex: 'programType',
    sorter: false
  },
  {
    title: '日志级别',
    dataIndex: 'logLevel',
    width: 120,
    sorter: false
  },
  {
    title: '排序号',
    dataIndex: 'orderNum',
    hidden: true
  }
]
export default programAuditListVO
