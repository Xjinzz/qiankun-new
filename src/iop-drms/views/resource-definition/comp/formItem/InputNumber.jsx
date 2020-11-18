import Define from '../../tool/define'
import InputNumberGroup from '../InputNumberGroup'
const Props = {
  data: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    required: true
  }
}
const Render = function (h) {
  const bindValue = {
    on: { ...this.$listeners },
    attrs: { ...this.$attrs }
  }
  /**
   * disabled 应该有几种为true的情况
   * 1、 后台数据返回为 readonly=true的
   * 2、 详情里面
   */
  return (
    <a-form-item label={this.data.title} style="width:100%;">
      <input-number-group
        v-decorator={[this.data.name, { rules: this.$attrs.rules }]}
        { ...bindValue }
        disabled={this.data.readOnly || this.mode === Define.MODE.DETAIL}
      />
    </a-form-item>
  )
}
export default {
  props: Props,
  render: Render,
  components: {
    InputNumberGroup
  }
}
