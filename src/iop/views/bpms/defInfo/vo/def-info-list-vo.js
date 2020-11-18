const defInfoListVO = [
  {
    title: '流程名称',
    dataIndex: 'defName',
    align: 'center',
    sorter: true
  },
  {
    title: '流程编码',
    align: 'center',
    dataIndex: 'defCode'
  },
  {
    title: '节点类型',
    align: 'center',
    dataIndex: 'nodeType',
    customRender: (text) => {
      if (text === '1') {
        return '流程'
      } else if (text === '0') {
        return '目录'
      }
    }
  },
  {
    title: '是否锁',
    align: 'center',
    dataIndex: 'lock',
    customRender: (val, row, ind) => {
      if (row.lock === '1') {
        return '是'
      } else {
        return '否'
      }
    }
  },
  {
    title: '是否发布',
    align: 'center',
    dataIndex: 'public_',
    customRender: (val, row, ind) => {
      if (row.public_ === '1') {
        return '是'
      } else {
        return '否'
      }
    }
  }
]
export default defInfoListVO
