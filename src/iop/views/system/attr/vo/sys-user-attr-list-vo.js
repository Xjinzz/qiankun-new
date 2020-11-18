const sysUserAttrListVO = [
  {
    title: '参数名称',
    dataIndex: 'attrName',
    width: 150
  },
  {
    title: '所属系统',
    dataIndex: 'appId',
    width: 150
  },
  {
    title: '参数值',
    dataIndex: 'userVal',
    width: 100
  },
  {
    title: '参数值类型',
    dataIndex: 'attrDataType',
    width: 150,
    sorter: false
  },
  {
    title: '编码',
    dataIndex: 'attrCode',
    width: 100,
    hidden: true
  },
  {
    title: '个性化',
    dataIndex: 'isUser',
    hidden: true,
    sorter: false
  },
  {
    title: '配置环境',
    dataIndex: 'enviromentCode',
    hidden: true
  },
  {
    title: '参数类型',
    dataIndex: 'attrType',
    hidden: true
  }
]
export default sysUserAttrListVO
