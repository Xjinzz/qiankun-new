import CComponent from './core/CComponent'
// 注入组件
import TestComp from './component/testComp'
export default class Engine {
  init (el) {
    this._el = new CComponent(el)
    this._compMap = {}
  }
  render () {
    this._compMap['testComp'] = this._el.appendChild(TestComp.getHtml())
    this._compMap['testComp'].setConfig({
      x: 100,
      y: 200
    })
    this._compMap['testComp'].appendChild('<h1>111</h1>')
    return {
      next: (func) => {
        func.apply(this)
      }
    }
  }
  // 注册事件
  registerEvent () {}
}
