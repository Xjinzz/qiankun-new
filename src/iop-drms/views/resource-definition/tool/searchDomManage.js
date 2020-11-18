import Define from '../tool/define'
export default {
  dateStrategy (x) {
    x.type = Define.COMPTYPE.DATEGROUP
    return x
  },
  dateTimeStrategy (x) {
    x.type = Define.COMPTYPE.DATETIMEGROUP
    return x
  }
}
