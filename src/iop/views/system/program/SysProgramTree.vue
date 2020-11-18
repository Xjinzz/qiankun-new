<template>
  <iop-data-tree
    ref="sysProgramTree"
    :url="url"
    :queryName="queryName"
    :dragger="dragger"
    @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'SysProgramTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.system.program.tree,
      queryName: 'id',
      dragger: {
        enable: true,
        url: path.system.program.moveTree
      }
    }
  },
  methods: {
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
      this.$refs.sysProgramTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.sysProgramTree.reload()
    }
  }
}
</script>
