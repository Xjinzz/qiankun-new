<template>
  <div>
    <a-modal :footer="null" v-model="visible" title="查看" @cancel="handleCancel" width="1000px">
      <iop-data-table
        ref="instanceViewList"
        :table="table"
        :hiddenTop="true"
      >
        <!-- TODO 暂时不做-->
        <!-- <template #afterCreateButton>
          <a-button type="primary" @click="exportInstance">导出</a-button>
        </template> -->
      </iop-data-table>
    </a-modal>
  </div>
</template>

<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api/index'
import instanceViewListVo from './vo/instance-view-list-vo.js'

export default {
  /** 数据发布组件 */
  name: 'InstanceViewList',
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: '',
        /** rowKey，必填 */
        rowKey: 'id',
        selectable: false,
        /** 列定义 */
        columns: instanceViewListVo,
        actionsWidth: 1,
        /** 操作列隐藏 */
        actions: false
      },
      visible: false
    }
  },
  components: { IopDataTable },
  methods: {
    handleCancel () {
      this.visible = false
    },
    show (id) {
      this.visible = true
      this.table.url = `${path.bpms.definfo.info.instancesActs}/${id}`
      this.$nextTick(() => {
        this.$refs.instanceViewList.reload()
      })
    },
    exportInstance () {
      alert('TODO')
    }

  }

}

</script>
<style>
</style>
