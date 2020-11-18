<template>
  <div>
    <iop-data-table ref="lifecycleList" :table="table" :hiddenTop="true" :permission="permission">
      <template #editButton="{ record }">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record)">查看</a>
        <a-divider type="vertical" v-show="mode !== 'view'"/>
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
    </iop-data-table>
    <lifecycle-form
      ref="lifecycleForm"
      :mode="formMode"
      :typeId="typeId"
      :typeName="typeName"
      :id="id"
      :submitSuccess="submitSuccess"
    />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
// import lifecycleListVO from './vo/lifecycle-list-vo'
import lifecycleForm from './LifecycleForm'
import files from '@/iop/service/file/types'
export default {
  name: 'LifecycleForm',
  components: { IopDataTable, lifecycleForm },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: path.file.types.lifecycle,
        /** rowKey，必填 */
        rowKey: 'id',
        /** 列定义 */
        columns: [
          {
            title: '生命周期名称',
            dataIndex: 'name',
            sorter: false
          },
          {
            title: '生命周期编码',
            dataIndex: 'code',
            sorter: false
          },
          {
            title: '节点来源',
            dataIndex: 'sourceType',
            sorter: false
          },
          {
            title: '排序号码',
            dataIndex: 'orderNum',
            sorter: false
          },
          {
            title: '备注',
            dataIndex: 'remark',
            sorter: false
          },
          {
            title: '是否版本',
            dataIndex: 'isVersion',
            sorter: false,
            customRender: (val, row, ind) => {
              return <a-switch disabled={this.mode === 'view'} defaultChecked = { row.isVersion !== '0' } onChange = { () => { this.releClick(event, row) } } />
            }
          }
        ],
        query: {
          typeId: ''
        }
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      typeId: '',
      /** 表单数据主键 */
      id: '',
      typeName: '',
      mode: ''
    }
  },
  methods: {
    show (id, name, mode) {
      this.mode = mode
      mode === 'view' ? this.permission = ['view'] : this.permission = ['create', 'edit', 'view', 'remove', 'removeSelected']
      this.typeId = id
      this.typeName = name
      this.search()
    },
    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      this.queryParam = {}
      this.search()
    },
    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.lifecycleList.reload({ typeId: this.typeId })
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 表单保存成功回调
     */
    submitSuccess () {
      this.search()
    },

    /**
     * 打开新建窗口
     */
    handleCreate () {
      this.formMode = 'create'
      this.$refs.lifecycleForm.show()
    },

    /**
     * 打开查看窗口
     * @param {string} typeId 主键
     */
    async handleView (record) {
      this.formMode = 'view'
      this.$refs.lifecycleForm.show()
      this.id = record.id
    },
    async handleEdit (record) {
      this.formMode = 'edit'
      this.$refs.lifecycleForm.show()
      this.id = record.id
    },
    releClick (event, row) {
      files.lifeSwitch(row.id, { status: row.isVersion === '1' ? '0' : '1' }).then((res) => {
        this.search()
      })
    }
  }
}
</script>
