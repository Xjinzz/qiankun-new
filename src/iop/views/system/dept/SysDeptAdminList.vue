<template>
  <a-spin :spinning="loading">
    <div class="table-page-search-wrapper" style="margin-top: 15px;">
      <a-form layout="inline">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="12" :offset="6">
            <a-input-search
              allowClear
              enter-button="查询"
              v-model="userName"
              @search="search"
              placeholder="请输入姓名" />
          </a-col>
          <!-- <a-col :span="8" :offset="4">
            <a-form-item label="姓名">
              <a-input v-model="userName" />
            </a-form-item>
          </a-col>
          <a-col :span="7" :offset="3" style="text-align:center;">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetSearchForm()">重置</a-button>
          </a-col> -->
        </a-row>
      </a-form>
    </div>
    <a-divider style="margin-bottom:5px;"/>
    <iop-data-table
      ref="adminList"
      :table="table"
      :permission="permission"
      :hiddenTop="true"
    >
      <template #afterCreateButton>
        <a-button type="primary" @click="handleCreate">添加</a-button>
      </template>
    </iop-data-table>

    <iop-sys-user-select ref="userSelect" @submit="onUserSelect"/>
  </a-spin>
</template>
<script>
import sysDeptAdminListVO from './vo/sys-dept-admin-list-vo'
import { IopDataTable, IopSysUserSelect } from '@/iop/components'
import path from '@/iop/api'
import MessageUtils from '@/utils/message'
import { iopPubDeptAdminService } from '@/iop/service'

export default {
  name: 'PubDeptAdminList',
  components: { IopDataTable, IopSysUserSelect },
  data () {
    return {
      userName: '',
      table: {
        url: path.system.pubDeptAdmin.index,
        rowKey: 'adminId',
        columns: sysDeptAdminListVO,
        filterable: false
      },
      permission: ['remove', 'removeSelected'],
      loading: false
    }
  },
  props: {
    pubDeptId: {
      type: String,
      required: true
    },
    sysDeptId: {
      type: String,
      required: true,
      default: ''
    }
  },
  created () {
    this.table.query = { deptId: this.pubDeptId, type: 1 }
  },
  methods: {
    load () {
      this.table.query = { deptId: this.pubDeptId, type: 1 }
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

    async onUserSelect ({ values }) {
      this.loading = true
      try {
        const keys = []
        for (const sysUser of values) {
          keys.push(sysUser.userId)
        }
        await iopPubDeptAdminService.save(this.pubDeptId, keys)
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
