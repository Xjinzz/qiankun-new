<template>
  <div class="data-tree" :style="divStyle">
    <slot name="buttons" v-if="searchable">
      <a-input-search style="margin-bottom: 8px" :placeholder="placeholder" />
    </slot>
    <!-- 异步 -->
    <tree
      v-if="async"
      :showLine="showLine"
      :showIcon="showIcon"
      :treeData="treeData"
      :replaceFields="replaceFields"
      :checkable="checkable"
      :draggable="draggerOption.enable"
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
      <template #custom="item">
        <template v-if="rightClick && item[replaceFields.key] !== rootOptions.id">
          <a-dropdown :trigger="['contextmenu']">
            <tree-title :icon="item.icon" :folder="!!!item.leaf" :iconType="item.iconType">
              {{ item[replaceFields.title] }}
            </tree-title>
            <a-menu slot="overlay" v-if="rightClick">
              <slot name="actions" :node="item">
                <a-menu-item @click="handleAction('create', item)">
                  <a-icon type="plus" />添加子节点
                </a-menu-item>
                <a-menu-item @click="handleAction('edit', item)">
                  <a-icon type="edit" />编辑
                </a-menu-item>
                <a-menu-item @click="handleAction('remove', item)">
                  <a-icon type="delete"/>删除
                </a-menu-item>
              </slot>
            </a-menu>
          </a-dropdown>
        </template>
        <template v-else>
          <tree-title :icon="item.icon" :folder="!!!item.leaf" :iconType="item.iconType">
            {{ item[replaceFields.title] }}
          </tree-title>
        </template>
      </template>
    </tree>
    <!-- 同步 -->
    <tree
      v-else
      :treeData="treeData"
      :replaceFields="replaceFields"
      :checkable="checkable"
      :draggable="draggerOption.enable"
      :checkStrictly="checkStrictly"
      :expandedKeys="expandedKeys"
      :selectedKeys="selectedKeys"
      :showLine="showLine"
      v-model="localCheckedKeys"
      @select="handleSelect"
      @check="handleCheck"
      @expand="handleExpand"
      @drop="handleDrop"
    >
      <template #custom="item">
        <template v-if="rightClick && item[replaceFields.key] !== rootOptions.id">
          <a-dropdown :trigger="['contextmenu']">
            <tree-title :icon="item.icon" :folder="!!!item.leaf">
              {{ item[replaceFields.title] }}
            </tree-title>
            <a-menu slot="overlay" v-if="rightClick">
              <slot name="actions" :node="item">
                <a-menu-item @click="handleAction('create', item)">
                  <a-icon type="plus" />添加子节点
                </a-menu-item>
                <a-menu-item @click="handleAction('edit', item)">
                  <a-icon type="edit" />编辑
                </a-menu-item>
                <a-menu-item @click="handleAction('remove', item)">
                  <a-icon type="delete"/>删除
                </a-menu-item>
              </slot>
            </a-menu>
          </a-dropdown>
        </template>
        <template v-else>
          <tree-title :icon="item.icon" :folder="!!!item.leaf" :iconType="item.iconType">
            {{ item[replaceFields.title] }}
          </tree-title>
        </template>
      </template>
    </tree>
  </div>
</template>
<script>
import { iopDataService } from '@/iop/service/index'
import { Tree } from 'ant-design-vue'
import TreeTitle from './TreeTitle'
import MessageUtils from '@/utils/message'

