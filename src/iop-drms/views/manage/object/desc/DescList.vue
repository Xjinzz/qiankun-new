<template>
  <div class="descBox" style="padding: 24px;background:#fff">
    <iop-data-table ref="descList" :table="table" :autoLoad="false" :permission="permission">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="采用标准">
              <a-input v-model="queryParam.descStandard" placeholder="请输入采用标准" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="适用范围">
              <a-input v-model="queryParam.descRanger" placeholder="请输入适用范围" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #editButton="{ record }">
        <a @click="handleEdit(record.descId)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record.descId)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
    </iop-data-table>

    <desc-form ref="descForm" :mode="formMode" :descId="descId" :submitSuccess="submitSuccess" />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop-drms/api'
import DescForm from './DescForm'

export default {
  name: 'DescList',
  components: { IopDataTable, DescForm },
  data () {
    return {
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.manage.desc.allList,
        /** rowKey，必填 */
        rowKey: 'descId',
        /** 列定义 */
        columns: [
          {
            title: '采用标准',
            dataIndex: 'descStandard'
          },
          {
            title: '适用范围',
            dataIndex: 'descRanger'
          },
          {
            title: '规则说明',
            dataIndex: 'descRorls',
            customRender: (text) => {
              return <p style="max-width:200px;">{ text }</p>
            }
          }
        ],
        query: { objectId: this.objectId }
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      descId: '',
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
        await this.$refs.descList.reload(Object.assign(this.queryParam, { objectId: this.objectId }))
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
      this.$refs.descForm.show('新增')
      // 清空表单项
      this.descId = ''
      this.$refs.descForm.objectId = this.objectId
    },

    /**
     * 打开编辑窗口
     *
     * @param {string} descId 主键
     */
    async handleEdit (descId = '') {
      this.formMode = 'edit'
      this.$refs.descForm.show('编辑')
      this.descId = descId
      this.$refs.descForm.objectId = this.objectId
    },

    /**
     * 打开查看窗口
     * @param {string} descId 主键
     */
    async handleView (descId = '') {
      this.formMode = 'view'
      this.$refs.descForm.show('查看')
      this.descId = descId
    },
    getList (objectId) {
      this.objectId = objectId
      this.$refs.descList.reload({ objectId: objectId })
    }
  }
}
</script>
