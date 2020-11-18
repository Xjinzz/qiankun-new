const objectListVO = [
  {
    title: '资源编码',
    dataIndex: 'objectCode',
    sorter: true
  },
  {
    title: '资源名称',
    dataIndex: 'objectName',
    sorter: true
  },
  {
    title: '资源性质',
    dataIndex: 'objectNat',
    sorter: true
  },
  {
    title: '行业',
    dataIndex: 'objectTrade',
    sorter: true
  },
  {
    title: '发布状态',
    dataIndex: 'releaseStatus',
    sorter: false,
    customRender: (val, row, ind) => {
      if (row.releaseStatus === '未发布') {
        return <a-switch defaultChecked = { false } onChange = { () => { this.releClick(event, row) } } />
      } else {
        return <a-switch defaultChecked = { true } onChange = { () => { this.releClick(event, row) } } />
      }
    }
  }
]
export default objectListVO
