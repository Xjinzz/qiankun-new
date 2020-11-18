<template>
  <iop-data-tree
    v-if="treeChange"
    maxHeight="500px"
    ref="catalogsFilesTree"
    :url="url"
    @onSelect="onSelect"
    :loadQuery="loadQuery"
    :queryName="'parentId'"
    :rootNode="rootNode"
  />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'CatalogsFilesTree',
  components: { IopDataTree },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      url: path.file.manage.tree,
      loadQuery: {
        ctlgId: this.id
      },
      rootNode: {
        id: this.id
      },
      treeChange: true
    }
  },
  watch: {
    id (val) {
      this.rootNode = {
        id: val
      }
      this.treeChange = false
      this.$nextTick(() => {
        this.treeChange = true
      })
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
      this.$refs.catalogsFilesTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.catalogsFilesTree.reload()
    }
  }
}
</script>
