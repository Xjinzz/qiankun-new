<template>
  <div :style="divStyle">
    <slot name="buttons" v-if="searchable">
      <a-input-search style="margin-bottom: 8px" :placeholder="placeholder" />
    </slot>
    <tree
      v-if="async"
      :showIcon="showIcon"
      :treeData="treeData"
      :replaceFields="replaceFields"
      :checkable="checkable"
      :draggable="draggable"
      :loadData="loadData"
      :selectedKeys="selectedKeys"
      :expandedKeys="expandedKeys"
      :loadedKeys="loadedKeys"
      :checkStrictly="checkStrictly"
      v-model="localCheckedKeys"
      @select="handleSelect"
      @check="handleCheck"
      @expand="handleExpand"
      @load="handleLoaded"
      @drop="handleDrop"
    >
      <a-icon slot="switcherIcon" type="down" />
      <a-icon slot="carry-out" type="carry-out" />
      <a-icon slot="file" type="file" />
    </tree>
    <tree
      v-else
      :treeData="treeData"
      :replaceFields="replaceFields"
      :checkable="checkable"
      :draggable="draggable"
      :checkStrictly="checkStrictly"
      :expandedKeys="expandedKeys"
      :selectedKeys="selectedKeys"
      v-model="localCheckedKeys"
      @select="handleSelect"
      @check="handleCheck"
      @expand="handleExpand"
    >
      <a-icon slot="switcherIcon" type="down" />
      <a-icon slot="carry-out" type="carry-out" />
      <a-icon slot="file" type="file" />
    </tree>
  </div>
</template>
<script>
import { iopDataService } from '@/iop/service/index'
import { Tree } from 'ant-design-vue'

