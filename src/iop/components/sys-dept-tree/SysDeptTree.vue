<template>
  <iop-data-tree ref="sysDeptTree" :url="url" :loadQuery="loadQuery" :rootNode="{show: false}" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '../index'
import path from '@/iop/api'

export default {
  name: 'SysDeptTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.system.dept.tree,
      loadQuery: {}
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
    /**
     * 选中树节点
     */
    onSelect ({ key, data }) {
      this.$emit('onSelect', { key, data })
    },

    /**
     * 刷新节点
     */
    reloadNode (key = '') {
      this.$refs.sysDeptTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.sysDeptTree.reload()
    }
  }
}
</script>
