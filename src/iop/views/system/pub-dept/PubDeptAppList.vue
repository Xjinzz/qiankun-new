<template>
  <div>
    <div class="table-page-search-wrapper" style="margin-top: 5px;">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="12" :offset="6">
          <a-input-search
            allowClear
            enter-button="查询"
            @search="search"
            placeholder="请输入子系统名称" />
        </a-col>
      </a-row>
    </div>
    <a-divider style="margin-bottom:5px;"/>
    <iop-data-table
      ref="appList"
      :autoLoad="false"
      :table="table"
      hiddenTop
    />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import pubDeptAppListVO from './vo/pub-dept-app-list-vo'

export default {
  name: 'PubDeptAppList',
  components: { IopDataTable },
  data () {
    return {
      table: {
        url: path.system.pubDept.app,
        rowKey: 'appCode',
        columns: pubDeptAppListVO,
        actions: false,
        buttons: false,
        selectable: false
      }
    }
  },
  props: {
    deptId: {
      type: String,
      required: true
    }
  },
  created () {
    this.table.url = `${path.system.pubDept.app}${this.deptId}`
  },
  methods: {
    load () {
      this.table.url = `${path.system.pubDept.app}${this.deptId}`
      this.resetSearchForm()
    },

    /**
     * 查询
     */
    async search (appName = '') {
      this.$refs.appList.reload({ appName })
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.search()
    }
  }
}
</script>
