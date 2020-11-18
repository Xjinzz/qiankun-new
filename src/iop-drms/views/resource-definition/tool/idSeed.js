const _idSeed = {
  id: 9000,
  newId () {
    return _idSeed.id++
  }
}
export default _idSeed
