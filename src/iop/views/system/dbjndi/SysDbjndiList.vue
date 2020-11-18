<template>
  <div>
    <iop-data-table ref="sysDbjndiList" :table="table" :permission="permission">
      <template #top>
        <a-form layout="inline">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="8">
              <a-form-item label="数据源名称">
                <a-input @pressEnter="search" v-model="queryParam.jndiName" placeholder="请输入数据源名称" allowClear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="用户名">
                <a-input @pressEnter="search" v-model="queryParam.loginName" placeholder="请输入用户名" allowClear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="数据库地址" v-show="advanced">
                <a-input @pressEnter="search" v-model="queryParam.connUrl" placeholder="请输入数据库地址" allowClear />
              </a-form-item>
            </a-col>
            <a-col :span="8" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
              <a-button type="primary" @click="search()">查询</a-button>
              <a-button @click="resetSearchForm()">重置</a-button>
              <a @click="toggleAdvanced()" style="margin-left: 8px">
                {{ advanced ? '收起' : '高级' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </a-col>
          </a-row>
        </a-form>
      </template>

      <template #editButton="{ record }">
        <a @click="handleEdit(record.jndiId)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record.jndiId)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
    </iop-data-table>

    <sys-dbjndi-form ref="sysDbjndiForm" :mode="formMode" :jndiId="jndiId" @onSubmitSuccess="submitSuccess" />
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api/index'
import SysDbjndiForm from './SysDbjndiForm'
import sysDbjndiListVO from './vo/sys-dbjndi-list-vo'

export default {
  name: 'SysDbjndiList',
  components: { IopDataTable, SysDbjndiForm },
  data () {
    return {
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.system.dbjndi.table,
        /** rowKey，必填 */
        rowKey: 'jndiId',
        /** 列定义 */
        columns: sysDbjndiListVO
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      jndiId: '',
      advanced: false
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
        await this.$refs.sysDbjndiList.reload(this.queryParam)
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
      this.$refs.sysDbjndiForm.show()
      // 清空表单项
      this.jndiId = ''
    },

    /**
     * 打开编辑窗口
     *
     * @param {string} jndiId 主键
     */
    async handleEdit (jndiId = '') {
      this.formMode = 'edit'
      this.$refs.sysDbjndiForm.show()
      this.jndiId = jndiId
    },

    /**
     * 打开查看窗口
     * @param {string} jndiId 主键
     */
    async handleView (jndiId = '') {
      this.formMode = 'view'
      this.$refs.sysDbjndiForm.show()
      this.jndiId = jndiId
    }
  }

}
</script>
