<template>
  <div>
    <iop-data-table
      ref="pendingList"
      :table="table"
      :permission="permission"
      @onAction="onAction"
      :autoLoad="false"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="系统编码">
              <a-input @pressEnter="search" placeholder="请输入系统编码" :maxLength="100" v-decorator="['appCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="系统名称">
              <a-input @pressEnter="search" placeholder="请输入系统名称" :maxLength="100" v-decorator="['appName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>
      <template #afterCreateButton>
        <a-button type="primary" :disabled="selectedRowKeys.length === 0" @click="createApply">申请接入</a-button>
      </template>
    </iop-data-table>

    <apply-modal ref="applyModal" :appIds="appIds" :apps="apps" @onSubmitSuccess="applySuccess" />

    <app-detail-form ref="appDetailForm" :appId="appId" showType="modal" :mode="formMode" @onSubmitSuccess="search" />
  </div>
</template>
<script>
import appListVo from './vo/app-list-vo'
import ApplyModal from './ApplyModal'
import AppDetailForm from './form/AppDetailForm'
import path from '@/iop/api/index'
import MessageUtils from '@/utils/message'
import { IopDataTable } from '@/iop/components'
import { IOP_SERV_APP_STATUS } from '@/iop/constants'

export default {
  name: 'PendingAppList',
  components: { IopDataTable, ApplyModal, AppDetailForm },
  data () {
    return {
      table: {
        url: path.serv.app.index,
        query: { status: IOP_SERV_APP_STATUS.PENDING },
        rowKey: 'appId',
        columns: appListVo
      },
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      selectedRows: [],
      selectedRowKeys: [],
      appIds: [],
      apps: [],
      appId: '',
      formMode: 'create'
    }
  },
  activated () {
    this.search()
  },
  methods: {

    async search () {
      try {
        await this.$refs.pendingList.search()
      } catch (error) {
        MessageUtils.error(error)
      }
    },
    resetSearchForm () {
      this.$refs.pendingList.resetSearch()
      this.$refs.pendingList.reload()
    },

    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onRemove':
          // this.reloadNode(data.original)
          this.search()
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original)
          break
        case 'onEdit':
          this.handleEdit(data.original)
          break
        case 'onRemoveSelected':
          // this.handleRemoveSelected(data.original)
          this.search()
          break
        case 'onSelectedChange':
          this.selectedRows = data.original.selectedRows
          this.selectedRowKeys = data.original.selectedRowKeys
          break
        case 'onClearSelected':
          this.selectedRows = []
          this.selectedRowKeys = []
          break
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.appId = ''
      this.formMode = 'create'
      this.$refs.appDetailForm.show()
    },

    handleView (data = {}) {
      this.appId = data.appId
      this.formMode = 'view'
      this.$refs.appDetailForm.show()
    },

    handleEdit (data = {}) {
      this.appId = data.appId
      this.formMode = 'edit'
      this.$refs.appDetailForm.show()
    },

    createApply () {
      this.appIds = this.selectedRowKeys
      this.apps = this.selectedRows
      this.$refs.applyModal.show()
    },

    applySuccess () {
      this.$refs.pendingList.clearSelected()
      this.search()
    }
  }
}
</script>
