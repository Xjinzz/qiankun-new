<template>
  <iop-data-tree
    checkStrictly
    maxHeight="500px"
    :rootNode="rootNode"
    :url="url"
    ref="directoryTree"
    @onSelect="onSelect"
  />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'
export default {
  name: 'DirectoryTree',
  components: { IopDataTree },

  data () {
    return {
      url: path.system.serv.tree,
      rootNode: {
        show: false,
        id: '0'
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
      this.$refs.directoryTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.directoryTree.reload()
    }
  }
}
</script>
