import path from '@/iop-drms/api/index'
import BaseService from '@/service/base'
import axios from 'axios'
import { iopTokenService } from '@/iop/service/index'
import { IOP_ACCESS_TOKEN } from '@/iop/constants/index'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 50000 // 请求超时时间
})
axios.defaults.headers.common['Content-Type'] = 'application/octet-stream;charset=UTF-8'
// request 配置
service.interceptors.request.use(
  (config) => {
    const token = iopTokenService.getCurrentToken()
    if (token) {
      config.headers[IOP_ACCESS_TOKEN] = token
    }
    return config
  },
  () => {
    const error = { message: '请求超时' }
    return Promise.reject(error)
  }
)
class ZhuangfaService extends BaseService {
  async doUpload (data) {
    return service({
      url: path.zhuangfa.upload,
      data,
      method: 'POST'
    })
  }
}
export default new ZhuangfaService()
