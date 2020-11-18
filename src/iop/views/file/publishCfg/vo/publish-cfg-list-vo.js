const publishCfgListVO = [
  {
    title: '配置名称',
    dataIndex: 'cfgName',
    align: 'center',
    sorter: false
  },
  {
    title: '源文件库名称',
    align: 'center',
    dataIndex: 'storeName',
    sorter: false
  },
  {
    title: '目录名称',
    align: 'center',
    dataIndex: 'ctlgName',
    sorter: false
  },
  {
    title: '发布规则',
    align: 'center',
    dataIndex: 'publishRule',
    sorter: false,
    customRender: (text) => {
      if (text === 'REALTIME') {
        return '实时'
      } else if (text === 'TIMING') {
        return '定时'
      } else if (text === 'BASEDRULE') {
        return '基于规则'
      }
    }
  }
]

export default publishCfgListVO
