import path from '@/iop/api/index'
import BaseService from '@/service/base'

/* 增删改查逻辑处理 */
class RoleService extends BaseService {
  /* 查询全部 */
  async getList (params = {}) {
    const { result } = await this.get({
      url: path.system.role.table,
      params
    })
    return result
  }
  /** 查询单个 */
  async getListId (id = '') {
    const { result } = await this.get({
      url: path.system.role.query,
      variable: { id }
    })
    return result
  }
  /* 增加 */
  async add (data = {}) {
    const { result } = await this.post({
      url: path.system.role.add,
      data
    })
    return result
  }
  /* 删除 */
  async del (id = '') {
    const { result } = await this.delete({
      url: path.system.role.delete,
      variable: { id }
    })
    return result
  }
  /* 修改 */
  async modif (id = '', data = {}) {
    const { result } = await this.put({
      url: path.system.role.modif,
      variable: { id },
      data
    })
    return result
  }
  /** 查询dept树 */
  async dept (params = {}) {
    const { result } = await this.get({
      url: path.system.role.deptTree,
      params
    })
    return result
  }
  /** 查询fun树 */
  async fun (params = {}) {
    const { result } = await this.get({
      url: path.system.role.funTree,
      params
    })
    return result
  }
  /** 查询用户授权 */
  async user (params = {}) {
    const { result } = await this.get({
      url: path.system.role.user,
      params
    })
    return result
  } /** 查询用户授权 */
  async notrole (params = {}) {
    const { result } = await this.get({
      url: path.system.role.notrole,
      params
    })
    return result
  }
  // 添加授权
  async grant (data = {}, params = {}) {
    const { result } = await this.post({
      url: path.system.role.grant,
      data,
      params
    })
    return result
  }
  // 删除授权
  async delUser (data = {}, params = {}) {
    const { result } = await this.post({
      url: path.system.role.delUser,
      data,
      params
    })
    return result
  }
  // 角色关联查询
  async roleRela (data = {}) {
    const { result } = await this.post({
      url: path.system.role.roleRela,
      data: data
    })
    return result
  }
  async roleData (params = {}) {
    const { result } = await this.get({
      url: path.system.role.roletable,
      params
    })
    return result
  }
  /* 角色关联删除 */
  async roleDel (id = '') {
    const { result } = await this.delete({
      url: path.system.role.roleDelete,
      variable: { id }
    })
    return result
  }
  /* 角色关联修改 */
  async roleModif (id = '', data = {}) {
    const { result } = await this.put({
      url: path.system.role.roleModif,
      variable: { id },
      data
    })
    return result
  }
  async roleFunData (params = {}) {
    const { result } = await this.post({
      url: path.system.role.roleFunData,
      params
    })
    return result
  }
  /* 角色关联修改 */
  async roleSelect (id = '') {
    const { result } = await this.get({
      url: path.system.role.roleSelect,
      variable: { id }
    })
    return result
  }
}
export default new RoleService()
