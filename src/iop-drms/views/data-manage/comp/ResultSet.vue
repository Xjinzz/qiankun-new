<template>
  <div v-if="resultSetStatus">
    <iop-tree
      :rootNode="{show:false}"
      ref="tree"
      :options="treeOption"
      @onSelect="onTreeSelect"
    />
  </div>
</template>
<script>
import IopTree from '@/iop-drms/views/resource-definition/comp/TreeItem'
import Service from '@/iop-drms/service/data-manage/data-manage'

export default {
  components: {
    IopTree
  },
  props: {
    treeUrl: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    itemId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      resultSetStatus: false,
      selecter: null,
      treeOption: {
        getUrl: (key, nodeQuery, node) => {
          // 隐藏全部之后第一次拿到的node为空对象，所以需要兼容判断
          if (!node.id) {
            return this.treeUrl
          } else {
            return node.bh
          }
        }
      }
    }
  },
  methods: {
    clean () {
      this.selecter = null
      this.$refs.tree.cleanSelected()
    },
    onTreeSelect (item) {
      this.selecter = item.data
    },
    save () {
      const params = {
        catalogId: this.selecter.id,
        id: this.itemId,
        objectCode: this.code,
        objectId: this.id
      }
      return Service.saveResource(params)
    },
    reset () {
      // 重置
      this.selecter = null
      this.resultSetStatus = false
      this.$nextTick(() => {
        this.resultSetStatus = true
      })
    }
  }
}
</script>
