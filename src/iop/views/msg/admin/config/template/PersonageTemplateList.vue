<template>
  <div>
    <iop-data-table
      ref="templateList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
      :removeUrl="removeUrl">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="模板名称">
              <a-input @pressEnter="search" placeholder="请输入模板名称" v-decorator="['msgName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="模板编码">
              <a-input @pressEnter="search" placeholder="请输入模板编码" v-decorator="['msgCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <personage-template-tree ref="templateTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>

    <personage-template-form ref="templateForm" :id="id" :parentId="parentId" :mode="formMode" :submitSuccess="reloadNode" />
  </div>
</template>
<script>
import PersonageTemplateTree from './PersonageTemplateTree'
import PersonageTemplateForm from './PersonageTemplateForm'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'PersonageTemplateList',
  components: {
    PersonageTemplateTree,
    PersonageTemplateForm,
    IopDataTable,
    IopDataDictSelect
  },
  data () {
    const templateListVo = [
      {
        title: '模板名称',
        dataIndex: 'msgName',
        sorter: false,
        align: 'center'
      },
      {
        title: '模板编码',
        align: 'center',
        sorter: false,
        dataIndex: 'msgCode'
      },
      {
        title: '排序号',
        align: 'center',
        dataIndex: 'orderNum',
        sorter: false
      },
      {
        title: '模板类型',
        dataIndex: 'templType',
        align: 'center',
        sorter: false,
        customRender: (val, row, ind) => {
          if (row.templType === '0') {
            return <a-tag color="orange">系统</a-tag>
          } else {
            return <a-tag color="blue">个人</a-tag>
          }
        }
      }
    ]
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.msg.personageTemplate.index,
        /** rowKey，必填 */
        rowKey: 'id',
        /** 不显示序号列 */
        serial: false,
        /** 列定义 */
        columns: templateListVo
      },
      removeUrl: path.msg.personageTemplate.del,
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      id: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      parentId: ''
    }
  },
  methods: {
    /**
     * 查询
     */
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.templateList.search({ parentId: this.selectedNode })
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.templateList.resetSearch()
      this.$refs.templateTree.reload()
      this.$refs.templateList.reload()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.$refs.templateList.reload({
        parentId: key
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
          this.handleView(data.original.id)
          break
        case 'onEdit':
          this.handleEdit(data.original.id)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} id 数据主键
     */
    reloadNode (id) {
      if (!id) {
        // 新建或者编辑的回调
        id = this.id
      }
      if (id !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.templateTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.templateTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.id = ''
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : '0'
      // 先赋值，后显示
      this.$refs.templateForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} id 主键
     */
    handleView (id = '') {
      this.formMode = 'view'
      this.id = id
      this.$refs.templateForm.show()
    },
    /**
     * 点击编辑按钮事件
     *
     * @param {string} id 主键
     */
    handleEdit (id = '') {
      this.formMode = 'edit'
      this.id = id
      this.$refs.templateForm.show()
    },
    /**
     * 删除列表选择项，多选
     *
     * @param {Array} areaIds 选中项的主键数组
     */
    handleRemoveSelected (areaIds = []) {
      let id
      if (areaIds.includes(this.selectedNode)) {
        id = this.selectedNode
      } else {
        id = areaIds[0]
      }
      this.reloadNode(id)
    }
  }
}
</script>
