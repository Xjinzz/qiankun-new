<template>
  <div>
    <iop-data-table
      ref="inAuditList"
      :table="table"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="申请单名称">
              <a-input @pressEnter="search" placeholder="请输入申请单名称" :maxLength="100" v-model="query.applyTitle" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="类型">
              <iop-data-dict-select ref="applyType" type="applyType" v-model="query.applyType" />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button @click="resetSearchForm">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #rowButtons="{ record }">
        <a @click="handleView(record)">查看</a>
        <a-divider type="vertical" />
        <a @click="handleCommit(record)">审核</a>
        <a-divider type="vertical" />
        <a @click="handleBack(record)">退回</a>
      </template>
    </iop-data-table>

    <approval-modal ref="approvalModal" />
    <back-modal ref="backModal" />
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components/index'
import { IOP_SERV_APPLY_ADMIN_STATUS, IOP_FORM_URL } from '@/iop/constants'
import applyInAuditList from './vo/apply-in-audit-list-vo'
import ApprovalModal from './ApprovalModal'
import BackModal from './BackModal'
import path from '@/iop/api/index'
import { iopAuthService } from '@/iop/service'

export default {
  name: 'ApplyAdminInAuditList',
  components: { IopDataTable, IopDataDictSelect, ApprovalModal, BackModal },
  data () {
    return {
      table: {
        rowKey: 'applyId',
        columns: applyInAuditList,
        url: `${path.serv.applyAdmin.index}?status=${IOP_SERV_APPLY_ADMIN_STATUS.INAUDIT}`,
        selectable: false,
        actionsWidth: 180
      },
      query: {}
    }
  },
  methods: {
    search () {
      this.$refs.inAuditList.reload(this.query)
    },

    resetSearchForm () {
      this.$refs.applyType.cleanSelected()
      this.query = {}
      this.search()
    },

    handleView (record = {}) {
      iopAuthService.goPage(IOP_FORM_URL.SERV_ADMIN.INFO, {
        mode: 'view',
        applyId: record.applyId,
        status: '99'
      })
    },

    handleCommit (record = {}) {
      this.$refs.approvalModal.show(record.applyId)
    },

    handleBack (record = {}) {
      this.$refs.backModal.show(record.applyId)
    }
  }
}
</script>
