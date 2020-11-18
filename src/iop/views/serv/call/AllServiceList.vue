<template>
  <div>
    <iop-data-table
      ref="serviceList"
      :table="table"
      :permission="permission"
      @onAction="onAction"
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
      </template>

      <template #createButton>
        <a-button type="primary" :disabled="selectedRowKeys.length === 0" @click="createApply">申请调用</a-button>
      </template>
    </iop-data-table>

    <apply-modal ref="applyModal" :serviceIds="serviceIds" :services="services" @onSubmitSuccess="applySuccess" />
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
export default {
  name: 'AllServiceList',
  components: { IopDataTable, ApplyModal },
  data () {
    return {
      table: {
        url: `${path.serv.call.index}?status=${IOP_SERV_SERVICE_CALL_STATUS.ALL}`,
        rowKey: 'serviceId',
        columns: allServiceListVO,
        actionsWidth: 80
      },
      permission: ['create'],
      selectedRows: [],
      selectedRowKeys: [],
      serviceIds: [],
      services: []
    }
  },
  methods: {
    handleView (record = {}) {
      iopAuthService.goPage(IOP_FORM_URL.SERV_CALL.INFO, {
        mode: 'view',
        serviceId: record.serviceId
      })
    },

    createApply () {
      this.serviceIds = this.selectedRowKeys
      this.services = this.selectedRows
      this.$refs.applyModal.show()
    },

    search () {
      this.$refs.serviceList.search()
    },

    resetSearchForm () {
      this.$refs.serviceList.resetSearch()
      this.$refs.serviceList.search()
    },

    onAction ({ name, data } = {}) {
      if (name === 'onSelectedChange') {
        this.selectedRows = data.original.selectedRows
        this.selectedRowKeys = data.original.selectedRowKeys
      } else if (name === 'onClearSelected') {
        this.selectedRows = []
        this.selectedRowKeys = []
      }
    },

    applySuccess () {
      this.$refs.serviceList.clearSelected()
    }
  }
}
</script>
