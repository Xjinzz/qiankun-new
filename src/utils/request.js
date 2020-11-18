import { IOP_ACCESS_TOKEN, IOP_APP_CODE, IOP_LOGIN_PATH } from '@/iop/constants/index'
import { iopAppService, iopTokenService } from '@/iop/service/index'
import MessageUtils from '@/utils/message'
import notification from 'ant-design-vue/es/notification'
import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 15000 // 请求超时时间
})

// request 配置
service.interceptors.request.use(
  (config) => {
    let appCode = iopAppService.getCurrentAppCode()
    config.headers[IOP_APP_CODE] = appCode
    if (appCode.length === 0) {
      appCode = iopAppService.getDefaultAppCode()
    }
    const token = iopTokenService.getToken(appCode)
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

// response 配置
service.interceptors.response.use(
  ({ data }) => {
    if (data.success) {
      return data
    }
    let error
    switch (data.code) {
      case 3001:
        MessageUtils.error(data.message)
        break
      case 3009:
      case 3005:
      case 3008:
      case 3010:
      case 3011:
        error = { message: data.message, code: data.code }
        handleLogin(error.message)
        break
      case 4200:
        console.error('接口JSON转换出错', data.message)
        data.message = '接口错误'
        break
    }
    const message = `${data.message}   错误码${data.code}`
    return Promise.reject(message)
  },
  ({ response }) => {
    let message = ''
    if (response && response.status) {
      if (response.status < 500) {
        switch (response.status) {
          case 403:
            message = (response.data && response.data.message) || '无访问权限'
            break
          case 404:
            message = '请求的url错误'
            break
          default:
            message = (response.data && response.data.message) || '未知错误'
        }
      } else {
        console.error((response.data && response.data.message) || '服务器异常')
        message = '服务异常'
      }
    } else {
      message = '未知错误'
    }
    return Promise.reject(message)
  }
)

function handleLogin (message) {
  notification.error({
    message: '错误',
    description: message
  })
  setTimeout(() => {
    window.location.href = `/#${IOP_LOGIN_PATH}`
    window.location.reload()
  }, 1000)
}

/**
 * 将参数映射到路径的变量中
 * @param {string} url 路径
 * @param {Object} params 被映射到路径的变量
 *
 * @returns 替换好的url
 */
function mapParamsToPathVariable (url, variables) {
  if (!url || typeof url !== 'string') {
    throw new Error(`url ${url} 应该是字符串`)
  }
  if (!variables || url.indexOf('/:') < 0) {
    return url
  }
  return url.replace(/:(\w+)/gi, (_, key) => variables[key])
}

export { service as axios, mapParamsToPathVariable }
