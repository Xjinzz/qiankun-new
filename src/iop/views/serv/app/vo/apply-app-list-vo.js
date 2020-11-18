const applyAppListVo = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'serial',
    width: '80px',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '系统编码',
    dataIndex: 'appCode'
  },
  {
    title: '系统名称',
    dataIndex: 'appName'
  },
  {
    title: '上下文根',
    dataIndex: 'appContext'
  },
  {
    title: '首页地址',
    dataIndex: 'indexUrl',
    width: '250px',
    sorter: false
  }
]
export default applyAppListVo
