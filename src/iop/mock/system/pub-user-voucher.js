import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/system\/pub-user-voucher/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    page: 1,
    size: 10,
    totalPages: 1,
    totalSizes: 4,
    data: [
      {
        voucherName: '登录名凭证',
        voucherId: 'PASS0000000000000000000000000001',
        voucherVal: 'MTIzNA==',
        voucherPage: '/pub/voucherManager.do?method=loginName',
        remark: null,
        voucherCode: 'PZ_001',
        status: null
      },
      {
        voucherName: '登录名凭证',
        voucherId: 'f63e47ac70a059a60170a5cf1787003c',
        voucherVal: null,
        voucherPage: '123',
        remark: null,
        voucherCode: '123123',
        status: null
      },
      {
        voucherName: 'Pad',
        voucherId: 'f63e47ac70ab30c60170ad6c4576000e',
        voucherVal: null,
        voucherPage: '123',
        remark: null,
        voucherCode: 'PZ_003',
        status: null
      },
      {
        voucherName: '手机号凭证',
        voucherId: 'PHONE000000000000000000000000001',
        voucherVal: null,
        voucherPage: '/pub/voucherManager.do?method=phone',
        remark: null,
        voucherCode: 'PZ_002',
        status: null
      }
    ]
  }
  return builder(data)
})
