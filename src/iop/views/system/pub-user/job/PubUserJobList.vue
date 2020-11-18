<template>
  <div>
    <iop-data-table
      ref="jobList"
      :table="table"
      :hiddenTop="true"
      :permission="permission"
      @onAction="onAction"
    />

    <pub-user-job-form
      ref="jobForm"
      :mode="formMode"
      :userId="userId"
      :ryjgbs="ryjgbs"
      @onSubmitSuccess="search" />
  </div>
</template>
<script>
import pubUserJobListVO from './vo/pub-user-job-list-vo'
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import PubUserJobForm from './PubUserJobForm'

export default {
  name: 'PubUserJobList',
  components: { IopDataTable, PubUserJobForm },
  data () {
    return {
      appName: '',
      table: {
        rowKey: 'ryjgbs',
        url: path.system.pubUser.job,
        columns: pubUserJobListVO,
        filterable: false,
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
    }
  },
  created () {
    this.table.query = { userId: this.userId, type: 0 }
  },
  methods: {
    load () {
      this.table.query = { userId: this.userId, type: 0 }
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
