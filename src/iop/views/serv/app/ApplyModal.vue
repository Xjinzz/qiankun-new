<template>
  <apply-modal ref="applyModal" title="申请接入" applyType="0" :serviceIds="appIds" @onSubmitSuccess="onSubmitSuccess">
    <template #table>
      <a-card title="接入系统" :bordered="false">
        <a-table
          rowKey="appId"
          :dataSource="apps"
          :pagination="false"
          :columns="columns"
        >
          <template #serial="text, record, index">
            <span>{{ index + 1 }}</span>
          </template>
        </a-table>
      </a-card>
    </template>
  </apply-modal>
</template>
<script>
import ApplyModal from '../flow-modal/ApplyModal'
import applyAppListVo from './vo/apply-app-list-vo'

export default {
  name: 'ServAppApplyModal',
  components: { ApplyModal },
  data () {
    return {
      columns: applyAppListVo
    }
  },
  props: {
    appIds: {
      type: Array,
      required: true
    },
    apps: {
      type: Array,
      required: true
    }
  },
  methods: {
    show () {
      this.$refs.applyModal.show()
    },

    onSubmitSuccess () {
      this.$emit('onSubmitSuccess')
    }
  }
}
</script>
