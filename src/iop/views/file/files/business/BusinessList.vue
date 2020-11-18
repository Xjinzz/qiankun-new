<template>
  <div>
    <iop-data-table ref="businessList" :removeUrl="removeUrl" :table="table" :permission="permission" @onAction="onAction">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="文件标题">
              <a-input @pressEnter="search" v-model="queryParam.fileName" placeholder="请输入文件名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="文件编码">
              <a-input @pressEnter="search" v-model="queryParam.fileCode" placeholder="请输入文件编码" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button @click="resetSearchForm">重置</a-button>
          </a-col>
        </a-row>
      </template>
      <template #editButton="{ record }">
        <a href="javascript:;" @click="handleEdit(record)">编辑</a>
      </template>
    </iop-data-table>
    <businessForm ref="businessForm" :mode="formMode" @submitSuccess="submitSuccess"></businessForm>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import businessListVO from './vo/business-list-vo'
import businessForm from './BusinessForm'
import files from '@/iop/service/file/files'
export default {
  name: 'BusinessList',
  components: { IopDataTable, businessForm },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: path.file.files.businessList,
        /** rowKey，必填 */
        rowKey: 'fileId',
        /** 列定义 */
        columns: businessListVO,
        actionsWidth: 170,
        query: {
          filePath: '/'
        }
      },
      removeUrl: path.file.files.filesDelete,
      queryParam: {
        filePath: '',
        fileName: ''
      },
      /** 表格组件按钮权限 */
      // permission: ['create', 'edit', 'remove', 'removeSelected'],
      permission: ['edit'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      fileId: '',
      selcetOne: true,
      selectedRowKeys: []
    }
  },
  methods: {
    show (code) {
      if (this.selcetOne) {
        this.queryParam = { filePath: code, fileName: '' }
        this.selcetOne = !this.selcetOne
        this.search()
      } else {
        this.queryParam = { filePath: code, fileName: '' }
        this.search()
      }
    },
    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      const code = this.queryParam.filePath
      this.queryParam = {}
      this.queryParam = { filePath: code }
      this.search()
    },
    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.businessList.reload(this.queryParam)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 表单保存成功回调
     */
    submitSuccess () {
      this.search()
      this.$emit('reloadNode')
    },
    /**
     * 表格选中
     */
    onAction ({ data = {} }) {
      this.selectedRowKeys = data.original.selectedRowKeys
    },
    /**
     * 查看
     */
    handleView (record) {
      this.formMode = 'view'
      this.$refs.businessForm.show(record.fileId)
    },
    /**
     * 新增
     */
    handleCreate () {
    },
    /**
     * 编辑
     */
    handleEdit (record) {
      this.formMode = 'edit'
      this.$refs.businessForm.show(record.fileId)
    },
    /**
     * 删除
     */
    handleRemove (record) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          files.filesDelete({ filePaths: record.filePath }).then((res) => {
            this.search()
          })
        }
      })
    },
    // 批量删除
    handleRemoveSelected () {
      this.$confirm({
        title: `确定删除吗`,
        onOk: () => {
          files.filesDelete({ filePaths: this.selectedRowKeys }).then((res) => {
            this.search()
          })
        }
      })
    }
  }
}
</script>
