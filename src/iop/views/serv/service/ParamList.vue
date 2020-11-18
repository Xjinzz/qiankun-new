<template>
  <div>
    <iop-data-table ref="paramList" :table="table" :permission="permission" @onAction="onAction" :hiddenTop="true">
      <template #afterRemoveSelectedButton>
        <a-button @click="goBack">返回</a-button>
      </template>
    </iop-data-table>

    <param-form
      ref="paramForm"
      :paraId="paraId"
      :methodId="$route.query.methodId"
      :mode="formMode"
      :submitSuccess="reloadNode"
    >
    </param-form>
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import ParamForm from './ParamForm'

/** 点击树节点查询列表参数名 */
export default {
  name: 'ParamList',
  components: { IopDataTable, IopDataDictSelect, ParamForm },
  data () {
    const paramListVO = [
      {
        title: '参数名称',
        dataIndex: 'paraName',
        align: 'left',
        sorter: false
      },
      {
        title: '可选值清单',
        align: 'left',
        dataIndex: 'valDef',
        sorter: false
        // customRender: (text) => {
        //   return (
        //     <p style="max-width:100px;word-break:break-all">
        //       {{ text }}
        //     </p>
        //   )
        // }
      },
      {
        title: '参数说明',
        align: 'left',
        dataIndex: 'remark',
        sorter: false
      },
      {
        title: '参数类型',
        align: 'left',
        dataIndex: 'paraType',
        sorter: false,
        customRender: (val, row, ind) => {
          return <a-tag color="pink">{ row.paraType }</a-tag>
        }
      }
    ]
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.system.serv.paramsIndex,
        /** rowKey，必填 */
        rowKey: 'paraId',
        /** 不显示序号列 */
        serial: true,
        selectable: this.$route.query.mode !== 'view',
        /** 列定义 */
        columns: paramListVO,
        query: {
          methodId: this.$route.query.methodId
        }
      },
      /** 表格组件按钮权限 */
      permission: this.$route.query.mode === 'view' ? ['view'] : ['create', 'view', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      paraId: ''
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
          this.handleView(data.original.paraId)
          break
        case 'onEdit':
          this.handleEdit(data.original.paraId)
          break
      }
    },

    reloadNode (paraId) {
      this.$refs.paramList.reload()
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.paraId = ''
      this.$refs.paramForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} serviceId 主键
     */
    handleView (paraId = '') {
      this.formMode = 'view'
      this.paraId = paraId
      this.$refs.paramForm.show()
    },
    /**
     * 点击编辑
     */
    handleEdit (paraId = '') {
      this.formMode = 'edit'
      this.paraId = paraId
      this.$refs.paramForm.show()
    }
  }
}
</script>
