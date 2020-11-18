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
          <a-col :md="8" :sm="24">
            <a-form-item label="菜单名称">
              <a-input @pressEnter="search" v-model="queryParam.programName" placeholder="请输入菜单名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="菜单类型">
              <data-select ref="programType" type="programType" @change="onTypeChange"></data-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="路由地址">
                <a-input @pressEnter="search" v-model="queryParam.programUrl" placeholder="请输入路由地址" allowClear />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="日志级别" style="margin-top: 20px;">
                <data-select ref="logLevel" type="logLevel" @change="onChange"></data-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 16" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
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
        <a @click="handelView(record)" style="margin-right:8px;">查看</a>
      </template>

      <template #viewButton="{ record }" >
        <a v-if="record.programType !== '标签'" @click="handleEdit(record)">修改日志级别</a>
        <a-divider v-if="record.programType !== '标签'" type="vertical" />
      </template>

      <template #tree>
        <programAudit-tree ref="sysProgramTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>

    <journal @loadData="loadData" ref="journal"></journal>
    <model ref="model"></model>
  </div>
</template>
<script>
import ProgramAuditTree from './ProgramAuditTree'
import Journal from './Journal'
import Model from './Model'
import programAuditListVO from './vo/program-audit-list-vo'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api'
import MessageUtils from '@/utils/message'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'parentId'
export default {
  name: 'ProgramAuditList',
  components: { ProgramAuditTree, IopDataTable, DataSelect: IopDataDictSelect, Journal, Model },
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
        columns: programAuditListVO
      },
      /** 表格组件按钮权限 */
      permission: ['edit', 'view'],
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
    onChange (record) {
      this.queryParam.logLevel = record
    },
    onTypeChange (record) {
      this.queryParam.programType = record
    },
    /**
     * 查询
     */
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.sysProgramList.reload(Object.assign({ parentId: this.selectedNode }, this.queryParam))
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.queryParam = {}
      if (this.$refs.logLevel) {
        this.$refs.logLevel.cleanSelected()
      }
      if (this.$refs.programType) {
        this.$refs.programType.cleanSelected()
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
     * 点击修改按钮事件
     *
     * @param {string} programId 主键
     */
    handleEdit (record) {
      if (record.logLevel === '不记日志') {
        this.$refs.journal.radioData = '0'
      } else if (record.logLevel === '记变更日志') {
        this.$refs.journal.radioData = '9'
      } else {
        this.$refs.journal.radioData = '3'
      }
      this.$refs.journal.data = record
      this.$refs.journal.selectData()
    },
    handelView (record) {
      console.log(record)
      this.$refs.model.showInput = record.programType
      this.$refs.model.load(record)
    },
    loadData () {
      this.$refs.sysProgramList.reload({ parentId: '0' })
    }
  }
}
</script>
