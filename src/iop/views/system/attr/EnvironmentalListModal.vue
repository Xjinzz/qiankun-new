<template>
  <div style="margin-top: 0px;">
    <iop-data-table
      ref="EnvironmentalList"
      :table="table"
      :tree="false"
      :hiddenTop="true"
    >
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import sysUserEnvironmentalListVo from './vo/sys-user-Environmental-list-vo'
import path from '@/iop/api/index'

export default {
  name: 'SysUserAttrForm',
  components: { IopDataTable, sysUserEnvironmentalListVo },
  data () {
    return {
      visible: false,
      table: {
        url: path.system.userAttr.envi,
        rowKey: 'attrId',
        filterable: false,
        actions: false,
        selectable: false,
        columns: sysUserEnvironmentalListVo
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
    this.table.query = { attrId: this.attrId, attrValId: this.attrValId }
  },
  methods: {
    load () {
      this.table.query = { attrId: this.attrId, attrValId: this.attrValId }
      this.search()
    },
    search () {
      this.$refs.EnvironmentalList.reload()
    }
  }
}
</script>
