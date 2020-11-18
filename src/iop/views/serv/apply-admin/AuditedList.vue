<template>
  <div>
    <iop-data-table
      ref="auditedList"
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

      <template #beforeRemoveButton="{ record }">
        <a @click="handleView(record)">查看</a>
      </template>
    </iop-data-table>

    <approval-modal ref="approvalModal" />
    <back-modal ref="backModal" />
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components/index'
import { IOP_SERV_APPLY_ADMIN_STATUS, IOP_FORM_URL } from '@/iop/constants'
import applyAuditedVO from './vo/apply-audited-list-vo'
import ApprovalModal from './ApprovalModal'
import BackModal from './BackModal'
import path from '@/iop/api/index'
import { iopAuthService } from '@/iop/service'

export default {
  name: 'ApplyAdminAuditedList',
  components: { IopDataTable, IopDataDictSelect, ApprovalModal, BackModal },
  data () {
    return {
      table: {
        rowKey: (record, i) => i + record.applyId,
        columns: applyAuditedVO,
        url: `${path.serv.applyAdmin.index}?status=${IOP_SERV_APPLY_ADMIN_STATUS.AUDITED}`,
        selectable: false,
        actionsWidth: 80
      },
      query: {}
    }
  },
  methods: {
    search () {
      this.$refs.auditedList.reload(this.query)
    },

    resetSearchForm () {
      this.query = {}
      this.$refs.applyType.cleanSelected()
      this.search()
      this.$refs.auditedList.reload()
    },

    handleView (record = {}) {
      iopAuthService.goPage(IOP_FORM_URL.SERV_APPLY.VIEW, {
        mode: 'view',
        applyId: record.applyId,
        status: '88'
      })
    }
  }
}
</script>
