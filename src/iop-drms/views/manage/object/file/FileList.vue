<template>
  <div style="padding: 24px;background:#fff">
    <iop-data-table ref="fileList" :table="table" :permission="permission">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="文件目录">
              <a-input v-model="queryParam.storeName" placeholder="请输入文件目录" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="编码">
              <a-input v-model="queryParam.storeCode" placeholder="请输入编码" allowClear />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="业务表名">
                <a-input v-model="queryParam.busiTable" placeholder="请输入业务表名" allowClear />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>

      <template #editButton="{ record }">
        <a @click="handleEdit(record.storeId)">下载</a>
      </template>
    </iop-data-table>

  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop-drms/api'
import fileListVO from './vo/file-list-vo'

export default {
  name: 'FileList',
  props: {
    objectId: {
      type: String,
      required: true,
      default: ''
    }
  },
  components: { IopDataTable },
  computed: {
    normalizedSize: function () {
      return this.objectId.trim().toLowerCase()
    }
  },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.manage.object.file + `/${this.objectId}`,
        /** rowKey，必填 */
        rowKey: 'storeId',
        /** 列定义 */
        columns: fileListVO,
        query: { objectId: this.objectId }
      },
      /** 表格组件按钮权限 */
      permission: ['edit'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      storeId: ''
    }
  },
  methods: {
    /**
     * 显示/隐藏高级搜索
     */
    toggleAdvanced () {
      this.advanced = !this.advanced
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
        await this.$refs.fileList.reload(this.queryParam)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 下载
     *
     * @param {string} storeId 主键
     */
    async handleEdit (storeId = '') {
    }
  }
}
</script>
