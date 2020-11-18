<template>
  <div>
    <div class="table-page-search-wrapper" style="margin-top: 15px;">
      <a-form layout="inline">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="机构编码">
              <a-input @pressEnter="search" placeholder="请输入机构编码" v-model="query.deptCode" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="机构名称">
              <a-input @pressEnter="search" placeholder="请输入机构名称" v-model="query.deptName" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-divider style="margin-bottom:5px;"/>

    <iop-data-table
      ref="deptList"
      :table="table"
      :hiddenTop="true"
    />
  </div>
</template>
<script>
import sysUserDeptListVO from './vo/sys-user-dept-list-vo'
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'

export default {
  name: 'SysUserDeptList',
  components: { IopDataTable },
  data () {
    return {
      query: {},
      table: {
        url: path.system.pubDeptAdmin.index,
        rowKey: 'adminId',
        columns: sysUserDeptListVO,
        filterable: false,
        selectable: false,
        actions: false
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
      this.$refs.deptList.reload(this.query)
    },

    resetSearchForm () {
      this.query = {}
      this.search()
    }
  }
}
</script>
