<template>
  <div>
    <iop-data-table ref="refedList" :table="table" :autoLoad="autoLoad" :permission="permission">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="文件标题">
              <a-input v-model="queryParam.fileTitle" placeholder="请输入文件标题" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="文件编号">
              <a-input v-model="queryParam.fileCode" placeholder="请输入文件编号" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import refedListVO from './vo/refed-list-vo'
export default {
  name: 'LifecycleList',
  components: { IopDataTable },
  props: {
    fileId: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: path.file.files.refedList,
        /** rowKey，必填 */
        rowKey: 'recordId',
        /** 列定义 */
        columns: refedListVO,
        actions: false,
        query: {}
      },
      queryParam: {},
      /** 表格组件按钮权限 */
      permission: [],
      /** 表单组件模式 */
      formMode: 'edit',
      /** 表单数据主键 */
      recordId: '',
      autoLoad: false
    }
  },
  methods: {
    show (id) {
      this.queryParam.fileId = this.fileId
      this.search()
    },
    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      this.queryParam = { fileId: this.fileId }
      this.search()
    },
    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.refedList.reload(this.queryParam)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 表单保存成功回调
     */
    submitSuccess () {
      this.search()
    }
  }
}
</script>