export default {
  name: 'DataTree',
  components: { Tree },
  data () {
    return {
      treeData: [],
      localCheckedKeys: [],
      selectedKeys: [],
      expandedKeys: [],
      loadedKeys: [],
      divStyle: {}
    }
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: '请输入'
    },
    replaceFields: {
      type: Object,
      required: false,
      default: () => {
        return {
          title: 'name',
          key: 'id'
        }
      }
    },
    checkStrictly: {
      type: Boolean,
      required: false,
      default: false
    },
    checkedKeys: {
      type: Array,
      required: false,
      default: () => []
    },
    checkable: {
      type: Boolean,
      required: false,
      default: false
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false
    },
    searchable: {
      type: Boolean,
      required: false,
      default: false
    },
    rootNode: {
      type: Object,
      required: false,
      default: () => { }
    },
    showLine: {
      type: Boolean,
      required: false,
      default: false
    },
    queryName: {
      type: String,
      required: false,
      default: ''
    },
    maxHeight: {
      type: String,
      required: false,
      default: '550px'
    },
    loadQuery: {
      type: Object,
      required: false,
      default: () => {}
    },
    loadNodeQuery: {
      type: Object,
      required: false,
      default: () => {}
    },
    async: {
      type: Boolean,
      required: false,
      default: true
    },
    showIcon: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  created () {
    this.rootOptions = Object.assign(
      {
        show: true,
        title: '全部',
        id: '0',
        levelCode: '',
        icon: 'file'
      },
      this.rootNode)
    this.selectedMap = new Map()
    this.localCheckedKeys = this.checkedKeys
  },
  mounted () {
    this.divStyle = Object.assign({
      overflow: 'auto'
    }, {
      height: this.maxHeight
    })
    this.reloadRoot()
  },
  methods: {
    async loadData (node = {}) {
      if (!node.dataRef) {
        return
      }
      if (this.async) {
        node.dataRef.children = await this.load(node.dataRef[this.replaceFields.key],
          this.loadNodeQuery ? { [this.loadNodeQuery.query]: node.dataRef[this.loadNodeQuery.name] } : {},
          node.dataRef)
        this.treeData = [...this.treeData]
      }
    },

    converter (item) {
      item.isLeaf = item.leaf
      item.slots = { icon: item.isLeaf ? 'carry-out' : 'file' }
      // item.icon = 'icon'
      if (this.checkable) {
        item.disableCheckbox = !item.checkable
        if (item.checked) {
          const key = item[this.replaceFields.key]
          if (!this.localCheckedKeys.includes(key)) {
            this.localCheckedKeys.push(key)
          }
        }
      }
    },

    async load (key = '', nodeQuery = {}, node = {}) {
      const queryName = this.queryName || this.replaceFields.key
      try {
        const { result } = await iopDataService.get({
          url: this.options.getUrl(key, nodeQuery, node),
          params: Object.assign({ [queryName]: key }, this.loadQuery, nodeQuery)
        })
        if (result instanceof Array) {
          result.map(item => { this.converter(item) })
          return result
        } else {
          if (result) {
            this.converter(result)
            return [result]
          } else {
            return []
          }
        }
      } catch (err) {
        this.$message.error(err || '请求错误，请稍后再试')
        return []
      }
    },

    /**
     * function(selectedKeys, e:{selected: bool, selectedNodes, node, event})
     */
    handleSelect (keys, { selected, node, selectedNodes }) {
      this.selectedKeys = keys
      const key = node.dataRef[this.replaceFields.key]
      const { selectedMap } = this

      if (selected) {
        selectedMap.set(key, node)
        this.$emit('onSelect', { key, data: node.dataRef })
      } else {
        selectedMap.delete(key, node)
        this.$emit('onCancelSelect', { key })
      }
      this.selectedMap = selectedMap
    },

    /**
     * function(checkedKeys, e:{checked: bool, checkedNodes, node, event})
     * @todo
     */
    handleCheck (keys, { checked, node }) {
      if (checked) {
        this.localCheckedKeys = keys
        this.$emit('onCheck', { keys, data: node.dataRef })
      } else {
        this.$emit('onCancleCheck', { key: node.dataRef[this.replaceFields.key], data: node.dataRef })
      }
    },

    /**
     * 刷新当前选择的节点
     */
    async reloadSelectedNode () {
      this.collapseNodes(this.expandedKeys)
    },

    /**
     * 重置节点
     */
    async reloadNode (key) {
      this.selectedKeys = [key]
      this.collapseNodes([key])
      const treeNode = this.selectedMap.get(key)
      if (this.async) {
        await this.loadData(treeNode)
      } else {
        this.reloadRoot()
      }

      this.$nextTick(() => {
        this.loadedKeys.push(key)
        this.expandedKeys.push(key)
      })
      this.$emit('onSelect', { key })
    },

    /**
     * 折叠节点
     */
    collapseNodes (keys = []) {
      keys.map(key => {
        [this.expandedKeys, this.loadedKeys].map(values => {
          if (values.includes(key)) {
            values.splice(values.indexOf((value) => value === key), 1)
          }
        })
      })
    },

    /**
     * 刷新根节点
     */
    async reloadRoot () {
      const { key, title } = this.replaceFields
      const { id } = this.rootOptions
      let rootData
      if (this.rootOptions.show) {
        rootData = [{
          [title]: this.rootOptions.title,
          [key]: id,
          slots: { icon: this.rootOptions.icon }
        }]
      } else {
        rootData = await this.load(id)
      }
      this.treeData = rootData
      if (rootData.length > 0) {
        const firstKey = rootData[0][key]
        this.selectedKeys.push(firstKey)

        this.expandedKeys.push(firstKey)
        this.handleSelect([firstKey],
          {
            selected: true,
            node: {
              dataRef: { [key]: firstKey }
            }
          })
      }
    },

    /**
     *
     */
    handleExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
    },

    /**
     * function(loadedKeys, {event, node})
     */
    handleLoaded (loadedKeys) {
      this.loadedKeys = loadedKeys
    },

    reload () {
      this.loadedKeys = []
      this.expandedKeys = []
      this.$nextTick(() => {
        this.reloadRoot()
        this.expandedKeys.push(this.rootOptions.id)
      })
    },

    handleDrop ({ event, node, dragNode, dragNodesKeys }) {
      console.log('handleDrop=========================')
      console.log(event)
      console.log(node)
      console.log(dragNode)
      console.log(dragNodesKeys)
    }
  }

}
</script>
