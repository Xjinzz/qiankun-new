<template>
  <div>
    <iop-data-table ref="methodList" :table="table" :permission="permission" @onAction="onAction" :hiddenTop="true">
      <template #afterRemoveButton="data" v-if="$route.query.mode !== 'view'">
        <a-divider type="vertical" />
        <a @click="paramsDef(data.record)">参数定义</a>
      </template>
      <template #afterRemoveSelectedButton>
        <a-button @click="goBack">返回</a-button>
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import { IOP_FORM_URL } from '@/iop/constants'

export default {
  name: 'ServiceList',
  components: { IopDataTable, IopDataDictSelect },
  data () {
    const methodListVO = [
      {
        title: '方法名称',
        dataIndex: 'chName',
        align: 'left',
        sorter: false
      },
      {
        title: '方法调用名',
        align: 'left',
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
        title: '是否启用',
        align: 'left',
        dataIndex: 'isValide',
        sorter: false,
        customRender: (val, row, ind) => {
          if (row.isValide === '0') {
            return <a-tag color="pink">未启用</a-tag>
          } else {
            return <a-tag color="purple">已启用</a-tag>
          }
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
        selectable: this.$route.query.mode !== 'view',
        /** 列定义 */
        columns: methodListVO,
        query: {
          serviceId: this.$route.query.serviceId
        }
      },
      /** 表格组件按钮权限 */
      permission: this.$route.query.mode === 'view' ? ['view'] : ['create', 'view', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
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
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original.methodId)
          break
        case 'onEdit':
          this.handleEdit(data.original.methodId)
          break
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate (methodId = '') {
      this.formMode = 'create'
      this.$goPage(`serv/service/methodDef`, {
        mode: this.formMode,
        serviceId: this.$route.query.serviceId,
        methodId: this.$route.query.serviceId
      })
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} serviceId 主键
     */
    handleView (methodId = '') {
      this.formMode = 'view'
      this.methodId = methodId
      if (this.$route.path !== '/iop/serv/call/info') {
        this.$goPage(`serv/service/methodDef`, {
          mode: this.formMode,
          serviceId: this.$route.query.serviceId,
          methodId: this.methodId
        })
      } else {
        this.$goPage(IOP_FORM_URL.SERV_CALL.METHOD, {
          mode: this.formMode,
          serviceId: this.$route.query.serviceId,
          methodId: this.methodId
        })
      }
    },
    /**
     * 点击编辑
     */
    handleEdit (methodId = '') {
      this.formMode = 'edit'
      this.methodId = methodId
      this.$goPage(`serv/service/methodDef`, {
        mode: this.formMode,
        methodId: this.methodId,
        serviceId: this.$route.query.serviceId
      })
    },
    /**
     * 点击参数定义
     */
    paramsDef (record) {
      this.methodId = record.methodId
      this.$goPage(`serv/service/paramList`, {
        methodId: this.methodId
      })
    }
  }
}
</script>
