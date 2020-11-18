<template>
  <div>
    <iop-data-table ref="mappingList" :table="table" :hiddenTop="true" :permission="permission">
      <template #editButton="{ record }">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
    </iop-data-table>
    <mapping-form
      v-if="showForm"
      ref="mappingForm"
      :mode="formMode"
      :storeId="storeId"
      :storeName="storeName"
      :storeCode="storeCode"
      :id="id"
      :submitSuccess="submitSuccess"
    />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import mappingListVO from './vo/mapping-list-vo'
import mappingForm from './MappingForm'
export default {
  name: 'MappingList',
  components: { IopDataTable, mappingForm },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: path.file.stores.mappingList,
        /** rowKey，必填 */
        rowKey: 'id',
        /** 列定义 */
        columns: mappingListVO,
        query: {
          storeId: ''
        },
        actionsWidth: 170
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      storeId: '',
      storeName: '',
      storeCode: '',
      rootPath: '',
      /** 表单数据主键 */
      id: '',
      showForm: true
    }
  },
  methods: {
    show (id, name, code, path, mode) {
      mode === 'view' ? this.permission = ['view'] : this.permission = ['create', 'edit', 'view', 'remove', 'removeSelected']
      this.storeId = id
      this.storeName = name
      this.storeCode = code
      this.table.query.storeId = id
      this.rootPath = path
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
        await this.$refs.mappingList.reload({ storeId: this.storeId })
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
      this.id = ''
      this.formMode = 'create'
      this.showFormStu()
    },

    /**
     * 打开查看窗口
     * @param {string} storeId 主键
     */
    async handleView (record) {
      this.formMode = 'view'
      this.id = record.id
      this.showFormStu()
    },
    async handleEdit (record) {
      this.formMode = 'edit'
      this.id = record.id
      this.showFormStu()
    },
    showFormStu () {
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
        this.$nextTick(() => {
          this.$refs.mappingForm.show(this.rootPath)
        })
      })
    }
  }
}
</script>
