<template>
  <div style="margin-top: 0px;">
    <iop-data-table
      ref="sysHistoricalVersionList"
      :table="table"
      :tree="false"
      :hiddenTop="true"
    >
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import sysHistoricalVersionListVo from './vo/sys-historical-version-list-vo'
import path from '@/iop/api/index'

export default {
  name: 'SysUserAttrForm',
  components: { IopDataTable, sysHistoricalVersionListVo },
  data () {
    return {
      visible: false,
      table: {
        url: path.system.userAttr.history,
        rowKey: 'attrValId',
        filterable: false,
        actions: false,
        selectable: false,
        columns: sysHistoricalVersionListVo
      }
    }
  },
  props: {
    attrId: {
      type: String,
      required: false,
      default: ''
    },
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
      this.$refs.sysHistoricalVersionList.reload()
    }
  }
}
</script>
