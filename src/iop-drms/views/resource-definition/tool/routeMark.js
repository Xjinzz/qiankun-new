import Define from './define'
const getRouteMark = function () {
  return Define.ROUTEMARK
}
const initRouteMark = function () {
  let href = window.location.href
  href = href.split('?')[0]
  const index = href.lastIndexOf('/')
  const field = href.substring(index + 1, href.length)
  Define.ROUTEMARK = field
}
export {
  getRouteMark,
  initRouteMark
}
