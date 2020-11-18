const applyServiceListVo = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'serial',
    width: '80px',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '服务名称',
    dataIndex: 'chName',
    width: 200
  },
  {
    title: '服务编码',
    dataIndex: 'serviceCode'
  },
  {
    title: '提供单位',
    dataIndex: 'deptName',
    width: 150
  }
]
export default applyServiceListVo
