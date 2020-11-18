<template>
  <div>
    <div class="table-page-search-wrapper" style="margin-top: 15px;">
      <a-form layout="inline">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="12" :offset="6">
            <a-input-search
              allowClear
              enter-button="查询"
              @search="search"
              placeholder="请输入系统名称" />
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-divider style="margin-bottom:5px;"/>

    <iop-data-table
      ref="appList"
      :table="table"
      :hiddenTop="true"
      :permission="permission"
      :batchRemove="batchRemove" />
  </div>
</template>
<script>
import pubUserAppListVO from './vo/pub-user-app-list-vo'
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'PubUserAppList',
  components: { IopDataTable },
  data () {
    return {
      table: {
        rowKey: 'sysUserId',
        columns: pubUserAppListVO,
        filterable: false,
        actions: false
      },
      // permission: ['remove', 'removeSelected']
      permission: ['removeSelected'],
      batchRemove: {
        url: path.system.pubUser.app.batchRemove
      }
    }
  },
  props: {
    pubUserId: {
      type: String,
      required: true
    }
  },
  created () {
    this.table.url = `${path.system.pubUser.app.index}${this.pubUserId}`
  },
  methods: {
    load () {
      this.table.url = `${path.system.pubUser.app.index}${this.pubUserId}`
      this.resetSearchForm()
    },

    search (appName = '') {
      this.$refs.appList.reload({ appName })
    },

    resetSearchForm () {
      this.search()
    }
  }
}
</script>
