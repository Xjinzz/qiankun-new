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
        <a-form layout="inline">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="8">
              <a-form-item label="分类编号">
                <a-input @pressEnter="search" v-model="queryParam.catalogCode" placeholder="请输入分类编号" allowClear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="分类名称">
                <a-input @pressEnter="search" v-model="queryParam.catalogName" placeholder="请输入分类名称" allowClear />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="发布状态">
                  <a-select v-model="queryParam.releaseStatus">
                    <a-select-option value="">请选择</a-select-option>
                    <a-select-option value="1">已发布</a-select-option>
                    <a-select-option value="0">未发布</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
              <a-button type="primary" @click="search()">查询</a-button>
              <a-button style="margin-left: 8px" @click="resetSearchForm()">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '高级' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </a-col>
          </a-row>
        </a-form>
      </template>

      <template #tree>
        <catalog-tree ref="CatalogTree" :catalogType="catalogType" @onSelect="onTreeSelect" />
      </template>
      <template #viewButton="{ record }">
        <a href="javascript:;" @click="handleView(record.catalogId)">查看</a>
        <a-divider type="vertical" />
      </template>
    </iop-data-table>

    <catalog-form
      ref="CatalogForm"
      :catalogType="catalogType"
      :catalogId="catalogId"
      :parentId="parentId"
      :mode="formMode"
      :submitSuccess="reloadNode"
    />
  </div>
</template>
<script>
import CatalogTree from './CatalogTree'
import CatalogForm from './CatalogForm'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop-drms/api'
import catalogs from '@/iop-drms/service/server/catalog'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'parentId'
export default {
  name: 'CatalogList',
  components: { CatalogTree, CatalogForm, IopDataTable, IopDataDictSelect },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      /** 搜索参数 */
      queryParam: {
        releaseStatus: ''
      },
      table: {
        /** 列表查询地址 */
        url: path.manage.catalog.allList,
        /** rowKey，必填 */
        rowKey: 'catalogId',
        /** 列定义 */
        columns: [
          {
            title: '分类编号',
            dataIndex: 'catalogCode',
            sorter: true
          },
          {
            title: '分类名称',
            dataIndex: 'catalogName',
            sorter: true
          },
          {
            title: '排序号',
            dataIndex: 'orderNum',
            sorter: true
          },
          {
            title: '发布状态',
            dataIndex: 'releaseStatus',
            sorter: true,
            customRender: (val, row, ind) => {
              if (row.releaseStatus === '未发布') {
                return <a-switch defaultChecked = { false } onChange = { () => { this.releClick(event, row) } } />
              } else {
                return <a-switch defaultChecked = { true } onChange = { () => { this.releClick(event, row) } } />
              }
            }
          }
        ],
        query: {
          catalogType: this.$route.meta.para
        }
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      catalogId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      parentId: '',
      releaseStatus: '',
      catalogType: ''
    }
  },
  created () {
    this.catalogType = this.$route.meta.para
  },
  methods: {
    releClick (event, record) {
      const data = { type: record.releaseStatus === '未发布' ? '1' : '0' }
      catalogs.rele(record.catalogId, data).then((res) => {
        this.$refs.catalogList.reload()
      })
    },
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
        await this.$refs.catalogList.reload(Object.assign({ parentId: this.selectedNode }, this.queryParam))
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.queryParam = {
        releaseStatus: ''
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
      // 请求:/iop/base/baseCodeCla?page=1&size=10&catalogId=123
      this.$refs.catalogList.reload({
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
          this.handleView(data.original.catalogId)
          break
        case 'onEdit':
          this.handleEdit(data.original.catalogId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} catalogId 数据主键
     */
    reloadNode (catalogId) {
      if (!catalogId) {
        // 新建或者编辑的回调
        catalogId = this.catalogId
      }
      if (catalogId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.CatalogTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.CatalogTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.catalogId = ''
      this.parentId = this.selectedNode
      // 先赋值，后显示
      this.$refs.CatalogForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} catalogId 主键
     */
    handleView (catalogId = '') {
      this.formMode = 'view'
      this.catalogId = catalogId
      this.$refs.CatalogForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} catalogId 主键
     */
    handleEdit (catalogId = '') {
      this.formMode = 'edit'
      this.catalogId = catalogId
      this.$refs.CatalogForm.show()
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} claIds 选中项的主键数组
     */
    handleRemoveSelected (claIds = []) {
      let catalogId
      if (claIds.includes(this.selectedNode)) {
        catalogId = this.selectedNode
      } else {
        catalogId = claIds[0]
      }
      this.reloadNode(catalogId)
    }
  }
}
</script>
