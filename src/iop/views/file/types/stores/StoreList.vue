<template>
  <div>
    <iop-data-table ref="storeList" :table="table" :autoLoad="autoLoad" :hiddenTop="true" :permission="permission">
      <template #viewButton="{ record }">
        <a @click="handleView(record)">查看</a>
      </template>
      <template #createButton>
        <a-button type="primary" @click="handleCreate()">关联物理库</a-button>
      </template>
    </iop-data-table>
    <store-form
      ref="storeForm"
      :mode="formMode"
      :submitSuccess="submitSuccess"
    />
    <tree-up ref="treeUp" @search="search"></tree-up>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import storeListVO from './vo/store-list-vo'
import treeUp from './TreeUp'
import storeForm from '../../stores/basics/Basics'
export default {
  name: 'StoreList',
  components: { IopDataTable, storeForm, treeUp },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: '',
        /** rowKey，必填 */
        rowKey: 'storeId',
        /** 列定义 */
        columns: storeListVO
      },
      autoLoad: false,
      /** 表格组件按钮权限 */
      permission: ['create', 'view'],
      /** 表单组件模式 */
      formMode: 'view',
      /** 表单数据主键 */
      typeId: ''
    }
  },
  methods: {
    show (id, mode) {
      mode === 'view' ? this.permission = ['view'] : this.permission = ['create', 'view']
      this.typeId = id
      this.table.url = `${path.file.types.storeList}/${this.typeId}`
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
        await this.$refs.storeList.reload()
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
      this.$refs.treeUp.show(this.typeId)
    },

    /**
     * 打开查看窗口
     * @param {string} typeId 主键
     */
    async handleView (record) {
      this.formMode = 'view'
      this.$refs.storeForm.show(this.formMode, record.storeId, true)
      this.typeId = record.typeId
    }
  }
}
</script>
