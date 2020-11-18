import path from '@/iop-drms/api/index'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class PortalService extends BaseService {
  /* 数据资源数量 */
  async objCount (params = {}) {
    const { result } = await this.get({
      url: path.portal.objCount,
      params
    })
    return result
  }
  /* 服务接口数量 */
  async serCount (params = {}) {
    const { result } = await this.get({
      url: path.portal.serCount,
      params
    })
    return result
  }
  /* 接入平台数量 */
  async count (params = {}) {
    const { result } = await this.get({
      url: path.portal.count,
      params
    })
    return result
  }
  /* 接口调用数量 */
  async cal (params = {}) {
    const { result } = await this.get({
      url: path.portal.cal,
      params
    })
    return result
  }
  /* 访问热度 */
  async appHot (params = {}) {
    const { result } = await this.get({
      url: path.portal.appHot,
      params
    })
    return result
  }
  /* 最新数据 */
  async objNew (params = {}) {
    const { result } = await this.get({
      url: path.portal.objNew,
      params
    })
    return result
  }
  /* 最热数据 */
  async objHot (params = {}) {
    const { result } = await this.get({
      url: path.portal.objHot,
      params
    })
    return result
  }
  /* 柱状容量 */
  async dataBar (params = {}) {
    const { result } = await this.get({
      url: path.portal.dataBar,
      params
    })
    return result
  }
  /* 柱状数据 */
  async objBar (params = {}) {
    const { result } = await this.get({
      url: path.portal.objBar,
      params
    })
    return result
  }
  /* 饼状数据 */
  async objPie (params = {}) {
    const { result } = await this.get({
      url: path.portal.objPie,
      params
    })
    return result
  }
  // 树形
  /* 饼状数据 */
  async objTree (params = {}) {
    const { result } = await this.get({
      url: path.server.openData.treeAll,
      params
    })
    return result
  }
}
export default new PortalService()
