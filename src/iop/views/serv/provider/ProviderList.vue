<template>
  <div>
    <a-tabs defaultActiveKey="0" @change="tabChange" class="tabs-header">
      <a-tab-pane key="0" tab="待注册">
      </a-tab-pane>
      <a-tab-pane key="1" tab="注册中">
      </a-tab-pane>
      <a-tab-pane key="2" tab="注册通过">
      </a-tab-pane>
      <a-tab-pane key="9" tab="注册未通过">
      </a-tab-pane>
    </a-tabs>
    <iop-ser-service-list
      v-if="show"
      ref="serviceProviderList"
      :thirdparty="'invoke'"
      @onSelectedChange="onSelectedChange"
      :url="url"
      :permission="permission"
      :approStatus="approStatus"
      :selectable="selectable"
    >
      <template #tableHeader>
        <a-button v-if="approStatus=='0'" type="primary" :disabled="selectedRows.length === 0" @click="createApply">注册申请</a-button>
        <div v-else></div>
      </template>
    </iop-ser-service-list>
    <apply-modal ref="applyModal" :serviceIds="serviceIds" :services="services" @onSubmitSuccess="applySuccess" />

  </div>
</template>
<script>
import path from '@/iop/api/index'
import { IopSerServiceList } from '@/iop/views/index'
import ApplyModal from './ApplyModal'

/**
 * 服务接入
 */
export default {
  name: 'ServiceProviderList',
  components: { IopSerServiceList, ApplyModal },
  data () {
    return {
      selectedRows: [],
      selectedRowKeys: [],
      url: `${path.serv.provider.table}?approStatus=${0}`,
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      approStatus: '0',
      show: true,
      serviceIds: [],
      services: []
    }
  },
  computed: {
    selectable () {
      // 待注册、注册未通过
      return this.approStatus === '0' || this.approStatus === '9'
    }
  },
  activated () {
    this.$nextTick(() => {
      this.$refs.serviceProviderList.reload()
    })
  },
  methods: {
    tabChange (k) {
      this.show = false
      this.approStatus = k
      this.url = `${path.serv.provider.table}?approStatus=${k}`
      switch (k) {
        case '0':
          this.permission = ['create', 'view', 'edit', 'remove', 'removeSelected']
          break
        case '9':
          this.permission = ['view', 'remove', 'removeSelected']
          break
        default:
          this.permission = ['view']
      }
      this.$nextTick(() => {
        this.show = true
      })
    },
    onSelectedChange (data = {}) {
      this.selectedRows = data.selectedRows
      this.selectedRowKeys = data.selectedRowKeys
    },

    createApply () {
      this.serviceIds = this.selectedRowKeys
      this.services = this.selectedRows
      this.$refs.applyModal.show()
    },
    applySuccess () {
      this.$refs.serviceProviderList.reload()
    }
  }
}
</script>
