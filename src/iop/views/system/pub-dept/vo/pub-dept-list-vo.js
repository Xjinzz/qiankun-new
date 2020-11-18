const pubDeptListVO = [
  {
    title: '机构编码',
    dataIndex: 'deptCode'
  },
  {
    title: '机构名称',
    dataIndex: 'deptName'
  },
  {
    title: '机构类型',
    dataIndex: 'deptType',
    sorter: false,
    width: '90px'
  },
  {
    title: '行政级别',
    dataIndex: 'deptLevel',
    sorter: false,
    width: '90px',
    hidden: true
  },
  {
    title: '排序号',
    dataIndex: 'orderNum',
    hidden: true
  }
]
export default pubDeptListVO
