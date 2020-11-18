<template>
  <div>
    <iop-data-table
      ref="authAclList"
      :table="table"
      class="authAclList"
    >
    </iop-data-table>
  </div>
</template>
<script>
import authAclListVo from './vo/auth-acl-list-vo.js'
import { IopDataTable } from '@/iop/components'
// import path from '@/iop/api/index'
export default {
  name: 'AuthAclList',
  components: { IopDataTable },
  props: {
    roleId: {
      type: String,
      required: true,
      default: ''
    },
    typeId: {
      type: String,
      required: true,
      default: ''
    },
    aclListUrl: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: this.aclListUrl,
        /** rowKey，必填 */
        rowKey: 'aclId',
        /** 不显示序号列 */
        serial: true,
        selectable: false,
        actions: false,
        /** 列定义 */
        columns: authAclListVo
      }
    }
  },
  method: {
    reload () {
      this.$refs.authAclList.reload()
    }
  }
}
</script>
<style lang="less" scoped>
  .authAclList {
    /deep/ .ant-card-body {
      padding: 0;
      margin: 0!important;
    }
  }
</style>
