import { builder, consoleRequest } from '@/mock/util'
import Mock from 'mockjs2'

Mock.mock(/\/iop\/base\/area\/tree/, 'get', (options) => {
  consoleRequest(options)
  const data = [
    {
      p_bh: 'AREA0000000000000000000000000001',
      code: '000000',
      bh: 'AREA0000000000000000000000000001',
      name: '地区' + new Date().getTime(),
      id: 'AR1' + new Date().getTime(),
      lev: 1,
      type: '1'
    }
  ]
  setTimeout(() => {}, 10000)
  return builder(data)
})

Mock.mock(/\/iop\/base\/area\//, 'get', (options) => {
  consoleRequest(options)
  console.log('get by id')
  return builder({
    levelCode: 'jjjjuu',
    areaCode: '340202',
    areaId: '1010',
    fullName: '镜湖区2',
    areaLevel: '3',
    shortName: '镜湖区',
    lng: '99.999',
    parentId: null
  })
})

Mock.mock(/\/iop\/base\/area/, 'get', (options) => {
  consoleRequest(options)
  const data = {
    size: 10,
    data: [
      {
        levelCode: null,
        areaCode: '340202',
        areaId: '1010',
        fullName: '镜湖区2',
        areaLevel: '3',
        shortName: '镜湖区',
        parentId: null
      },
      {
        levelCode: null,
        areaCode: '340207',
        areaId: '1012',
        fullName: '鸠江区',
        areaLevel: '3',
        shortName: '鸠江区',
        parentId: null
      },
      {
        levelCode: 'AREA0000000000000000000000000001-998-1008-1013',
        areaCode: '340208',
        areaId: '1013',
        fullName: '三山区',
        areaLevel: '3',
        shortName: '三山区',
        parentId: '1008'
      },
      {
        levelCode: 'AREA0000000000000000000000000001-998-1008-1015',
        areaCode: '340222',
        areaId: '1015',
        fullName: '繁昌县',
        areaLevel: '3',
        shortName: '繁昌县',
        parentId: '1008'
      },
      {
        levelCode: 'AREA0000000000000000000000000001-998-1008-1016',
        areaCode: '340223',
        areaId: '1016',
        fullName: '南陵县',
        areaLevel: '3',
        shortName: '南陵县',
        parentId: '1008'
      },
      {
        levelCode: 'AREA0000000000000000000000000001-998-1017',
        areaCode: '340300',
        areaId: '1017',
        fullName: '蚌埠市',
        areaLevel: '2',
        shortName: '蚌埠市',
        parentId: '998'
      },
      {
        levelCode: 'AREA0000000000000000000000000001-998-1017-1018',
        areaCode: '340301',
        areaId: '1018',
        fullName: '市辖区',
        areaLevel: '3',
        shortName: '市辖区',
        parentId: '1017'
      },
      {
        levelCode: 'AREA0000000000000000000000000001-998-1017-1019',
        areaCode: '340302',
        areaId: '1019',
        fullName: '龙子湖区',
        areaLevel: '3',
        shortName: '龙子湖区',
        parentId: null
      },
      {
        levelCode: 'AREA0000000000000000000000000001-43-94-102',
        areaCode: '130424',
        areaId: '102',
        fullName: '成安县1',
        areaLevel: '1',
        shortName: '成安县',
        parentId: null
      },
      {
        levelCode: 'AREA0000000000000000000000000001-998-1017-1022',
        areaCode: '340311',
        areaId: '1022',
        fullName: '淮上区',
        areaLevel: '3',
        shortName: '淮上区',
        parentId: '1017'
      }
    ],
    totalSizes: '2528',
    totalPages: 253,
    page: 1
  }
  return builder(data)
})

Mock.mock(/\/iop\/base\/area/, 'put', (options) => {
  consoleRequest(options)
  const data = {
    levelCode: null,
    areaCode: '340207',
    areaId: '1012',
    fullName: '鸠江区',
    areaLevel: '3',
    shortName: '鸠江区',
    parentId: null
  }
  return builder(data)
})

Mock.mock(/\/iop\/base\/area/, 'post', (options) => {
  consoleRequest(options)
  return builder({})
})

Mock.mock(/\/iop\/base\/area/, 'delete', (options) => {
  consoleRequest(options)
  return builder({})
})
