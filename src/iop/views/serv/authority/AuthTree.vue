<template>
  <iop-data-tree maxHeight="500px" ref="AuthTree" :url="url" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'AuthTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.system.serv.serviceTree
    }
  },
  created () {
    // console.log(path.system.serv.tree)
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
      this.$refs.AuthTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.AuthTree.reload()
    }
  }
}
</script>
