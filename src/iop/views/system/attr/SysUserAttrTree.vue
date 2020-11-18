<template>
  <iop-data-tree ref="sysUserAttrTree" :url="url" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'SysUserAttrTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.system.userAttr.tree
    }
  },
  methods: {
    /**
     * 选中树节点
     */
    onSelect () {
      this.$emit('onSelect', ...arguments)
    },

    /**
     * 刷新节点
     */
    reloadNode (key = '') {
      if (!key) {
        this.$refs.sysUserAttrTree.reload()
      } else {
        this.$refs.sysUserAttrTree.reloadNode(key)
      }
    }
  }
}
</script>
