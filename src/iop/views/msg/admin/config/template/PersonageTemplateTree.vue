<template>
  <iop-data-tree maxHeight="500px" ref="templateTree" :url="url" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'PersonageTemplateTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.msg.personageTemplate.tree
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
      this.$refs.templateTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.templateTree.reload()
    }
  }
}
</script>
