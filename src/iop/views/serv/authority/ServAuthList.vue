<template>
  <div>
    <iop-data-table ref="servAuthList" :table="table" :permission="permission" @onAction="onAction" :hiddenTop="true">
      <template #beforeRemoveSelectedButton>
        <a-button type="primary" @click="cleanAuth" :disabled="selectedFlag">清空授权</a-button>
        <a-button @click="goBack">返回</a-button>
      </template>
    </iop-data-table>
    <auth-form
      ref="authForm"
      :serviceId="$route.query.serviceId"
      :authId="authId"
      :mode="formMode"
      :onModalHide="modelHide"
      :submitSuccess="submitSuccess"
    />
    <auth-method-form
      ref="authMethodForm"
      :methodId="methodId"
      :authId="authId"
      :serviceId="$route.query.serviceId"
      :mode="formMode"
    />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import { iopServService } from '@/iop/service/index'
import AuthMethodForm from './AuthMethodForm'
import MessageUtils from '@/utils/message'
import path from '@/iop/api/index'
import authForm from './AuthForm'
export default {
  name: 'ServAuthList',
  components: { IopDataTable, authForm, AuthMethodForm },
  serviceId: {
    type: String,
    required: true,
    default: null
  },
  authType: {
    type: String,
    required: false,
    default: null
  },
  data () {
    const servMethodListVo = [
      {
        title: '系统名称',
        dataIndex: 'appId',
        align: 'center',
        sorter: false
      },
      {
        title: '所属单位',
        align: 'center',
        dataIndex: 'deptId',
        sorter: false
      },
      {
        title: '开放IP',
        align: 'left',
        dataIndex: 'openIp',
        sorter: false
      },
      {
        title: '授权方法',
        align: 'left',
        dataIndex: 'chName',
        sorter: false,
        customRender: (val, row, ind) => {
          if (row.chName) {
            return <span>{ row.chName }方法</span>
          }
        }
      }
    ]
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.system.serv.authIndex,
        /** rowKey，必填 */
        rowKey: 'authId',
        /** 不显示序号列 */
        serial: true,
        actions: this.$route.query.mode !== 'view',
        // selectable: false,
        /** 列定义 */
        columns: servMethodListVo,
        query: {
          serviceId: this.$route.query.serviceId
        }
      },
      /** 表格组件按钮权限 */
      permission: ['remove', 'edit', 'create'],
      /** 表单组件模式 */
      formMode: '',
      /** 表单数据主键 */
      authId: '',
      selectedFlag: true,
      methodId: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
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
        case 'onEdit':
          this.handleEdit(data.original)
          break
        case 'onRemove':
          this.handleRemove(data.original)
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onSelectedChange':
          this.selected(data.original)
          break
      }
    },
    handleRemove () {

    },
    // 清空授权
    async cleanAuth () {
      this.$confirm({
        title: '确定清空吗',
        onOk: async () => {
          try {
            await iopServService.batchDeleteAuth(this.selecteds)
            MessageUtils.success()
            this.$refs.servAuthList.reload()
          } catch (err) {
            MessageUtils.error(err)
          }
        }
      })
    },
    selected (data) {
      this.selecteds = data.selectedRowKeys
      if (data.selectedRowKeys.length > 0) {
        this.selectedFlag = false
      } else {
        this.selectedFlag = true
      }
    },
    /**
     * 点击查看按钮事件
     *
     *  @param {string} serviceId 主键
     */
    handleEdit (data) {
      this.formMode = 'edit'
      this.authId = data.authId
      if (!data.chName) {
        this.$refs.authForm.show()
      } else {
        this.methodId = data.methodId
        this.$refs.authMethodForm.show()
      }
    },
    handleCreate () {
      this.formMode = 'create'
      // this.serviceId =
      this.$refs.authForm.show()
    },
    submitSuccess () {
      this.$refs.servAuthList.reload()
    },
    modelHide () {
      this.formMode = 'create'
      this.$refs.servAuthList.reload()
      this.$refs.authForm.rest()
    }
  }
}
</script>
