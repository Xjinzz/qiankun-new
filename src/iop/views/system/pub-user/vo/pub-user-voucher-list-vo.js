const pubUserVoucherListVO = [
  {
    title: '凭证名称',
    dataIndex: 'voucherName'
  },
  {
    title: '凭证编码',
    dataIndex: 'voucherCode'
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: (text) => {
      if (text) {
        return '已设置'
      } else {
        return '未设置'
      }
    }
  }
]
export default pubUserVoucherListVO
