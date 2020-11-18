import { IOP_BASE_CODE_TREE } from '@/iop/constants/index'
import { iopCodeService } from '@/iop/service/index'
import S from 'ant-design-vue/es/select'

export default {
  name: 'DataDictSelect',
  data () {
    return {
      localLoading: false,
      localOptions: [],
      localValue: '',
      localDefaultValue: '',
      isTree: false
    }
  },
  props: Object.assign({}, S.props, {
    type: {
      type: String,
      required: true
    },
    allowClear: {
      type: Boolean,
      required: false,
      default: true
    }
  }),
  watch: {
    type () {
      this.load()
    },
    localValue (selected) {
      this.setSelected(selected)
      this.$emit('input', selected)
    }
  },
  async mounted () {
    await this.load()
    if (this.value) {
      await this.setSelected(this.value)
    }
    // else {
    //   await this.setSelected('')
    // }
  },
  methods: {
    async load () {
      if (this.type.length > 0) {
        this.localOptions = []
        const { localOptions } = this
        // if (!value) {
        localOptions.push({ value: '', label: '请选择' })
        // }
        this.localLoading = true
        const result = await iopCodeService.getDict(this.type)
        if (result && result instanceof Array) {
          const options = []
          result.map((code) => {
            options.push({ value: code.code, label: code.name, disabled: code.disabled })
            return code
          })
          localOptions.push(...options)
        }
        this.localLoading = false
        this.localOptions = localOptions
        if (this.value) {
          this.onChange(this.value)
        }
      }
    },
    onChange (value) {
      this.localValue = value
      this.$emit('change', value)
    },
    async setSelected (value) {
      if (this.localOptions.length === 1 && !this.localLoading) {
        await this.load()
      }
      this.localValue = value
      if (!this.localLoading) {
        for (const item of this.localOptions) {
          if (item.value === value) {
            this.onChange(value)
            return
          }
        }
      }
    },
    cleanSelected () {
      this.localValue = ''
      this.onChange('')
    },
    getCodeDetail () {
      iopCodeService.getDetailByCode(this.type).then((res) => {
        this.isTree = res.codeType === IOP_BASE_CODE_TREE.code
      })
    }
  },
  render () {
    const props = {}
    const localKeys = Object.keys(this.$data)

    Object.keys(S.props).map((k) => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })

    const listeners = { on: {} }
    for (const p of Object.keys(this.$listeners)) {
      if (p !== 'change') {
        listeners.on[p] = this.$listeners[p]
      }
    }

    return <a-select {...{ props }} {...listeners} onChange={this.onChange} v-model={this.localValue} />
  }
}
