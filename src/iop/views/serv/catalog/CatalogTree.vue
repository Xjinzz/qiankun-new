<!--
 * @Author: your name
 * @Date: 2020-03-25 11:50:47
 * @LastEditTime: 2020-03-25 11:55:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \plat-iop-parent-vue\src\iop\views\serv\catalog\ServTree.vue
 -->
<template>
  <iop-data-tree maxHeight="500px" ref="servTree" :url="url" @onSelect="onSelect" />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'ServTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.system.serv.tree
    }
  },
  created () {
    // console.log(path.system.serv.tree)
  },
  methods: {
    /**
     * 选中树节点
     */
    onSelect (treeItem) {
      this.$emit('onSelect', treeItem)
    },

    /**
     * 刷新节点
     */
    reloadNode (key = '') {
      this.$refs.servTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.servTree.reload()
    }
  }
}
</script>
