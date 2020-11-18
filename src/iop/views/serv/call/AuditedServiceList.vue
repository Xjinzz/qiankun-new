<template>
  <div>
    <iop-data-table
      ref="auditedServiceList"
      :table="table"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="服务名称">
              <a-input @pressEnter="search" placeholder="请输入服务名称" :maxLength="100" v-decorator="['chName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="提供单位">
              <a-input @pressEnter="search" placeholder="请输入提供单位" :maxLength="100" v-decorator="['deptName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>
      <template #rowButtons="{ record }">
        <a @click="handleView(record)">查看</a>
        <a-divider type="vertical" />
        <a @click="handleViewToken(record)">查看token</a>
      </template>

    </iop-data-table>
    <token-model
      ref="tokenModel"
      :serviceId="serviceId"
      :authId="authId"
      :applyId="applyId"
      :appId="appId"
      :type="type"
    />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components/index'
import { IOP_SERV_SERVICE_CALL_STATUS } from '@/iop/constants/index'
import path from '@/iop/api/index'
import allServiceListVO from './vo/service-list-vo'
import ApplyModal from './ApplyModal'
import { iopAuthService } from '@/iop/service'
import { IOP_FORM_URL } from '@/iop/constants'
import TokenModel from '../apply/view-list/TokenModal'

export default {
  name: 'AuditedServiceList',
  components: { IopDataTable, ApplyModal, TokenModel },
  data () {
    return {
      table: {
        url: `${path.serv.call.index}?status=${IOP_SERV_SERVICE_CALL_STATUS.AUDITED}`,
        rowKey: (record) => record.serviceId + record.applyId,
        selectable: false,
        columns: allServiceListVO,
        actionsWidth: 180
      },
      visible: false,
      token: '',
      /** 权限id */
      authId: '',
      appId: '',
      applyId: '',
      serviceId: '',
      /** token组件的状态 */
      type: ''
    }
  },
  methods: {
    handleViewToken (record = {}) {
      this.serviceId = record.id
      this.authId = record.authId
      this.appId = record.appId
      this.applyId = record.applyId
      this.type = true
      this.$nextTick(() => {
        this.$refs.tokenModel.show(record.authId)
      })
    },
    handleView (record = {}) {
      iopAuthService.goPage(IOP_FORM_URL.SERV_CALL.INFO, {
        mode: 'view',
        serviceId: record.serviceId
      })
    },

    search () {
      this.$refs.auditedServiceList.search()
    },

    resetSearchForm () {
      this.$refs.auditedServiceList.resetSearch()
      this.$refs.auditedServiceList.search()
    }

  }
}
</script>
