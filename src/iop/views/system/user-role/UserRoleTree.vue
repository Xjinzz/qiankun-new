<template>
  <iop-data-tree
    maxHeight="500px"
    :rootNode="rootNode"
    ref="userRoleTree"
    :url="url"
    @onSelect="onSelect"
  />
</template>
<script>
import { IopDataTree } from '@/iop/components'
export default {
  name: 'UserRoleTree',
  components: { IopDataTree },
  props: {
    url: {
      type: String,
      required: true
    },
    rootNode: {
      type: Object,
      required: false,
      default: () => { }
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
      this.$refs.userRoleTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.userRoleTree.reload()
    }
  }
}
</script>
