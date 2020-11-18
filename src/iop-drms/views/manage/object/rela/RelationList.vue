<template>
  <div style="padding: 24px;background:#fff">
    <iop-data-table ref="relationList" :hiddenTop="true" :autoLoad="false" :table="table" :permission="permission">
      <template #editButton="{ record }">
        <a @click="handleEdit(record.relationId)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record.relationId)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
    </iop-data-table>

    <relation-form
      ref="relationForm"
      :mode="formMode"
      :objectId="objectId"
      :relationId="relationId"
      :submitSuccess="submitSuccess"
    />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop-drms/api'
import RelationForm from './RelationForm'
import relationListVO from './vo/relation-list-vo'

export default {
  name: 'RelationList',
  props: {
    objectName: {
      type: String,
      required: true,
      default: ''
    }
  },
  components: { IopDataTable, RelationForm },
  data () {
    return {
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.manage.rela.allList,
        /** rowKey，必填 */
        rowKey: 'relationId',
        /** 列定义 */
        columns: relationListVO,
        actionsWidth: 200,
        query: { objectId: this.objectId }
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      relationId: '',
      objectId: ''
    }
  },
  methods: {
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
        await this.$refs.relationList.reload(Object.assign(this.queryParam, { objectId: this.objectId }))
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
      // 改变弹出框标题
      this.formMode = 'create'
      // 显示弹出框
      this.$refs.relationForm.show()
      this.$refs.relationForm.formUrl = `/iop/drms/object/tree-other?objectId=${this.objectId}`
      // 清空表单项
      this.relationId = ''
    },

    /**
     * 打开编辑窗口
     *
     * @param {string} relationId 主键
     */
    async handleEdit (relationId = '') {
      this.formMode = 'edit'
      this.$refs.relationForm.show()
      this.$refs.relationForm.formUrl = `/iop/drms/object/tree-other?objectId=${this.objectId}`
      this.relationId = relationId
    },

    /**
     * 打开查看窗口
     * @param {string} relationId 主键
     */
    async handleView (relationId = '') {
      this.formMode = 'view'
      this.$refs.relationForm.show()
      this.$refs.relationForm.formUrl = `/iop/drms/object/tree-other?objectId=${this.objectId}`
      this.relationId = relationId
    },
    getList (objectId) {
      this.objectId = objectId
      this.$refs.relationList.reload({ objectId: objectId })
    },
    relaClick (record) {
    }
  }
}
</script>
