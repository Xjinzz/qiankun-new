export default class CPrototype {
  constructor (el) {
    this._pos = {
      x: 0,
      y: 0
    }
    this._el = el
    this._size = {
      width: 0,
      height: 0
    }
  }
  setPosition (x, y) {
    this._pos = { x, y }
  }
  setSize (width, height) {
    this._size = { width, height }
  }
}
