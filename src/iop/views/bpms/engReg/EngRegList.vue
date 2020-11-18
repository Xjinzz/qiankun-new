<template>
  <div>
    <iop-data-table
      ref="engRegList"
      :table="table"
      :permission="permission"
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="12" :offset="6">
            <a-input-search
              allowClear
              enter-button="查询"
              @search="search"
              placeholder="请输入引擎名称" />
          </a-col>
        </a-row>
      </template>
    </iop-data-table>
    <eng-reg-form
      ref="engRegForm"
      :id="id"
      :mode="formMode"
      :submitSuccess="resetSearchForm"
    />
  </div>
</template>

<script>
import { IopDataTable, IopDataTreeSelect } from '@/iop/components'
import MessageUtils from '@/utils/message'
import path from '@/iop/api/index'
import engRegListVO from './vo/eng-reg-list-vo'
import EngRegForm from './EngRegForm'
export default {
  /** 流程引擎 */
  name: 'EngRegList',
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: path.bpms.engreg.index,
        /** rowKey，必填 */
        rowKey: 'id',
        /** 列定义 */
        columns: engRegListVO
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      formMode: 'create',
      /** 配置标识 */
      id: ''
    }
  },
  components: { IopDataTable, IopDataTreeSelect, EngRegForm },
  methods: {
    /**
     * 查询
     */
    async search (engName = '') {
      try {
        await this.$refs.engRegList.reload({ engName })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件并刷新
     */
    resetSearchForm () {
      this.$refs.engRegList.resetSearch()
      this.$refs.engRegList.reload()
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
          this.handleView(data.original.id)
          break
        case 'onEdit':
          this.handleEdit(data.original.id)
          break
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.id = ''
      // 先赋值，后显示
      this.$refs.engRegForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} id 主键
     */
    handleView (id = '') {
      this.formMode = 'view'
      this.id = id
      this.$refs.engRegForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} id 主键
     */
    handleEdit (id = '') {
      this.formMode = 'edit'
      this.id = id
      this.$refs.engRegForm.show()
    }

  }

}

</script>
<style>
</style>
