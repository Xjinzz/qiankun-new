<template>
  <div>
    <iop-data-table ref="ctlgsList" :table="table" :autoLoad="autoLoad" :hiddenTop="true" :permission="permission">
      <template #viewButton="{ record }">
        <a @click="handleView(record)">查看</a>
      </template>
      <template #createButton>
        <a-button type="primary" @click="handleCreate()">关联逻辑库</a-button>
      </template>
    </iop-data-table>
    <tree-up ref="treeUp" @search="search"></tree-up>
    <CatalogsForm ref="catalogsForm"></CatalogsForm>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import ctlgsListVO from './vo/ctlgs-list-vo'
import treeUp from './TreeUp'
import CatalogsForm from '../../docManage/catalogs/CatalogsForm'
export default {
  name: 'CtlgsList',
  components: { IopDataTable, treeUp, CatalogsForm },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: '',
        /** rowKey，必填 */
        rowKey: 'ctlgId',
        /** 列定义 */
        columns: ctlgsListVO
      },
      autoLoad: false,
      /** 表格组件按钮权限 */
      permission: ['create', 'view'],
      /** 表单组件模式 */
      formMode: 'view',
      /** 表单数据主键 */
      ctlgId: '',
      typeId: ''
    }
  },
  methods: {
    show (id, mode) {
      mode === 'view' ? this.permission = ['view'] : this.permission = ['create', 'view']
      this.typeId = id
      this.table.url = `${path.file.types.ctlgsList}/${this.typeId}`
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
        await this.$refs.ctlgsList.reload()
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
      this.$refs.treeUp.show(this.typeId)
    },

    /**
     * 打开查看窗口
     * @param {string} ctlgId 主键
     */
    async handleView (record) {
      this.formMode = 'view'
      this.$refs.catalogsForm.show(record.ctlgId)
    }
  }
}
</script>
