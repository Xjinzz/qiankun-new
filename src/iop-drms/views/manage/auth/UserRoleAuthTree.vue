<template>
  <iop-data-tree
    :rootNode="rootNode"
    ref="userRoleAuthTree"
    :url="url"
    @onSelect="onSelect"
  />
</template>
<script>
import { IopDataTree } from '@/iop/components'
import path from '@/iop-drms/api'

export default {
  /** 角色管理树 或 单位管理树 */
  name: 'UserRoleAuthTree',
  components: { IopDataTree },
  data () {
    return {
      url: path.manage.auth.tree,
      /** 不显示顶部 全部 */
      rootNode: {
        show: false
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
      this.$refs.userRoleAuthTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.userRoleAuthTree.reload()
    }
  }
}
</script>
