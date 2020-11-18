const attrListVO = [
  {
    title: '属性名称',
    dataIndex: 'attrName',
    width: 150
  },
  {
    title: '属性编码',
    dataIndex: 'attrCode',
    width: 150
  },
  {
    title: '数据类型',
    dataIndex: 'dataType',
    width: 150
  },
  {
    title: '取值类型',
    dataIndex: 'valueType',
    width: 150
  },
  {
    title: '是否查询项',
    dataIndex: 'isQuery',
    width: 150
  },
  {
    title: '列表中显示',
    dataIndex: 'isShowList',
    width: 150
  },
  {
    title: '排序号',
    dataIndex: 'orderNum',
    width: 150,
    scopedSlots: { customRender: 'num' }
  }
]
export default attrListVO
