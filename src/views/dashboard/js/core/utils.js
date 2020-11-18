const Utils = {
  isInvalidValue: (value) => {
    return value === undefined || value === null
  },
  setStyle: (dom, style) => {
    let cssStr = 'position:absolute'
    for (const key in style) {
      if (style[key]) {
        cssStr += `${key}:${style[key]};`
      }
    }
    dom.style.cssText = cssStr
  }
}
export default Utils
