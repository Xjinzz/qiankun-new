<template>
  <div>
    <iop-data-table
      ref="draftTable"
      :table="table"
      :permission="permission"
      :tree="false"
      @onAction="onAction"
    >
      <template #top>
        <search-form ref="searchForm" @search="search" @resetSearchForm="resetSearchForm" />
      </template>
      <template #beforeRemoveSelectedButton>
        <a-button :disabled="applyIds.length === 0" type="primary" @click="handleRemoveSelected()">删除</a-button>
      </template>
      <!-- 提交  行单个 -->
      <template #editButton="{ record }">
        <a @click="handleCommit(record)">提交</a>
        <a-divider type="vertical" />
      </template>
      <!-- 删除  行单个 -->
      <template #beforeRemoveButton="{ record }">
        <a @click="handleRemoveSelected(record,'1')">删除</a>
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api/index'
import SearchForm from './SearchForm'
// import CommitModal from '../CommitModal'
import { IOP_SERV_APPLY_STATUS, IOP_FORM_URL } from '@/iop/constants'
import { iopAuthService, iopServApplyService } from '@/iop/service'
import MessageUtils from '@/utils/message'

export default {
  name: 'DraftTable',
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
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.serv.apply.index,
        query: { status: IOP_SERV_APPLY_STATUS.DRAFT },
        /** rowKey，必填 */
        rowKey: 'applyId',
        /** 不显示序号列 */
        serial: true,
        /** 列定义 */
        columns: noThroughListVo,
        /** 操作列宽度 */
        actionsWidth: '200px'
      },
      /** 表格组件按钮权限 */
      permission: ['edit', 'view'],
      showViewModal: false,
      applyIds: []
    }
  },
  methods: {
    /**
     * 提交
     */
    handCommit () {

    },

    /**
     * 查询
     */
    async search (form) {
      try {
        await this.$refs.draftTable.reload(form)
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.draftTable.reload()
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
        case 'onSelectedChange':
          this.handleSelected(data.original.selectedRowKeys)
          break
      }
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
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} applyId 主键
     */
    async handleCommit (item) {
      console.log(item)
      const applyId = item.applyId
      this.$confirm({
        title: `确定提交吗`,
        onOk: async () => {
          try {
            await iopServApplyService.commit(applyId)
            this.search()
            MessageUtils.success('提交成功')
          } catch (err) {
            MessageUtils.error(err)
          }
        }
      })
    },
    /**
     * 删除列表选择项，多选
     *
     * @param {Array}  applyIds 选中项的主键数组
     * @param {string} applyId 删除的id
     * @param {string} type 单个删除的状态
     */
    handleRemoveSelected (item, type) {
      this.$confirm({
        title: `确定删除吗`,
        onOk: async () => {
          try {
            if (type === '1') {
              await iopServApplyService.deleteBatch([item.applyId])
            } else {
              await iopServApplyService.deleteBatch(this.applyIds)
            }
            this.resetSearchForm()
            MessageUtils.success()
          } catch (error) {
            MessageUtils.error(error)
          }
        }
      })
    },
    handleSelected (applyIds) {
      this.applyIds = applyIds
    }
  }
}
</script>
