<template>
  <div>
    <iop-data-table
      ref="jobList"
      :table="table"
      :hiddenTop="true"
      :permission="permission"
      @onAction="onAction"
    />

    <user-job-form
      ref="jobForm"
      :mode="formMode"
      :userId="userId"
      :ryjgbs="ryjgbs"
      @onSubmitSuccess="search" />
  </div>
</template>
<script>
import userJobListVO from './vo/user-job-list-vo'
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import UserJobForm from './UserJobForm'

export default {
  name: 'UserJobList',
  components: { IopDataTable, UserJobForm },
  data () {
    return {
      appName: '',
      table: {
        rowKey: 'ryjgbs',
        url: path.system.pubUser.job,
        columns: userJobListVO,
        filterable: false,
        actionsWidth: 180,
        scroll: { x: '120%' }
      },
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      formMode: 'create',
      ryjgbs: ''
    }
  },
  props: {
    userId: {
      type: String,
      required: true
    },
    pubUserId: {
      type: String,
      required: true
    }
  },
  created () {
    this.table.query = { userId: this.pubUserId, type: 1 }
  },
  methods: {
    load () {
      this.table.query = { userId: this.pubUserId, type: 1 }
      this.resetSearchForm()
    },

    search () {
      this.$refs.jobList.reload()
    },

    resetSearchForm () {
      this.search()
    },

    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onRemove':
          this.search()
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original.ryjgbs)
          break
        case 'onEdit':
          this.handleEdit(data.original.ryjgbs)
          break
        case 'onRemoveSelected':
          this.search()
          break
      }
    },

    handleCreate () {
      this.formMode = 'create'
      this.ryjgbs = ''
      this.$refs.jobForm.show()
    },

    handleView (ryjgbs = '') {
      this.formMode = 'view'
      this.ryjgbs = ryjgbs
      this.$refs.jobForm.show()
    },

    handleEdit (ryjgbs = '') {
      this.formMode = 'edit'
      this.ryjgbs = ryjgbs
      this.$refs.jobForm.show()
    }
  }
}
</script>
