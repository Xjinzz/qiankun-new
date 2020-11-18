const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0,
  success: true
}

const builder = (data = {}, message = '', status = 200, { code = 200, success = true, headers = {} } = {}) => {
  responseBody.result = data
  responseBody.message = message
  responseBody._status = status
  responseBody.code = code
  responseBody.success = success
  if (Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
  )
}

const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}

const consoleRequest = (options) => {
  console.log('request', options)
}

export { builder, getQueryParameters, getBody, consoleRequest }
