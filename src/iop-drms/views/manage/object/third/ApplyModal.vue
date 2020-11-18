<template>
  <apply-modal ref="applyModal" title="申请接入" applyType="0" :serviceIds="appIds" @onSubmitSuccess="onSubmitSuccess">
    <template #table>
      <a-card title="接入资源" :bordered="false">
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
import { IopServApplyModal } from '@/iop/views'
import objectListVO from './vo/object-list-vo'

export default {
  name: 'ServObjectApplyModal',
  components: { ApplyModal: IopServApplyModal },
  data () {
    return {
      columns: objectListVO
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
