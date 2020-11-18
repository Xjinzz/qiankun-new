<template>
  <iop-data-tree
    maxHeight="500px"
    ref="roleTree"
    :queryName="queryName"
    :url="url"
    :rootNode="rootNode"
    @onSelect="onSelect"
  />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'RoleTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.system.role.deptTree,
      queryName: 'parentId',
      rootNode: {
        show: false
      }
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
