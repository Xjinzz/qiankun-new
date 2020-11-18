import moment from 'moment'
import Define from './define'

function toMoment (timer) {
  if (timer !== '') {
    return moment(new Date(Number(timer)))
  } else {
    return moment(new Date())
  }
}
const NEXT_SUCCESSOR = 'nextSuccessor'
// aop切面基础函数
export class AopChain {
  constructor (fn = function () {}, successor = null) {
    this.handler = fn
    this.successor = successor
  }

  // 设置下一个责任者
  setSuccessor (successor) {
    this.successor = successor
  }
  // 执行处理
  handleRequest () {
    const ret = this.handler(...arguments)
    return ret === NEXT_SUCCESSOR && this.successor
      ? this.successor.handleRequest.apply(this.successor, arguments)
      : ret
  }
}
// 处理date类型search filter
export const dateFieldHandle = new AopChain((type, field) => {
  if (type === Define.COMPTYPE.DATE || type === Define.COMPTYPE.DATETIME) {
    return field.split('~').map(item => {
      return toMoment(item)
    })
  } else {
    return NEXT_SUCCESSOR
  }
})
// 处理inputNumebr类型search filter
export const inputNumberFieldHandle = new AopChain((type, field) => {
  if (type === Define.COMPTYPE.INPUTNUMBER) {
    return field.split('~')
  } else {
    return NEXT_SUCCESSOR
  }
})
// 处理普通类型search filter
export const defaultFieldHandle = new AopChain((type, field) => {
  return field
})

// 脱敏函数
// 脱敏函数
export const sensitiveField = (field, before = 3, after = 4) => {
  if (!field) {
    return ''
  }
  field = String(field)
  // 匹配中文、英文、数字
  const sensitiveFlag = '*'
  let sensitiveStr = ''
  for (let i = 0; i < field.length - (before + after); i++) {
    sensitiveStr += sensitiveFlag
  }
  return field.substring(0, before) + sensitiveStr + field.substring(field.length - after)
}
const checkVoidValue = (item, x) => {
  if (x[item.name] === null || x[item.name] === '' || x[item.name] === undefined) {
    delete x[item.name]
  }
}
const checkSensitiveValue = (item, x) => {
  // 详情需要判断脱敏
  if (x[item.name] && item.sensitive && this.isView) {
    const textSplitPosition = {
      0: [0, 0],
      1: [1, 0],
      2: [1, 0],
      3: [1, 1],
      4: [1, 1],
      5: [2, 2],
      6: [2, 2],
      7: [3, 3],
      8: [3, 3]
    }
    x[item.name] = sensitiveField(x[item.name], ...(x[item.name].length < 9 ? textSplitPosition[x[item.name].length] : [4, 4]))
  }
}
const checkDateType = (item, x) => {
  // 日期类型需要moment一下
  if (
    x[item.name] &&
    !item.hidden &&
    (
      item.type === Define.COMPTYPE.DATE ||
      item.type === Define.COMPTYPE.DATETIME
    )
  ) {
    // 如果number能够处理  则按照
    if (Number(x[item.name])) {
      // 处理时间戳的格式
      x[item.name] = moment(Number(x[item.name]))
    } else {
      // 处理字符串的格式
      x[item.name] = moment(x[item.name])
    }
  }
}
const checkTreeSelectorType = (item, x) => {
  // if slecttree => minxins treeselect
  if (x[item.name] && item.type === Define.COMPTYPE.SELECTTREE) {
    item.treeSelector = x[item.name]
  }
}
export const checkFn = (name, ...params) => {
  const checkList = {
    checkVoidValue,
    checkSensitiveValue,
    checkDateType,
    checkTreeSelectorType
  }
  return checkList[name].apply(this, params)
}