export default {
  name: 'DataTree',
  components: { Tree, TreeTitle },
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
    placeholder: {
      type: String,
      required: false,
      default: '请输入'
    },
    url: {
      type: String,
      required: true
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
    dragger: {
      type: Object,
      required: false,
      default: () => {}
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
      default: true
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
    },
    defaultSelectedKey: {
      type: String,
      required: false,
      default: ''
    },
    rightClick: {
      type: Boolean,
      required: false,
      default: false
    },
    analysis: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  watch: {
    defaultSelectedKey (value) {
      this.selectedKeys = [value]
    }
  },
  created () {
    this.configRootNode()
    this.draggerOption = Object.assign(
      {
        enable: false,
        queryName: 'parentId'
      },
      this.dragger)
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
          this.loadNodeQuery ? { [this.loadNodeQuery.query]: node.dataRef[this.loadNodeQuery.name] } : {})
        this.treeData = [...this.treeData]
      }
    },

    converter (item) {
      item.isLeaf = item.leaf
      item.scopedSlots = { title: 'custom' }
      item.slots = { icon: item.icon ? item.icon : (item.isLeaf ? 'carry-out' : 'file') }
      // item.icon = 'icon'
      if (this.checkable) {
        item.disableCheckbox = !item.checkable
        if (item.checked) {
          // 这里需要等待视图（即绑定的树节点）渲染完毕
          this.$nextTick(() => {
            const key = item[this.replaceFields.key]
            if (!this.localCheckedKeys.includes(key)) {
              this.localCheckedKeys.push(key)
            }
          })
        }
      }
      if (item.children && item.children.length > 0) {
        for (const child of item.children) {
          this.converter(child)
        }
      }
    },

    async load (key = '', nodeQuery = {}) {
      const queryName = this.queryName || this.replaceFields.key
      try {
        const { result } = await iopDataService.get({
          url: this.url,
          params: Object.assign({ [queryName]: key }, this.loadQuery, nodeQuery)
        })
        const analysisResult = this.analysis(result) || result
        if (analysisResult instanceof Array) {
          for (const item of analysisResult) {
            this.converter(item)
          }
          return analysisResult
        } else {
          if (analysisResult) {
            this.converter(analysisResult)
            return [analysisResult]
          } else {
            return []
          }
        }
      } catch (err) {
        MessageUtils.error(err)
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
      if (!(keys instanceof Array)) {
        keys = keys.checked
      }
      this.localCheckedKeys = keys
      if (checked) {
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
      if (key === this.rootOptions.id) {
        this.reload()
      } else {
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
        this.$emit('onSelect', { key, data: treeNode.dataRef })
      }
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
          return values
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
        const firstKey = this.defaultSelectedKey || rootData[0][key]
        const firstItem = this.__findItemByPrimaryKey(rootData, firstKey)
        this.selectedKeys.push(firstKey)

        this.expandedKeys.push(rootData[0][key])
        this.handleSelect([firstKey],
          {
            selected: true,
            node: {
              dataRef: firstItem
            }
          })
      }
    },
    /*
    * @desc 根据主键获取array中的完整一项
    */
    __findItemByPrimaryKey (array, id) {
      const { key } = this.replaceFields
      let node = {
        [key]: id
      }
      try {
        array.forEach(x => {
          if (x[key] === id) {
            node = x
            throw new Error()
          }
        })
      } catch (e) {}
      return node
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

    async handleDrop ({ event, node, dragNode, dragNodesKeys }) {
      const url = this.draggerOption.url || this.url
      const source = dragNode.dataRef.id
      const target = node.dataRef.id
      try {
        await iopDataService.put({
          url: `${url}/${source}`,
          params: {
            [this.draggerOption.queryName]: target
          }
        })
        MessageUtils.success()
        this.$emit('onDragger', { source, target })
        this.reload()
      } catch (err) {
        MessageUtils.error(err)
      }
    },

    /**
     * 设置选择节点
     */
    setCheckedKeys (checkedKeys = []) {
      this.localCheckedKeys = checkedKeys
    },

    /**
     * 触发事件
     */
    handleAction (name = '', data = {}) {
      this.$emit('onAction',
        {
          name: `on${name.substring(0, 1).toUpperCase()}${name.substring(1)}`,
          key: data[this.replaceFields.key],
          data
        })
    },

    /**
     * 设置根节点
     */
    configRootNode (options = {}) {
      this.rootOptions = Object.assign(
        {
          show: true,
          title: '全部',
          id: '0',
          levelCode: '',
          icon: 'file'
        },
        this.rootNode,
        options)
    }
  }

}
</script>
<style lang="less" scoped>
  .data-tree /deep/ .ant-tree li span.ant-tree-switcher.ant-tree-switcher-noop {
    display: none;
  }
  // 移入样式
  /deep/ .ant-tree li .ant-tree-node-content-wrapper:hover {
    .treeTitle {
      background: transparent!important;
      /deep/ ._title_icon-file {
        background: transparent!important;
        height:24px;
        line-height: 24px;
      }
    }
  }
  // 选中样式
  /deep/ .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    /deep/ .treeTitle {
      background: transparent!important;
      ._title_icon-file {
        background: transparent!important;
        height:24px;
        line-height: 24px;
      }
    }
  }
</style>
