<template>
  <div>
    <iop-data-table
      ref="throughTable"
      :table="table"
    >
      <template #top>
        <search-form ref="searchForm" @search="search" @resetSearchForm="resetSearchForm" />
      </template>
      <template #rowButtons="{ record }">
        <a @click="handleView(record)">查看</a>
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api/index'
import SearchForm from './SearchForm'
import { IOP_SERV_APPLY_STATUS, IOP_FORM_URL } from '@/iop/constants'
import { iopAuthService } from '@/iop/service'
import MessageUtils from '@/utils/message'

export default {
  name: 'ThroughTable',
  components: { IopDataTable, SearchForm },
  data () {
    const throughListVo = [
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
        query: { status: `${IOP_SERV_APPLY_STATUS.THROUHT}` },
        /** rowKey，必填 */
        rowKey: 'applyId',
        /** 不显示序号列 */
        serial: true,
        selectable: false,
        /** 列定义 */
        columns: throughListVo,
        /** 操作列宽度 */
        actionsWidth: 80
      }
    }
  },
  methods: {
    /**
     * 查询
     */
    async search (form) {
      try {
        await this.$refs.throughTable.reload(form)
      } catch (error) {
        MessageUtils.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.throughTable.reload()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {Object} record 选中的
     */
    handleView (record = {}) {
      iopAuthService.goPage(IOP_FORM_URL.SERV_APPLY.VIEW, {
        mode: 'view',
        applyId: record.applyId
      })
    }
  }
}
</script>
