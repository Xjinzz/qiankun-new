<template>
  <div>
    <div class="table-page-search-wrapper" style="margin-top: 15px;">
      <a-form layout="inline">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="12" :offset="6">
            <a-input-search
              ref="inputSearch"
              allowClear
              v-model="searchVal"
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
import sysUserRoleListVO from './vo/sys-user-role-list-vo'
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'SysUserAppList',
  components: { IopDataTable },
  data () {
    return {
      searchVal: '',
      table: {
        rowKey: 'urId',
        columns: sysUserRoleListVO,
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
    this.table.query = { userId: this.pubUserId, type: 1 }
  },
  methods: {
    load () {
      this.table.query = { userId: this.pubUserId, type: 1 }
      this.resetSearchForm()
    },

    search () {
      this.$refs.roleList.reload({ roleName: this.searchVal })
    },
    resetSearchForm () {
      this.searchVal = ''
      this.search()
    }
  }
}
</script>
