<template>
  <div>
    <iop-data-table
      ref="storesList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="文件库名称">
              <a-input @pressEnter="search" v-model="queryParam.storeName" placeholder="请输入文件库名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="文件库编码">
              <a-input @pressEnter="search" v-model="queryParam.storeCode" placeholder="请输入文件库编码" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #editButton="{ record }">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #tree>
        <stores-tree ref="typesTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
    <basics-form
      ref="typesForm"
      :mode="formMode"
      :submitSuccess="submitSuccess"
    />
  </div>
</template>
<script>
import StoresTree from './StoresTree'
import BasicsForm from './basics/Basics'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import modal from './Modal'
import { iopAuthService } from '@/iop/service'
import { IOP_FORM_URL } from '@/iop/constants'
import storesListVO from './vo/stores-list-vo'
/** 点击树节点查询列表参数名 */
const tableQueryName = 'parentId'
export default {
  name: 'StoresList',
  components: { StoresTree, BasicsForm, IopDataTable, IopDataDictSelect, modal },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.file.stores.table,
        /** rowKey，必填 */
        rowKey: 'storeId',
        /** 不显示序号列 */
        // serial: false,
        /** 列定义 */
        columns: storesListVO,
        actionsWidth: 170,
        selectable: false
      },
      queryParam: {
        isValid: '',
        parentId: ''
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      storeId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      parentId: '',
      showForm: false
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
        await this.$refs.storesList.reload(this.queryParam)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.queryParam = {
        isValid: '',
        parentId: this.selectedNode
      }
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.queryParam.parentId = key
      // 请求:/iop/base/area?page=1&size=10&storeId=123
      this.$refs.storesList.reload({
        [tableQueryName]: key
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
          this.handleView(data.original.storeId)
          break
        case 'onEdit':
          this.handleEdit(data.original.storeId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} storeId 数据主键
     */
    reloadNode (storeId) {
      if (!storeId) {
        // 新建或者编辑的回调
        storeId = this.storeId
      }
      if (storeId !== this.selectedNode && storeId !== '0') {
        // 刷新当前选中节点
        this.$refs.typesTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.typesTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.storeId = ''
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : ''
      this.$refs.typesForm.show('create')
    },
    submitSuccess () {
      this.reloadNode('0')
    },
    /**
     * 点击查看按钮事件
     *
     *  @param {string} storeId 主键
     */
    handleView (record) {
      this.formMode = 'view'
      this.storeId = record.storeId
      iopAuthService.goPage(IOP_FORM_URL.FILE.STORES.VIEW, {
        typesId: record.storeId,
        storeName: record.storeName,
        storeCode: record.storeCode,
        formMode: 'view'
      })
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} storeId 主键
     */
    handleEdit (record) {
      this.formMode = 'edit'
      this.storeId = record.storeId
      iopAuthService.goPage(IOP_FORM_URL.FILE.STORES.VIEW, {
        typesId: record.storeId,
        rootPath: record.rootPath ? '/' + record.rootPath : '/',
        storeName: record.storeName,
        storeCode: record.storeCode,
        formMode: 'edit'
      })
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} areaIds 选中项的主键数组
     */
    handleRemoveSelected (areaIds = []) {
      let storeId
      if (areaIds.includes(this.selectedNode)) {
        storeId = this.selectedNode
      } else {
        storeId = areaIds[0]
      }
      this.reloadNode(storeId)
    }
  },
  mounted () {
    if (this.$route.query.showStores) {
      this.submitSuccess()
    }
  },
  watch: {
    $route: function () {
      if (this.$route.query.showStores) {
        this.submitSuccess()
      }
    }
  }
}
</script>
