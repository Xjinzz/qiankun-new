import path from '@/iop/api/index'
import BaseService from '@/service/base'
import { objectTool } from 'mwutil'
import Enum from '@/iop/views/msg/admin/center/assp-msg-statistics/tool/enum'
class SendTypeService extends BaseService {
  getTimeInterval () {
    return Enum.TIMEINTERVAL
  }
  async getMsgTypeList () {
    const { result } = await this.get({
      url: `${path.msg.statistics.getMsgTypeList}?page=1&size=999`
    })
    return result
  }
  async getMsgTypeData (params) {
    const { result } = await this.get({
      url: `${path.msg.statistics.getMsgTypeData}?${objectTool.toQueryString(params)}`
    })
    return result
  }
  async getMsgContentTypeData () {
    const { result } = await this.get({
      url: `${path.msg.statistics.getMsgContentTypeData}`
    })
    return result
  }
  async getSendSuccess () {
    const { result } = await this.get({
      url: `${path.msg.statistics.getSendSuccess}`
    })
    return result
  }
  async getMsgSecNum (params) {
    const { result } = await this.get({
      url: `${path.msg.statistics.getMsgSecNum}?${objectTool.toQueryString(params)}`
    })
    return result
  }
}
export default new SendTypeService()
