
<template>
  <apply-modal ref="applyModal" title="申请调用" applyType="1" :serviceIds="serviceIds" @onSubmitSuccess="onSubmitSuccess">
    <template #table>
      <a-card title="服务" :bordered="false">
        <a-table
          rowKey="serviceId"
          :dataSource="services"
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
import applyServiceListVo from './vo/apply-service-list-vo'

export default {
  name: 'ServCallApplyModal',
  components: { ApplyModal },
  data () {
    return {
      columns: applyServiceListVo
    }
  },
  props: {
    serviceIds: {
      type: Array,
      required: true
    },
    services: {
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
