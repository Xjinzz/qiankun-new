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
              placeholder="请输入角色名称" />
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-divider style="margin-bottom:5px;"/>

    <iop-data-table
      ref="roleList"
      :table="table"
      :hiddenTop="true" />
  </div>
</template>
<script>
import pubUserRoleListVO from './vo/pub-user-role-list-vo'
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'PubUserAppList',
  components: { IopDataTable },
  data () {
    return {
      table: {
        rowKey: 'urId',
        columns: pubUserRoleListVO,
        filterable: false,
        actions: false,
        selectable: false,
        url: path.system.userRole.index
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
    this.table.query = { userId: this.pubUserId, type: 0 }
  },
  methods: {
    load () {
      this.table.query = { userId: this.pubUserId, type: 0 }
      this.resetSearchForm()
    },

    search (roleName = '') {
      this.$refs.roleList.reload({ roleName })
    },

    resetSearchForm () {
      this.search()
    }
  }
}
</script>
