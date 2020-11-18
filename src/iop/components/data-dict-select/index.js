/**
 * @description 封装的字典组件
 * 支持和原字典组件相同功能
 * @author jinzz
 */
import iopBasicSelect from '@/iop/components/basic-select'
import path from '@/iop/api/index'
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: String | Number | Array,
      required: false,
      initialValue: ''
    }
  },
  data () {
    return {
      localValue: ''
    }
  },
  watch: {
    localValue (val) {
      this.$emit('change', val)
      this.$emit('input', val)
    },
    value: {
      handler (val) {
        this.localValue = val
      },
      immediate: true
    }
  },
  components: {
    iopBasicSelect
  },
  methods: {
    cleanSelected () {
      this.localValue = ''
    },
    setSelected (val) {
      this.localValue = val
    }
  },
  render () {
    // 删除json内包含数组内的key，不影响原json
    const deleteItemByJson = (json, exclude = []) => {
      const copyJson = JSON.parse(JSON.stringify(json))
      exclude.forEach(x => {
        copyJson[x] && delete copyJson[x]
      })
      return copyJson
    }
    const opt = {
      url: `${path.system.code.dict}/${this.type}`,
      labelKey: 'name',
      valueKey: 'code'
    }
    const props = Object.assign({
      allowClear: false
    }, this.$attrs)
    // 本组件对外的事件，需要在提交前删除
    const excludeListeners = ['change', 'input']
    return (
      <iop-Basic-Select
        { ...{
          props,
          on: deleteItemByJson(this.$listeners, excludeListeners),
          scopedSlots: this.$scopedSlots,
          attrs: this.$attrs
        } }
        select={ opt }
        v-model={ this.localValue }
      />
    )
  }
}
