function mapParamsToPathVariable (url, params) {
  if (!params) {
    return url
  }
  if (!url || typeof url !== 'string') {
    throw new Error(`url ${url} 应该是字符串`)
  }
  return url.replace(/:(\w+)/gi, (_, key) => params[key])
}

const template1 = 'http://localhost:8080/iop/auth/:token/:id'
const template2 = 'http://localhost:8080/iop/auth/'
const url = mapParamsToPathVariable(template1, { token: 'iop-token', id: 1234 })
console.log('url1: ', url)
console.log('url2: ', mapParamsToPathVariable(template1, { token: 'iop-token2' }))
console.log('url3: ', mapParamsToPathVariable(template2))
console.log('url4: ', mapParamsToPathVariable(template2, { token: 'iop-token2' }))
console.log('url5: ', mapParamsToPathVariable(template1, {}))
