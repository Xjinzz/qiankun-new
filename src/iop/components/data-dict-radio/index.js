import { iopCodeService } from '@/iop/service/index'
import Group from 'ant-design-vue/es/radio/Group'

export default {
  name: 'DataDictCheckbox',
  data () {
    return {
      localOptions: [],
      localValue: ''
    }
  },
  props: Object.assign({}, Group.props, {
    type: {
      type: String,
      required: true
    }
  }),
  created () {
    this.load()
  },
  methods: {
    load () {
      if (this.type.length > 0) {
        iopCodeService.getDict(this.type).then((res) => {
          if (res && res instanceof Array) {
            const options = []
            res.map((code) => {
              options.push({ value: code.code, label: code.name, disabled: code.disabled })
              return code
            })
            this.localOptions = options
          }
        })
      }
    },
    onChange (value) {
      this.localValue = value
      this.$emit('change', value)
    },
    cleanChecked () {
      this.localValue = ''
      this.onChange('')
    }
  },
  render () {
    const props = {}

    Object.keys(Group.props).map((k) => {
      if (k !== 'options') {
        this[k] && (props[k] = this[k])
        return props[k]
      } else {
        props[k] = this.localOptions
        return props[k]
      }
    })

    const listeners = { on: {} }
    for (const p of Object.keys(this.$listeners)) {
      if (p !== 'change') {
        listeners.on[p] = this.$listeners[p]
      }
    }

    return <a-radio-group {...{ props }} {...listeners} onChange={this.onChange} />
  }
}
