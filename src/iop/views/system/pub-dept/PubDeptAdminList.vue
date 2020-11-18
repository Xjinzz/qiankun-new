<template>
  <a-spin :spinning="loading">
    <div class="table-page-search-wrapper" style="margin-top: 5px;">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="12" :offset="6">
          <a-input-search
            allowClear
            enter-button="查询"
            v-model="userName"
            @search="search"
            placeholder="请输入姓名" />
        </a-col>
      </a-row>
    </div>
    <a-divider style="margin-bottom:5px;"/>
    <iop-data-table
      ref="adminList"
      :table="table"
      :permission="permission"
      hiddenTop
      :autoLoad="false"
    >
      <template #afterCreateButton>
        <a-button type="primary" @click="handleCreate">添加</a-button>
      </template>
    </iop-data-table>

    <iop-pub-user-select ref="userSelect" @submit="onUserSelect"/>
  </a-spin>
</template>
<script>
import pubDeptAdminListVO from './vo/pub-dept-admin-list-vo'
import { IopDataTable, IopPubUserSelect } from '@/iop/components'
import path from '@/iop/api'
import MessageUtils from '@/utils/message'
import { iopPubDeptAdminService } from '@/iop/service'

export default {
  name: 'PubDeptAdminList',
  components: { IopDataTable, IopPubUserSelect },
  data () {
    return {
      userName: '',
      table: {
        url: path.system.pubDeptAdmin.index,
        rowKey: 'adminId',
        columns: pubDeptAdminListVO,
        filterable: false
      },
      permission: ['remove', 'removeSelected'],
      loading: false
    }
  },
  props: {
    deptId: {
      type: String,
      required: true
    }
  },
  created () {
    this.table.query = { deptId: this.deptId, type: 0 }
  },
  methods: {
    load () {
      this.table.query = { deptId: this.deptId, type: 0 }
      this.resetSearchForm()
    },

    search () {
      this.$refs.adminList.reload({ userName: this.userName })
    },

    resetSearchForm () {
      this.userName = ''
      this.search()
    },

    handleCreate () {
      this.$refs.userSelect.show()
    },

    async onUserSelect ({ keys }) {
      this.loading = true
      try {
        await iopPubDeptAdminService.save(this.deptId, keys)
        MessageUtils.success()
        this.search()
      } catch (err) {
        MessageUtils.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
