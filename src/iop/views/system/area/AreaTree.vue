<template>
  <iop-data-tree maxHeight="500px" ref="areaTree" :url="url" @onSelect="onSelect" :dragger="dragger"/>
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'AreaTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.system.area.tree,
      dragger: {
        enable: true,
        url: path.system.area.moveTree
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
      this.$refs.areaTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.areaTree.reload()
    }
  }
}
</script>
