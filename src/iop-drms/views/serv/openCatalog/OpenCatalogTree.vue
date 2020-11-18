<template>
  <iop-data-tree
    max-height="758px"
    :rootNode="rootNode"
    :url="url"
    :defaultSelectedKey="defaultSelectedKey"
    @onSelect="onSelect"
    :queryName="queryName"
    :async="false"
  />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop-drms/api'

export default {
  name: 'CatalogTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.server.openData.tree,
      queryName: 'id',
      rootNode: {
        show: false
      },
      defaultSelectedKey: ''
    }
  },
  methods: {
    /**
     * 选中树节点
     */
    onSelect ({ key }) {
      this.$parent.showData(key)
    },

    /**
     * 刷新节点
     */
    reloadNode (key = '') {
      this.$refs.roleTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.roleTree.reload()
    }
  }
}
</script>
<style scoped>
</style>
