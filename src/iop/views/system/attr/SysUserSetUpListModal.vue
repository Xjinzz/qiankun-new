<template>
  <div style="margin-top: 0px;">
    <iop-data-table
      ref="sysUserSetUpList"
      :table="table"
      :tree="false"
      :hiddenTop="true"
    >
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import sysUserSetUpListVo from './vo/sys-user-set-up-list-vo'
import path from '@/iop/api/index'

export default {
  name: 'SysUserAttrForm',
  components: { IopDataTable, sysUserSetUpListVo },
  data () {
    return {
      visible: false,
      table: {
        url: path.system.userAttr.setup,
        rowKey: 'attrId',
        filterable: false,
        actions: false,
        selectable: false,
        columns: sysUserSetUpListVo
      }
    }
  },
  props: {
    attrValId: {
      type: String,
      required: false,
      default: ''
    },
    attrEnviro: {
      type: String,
      required: false,
      default: ''
    }
  },
  created () {
    this.table.query = { attrValId: this.attrValId, enCode: this.attrEnviro, appId: '', programId: '' }
  },
  methods: {
    load () {
      this.table.query = { attrValId: this.attrValId, enCode: this.attrEnviro, appId: '', programId: '' }
      this.search()
    },
    search () {
      this.$refs.sysUserSetUpList.reload()
    }
  }
}
</script>
