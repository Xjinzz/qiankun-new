<template>
  <iop-data-tree
    ref="pubDeptTree"
    maxHeight="600px"
    :url="url"
    :loadQuery="loadQuery"
    :rootNode="{show: false}"
    @onSelect="onSelect"
    :analysis="converterTree"/>
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'PubDeptTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.system.pubDept.tree,
      loadQuery: {},
      state: {
        icon: {
          1: 'jigou',
          9: 'danw',
          0: 'gongwen'
        }
      }
    }
  },
  props: {
    manager: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  created () {
    if (this.manager) {
      this.loadQuery = { manager: 1 }
    } else {
      this.loadQuery = { type: 2 }
    }
  },
  methods: {
    converterTree (treeData) {
      treeData.forEach(item => {
        // if (item.type === ) {
        //   item.icon = 'ren3'
        // } else {
        //   item.icon = 'ren2'
        // }
        item.icon = this.state.icon[item.type] || this.state.icon['9']
      })
      return treeData
    },
    /**
     * 选中树节点
     */
    onSelect ({ key }) {
      this.$emit('onSelect', { key })
    },

    /**
     * 刷新节点
     */
    reloadNode (key = '') {
      this.$refs.pubDeptTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.pubDeptTree.reload()
    }
  }
}
</script>
