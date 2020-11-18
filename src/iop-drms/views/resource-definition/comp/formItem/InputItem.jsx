import Define from '../../tool/define'
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
  /**
   * hidden的应该有几种为true的情况
   * 1、hidden为true的 且attr没有传来type的 同时存在会选择外面传入的（pass）
   */
  const type = this.data.hidden ? 'hidden' : 'input'
  // 脱敏由赋值时候进行操作
  return (
    <a-form-item label={this.data.title}>
      <a-input
        type={type}
        v-decorator={[this.data.name, { rules: this.$attrs.rules }]}
        placeholder={this.data.placeholder}
        { ...bindValue }
        disabled={this.data.readOnly || this.mode === Define.MODE.DETAIL}
      />
    </a-form-item>
  )
}
export default {
  props: Props,
  render: Render
}
