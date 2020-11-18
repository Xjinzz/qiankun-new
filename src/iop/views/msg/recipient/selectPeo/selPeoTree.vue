<template>
  <iop-data-tree ref="CatalogTree" :url="url" :rootNode="rootNode" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'BaseCodeClaTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.msg.contactUser.tree,
      rootNode: {
        show: false
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
      this.$refs.CatalogTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.CatalogTree.reload()
    }
  }
}
</script>
