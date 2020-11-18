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
      <template #rowButtons="{ record }">
        <a @click="handleView(record.id)">查看</a>
        <!-- 未审核的状态是99 -->
        <template v-if="status=='99' && mode!=='view'">
          <a-divider type="vertical" />
          <a @click="methodAuth(record,'99')">授权</a>
          <a-divider type="vertical" />
          <a @click="createToken(record,false)">生成token</a>
        </template>
        <!-- 已审核的状态是88 -->
        <template v-if="status=='88' && mode!=='view'">
          <a-divider type="vertical" />
          <a @click="methodAuth(record,'88')">查看授权</a>
          <a-divider type="vertical" />
          <a @click="createToken(record,true)">查看token</a>
        </template>

        <a-divider v-if="status=='0'" type="vertical" />
        <a v-if="status=='0' && mode!=='view'" @click="handleRemove(record)">删除</a>
      </template>
    </iop-data-table>
    <auth-form
      ref="authForm"
      :serviceId="serviceId"
      :status="status"
      :authId="authId"
      :appId="appId"
      :applyId="applyId"
      :mode="formMode"
      :onModalHide="modelHide"
      :submitSuccess="submitSuccess"
    />
    <token-model
      ref="tokenModel"
      :serviceId="serviceId"
      :authId="authId"
      :applyId="applyId"
      :appId="appId"
      :type="type"
    />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import callServicesListVo from '../vo/call-service-list-vo'
import path from '@/iop/api/index'
import { iopAuthService, iopServApplyService } from '@/iop/service'
import { IOP_FORM_URL } from '@/iop/constants'
import authForm from '@/iop/views/serv/authority/AuthForm'
import TokenModel from './TokenModal'
import MessageUtils from '@/utils/message'

export default {
  name: 'DraftTable',
  components: { IopDataTable, authForm, TokenModel },
  props: {
    /** 表格组件按钮权限 */
    id: {
      type: String,
      required: true
    },
    appId: {
      type: String,
      required: false,
      default: ''
    },
    applyId: {
      type: String,
      required: false,
      default: ''
    },
    status: {
      type: String,
      required: false,
      default: ''
    },
    mode: {
      type: String,
      required: false,
      default: 'edit'
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
        columns: callServicesListVo,
        /** 操作列宽度 */
        actionsWidth: 250
      },
      permission: ['view'],
      formMode: 'view',
      /** 表单数据主键 */
      serviceId: '',
      /** 权限id */
      authId: '',
      /** token组件的状态 */
      type: ''
    }
  },
  methods: {
    /**
     * 生产token
     */

    createToken (record, type) {
      if (record.authId) {
        this.serviceId = record.id
        this.authId = record.authId
        this.type = type
        this.$nextTick(() => {
          this.$refs.tokenModel.show()
        })
      } else {
        this.$message.warning('请先授权！')
      }
    },

    /**
     * 授权
     */
    methodAuth (record, type) {
      if (record.authId) {
        this.authId = record.authId
        if (type === '99') {
          this.formMode = 'edit'
        } else {
          this.formMode = 'view'
        }
      } else {
        this.formMode = 'create'
      }
      this.serviceId = record.id
      this.$refs.authForm.show()
    },

    submitSuccess () {
      this.$refs.draftTable.reload()
    },
    modelHide () {
      this.formMode = 'create'
      this.$refs.draftTable.reload()
      this.$refs.authForm.rest()
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
            MessageUtils.success('操作成功')
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
