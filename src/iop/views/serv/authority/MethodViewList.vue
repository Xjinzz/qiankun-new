<template>
  <div>
    <iop-data-table ref="methodViewList" :table="table" :permission="permission" @onAction="onAction" :hiddenTop="true">
    </iop-data-table>
    <auth-method-form
      ref="authMethodForm"
      :methodId="$route.query.methodId"
      :serviceId="$route.query.serviceId"
      :authId="authId"
      :mode="formMode"
      :onModalHide="modelHide"
      :submitSuccess="submitSuccess"
    />
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import authMethodForm from './AuthMethodForm'

export default {
  name: 'MethodViewList',
  components: { IopDataTable, IopDataDictSelect, authMethodForm },
  props: {
    serviceId: {
      type: String,
      required: true,
      default: null
    },
    methodId: {
      type: String,
      required: true,
      default: null
    },
    mode: {
      type: String,
      required: false,
      default: 'create'
    }
  },
  data () {
    const methodViewListVo = [
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
        title: '授权类型',
        align: 'left',
        dataIndex: 'suthType',
        sorter: false,
        customRender: (val, row, ind) => {
          const typeArr = row.suthType.split(',').map(v => {
            if (v === '0') {
              return <a-tag color="purple">时段</a-tag>
            } else if (v === '1') {
              return <a-tag color="purple">次数</a-tag>
            } else if (v === '2') {
              return <a-tag color="purple">频次</a-tag>
            }
          })
          return typeArr
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
        // selectable: false,
        /** 列定义 */
        columns: methodViewListVo,
        query: {
          methodId: this.$route.query.methodId
        }
      },
      /** 表格组件按钮权限 */
      permission: this.mode === 'view' ? [] : ['remove', 'edit', 'create', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'view',
      /** 表单数据主键 */
      authId: ''
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
        case 'onCreate':
          this.handleCreate()
          break
        case 'onEdit':
          this.handleEdit(data.original.authId)
          break
        case 'onRemove':
          this.handleRemove()
          break
      }
    },
    /**
     * 方法授权
     */
    handleCreate () {
      // this.methodId = record.methodId
      this.formMode = 'create'
      this.$refs.authMethodForm.show()
    },
    handleEdit (id) {
      this.formMode = 'edit'
      this.authId = id
      this.$refs.authMethodForm.show()
    },
    handleRemove () {
      this.$refs.methodViewList.reload()
    },
    submitSuccess () {
      this.formMode = 'create'
      this.$refs.methodViewList.reload()
    },
    modelHide () {
      this.formMode = 'create'
      this.$refs.methodViewList.reload()
      this.$refs.authMethodForm.rest()
    }
  }
}
</script>
