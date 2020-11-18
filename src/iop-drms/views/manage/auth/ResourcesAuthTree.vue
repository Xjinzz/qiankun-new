<template>
  <div>
    <iop-data-tree
      checkStrictly
      ref="resourcesAuthTree"
      :checkable="checkable"
      :rootNode="rootNode"
      :loadQuery="loadQuery"
      :loadNodeQuery="loadNodeQuery"
      queryName="parentId"
      :url="url"
      @onCheck="onCheck"
      @onCancleCheck="onCancleCheck"
      @setCheckedKeys="setCheckedKeys"

    />
  </div>
</template>
<script>
import { IopDataTree } from '@/iop/components'
export default {
  /** 资源授权树 */
  name: 'ResourcesAuthTreeSelect',
  components: { IopDataTree },
  props: {
    url: {
      type: String,
      required: true
    },
    roleId: {
      type: String,
      required: true,
      default: ''
    },
    checkable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    'roleId' (newId, o) {
      if (newId !== '') {
        this.loadQuery.roleId = newId
      }
    }
  },
  created () {
    this.loadQuery.roleId = this.roleId
  },
  data () {
    return {
      rootNode: {
        show: false
      },
      /** 除了主键之外参数 */
      loadQuery: {
        roleId: ''
      },

      /**
       * 动态改变的key和值
       * @param {string} query 要传的key
       * @param {string} name 要传的值的字段
       */
      loadNodeQuery: {
        query: 'type',
        name: 'type'
      }
    }
  },
  methods: {
    /**
     * 重置多选框
     */
    setCheckedKeys () {
      this.$refs.resourcesAuthTree.setCheckedKeys()
    },

    /**
     * 多选框选中的
     */
    onCheck ({ keys, data }) {
      this.$emit('onCheck', { keys, data })
    },

    /**
     * 多选取消选中的
     */

    onCancleCheck ({ key, data }) {
      this.$emit('onCancleCheck', { key, data })
    },

    /**
     * 刷新节点
     */
    reloadNode (key = '') {
      this.$refs.resourcesAuthTree.reloadNode(key)
    },

    /**
     * 刷新根节点
     */
    reload () {
      this.$refs.resourcesAuthTree.reload()
    }
  }
}
</script>
