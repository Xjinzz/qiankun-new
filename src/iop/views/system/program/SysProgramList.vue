<template>
  <div>
    <iop-data-table
      ref="sysProgramList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="菜单名称">
              <a-input @pressEnter="search" v-model="queryParam.programName" placeholder="请输入菜单名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="菜单类型">
              <data-select ref="programType" v-model="queryParam.programType" type="programType" />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :span="8">
              <a-form-item label="地址路由">
                <a-input @pressEnter="search" v-model="queryParam.routePath" placeholder="请输入路由地址" allowClear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="组件地址" style="margin-top: 20px">
                <a-input @pressEnter="search" v-model="queryParam.vuePath" placeholder="请输入组件地址" allowClear />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="日志级别" style="margin-top: 20px">
                <data-select ref="logLevel" v-model="queryParam.logLevel" type="logLevel" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :span="8" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>
      <template #editButton="{ record }">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
      </template>
      <template #viewButton="{ record }">
        <a @click="handleAction(record)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #tree>
        <sysProgram-tree ref="sysProgramTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>

    <sysProgram-form
      ref="sysProgramForm"
      :programId="programId"
      :parentId="parentId"
      :mode="formMode"
      :submitSuccess="reloadNode"
    />
  </div>
</template>
<script>
import SysProgramTree from './SysProgramTree'
import SysProgramForm from './SysProgramForm'
import sysProgramListVo from './vo/sys-program-list-vo'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'parentId'
export default {
  name: 'SysProgramList',
  components: { SysProgramTree, SysProgramForm, IopDataTable, DataSelect: IopDataDictSelect },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.system.program.table,
        /** rowKey，必填 */
        rowKey: 'programId',
        /** 列定义 */
        columns: sysProgramListVo,
        actionsWidth: 180
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      programId: '',
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
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.sysProgramList.reload(Object.assign({ parentId: this.selectedNode }, this.queryParam))
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.queryParam = {}
      this.$refs.programType.cleanSelected()
      if (this.advanced) this.$refs.logLevel.cleanSelected()
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      // 请求:/iop/base/sysProgram?page=1&size=10&programId=123
      this.$refs.sysProgramList.reload({
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
          this.handleView(data.original.programId)
          break
        case 'onEdit':
          this.handleEdit(data.original.programId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} programId 数据主键
     */
    reloadNode (programId) {
      if (!programId) {
        // 新建或者编辑的回调
        programId = this.programId
      }
      if (programId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.sysProgramTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.sysProgramTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.programId = ''
      this.parentId = this.selectedNode
      this.$refs.sysProgramForm.showRedio = false
      // 先赋值，后显示
      this.$refs.sysProgramForm.show()
      this.$refs.sysProgramForm.setIn(this.parentId)
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} programId 主键
     */
    handleAction (record) {
      this.formMode = 'view'
      this.programId = record.programId
      if (record.programType === '菜单') {
        this.$refs.sysProgramForm.showInput = '0'
      } else if (record.programType === '操作') {
        this.$refs.sysProgramForm.showInput = '9'
      } else if (record.programType === '标签') {
        this.$refs.sysProgramForm.showInput = '3'
      }
      this.$refs.sysProgramForm.show()
      this.$refs.sysProgramForm.showRedio = true
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} programId 主键
     */
    handleEdit (record) {
      this.formMode = 'edit'
      this.parentId = this.selectedNode
      this.programId = record.programId
      this.$refs.sysProgramForm.radioData(record)
      if (record.programType === '菜单') {
        this.$refs.sysProgramForm.showInput = '0'
      } else if (record.programType === '操作') {
        this.$refs.sysProgramForm.showInput = '9'
      } else if (record.programType === '标签') {
        this.$refs.sysProgramForm.showInput = '3'
      }
      this.$refs.sysProgramForm.showRedio = true
      this.$refs.sysProgramForm.data = record
      this.$refs.sysProgramForm.show()
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} programIds 选中项的主键数组
     */
    handleRemoveSelected (programIds = []) {
      let programId
      if (programIds.includes(this.selectedNode)) {
        programId = this.selectedNode
      } else {
        programId = programIds[0]
      }
      this.reloadNode(programId)
    }
  }
}
</script>
