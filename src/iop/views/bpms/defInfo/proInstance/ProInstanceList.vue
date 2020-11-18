<template>
  <div>
    <iop-data-table
      ref="instanceList"
      :table="table"
      :permission="permission"
      @onAction="onAction"
      :autoConfig="false"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="12" :offset="6">
            <a-input-search
              allowClear
              enter-button="查询"
              @search="search"
              placeholder="请输入流程标题" />
          </a-col>
        </a-row>
      </template>
      <template #viewButton="{ record }">
        <a @click="handleView(record.busiId)">查看</a>
      </template>
    </iop-data-table>
    <instance-view-list ref="instanceListView"/>
  </div>
</template>

<script>
import { IopDataTable } from '@/iop/components'
import MessageUtils from '@/utils/message'
import path from '@/iop/api/index'
import InstanceViewList from './InstanceViewList'
import proInstanceListVo from './vo/pro-instance-list-vo'

export default {
  /** 数据发布组件 */
  name: 'InstanceList',
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: '',
        /** rowKey，必填 */
        rowKey: 'busiId',
        selectable: false,
        /** 列定义 */
        columns: proInstanceListVo,
        actionsWidth: 100
      },
      /** 表格组件按钮权限 */
      permission: ['view'],
      defId: ''
    }
  },
  components: { IopDataTable, InstanceViewList },
  methods: {
    load (id) {
      id ? this.defId = id : this.defId = this.$route.query.defid
      this.table.url = `${path.bpms.definfo.info.instances}/${this.defId}`
      this.$nextTick(() => {
        this.$refs.instanceList.init()
      })
    },
    /**
     * 查询
     */
    async search (instProcessTitle = '') {
      try {
        await this.$refs.instanceList.reload({ instProcessTitle })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件并刷新
     */
    resetSearchForm () {
      this.$refs.instanceList.resetSearch()
      this.$refs.instanceList.reload()
    },

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
          this.handleView(data.original.busiId)
          break
      }
    },
    /**
     * 点击查看按钮事件
     *
     *  @param {string} actId 主键
     */
    handleView (busiId = '') {
      this.formMode = 'view'
      this.$refs.instanceListView.show(busiId)
    }

  }

}

</script>
<style>
</style>
