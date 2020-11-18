class _idSeed {
  constructor () {
    this._id = 9000
  }
  newId () {
    return this._id++
  }
}
export default new _idSeed()
