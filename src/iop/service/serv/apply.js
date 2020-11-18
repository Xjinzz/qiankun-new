import path from '@/iop/api/index'
import BaseService from '@/service/base'

/**
 * 申请单Service
 *
 * @class
 * @extends BaseService
 */
class ServApplyService extends BaseService {
  /**
   * 管理员通过审批
   */
  async approval (businessId = '', contentValue = '') {
    const { result } = await this.post({
      url: path.serv.applyAdmin.approval,
      data: { businessId, contentValue },
      variable: {
        id: businessId
      }
    })
    return result
  }

  /**
   * 管理员退回审批
   * @param {string} businessId 申请单id
   * @param {string} contentValue 审核意见
   */
  async back (businessId = '', contentValue = '') {
    const { result } = await this.post({
      url: path.serv.applyAdmin.returns,
      data: { businessId, contentValue },
      variable: { id: businessId }
    })
    return result
  }

  /**
   * 获取流程节点
   */
  async prepare (applyId = '') {
    const { result } = await this.get({ url: `${path.serv.apply.prepareWorkflow}?id=${applyId}` })
    const activityOptions = []
    const userMap = new Map()
    if (result instanceof Array && result.length > 0) {
      result.map((item) => {
        if (item.type === 'assignee' && item.paticipantInfo instanceof Array && item.paticipantInfo.length > 0) {
          activityOptions.push({ title: item.name, value: item.id })
          const paticipantOptions = []
          item.paticipantInfo.map((paticipant) => {
            paticipantOptions.push({ title: paticipant.name, value: paticipant.entityId })
          })
          userMap.set(item.id, paticipantOptions)
        } else {
          console.warn(`节点【${item.name}】的参与人为空`)
        }
        return item
      })

      if (activityOptions.length < 1) {
        return Promise().reject('流程节点为空')
      }
      if (userMap.size < 1) {
        return Promise().reject('流程参与人为空')
      }
    } else {
      return Promise().reject('流程节点为空')
    }
    return { userMap, activityOptions }
  }

  /** 删除申请单的申请明细 */
  async deleteRef (data = []) {
    const { result } = await this.delete({ url: path.serv.apply.deleteRef, data })
    return result
  }
  /** 删除 */
  async deleteBatch (data) {
    const { result } = await this.post({ url: path.serv.apply.deleteBatch, data })
    return result
  }

  /** 获取审批意见列表 */
  async opinionList (id = '') {
    const { result } = await this.get({ url: path.serv.apply.opinions, variable: { id } })
    return result
  }

  /** 获取系统 */
  async appTree (params) {
    const { result } = await this.get({ url: path.serv.apply.appTree, params })
    return result
  }

  /** 获取接入者信息 */
  async access (params) {
    const { result } = await this.get({ url: path.system.currency.info, params })
    return result
  }

  /**
   * 获取申请单详情
   */
  async formInfo (applyId = '') {
    const { result } = await this.get({ url: `${path.serv.apply.index}/${applyId}` })
    return result
  }

  /**
   * 提交审批
   * @param {Objetc} data 申请单数据
   */
  async commit (applyId = '') {
    await this.post({ url: path.serv.apply.commit, variable: { id: applyId } })
  }

  async generateApplyId (type = '') {
    const { result } = await this.get({ url: path.serv.apply.generate, params: { type } })
    return result
  }
}

export default new ServApplyService()
