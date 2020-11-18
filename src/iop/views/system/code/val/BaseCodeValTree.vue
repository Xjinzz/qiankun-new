<template>
  <iop-data-tree maxHeight="500px" ref="codeValTree" :url="url" :loadQuery="loadQuery" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'CodeValTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.system.codeVla.tree,
      loadQuery: {}
    }
  },
  props: {
    codeId: {
      type: String,
      required: true
    }
  },
  created () {
    const { codeId } = this
    this.loadQuery = { codeId }
  },
  methods: {
    onSelect ({ key }) {
      this.$emit('onSelect', { key })
    },

    reloadNode (key = '') {
      this.$refs.codeValTree.reloadNode(key)
    },

    reload () {
      this.$nextTick(() => {
        this.$refs.codeValTree.reload()
      })
    }
  }
}
</script>
