<template>
  <iop-data-tree maxHeight="500px" ref="storesTree" :url="url" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'StoresTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.file.stores.getTree
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
      this.$refs.storesTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.storesTree.reload()
    }
  }
}
</script>
