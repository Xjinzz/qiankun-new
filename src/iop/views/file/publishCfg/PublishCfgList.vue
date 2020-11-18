<template>
  <div>
    <iop-data-table
      ref="publishCfgList"
      :table="table"
      :permission="permission"
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="配置名称">
              <a-input @pressEnter="search" placeholder="请输入配置名称" allowClear :maxLength="100" v-decorator="['cfgName']" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="源文件库名称">
              <a-input @pressEnter="search" placeholder="请输入源文件库名称" allowClear :maxLength="100" v-decorator="['storeName']" />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>
    </iop-data-table>
    <publish-cfg-form
      ref="publishCfgForm"
      :cfgId="cfgId"
      :mode="formMode"
      :submitSuccess="resetSearchForm"
    />
  </div>
</template>

<script>
import { IopDataTable, IopDataTreeSelect } from '@/iop/components'
import MessageUtils from '@/utils/message'
import path from '@/iop/api/index'
import publishCfgListVO from './vo/publish-cfg-list-vo'
import PublishCfgForm from './PublishCfgForm'
export default {
  /** 数据发布组件 */
  name: 'PublishCfgList',
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: path.file.publishCfg.table,
        /** rowKey，必填 */
        rowKey: 'cfgId',
        /** 列定义 */
        columns: publishCfgListVO
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      formMode: 'create',
      /** 配置标识 */
      cfgId: ''
    }
  },
  components: { IopDataTable, IopDataTreeSelect, PublishCfgForm },
  methods: {
    /**
     * 查询
     */
    async search () {
      try {
        await this.$refs.publishCfgList.search()
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件并刷新
     */
    resetSearchForm () {
      this.$refs.publishCfgList.resetSearch()
      this.$refs.publishCfgList.reload()
    },

    /**
     * 监听表格事件
     *
     * @param {string} name 事件名称
     * @param {Object} data 数据
     * @param {string} data.original 数据id
     */
    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onRemove':
          this.resetSearchForm()
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original.cfgId)
          break
        case 'onEdit':
          this.handleEdit(data.original.cfgId)
          break
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.cfgId = ''
      // 先赋值，后显示
      this.$refs.publishCfgForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} cfgId 主键
     */
    handleView (cfgId = '') {
      this.formMode = 'view'
      this.cfgId = cfgId
      this.$refs.publishCfgForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} cfgId 主键
     */
    handleEdit (cfgId = '') {
      this.formMode = 'edit'
      this.cfgId = cfgId
      this.$refs.publishCfgForm.show()
    }

  }

}

</script>
<style>
</style>
