import reg from './reg'
import Define from '../../tool/define'
function getRule (x) {
  const result = []
  // 非input只需要校验必填
  x.required && result.push({ required: true, whitespace: true, message: '该字段必须填写' })
  if (x.type === Define.COMPTYPE.INPUT) {
    x.numberValue && result.push({ pattern: reg.decimals, message: '格式应为正整数（不包含+）' })
    x.dateValue && result.push({ pattern: reg.date, message: '格式应为日期类型' })
    // 后端自定义校验
    x.regular && result.push({ pattern: x.regular, message: x.regularMsg })
  }
  return result
}
export default getRule
