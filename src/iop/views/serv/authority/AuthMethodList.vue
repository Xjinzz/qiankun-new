<template>
  <div>
    <iop-data-table ref="authMethodList" :table="table" :permission="permission" @onAction="onAction" :hiddenTop="true">
      <template #afterRemoveButton="data">
        <a @click="methodAuth(data.record)">授权</a>
      </template>
    </iop-data-table>
    <auth-method-form
      ref="authMethodForm"
      :methodId="methodId"
      :serviceId="$route.query.serviceId"
      :mode="formMode"
    />
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import authMethodForm from './AuthMethodForm'

/** 点击树节点查询列表参数名 */
// const tableQueryName = 'parentId'
export default {
  name: 'AuthMethodList',
  components: { IopDataTable, IopDataDictSelect, authMethodForm },
  props: {
    serviceId: {
      type: String,
      required: true,
      default: null
    },
    authType: {
      type: String,
      required: true,
      default: null
    }
  },
  data () {
    const authMethodListVo = [
      {
        title: '方法名称',
        dataIndex: 'chName',
        align: 'center',
        sorter: false
      },
      {
        title: '方法调用名',
        align: 'center',
        dataIndex: 'methodName',
        sorter: false
      },
      {
        title: '方法说明',
        align: 'left',
        dataIndex: 'remark',
        sorter: false
      },
      {
        title: '授权状态',
        align: 'left',
        dataIndex: 'isValide',
        sorter: false,
        customRender: (val, row, ind) => {
          return <span>{row.isAuth} <a-badge count={row.authCount} color="#52c41a'" /></span>
        }
      }
    ]
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.system.serv.methodIndex,
        /** rowKey，必填 */
        rowKey: 'methodId',
        /** 不显示序号列 */
        serial: true,
        actions: this.$route.query.mode !== 'view',
        selectable: false,
        /** 列定义 */
        columns: authMethodListVo,
        query: {
          serviceId: this.$route.query.serviceId
        }
      },
      /** 表格组件按钮权限 */
      permission: ['view'],
      /** 表单组件模式 */
      formMode: 'view',
      /** 表单数据主键 */
      methodId: ''
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
          this.handleView(data.original.methodId)
          break
      }
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} serviceId 主键
     */
    handleView (methodId = '') {
      this.formMode = 'view'
      this.methodId = methodId
      this.$refs.authMethodList.goPage(`serv/authority/authMethodView`, {
        mode: this.formMode,
        methodId: this.methodId,
        serviceId: this.$route.query.serviceId,
        authType: this.authType
      })
    },
    /**
     * 方法授权
     */
    methodAuth (record) {
      this.methodId = record.methodId
      this.formMode = 'create'
      this.$refs.authMethodForm.show()
    }
  }
}
</script>
