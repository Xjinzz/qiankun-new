<template>
  <div>
    <iop-data-table ref="typesList" :table="table" :hiddenTop="true" :autoLoad="false" :permission="permission">
      <template #viewButton="{ record }">
        <a @click="handleView(record)">查看</a>
      </template>
      <template #createButton>
        <a-button type="primary" @click="handleCreate()">关联文档类型</a-button>
      </template>
    </iop-data-table>
    <tree-up ref="treeUp" @search="search"></tree-up>
    <types-form ref="typesForm"></types-form>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import typesListVO from './vo/types-list-vo'
import treeUp from './TreeUp'
import TypesForm from '../../types/basics/Basics'
export default {
  name: 'TypesList',
  components: { IopDataTable, treeUp, TypesForm },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: '',
        /** rowKey，必填 */
        rowKey: 'typeId',
        /** 列定义 */
        columns: typesListVO,
        actionsWidth: 100
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view'],
      /** 表单组件模式 */
      formMode: 'view',
      /** 表单数据主键 */
      typeId: '',
      storeId: ''
    }
  },
  methods: {
    show (id, mode) {
      mode === 'view' ? this.permission = ['view'] : this.permission = ['create', 'view']
      this.storeId = id
      this.table.url = `${path.file.stores.typeList}/${this.storeId}`
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
        await this.$refs.typesList.reload()
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
     * 打开关联逻辑库
     */
    handleCreate () {
      this.$refs.treeUp.show(this.storeId)
    },

    /**
     * 打开查看窗口
     * @param {string} typeId 主键
     */
    async handleView (record) {
      this.formMode = 'view'
      this.$refs.typesForm.show('view', record.typeId, true)
    }
  }
}
</script>
