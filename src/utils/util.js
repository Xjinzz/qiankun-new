import axios from 'axios'
import { iopTokenService } from '@/iop/service/index'
import { IOP_ACCESS_TOKEN } from '@/iop/constants/index'
import { objectTool } from 'mwutil'
import { message } from 'ant-design-vue'
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
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

function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

function welcome () {
  const arr = [ '休息一会儿吧', '准备吃什么呢?', '我猜你可能累了' ]
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    (event) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

function download (url = '', methods = 'get', data = {}, params = {}, type = 'excel') {
  service({
    url: url,
    method: methods,
    data: data,
    params: params,
    responseType: 'blob'
  }).then((res) => {
    if (objectTool.isObject(res.data)) {
      message.error(res.data.message)
      return
    }
    const name = decodeURI(res.headers['content-disposition']).match(/(fileName|filename)[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[2]
    if ('download' in document.createElement('a')) {
      const blob = new Blob([res.data], { type: `application/${type};charset=utf-8` })
      // const blob = res.data
      const link = document.createElement('a')
      const url = window.URL.createObjectURL(blob)
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      navigator.msSaveBlob(res.data, name)
    }
  })
}

export { timeFix, welcome, triggerWindowResizeEvent, handleScrollHeader, isIE, removeLoadingAnimate, download }
