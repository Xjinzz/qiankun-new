<template>
  <div>
    <iop-data-table
      ref="pendingServiceList"
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
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components/index'
import { IOP_SERV_SERVICE_CALL_STATUS } from '@/iop/constants/index'
import path from '@/iop/api/index'
import allServiceListVO from './vo/service-list-vo'
import { iopAuthService } from '@/iop/service'
import { IOP_FORM_URL } from '@/iop/constants'

export default {
  name: 'PendingServiceList',
  components: { IopDataTable },
  data () {
    return {
      table: {
        url: `${path.serv.call.index}?status=${IOP_SERV_SERVICE_CALL_STATUS.PENDING}`,
        rowKey: (record) => record.serviceId + record.applyId,
        selectable: false,
        columns: allServiceListVO,
        actionsWidth: 80
      },
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

    search () {
      this.$refs.pendingServiceList.search()
    },

    resetSearchForm () {
      this.$refs.pendingServiceList.resetSearch()
      this.$refs.pendingServiceList.search()
    }
  }
}
</script>
