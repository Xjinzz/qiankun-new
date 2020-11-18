<template>
  <iop-data-tree maxHeight="500px" ref="contactTree" :url="url" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'ContactTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.msg.contact.tree
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
      this.$refs.contactTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.contactTree.reload()
    }
  }
}
</script>
