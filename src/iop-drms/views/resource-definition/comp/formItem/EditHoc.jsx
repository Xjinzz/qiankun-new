/**
 * @description editHoc 传入数据即可 返回一条表单项
 * @author jinzz
 * @var 根据data.type返回一个需要的formitem
 * 1. 普通输入框
 * 2. 密码输入框
 * 3. 日期时间选择器
 * 7. 字典下拉
 * 8. 日期选择器
 * 9. 数据资源对象
 * @var 会根据mode从这里进行区分是否是需要校验需要校验的为
 * create\edit\detail
 * @var 几种rule
 * required ：必填写 （所有item都支持）
 * numberValue ：是否是数字（仅input）
 * dateValue ： 是否是日期格式（仅input）
 * regular：自定义正则(仅正则)
 * @returns { Component }
 * @update 更新 优化不同类型组件处理方案 By jinzz
 */
import Input from './InputItem'
import InputNumber from './InputNumber'
import TextArea from './TextArea'
import Date from './Date'
import DATEGROUP from './DateGroup'
import SelectDict from './SelectDict'
import SelectTree from './SelectTree'
import getRule from './rule'
import Define from '../../tool/define'
import idSeed from '../../tool/idSeed'
/** ****************** 数据依赖超类 Start ********************/
/**
 * @description 设置attrs
 */
function bindAttrs () {
  this.$set(this.$attrs, ...arguments)
}
/**
 * @description 获取组件增加自定义属性
 */
function strategy () {
  return {
    [Define.COMPTYPE.PASSWORD] () {
      bindAttrs.apply(this, ['type', 'password'])
    },
    [Define.COMPTYPE.DATE] () {
      bindAttrs.apply(this, ['showTime', false])
    },
    [Define.COMPTYPE.DATETIME] () {
      bindAttrs.apply(this, ['showTime', true])
    }
  }
}
/** ****************** 数据依赖超类 End ********************/
const Props = {
  data: {
    type: Object,
    required: true
  },
  // 标记是search表单还是form表单
  mode: {
    type: String,
    required: true
  }
}
const Methods = {
  reset () {
    if (this.$refs['HOC-' + this.data.symbalId].reset) {
      this.$refs['HOC-' + this.data.symbalId].reset()
    }
  }
}
const Render = function (h) {
  const mapList = {
    [Define.COMPTYPE.INPUTNUMBER]: InputNumber,
    [Define.COMPTYPE.INPUT]: Input,
    [Define.COMPTYPE.PASSWORD]: Input,
    [Define.COMPTYPE.TEXTAREA]: TextArea,
    [Define.COMPTYPE.DATETIME]: Date,
    [Define.COMPTYPE.DATE]: Date,
    [Define.COMPTYPE.DATEGROUP]: DATEGROUP,
    [Define.COMPTYPE.DATETIMEGROUP]: DATEGROUP,
    [Define.COMPTYPE.SELECTDICT]: SelectDict,
    [Define.COMPTYPE.SELECTTREE]: SelectTree
  }
  // 通过attrs 透传rules
  let rules = []
  // 判断是新建 、 修改 、详情都需要rule
  if (this.mode === Define.MODE.CREATE || this.mode === Define.MODE.EDIT || this.mode === Define.MODE.DETAIL) {
    rules = getRule(this.data)
  }
  bindAttrs.apply(this, ['rules', rules])
  // 获取自定义属性方法集合
  const strategyMap = strategy()
  // 增加自定义属性
  strategyMap[this.data.type] && strategyMap[this.data.type].call(this)
  // 增加数据唯一id
  this.data.symbalId = idSeed.newId()
  // 透传事件属性props
  return h(mapList[this.data.type], {
    ref: 'HOC-' + this.data.symbalId,
    on: this.$listeners,
    props: this.$props,
    scopedSlots: this.$scopedSlots,
    attrs: this.$attrs
  })
}

export default {
  props: Props,
  render: Render,
  methods: Methods
}
