import { iopDataService } from '@/iop/service/index'
import S from 'ant-design-vue/es/tree-select'
import MessageUtils from '@/utils/message'

export default {
  name: 'DataTreeSelect',
  data () {
    return {
      localLoading: false,
      localTreeData: [],
      localDefaultValue: [],
      localValue: ''
    }
  },
  props: Object.assign(S.props, {
    allowClear: {
      type: Boolean,
      required: false,
      default: true
    },
    url: {
      type: String,
      required: true,
      default: ''
    },
    query: {
      type: String,
      required: false,
      default: 'id'
    },
    loadQuery: {
      type: Object,
      required: false,
      default: () => {}
    },
    async: {
      type: Boolean,
      required: false,
      default: true
    },
    replaceFields: {
      type: Object,
      required: false,
      default: () => {
        return {
          label: 'name',
          value: 'id',
          children: 'children',
          disabled: 'disabled',
          disableCheckbox: 'disableCheckbox',
          selectable: 'selectable',
          isLeaf: 'leaf'
        }
      }
    },
    dropdownStyle: {
      type: Object,
      required: false,
      default: () => {
        return { maxHeight: '400px', overflow: 'auto' }
      }
    },
    selectLeafOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    rootNode: {
      type: Object,
      required: false,
      default: () => {
        return {
          title: '全部',
          id: '0'
        }
      }
    },
    placeHolderSelected: {
      type: Object,
      required: false,
      default: () => {
        return { title: '请选择', value: '', key: '' }
      }
    },
    banSelectable: {
      type: Array,
      required: false,
      default: () => []
    },
    treeSelectStrictly: {
      type: Boolean,
      required: false,
      default: false
    },
    resultConvertor: {
      type: Function,
      required: false,
      default: result => result
    }
  }),
  created () {
    this.resetData()
  },
  methods: {
    resetData () {
      this.localTreeData = [ this.placeHolderSelected ]
      if (!this.value) {
        this.localValue = ''
      }
    },
    convertor (value) {
      if (value instanceof Array) {
        const result = []
        value.map((item) => {
          const record = {}
          const { replaceFields } = this
          for (const attr of Object.keys(replaceFields)) {
            const prop = replaceFields[attr]
            record[attr] = item[prop]
          }
          record.data = item
          result.push(record)
          return item
        })
        return result
      } else {
        console.error('convert error! value should be array')
        return []
      }
    },
    // 获取当前item是否应该被禁用
    _getItemFlag (treeNode, data) {
      // 如果是叶子节点
      if (this.selectLeafOnly && !data.isLeaf) {
        return false
      }
      // 如果包含在ban列表
      if (this.banSelectable.includes(data.value)) {
        return false
      }
      // 如果开启ban透传
      if (this.treeSelectStrictly) {
        return treeNode[this.replaceFields.selectable]
      }
      return true
    },
    async queryData (treeNode = {}) {
      if (!treeNode.dataRef) {
        return
      }
      if (!this.async && treeNode.dataRef.children) {
        return
      }
      this.load(treeNode.dataRef.value ? treeNode.dataRef.value : '0').then((result) => {
        /* add selectable flag start */
        result = this.resultConvertor(result)
        // 在这里进行判断，如果是当前已经经过后台/前台设置过selectable则遵循设置的，如果没有设置则会进行selectLeafOnly/banSelectable
        if (this.selectLeafOnly || this.banSelectable.length) {
          result.map((item) => {
            item.selectable = item[this.replaceFields.selectable] !== undefined ? item[this.replaceFields.selectable] : this._getItemFlag(treeNode, item)
            return item
          })
        }
        /* add selectable flag end */
        treeNode.dataRef.children = result
        this.localTreeData = [ ...this.localTreeData ]
      })
    },
    async load (key = '0') {
      try {
        const { result } = await iopDataService.get({
          url: this.url,
          params: Object.assign({ [this.query]: key }, this.loadQuery)
        })
        if (result instanceof Array) {
          return this.convertor(result)
        } else {
          return result ? this.convertor([ result ]) : []
        }
      } catch (err) {
        MessageUtils.error(err)
        return []
      }
    },
    setSelected ({ title = '', value = '' }) {
      if (value) {
        const { localTreeData } = this
        if (value === '0' && !title) {
          title = this.rootNode.title
        }
        this.localTreeData = [ { title, value, key: value, isLeaf: true }, localTreeData[localTreeData.length - 1] ]
        this.localValue = value
        this.onChange(value)
      } else {
        this.cleanSelected()
      }
    },
    cleanSelected () {
      const { localTreeData } = this
      if (localTreeData.length > 0) {
        this.localTreeData = [ localTreeData[localTreeData.length - 1] ]
      }
      this.onChange('')
    },
    onChange (key, label, extra) {
      this.localValue = key
      const data = extra
        ? extra.triggerNode ? (extra.triggerNode.dataRef ? extra.triggerNode.dataRef.data : {}) : {}
        : {}
      this.$emit('change', key)
      this.$emit('onSelect', { key, data })
      // this.$emit('vModel', key)
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
      } else if (k !== 'loadData') {
        this[k] && (props[k] = this[k])
      } else {
        props[k] = this.queryData
      }
      return props[k]
    })
    const listeners = { on: {} }
    for (const p of Object.keys(this.$listeners)) {
      if (p !== 'change') {
        listeners.on[p] = this.$listeners[p]
      }
    }
    return <a-tree-select {...{ props }} {...listeners} onChange={this.onChange} />
  }
}
