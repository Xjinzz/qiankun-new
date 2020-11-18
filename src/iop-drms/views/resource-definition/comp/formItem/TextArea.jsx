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
  return (
    <a-form-item label={this.data.title} style="min-height:100px">
      <a-textarea
        placeholder={this.data.placeholder}
        v-decorator={[this.data.name, { rules: this.$attrs.rules }]}
        { ...bindValue }
        disabled={this.data.readOnly || this.mode === Define.MODE.DETAIL}
        autosize={false}
        rows={4}
      />
    </a-form-item>
  )
}
export default {
  props: Props,
  render: Render
}
