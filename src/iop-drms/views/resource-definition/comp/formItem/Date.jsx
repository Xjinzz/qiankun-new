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
  const showTime = this.$attrs.showTime || false
  const format = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  return (
    <a-form-item label={this.data.title}>
      <a-date-picker
        style="width:100%"
        v-decorator={[this.data.name, { rules: this.$attrs.rules }]}
        show-time={showTime}
        format={format}
        placeholder={this.data.placeholder}
        disabled={this.data.readOnly || this.mode === Define.MODE.DETAIL}
        { ...bindValue }
      />
    </a-form-item>
  )
}
export default {
  props: Props,
  render: Render
}
