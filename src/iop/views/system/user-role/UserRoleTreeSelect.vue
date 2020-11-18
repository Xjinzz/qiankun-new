<template>
  <div>
    <iop-data-tree
      maxHeight="500px"
      :checkable="true"
      :rootNode="rootNode"
      :loadQuery="loadQuery"
      ref="userRoleTree"
      :url="url"
      @onCheck="onCheck"
    />
  </div>
</template>
<script>
import { IopDataTree } from '@/iop/components'
export default {
  name: 'UserRoleTreeSelect',
  components: { IopDataTree },
  props: {
    url: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: false,
      default: ''
    }
  },
  watch: {
    'userId' (newId, o) {
      if (newId !== '') {
        this.loadQuery.userId = newId
      }
    }
  },
  created () {
    this.loadQuery.userId = this.userId
  },
  data () {
    return {
      /** 除了主键之外参数 */
      loadQuery: {
        userId: ''
      },
      rootNode: {
        show: false,
        id: '0'
      }
    }
  },
  methods: {

    /**
     * 多选框选中的
     */
    onCheck ({ keys, data }) {
      this.$emit('onCheck', { keys, data })
    },

    /**
     * 刷新节点
     */
    reloadNode (key = '') {
      this.$refs.userRoleTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.userRoleTree.reload()
    },
    getLocalCheckedKeys () {
      return this.$refs.userRoleTree.localCheckedKeys
    }
  }
}
</script>
