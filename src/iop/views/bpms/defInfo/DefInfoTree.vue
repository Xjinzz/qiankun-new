<template>
  <data-tree ref="defInfoTree" :url="url" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components/index'
import path from '@/iop/api'

export default {
  name: 'DefInfoTree',
  components: { DataTree: IopDataTree },
  data () {
    return {
      url: path.bpms.definfo.info.getTree
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
      this.$refs.defInfoTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.defInfoTree.reload()
    }
  }
}
</script>
