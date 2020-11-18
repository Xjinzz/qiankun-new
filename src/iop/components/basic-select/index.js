
/**
 * @description 封装的selct组件
 * 支持官方所有slot
 * 支持官方所有事件
 * 支持官方select option的value/disabled（其余对于咱们项目没有用处，不支持）
 * 支持自动请求！
 * 95%还原官方功能
 * 支持对ajax返回数据进行处理
 * 支持自定义label/value的字段
 * update By jinzz
 */
import { iopDataService } from '@/iop/service/index'
function checkVoid (val) {
  return val === undefined || val === null
}
export default {
  name: 'BasicSelect',
  props: {
    /**
     * @description select配置
     * @example
     *  {
     *    url: '',
     *    url: () => { return '/a/b' },
     *    labelKey: 'label',
     *    valueKey: 'value',
     *    disabledKey: 'disabled'
     *    voidSelected: { label:  '请选择', value: ''},
     *    hideVoidSelected: false
     *    analysis: (dataSource) => { return dataSource }
     *  }
     */
    select: {
      type: Object,
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
      // 内部双向数据绑定的值
      localValue: '',
      // 内部loading状态
      localLoading: false,
      // 数据源
      dataSource: []
    }
  },
  computed: {
    // 动态判断是不是多选
    multiple () {
      return this.$attrs.mode && this.$attrs.mode !== 'default'
    },
    // 获取url
    dataUrl () {
      const url = this.select.url
      if (url instanceof Function) {
        return url()
      }
      if (typeof url === 'string') {
        return url
      }
      console.error('url必须填写，且只能是函数或者字符串')
      return ''
    },
    // 获取给用户展示的值的key
    labelKey () {
      return this.select.labelKey || 'label'
    },
    // 获取用于双向数据绑定的值的key
    valueKey () {
      return this.select.valueKey || 'value'
    },
    // 获取用于item option 的禁用状态的key
    disabledKey () {
      return this.select.disabledKey || 'disabled'
    },
    // 是否隐藏自带的第一项（请选择/全部这类）
    hideVoidSelected () {
      return this.select.hideVoidSelected || false
    },
    // 自带的第一项配置
    voidSelected () {
      const voidSelected = this.select.voidSelected || {}
      // 修复兼容漏写label/value的情况
      return Object.assign(voidSelected, {
        [this.labelKey]: voidSelected[this.labelKey] || '请选择',
        [this.valueKey]: voidSelected[this.valueKey] || '',
        [this.disabledKey]: voidSelected[this.disabledKey] || true
      })
    }
  },
  watch: {
    localValue (val) {
      // 修正用户监听change时候会多返回一次undefined
      if (checkVoid(val)) {
        this.localValue = this._getDefaultValue()
        return
      }
      this.$emit('input', val)
      this.$emit('change', val)
    },
    value: {
      handler (val) {
        if (checkVoid(val)) {
          val = this._getDefaultValue()
        }
        this.setSelected(val)
      },
      immediate: true
    },
    // 监听dataUrl变化，一旦变化触发获取数据源
    dataUrl: {
      handler () {
        this._getDataSource()
      },
      immediate: true
    }
  },
  methods: {
    // 获取默认项返回值 - 对内方法
    _getDefaultValue () {
      if (this.multiple) {
        return []
      }
      return this.hideVoidSelected ? '' : this.voidSelected[this.valueKey]
    },
    // 添加初始选中项 - 对内方法
    _addVoidSelected (dataSource) {
      if (this.hideVoidSelected) return
      dataSource.unshift(this.voidSelected)
    },
    // 获取数据源的ajax方法 - 对内方法
    async _doAjax () {
      this.localLoading = true
      const { result } = await iopDataService.get({
        url: this.dataUrl
      })
      this.localLoading = false
      return result
    },
    // 获取数据源 - 对内方法
    async _getDataSource () {
      this.dataSource = []
      if (this.dataUrl) {
        const data = await this._doAjax()
        const analysis = this.select.analysis
        const dataSource = (analysis && analysis instanceof Function) ? analysis(data) : data
        this._setDataSource(dataSource)
      }
    },
    // 设置数据源方法 - 对内方法
    _setDataSource (dataSource) {
      this._addVoidSelected(dataSource)
      this.dataSource = dataSource
    },
    // 设置绑定值 - 对外方法
    setSelected (val) {
      this.localValue = val
    },
    // 清除绑定值 - 对外方法
    cleanSelected () {
      this.localValue = this.hideVoidSelected ? '' : this.voidSelected[this.valueKey]
    }
  },
  render () {
    // 获取原始的selectOption
    const getItemsByDataSource = (dataSource) => {
      return this.$scopedSlots.default ? this.$scopedSlots.default({
        dataSource: this.dataSource
      }) : dataSource.map(item => {
        return (
          <a-select-option
            value={ item[this.valueKey] }
            disabled={ item[this.disabledKey] }
          >
            { item[this.labelKey] }
          </a-select-option>
        )
      })
    }
    // 删除json内包含数组内的key，不影响原json
    const deleteItemByJson = (json, exclude = []) => {
      const copyJson = JSON.parse(JSON.stringify(json))
      exclude.forEach(x => {
        copyJson[x] && delete copyJson[x]
      })
      return copyJson
    }
    // 修改官方的默认值
    const props = Object.assign({
      allowClear: true,
      loading: this.localLoading
    }, this.$attrs)
    // 本组件对外的事件，需要在提交前删除
    const excludeListeners = ['change', 'input']
    // 本组件对外的slot，需要在提交前删除
    const excludeSlots = ['default']
    const Items = getItemsByDataSource(this.dataSource)
    return (
      <a-select { ...{
        props,
        on: deleteItemByJson(this.$listeners, excludeListeners),
        scopedSlots: deleteItemByJson(this.$scopedSlots, excludeSlots)
      } } v-model={this.localValue}>
        {
          Items
        }
      </a-select>
    )
  }
}
