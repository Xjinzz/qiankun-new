<template>
  <div>
    <iop-data-table
      ref="areaList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="区域编码">
              <a-input @pressEnter="search" placeholder="请输入区域编码" v-decorator="['areaCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="区域简称">
              <a-input @pressEnter="search" placeholder="请输入区域简称" v-decorator="['shortName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" :span="8">
            <a-form-item label="区域全称">
              <a-input @pressEnter="search" placeholder="请输入区域全称" v-decorator="['fullName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="advanced" >
            <a-form-item label="行政级别" style="margin-top: 20px">
              <iop-data-dict-select ref="areaLevel" type="areaLevel" v-decorator="['areaLevel']" />
            </a-form-item>
          </a-col>
          <a-col class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced()" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <area-tree ref="areaTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>

    <area-form
      ref="areaForm"
      :areaId="areaId"
      :parentId="parentId"
      :mode="formMode"
      @onSubmitSuccess="reloadNode"
    />
  </div>
</template>
<script>
import AreaTree from './AreaTree'
import AreaForm from './AreaForm'
import areaListVO from './vo/area-list-vo'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import MessageUtils from '@/utils/message'

export default {
  name: 'AreaList',
  components: { AreaTree, AreaForm, IopDataTable, IopDataDictSelect },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.system.area.index,
        /** rowKey，必填 */
        rowKey: 'areaId',
        /** 列定义 */
        columns: areaListVO
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      areaId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      parentId: ''
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
     * 查询
     */
    async search () {
      try {
        await this.$refs.areaList.search({ areaId: this.selectedNode })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.areaLevel.cleanSelected()
      this.$refs.areaList.resetSearch()
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.$refs.areaList.reload({
        areaId: key
      })
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
          this.reloadNode(data.extra)
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original.areaId)
          break
        case 'onEdit':
          this.handleEdit(data.original.areaId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} areaId 数据主键
     */
    reloadNode (record = {}) {
      this.$refs.areaTree.reloadNode(record.parentId)
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.areaId = ''
      this.parentId = this.selectedNode
      this.$refs.areaForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} areaId 主键
     */
    handleView (areaId = '') {
      this.formMode = 'view'
      this.areaId = areaId
      this.$refs.areaForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} areaId 主键
     */
    handleEdit (areaId = '') {
      this.formMode = 'edit'
      this.areaId = areaId
      this.$refs.areaForm.show()
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} areaIds 选中项的主键数组
     */
    handleRemoveSelected (areaIds = []) {
      let areaId
      if (areaIds.includes(this.selectedNode)) {
        areaId = this.selectedNode
      } else {
        areaId = areaIds[0]
      }
      this.reloadNode(areaId)
    }
  }
}
</script>
