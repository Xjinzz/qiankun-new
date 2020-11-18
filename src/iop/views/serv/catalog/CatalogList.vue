<template>
  <div>
    <iop-data-table
      ref="catalogList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="服务目录编码">
              <a-input @pressEnter="search" placeholder="请输入服务目录编码" v-decorator="['serviceCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="服务目录名称">
              <a-input @pressEnter="search" placeholder="请输入服务目录名称" v-decorator="['chName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <catalog-tree ref="catalogTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>

    <catalog-form
      ref="catalogForm"
      :serviceId="serviceId"
      :parentId="parentId"
      :parentName="parentName"
      :mode="formMode"
      :submitSuccess="reloadNode"
    />
  </div>
</template>
<script>
import catalogTree from './CatalogTree'
import CatalogForm from './CatalogForm'
import catalogListVO from './vo/catalog-list-vo'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import MessageUtils from '@/utils/message'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'parentId'
export default {
  name: 'CatalogList',
  components: { catalogTree, CatalogForm, IopDataTable, IopDataDictSelect },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.system.serv.index,
        /** rowKey，必填 */
        rowKey: 'serviceId',
        /** 列定义 */
        columns: catalogListVO
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      serviceId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      parentId: '',
      parentName: ''
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
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.catalogList.search({ parentId: this.selectedNode })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.catalogList.resetSearch()
      this.$refs.catalogTree.reloadNode(this.parentId)
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ data }) {
      this.selectedNode = data.id
      this.parentId = this.selectedNode !== '0' ? data.id : '0'
      this.parentName = this.selectedNode !== '0' ? data.name : '全部'
      this.$refs.catalogList.reload({
        [tableQueryName]: data.id
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
          this.reloadNode(data.original)
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original.serviceId)
          break
        case 'onEdit':
          this.handleEdit(data.original.serviceId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} serviceId 数据主键
     */
    reloadNode (serviceId) {
      if (!serviceId) {
        // 新建或者编辑的回调
        serviceId = this.serviceId
      }
      if (serviceId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.catalogTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.catalogTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.serviceId = ''
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : '0'
      // 先赋值，后显示
      this.$refs.catalogForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} serviceId 主键
     */
    handleView (serviceId = '') {
      this.formMode = 'view'
      this.serviceId = serviceId
      this.parentId = this.selectedNode
      this.$refs.catalogForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} serviceId 主键
     */
    handleEdit (serviceId = '') {
      this.formMode = 'edit'
      this.serviceId = serviceId
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : '0'
      this.$refs.catalogForm.show()
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} servIds 选中项的主键数组
     */
    handleRemoveSelected (servIds = []) {
      let serviceId
      if (servIds.includes(this.selectedNode)) {
        serviceId = this.selectedNode
      } else {
        serviceId = servIds[0]
      }
      this.reloadNode(serviceId)
    }
  }
}
</script>
