<template>
  <iop-data-tree ref="ProgramAuditTree" :url="url" @onSelect="onSelect" :queryName="queryName" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'ProgramAuditTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.system.program.tree,
      queryName: 'id'
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
      this.$refs.ProgramAuditTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.ProgramAuditTree.reload()
    }
  }
}
</script>
