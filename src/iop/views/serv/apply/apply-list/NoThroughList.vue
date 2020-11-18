<template>
  <div>
    <iop-data-table
      ref="noThroughTable"
      :table="table"
      :permission="permission"
      :batchRemove="batchRemove"
      @onAction="onAction"
    >
      <template #top>
        <search-form ref="searchForm" @search="search" @resetSearchForm="resetSearchForm" />
      </template>
      <template #editButton="{ record }">
        <a @click="handleCommit(record.applyId)">提交</a>
        <a-divider type="vertical" />
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api/index'
import SearchForm from './SearchForm'
import { IOP_SERV_APPLY_STATUS, IOP_FORM_URL } from '@/iop/constants'
import { iopAuthService, iopServApplyService } from '@/iop/service'
import MessageUtils from '@/utils/message'

export default {
  name: 'NoThroughTable',
  components: { IopDataTable, SearchForm },
  data () {
    const noThroughListVo = [
      {
        title: '标题',
        dataIndex: 'applyTitle'
      },
      {
        title: '申请单编码',
        dataIndex: 'applyCode'
      },
      {
        title: '申请时间',
        dataIndex: 'applyDate'
      },
      {
        title: '审核时间',
        dataIndex: 'auditDate'
      },
      {
        title: '类型',
        dataIndex: 'applyType',
        customRender: (text) => {
          if (text === '0') {
            return <a-tag color="cyan">接入申请</a-tag>
          } else if (text === '1') {
            return <a-tag color="red">服务调用</a-tag>
          } else if (text === '2') {
            return <a-tag color="green">服务注册</a-tag>
          } else if (text === '3') {
            return <a-tag color="yellow">资源注册</a-tag>
          }
        }
      }
    ]
    return {
      table: {
        /** 列表查询地址 */
        url: path.serv.apply.index,
        query: { status: `${IOP_SERV_APPLY_STATUS.NOTHROUGH}` },
        /** rowKey，必填 */
        rowKey: 'applyId',
        /** 列定义 */
        columns: noThroughListVo
      },
      /** 表格组件按钮权限 */
      permission: ['view', 'edit', 'remove', 'removeSelected'],
      batchRemove: {
        url: path.serv.apply.deleteBatch
      }
    }
  },
  methods: {
    /**
     * 查询
     */
    async search (form) {
      try {
        await this.$refs.noThroughTable.reload(form)
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.noThroughTable.reload()
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
          this.handleView(data.original)
          break
      }
    },

    handleCommit (applyId = '') {
      this.$confirm({
        title: `确定提交吗`,
        onOk: async () => {
          try {
            await iopServApplyService.commit(applyId)
            this.search()
          } catch (err) {
            MessageUtils.error(err)
          }
        }
      })
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {Object} record 选中的
     */
    handleView (record) {
      iopAuthService.goPage(IOP_FORM_URL.SERV_APPLY.VIEW, {
        mode: 'view',
        applyId: record.applyId
      })
    }
  }
}
</script>
