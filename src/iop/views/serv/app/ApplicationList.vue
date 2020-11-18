<template>
  <div>
    <iop-data-table
      ref="applicationList"
      :autoLoad="false"
      :hiddenTop="true"
      :table="table"
      :permission="permission"
      v-if="mode !== 'create'"
    >
      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
      <template #rowButtons="{record}">
        <a @click="handleView(record)">查看</a>
        <template v-if="mode !== 'view'">
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleRemove(record, index)">删除</a>
        </template>
      </template>
    </iop-data-table>

    <application-form
      ref="applicationForm"
      :mode="formMode"
      :id="applicationId"
      :appId="appId"
      @submitSuccess="applicationSubmitSuccess" />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api/index'
import applicationListVo from './vo/application-list-vo'
import applicationForm from './form/ApplicationForm'
import MessageUtils from '@/utils/message'
import { iopServApplicationService } from '@/iop/service/index'

export default {
  name: 'ServAppApplicationList',
  components: { IopDataTable, applicationForm },
  data () {
    return {
      table: {
        url: path.serv.app.listApplication,
        query: { appId: `${this.appId}` },
        columns: applicationListVo,
        rowKey: 'applicationId',
        pagination: false,
        selectable: false,
        title: '物理部署'
      },
      permission: [],
      hiddenTop: true,
      applicationId: '',
      formMode: ''
    }
  },
  props: {
    appId: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  created () {
    if (this.mode === 'view') {
      this.permission = ['view']
    } else {
      this.permission = ['create', 'view', 'edit', 'remove']
    }
  },
  mounted () {
    if (this.mode !== 'create') {
      this.load()
    }
  },
  methods: {
    load (appId) {
      appId = appId || this.appId
      this.table.url = `${path.serv.app.listApplication}?appId=${appId}`
      this.$refs.applicationList.reload()
    },

    handleCreate () {
      this.formMode = 'create'
      this.applicationId = ''
      this.$refs.applicationForm.show()
    },

    handleView (record = {}) {
      this.formMode = 'view'
      this.applicationId = record.applicationId
      this.$refs.applicationForm.show()
    },

    handleEdit (record = {}) {
      this.formMode = 'edit'
      this.applicationId = record.applicationId
      this.$refs.applicationForm.show()
    },

    handleRemove (record = {}) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          try {
            await iopServApplicationService.remove(record.applicationId)
            MessageUtils.success()
            this.$refs.applicationList.reload()
          } catch (error) {
            MessageUtils.error(error)
          }
        }
      })
    },

    applicationSubmitSuccess () {
      this.load()
    }
  }
}
</script>
