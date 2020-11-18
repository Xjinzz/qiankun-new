<template>
  <div>
    <iop-data-table
      ref="draftTable"
      :table="table"
      :hiddenTop="true"
      :permission="permission"
      :tree="false"
      @onAction="onAction"
    >
      <template v-if="status!='0'" #viewButton="{ record }">
        <a @click="handleView(record)">查看</a>
      </template>
      <template v-if="status=='0' && mode==='view'" #beforeRemoveButton="{ record }">
        <a @click="handleRemove(record)">删除</a>
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import loginresourcesListVo from '../vo/login-resources-list-vo'
import path from '@/iop/api/index'
import { iopServApplyService } from '@/iop/service'
import MessageUtils from '@/utils/message'

export default {
  name: 'DraftTable',
  components: { IopDataTable },
  props: {
    /** 表格组件按钮权限 */
    id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: false,
      default: ''
    },
    mode: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: `${path.serv.apply.busiList}/${this.id}`,
        /** rowKey，必填 */
        rowKey: 'id',
        /** 显示序号列 */
        serial: true,
        /** 不显示多选框 */
        selectable: false,
        /** 不显示分页 */
        // pageable: false,
        /** 列定义 */
        columns: loginresourcesListVo,
        actionsWidth: 150
      },
      permission: ['view']
    }
  },
  methods: {
    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.draftTable.resetSearch()
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
          this.handleView(data.original.id)
          break
      }
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} id 主键
     */
    handleView (id = '') {
    },

    /**
     * 点击删除按钮事件
     *
     */
    handleRemove (record) {
      this.$confirm({
        title: `确定删除吗`,
        onOk: async () => {
          try {
            await iopServApplyService.deleteRef([record.refId])
            this.resetSearchForm()
            MessageUtils.success()
          } catch (error) {
            MessageUtils.error(error)
          }
        }
      })
    },
    /**
     * 选择 点击事件
     */
    choose (record) {
      // this.resetSearchForm()
    }
  }
}
</script>
