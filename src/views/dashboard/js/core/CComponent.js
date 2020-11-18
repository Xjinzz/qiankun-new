import CPrototype from './CPrototype'
import Utils from './utils'
export default class CComponent extends CPrototype {
  constructor (el) {
    super(el)
    this._childList = []
  }
  domParser (htmlStr) {
    const div = document.createElement('div')
    div.innerHTML = htmlStr
    if (div.children.length) {
      return div.children[0]
    }
    return div
  }
  setConfig (config) {
    if (!Utils.isInvalidValue(config.x) && !Utils.isInvalidValue(config.y)) {
      this.setPosition(config.x, config.y)
    }
    if (!Utils.isInvalidValue(config.width) && !Utils.isInvalidValue(config.height)) {
      this.setSize(config.width, config.height)
    }
  }
  appendChild (html) {
    const dom = this.domParser(html)
    const child = this._el.appendChild(dom)
    Utils.setStyle(child, {
      width: this?._size?.width,
      height: this?._size?.width,
      x: this?._pos?.x,
      y: this?._pos?.y
    })
    const childFit = new CComponent(child)
    this._childList.push(childFit)
    return childFit
  }
}
