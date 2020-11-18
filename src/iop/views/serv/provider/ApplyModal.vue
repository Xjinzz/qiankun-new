
<template>
  <apply-modal ref="applyModal" title="注册申请" applyType="2" :serviceIds="serviceIds" @onSubmitSuccess="onSubmitSuccess">
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

export default {
  name: 'ServCallApplyModal',
  components: { ApplyModal },
  data () {
    return {
      columns: [
        {
          title: '序号',
          align: 'center',
          dataIndex: 'serial',
          width: '80px',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '服务名称',
          dataIndex: 'chName',
          width: 200
        },
        {
          title: '服务编码',
          dataIndex: 'serviceCode'
        },
        {
          title: '提供单位',
          dataIndex: 'deptName',
          width: 150
        }
      ]
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
      this.visible = true
      this.$nextTick(() => {
        this.$refs.applyModal.show()
      })
    },

    onSubmitSuccess () {
      this.$emit('onSubmitSuccess')
    }
  }
}
</script>
