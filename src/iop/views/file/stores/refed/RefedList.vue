<template>
  <div>
    <iop-data-table
      ref="refedList"
      :table="table"
      :removeUrl="removeUrl"
      :hiddenTop="true"
      :autoLoad="false"
      :permission="permission"
    >
      <template #viewButton="{ record }">
        <a @click="handleView(record)">查看</a>
        <a-divider type="vertical" />
      </template>
    </iop-data-table>
    <pubForm ref="pubForm" :cfgId="cfgId" :mode="formMode"></pubForm>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import refedListVO from './vo/refed-list-vo'
import pubForm from '../../publishCfg/PublishCfgForm'
export default {
  name: 'RefedList',
  components: { IopDataTable, pubForm },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: '',
        /** rowKey，必填 */
        rowKey: 'cfgId',
        /** 列定义 */
        columns: refedListVO
      },
      /** 表格组件按钮权限 */
      permission: ['remove', 'view'],
      /** 表单组件模式 */
      formMode: 'view',
      /** 表单数据主键 */
      cfgId: '',
      storeId: '',
      removeUrl: path.file.stores.refedRemove
    }
  },
  methods: {
    show (id, mode) {
      mode === 'view' ? this.permission = ['view'] : this.permission = ['remove', 'view']
      this.storeId = id
      this.table.url = `${path.file.stores.refedList}/${this.storeId}`
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
        await this.$refs.refedList.reload()
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
     * 打开查看窗口
     * @param {string} cfgId 主键
     */
    async handleView (record) {
      this.cfgId = record.cfgId
      this.formMode = 'view'
      this.$refs.pubForm.show()
    }
  }
}
</script>
