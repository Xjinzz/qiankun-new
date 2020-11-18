<template>
  <iop-data-tree ref="catalogTree" :loadQuery="{ catalogType }" :url="url" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop-drms/api'

export default {
  name: 'CatalogTree',
  components: { IopDataTree },
  props: {
    catalogType: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      url: path.manage.catalog.asynTree
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
      this.$refs.catalogTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.catalogTree.reload()
    }
  }
}
</script>
