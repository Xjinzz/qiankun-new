<template>
  <div>
    <iop-data-table ref="rulesList" :table="table" :permission="permission">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则名称">
              <a-input @pressEnter="search" v-model="queryParam.rolrName" placeholder="请输入规则名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="适用对象">
              <iop-data-dict-select @change="onChange" ref="rolrObject" type="rolrObject"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>
      <template #editButton="{ record }">
        <a @click="handleEdit(record.rolrId)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record.rolrId)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
    </iop-data-table>
    <rules-form ref="rulesForm" :mode="formMode" :rolrId="rolrId" :submitSuccess="submitSuccess" />
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop-drms/api'
import RulesForm from './RulesForm'
import rulesListVO from './vo/rules-list-vo'

export default {
  name: 'RulesList',
  components: { IopDataTable, RulesForm, IopDataDictSelect },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.manage.rules.allList,
        /** rowKey，必填 */
        rowKey: 'rolrId',
        /** 列定义 */
        columns: rulesListVO
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      rolrId: ''
    }
  },
  methods: {
    onChange (value) {
      this.queryParam.rolrObject = value
    },
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
      this.$refs.rolrObject.cleanSelected()
      this.search()
    },

    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.rulesList.reload(this.queryParam)
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
      this.$refs.rulesForm.show('新增')
      // 清空表单项
      this.rolrId = ''
    },

    /**
     * 打开编辑窗口
     *
     * @param {string} rolrId 主键
     */
    async handleEdit (rolrId = '') {
      this.formMode = 'edit'
      this.$refs.rulesForm.show()
      this.rolrId = rolrId
    },

    /**
     * 打开查看窗口
     * @param {string} rolrId 主键
     */
    async handleView (rolrId = '') {
      this.formMode = 'view'
      this.$refs.rulesForm.show('查看')
      this.rolrId = rolrId
    }
  }

}
</script>
