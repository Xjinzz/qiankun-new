<template>
  <div>
    <iop-data-table
      ref="sourceList"
      :table="table"
      :permission="permission"
      :hiddenTop="true"
      @onAction="onAction"
    >
    </iop-data-table>
    <SourceFrom
      ref="sourceForm"
      :cfgId="cfgId"
      :mode="formMode"
    />
  </div>
</template>
<script>
import sourceListVo from './vo/source-list-vo.js'
import { IopDataTable } from '@/iop/components'
import PublishCfgForm from '../../publishCfg/PublishCfgForm'
import path from '@/iop/api/index'

export default {
  name: 'SourceList',
  components: {
    IopDataTable,
    SourceFrom: PublishCfgForm
  },
  props: {
    id: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: `${path.file.source.index}/${this.id}`,
        /** rowKey，必填 */
        rowKey: 'cfgId',
        /** 不显示序号列 */
        serial: true,
        /** 列定义 */
        columns: sourceListVo,
        selectable: false
      },
      /** 表格组件按钮权限 */
      permission: ['view'],
      /** 表单组件模式 */
      formMode: 'view',
      /** 上级行政区域 */
      cfgId: ''
    }
  },
  methods: {

    /**
     * 监听表格事件
     *
     * @param {string} name 事件名称
     * @param {Object} data 数据
     * @param {string} data.original 数据id
     */
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onView':
          this.handleView(data.original.cfgId)
          break
      }
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} serviceId 主键
     */
    handleView (cfgId) {
      this.formMode = 'view'
      this.cfgId = cfgId
      this.$refs.sourceForm.show()
    }
  }
}
</script>
