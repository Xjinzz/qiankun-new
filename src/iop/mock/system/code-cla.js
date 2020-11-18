import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/base\/code-cla\/tree/, 'get', (options) => {
  consoleRequest(options)
  const data = [
    {
      id: 'f98091d859a35a970159a94642ce0061',
      bh: 'f98091d859a35a970159a94642ce0061',
      code: 'sys',
      name: '系统基础类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: false,
      icon: null,
      checked: null
    },
    {
      id: '402881005552313d01555240a2200002',
      bh: '402881005552313d01555240a2200002',
      code: '02',
      name: '人员信息类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: false,
      icon: null,
      checked: null
    },
    {
      id: 'f98091d859a35a970159a596ce75002d',
      bh: 'f98091d859a35a970159a596ce75002d',
      code: '10',
      name: '法律法规类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: 'f98091d859a35a970159a5975b4b002e',
      bh: 'f98091d859a35a970159a5975b4b002e',
      code: '20',
      name: '会议管理类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: 'f98091d859a35a970159a5985759002f',
      bh: 'f98091d859a35a970159a5985759002f',
      code: '60',
      name: '资源管理类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: false,
      icon: null,
      checked: null
    },
    {
      id: 'f98091d85b781496015b7d6a5fa80080',
      bh: 'f98091d85b781496015b7d6a5fa80080',
      code: '08',
      name: '服务信息类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: true,
      icon: null,
      checked: null
    }
  ]
  return builder(data)
})

Mock.mock(/\/iop\/base\/code-cla/, 'get', (options) => {
  consoleRequest(options)
  const data = [
    {
      id: 'f98091d859a35a970159a94642ce0061',
      bh: 'f98091d859a35a970159a94642ce0061',
      code: 'sys',
      name: '系统基础类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: false,
      icon: null,
      checked: null
    },
    {
      id: '402881005552313d01555240a2200002',
      bh: '402881005552313d01555240a2200002',
      code: '02',
      name: '人员信息类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: false,
      icon: null,
      checked: null
    },
    {
      id: 'f98091d859a35a970159a596ce75002d',
      bh: 'f98091d859a35a970159a596ce75002d',
      code: '10',
      name: '法律法规类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: 'f98091d859a35a970159a5975b4b002e',
      bh: 'f98091d859a35a970159a5975b4b002e',
      code: '20',
      name: '会议管理类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: true,
      icon: null,
      checked: null
    },
    {
      id: 'f98091d859a35a970159a5985759002f',
      bh: 'f98091d859a35a970159a5985759002f',
      code: '60',
      name: '资源管理类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: false,
      icon: null,
      checked: null
    },
    {
      id: 'f98091d85b781496015b7d6a5fa80080',
      bh: 'f98091d85b781496015b7d6a5fa80080',
      code: '08',
      name: '服务信息类',
      p_bh: '',
      lev: '1',
      type: '0',
      leaf: true,
      icon: null,
      checked: null
    }
  ]
  return builder(data)
})
