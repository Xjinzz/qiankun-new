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
      <template #headerButtons="{ record }">
        <a-button :disabled="serviceIds.length === 0 || mode==='view'" type="primary" @click="handleSwitchDirectory(record)">切换目录</a-button>
        <a-button :disabled="serviceIds.length === 0 || mode==='view'" type="primary" @click="putStorage(record)">入库</a-button>
      </template>
      <template #rowButtons="{ record }">
        <a v-if="status!='0'" @click="handleView(record.id)">查看</a>
        <!-- 未审核的状态是99 -->
        <template v-if="status=='99' && mode==='view'">
          <a-divider type="vertical" />
          <a @click="handleSwitchDirectory(record,'column')">切换目录</a>
          <a @click="putStorage(record,'column')">入库</a>
        </template>
        <a v-if="status=='0' && mode==='view'" @click="handleRemove(record)">删除</a>
      </template>
    </iop-data-table>
    <directory-modal :ids="serviceIds" ref="DirectoryModal" />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import loginServicesListVo from '../vo/login-service-list-vo'
import path from '@/iop/api/index'
import { iopServApplyService, iopAuthService, iopServService } from '@/iop/service'
import { IOP_FORM_URL } from '@/iop/constants'
import DirectoryModal from './DirectoryModal'
import MessageUtils from '@/utils/message'
export default {
  name: 'DraftTable',
  components: { IopDataTable, DirectoryModal },
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
        /** 不显示分页 */
        // pageable: false,
        /** 列定义 */
        columns: loginServicesListVo,
        /** 操作列宽度 */
        actionsWidth: 250
      },
      permission: ['view'],
      serviceIds: []
    }
  },
  methods: {
    /**
     * 入库
     */
    putStorage (record, type) {
      this.$confirm({
        title: `是否确定入库操作?`,
        onOk: async () => {
          try {
            if (type) {
              await iopServService.batchValide([record.serviceid])
            } else {
              await iopServService.batchValide(this.serviceIds)
            }
            MessageUtils.success()
            this.resetSearchForm()
            this.serviceIds = []
          } catch (error) {
            MessageUtils.error(error)
          }
        }
      })
    },

    /**
     * 切换目录
     */
    handleSwitchDirectory (record, type) {
      if (type) {
        this.serviceIds.push(record.id)
      }
      this.$refs.DirectoryModal.show()
    },

    handleSelected (serviceIds) {
      this.serviceIds = serviceIds
    },
    reload () {
      this.$refs.draftTable.reload()
      this.serviceIds = []
    },
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
        case 'onSelectedChange':
          this.handleSelected(data.original.selectedRowKeys)
          break
      }
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} id 主键
     */
    handleView (id = '') {
      if (this.status === '88' || this.status === '99') {
        iopAuthService.goPage(IOP_FORM_URL.SERV_ADMIN.SERVICE, {
          mode: 'view',
          serviceId: id
        })
      } else {
        iopAuthService.goPage(IOP_FORM_URL.SERV_CALL.INFO, {
          mode: 'view',
          serviceId: id
        })
      }
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
