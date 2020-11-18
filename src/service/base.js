import { axios, mapParamsToPathVariable } from '@/utils/request'
import qs from 'querystring'

class BaseService {
  // constructor () {
  //   this._request = axios
  // }

  async __request (option, method) {
    const config = {
      ...option,
      method,
      paramsSerializer: (params) => {
        return qs.stringify(params)
        // return qs.stringify(params, { indices: false })
      }
    }
    config.url = mapParamsToPathVariable(config.url, config.variable)
    return axios(config)
  }

  async get (option) {
    return this.__request(option, 'get')
  }

  async post (option) {
    return this.__request(option, 'post')
  }

  async put (option) {
    return this.__request(option, 'put')
  }

  async delete (option) {
    return this.__request(option, 'delete')
  }

  async patch (option) {
    return this.__request(option, 'patch')
  }
}

export default BaseService
