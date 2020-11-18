<template>
  <iop-data-tree
    ref="bindingTree"
    :url="url"
    :loadQuery="loadQuery"
    @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'BindingTree',
  components: { IopDataTree },
  props: {
    appId: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      url: path.system.program.tree,
      dragger: {
        enable: true,
        url: path.system.program.moveTree
      },
      /** 除了主键之外参数 */
      loadQuery: {
        currentLoginAppId: ''
      }
    }
  },
  watch: {
    'appId' (newId, o) {
      if (newId !== '') {
        this.loadQuery.currentLoginAppId = newId
      }
    }
  },
  created () {
    this.loadQuery.currentLoginAppId = this.appId
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
      this.$refs.bindingTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.bindingTree.reload()
    }
  }
}
</script>
