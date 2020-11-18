<template>
  <div>
    <iop-data-table
      ref="bindingList"
      :table="table"
      :permission="permission"
      :removeUrl="removeUrl"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="功能名称">
              <a-input @pressEnter="search" :maxLength="100" v-model="queryParam.programName" placeholder="请输入功能名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="单位">
              <a-input @pressEnter="search" :maxLength="100" v-model="queryParam.levelgroupName" placeholder="请输入单位" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <a-form-item label="流程树形">
          <a-select v-model="appId" style="width: 100%" @change="changeApp">
            <a-select-option v-for="(item, ind) in appOpt" :value="item.appId" :key="ind" >{{ item.appName }}</a-select-option>
          </a-select>
        </a-form-item>
        <binding-tree ref="bindingTree" :appId="appId" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
    <binding-form
      ref="bindingForm"
      :bindingId="bindingId"
      :appId="appId"
      :programId="programId"
      :mode="formMode"
      :submitSuccess="reloadNode"
    />
  </div>
</template>
<script>
import BindingTree from './BindingTree'
import BindingForm from './BindingForm'
import { IopDataTable, IopSysDeptTree } from '@/iop/components/index'
import path from '@/iop/api'
import MessageUtils from '@/utils/message'
import { iopAppService } from '@/iop/service'
import Ellipsis from '@/components/Ellipsis'
// import bindingListVO from './vo/binding-list-vo'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'programId'
export default {
  name: 'BindingList',
  components: { BindingTree, BindingForm, IopDataTable, IopSysDeptTree, Ellipsis },
  data () {
    const bindingListVO = [
      {
        title: '功能名称',
        dataIndex: 'programName'
      },
      {
        title: '单位',
        dataIndex: 'levelgroupName'
      },
      {
        title: '业务类型',
        dataIndex: 'busiType',
        customRender: (val, row, ind) => {
          if (val !== '') {
            return <ellipsis length={20} tooltip>{ val }</ellipsis>
          }
        }
      },
      {
        title: '流程定义',
        dataIndex: 'workflowDefName'
      }
    ]

    return {
      table: {
        /** 列表查询地址 */
        url: '',
        /** rowKey，必填 */
        rowKey: 'bindingId',
        /** 显示序号列 */
        serial: true,
        /** 不显示复选框 */
        selectable: false,
        /** 列定义 */
        columns: bindingListVO
      },
      removeUrl: path.bpms.workflow.table,
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'remove'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      bindingId: '',
      /** 树当前选中节点，所选菜单 */
      selectedNode: '',
      /** 所选菜单 */
      programId: '',
      appId: iopAppService.getCurrentApp().appId,
      appOpt: iopAppService.getAllApps(),
      /** 搜索条件 */
      queryParam: {
        programName: '',
        levelgroupName: '',
        programId: ''
      }

    }
  },
  mounted () {
    this.table.url = `${path.bpms.workflow.table}?currentLoginAppId=${this.appId}`
    this.$refs.bindingTree.reload()
  },
  methods: {
    /**
     * 切换菜单 请求树形数据
     */
    changeApp (val) {
      this.appId = val
      this.table.url = `${path.bpms.workflow.table}?currentLoginAppId=${this.appId}`
      this.$refs.bindingTree.reload()
    },
    /**
     * 查询
     */
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.bindingList.reload(Object.assign({ programId: this.selectedNode }, this.queryParam))
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.queryParam = {
        programName: '',
        levelgroupName: '',
        programId: this.selectedNode
      }
      this.$refs.bindingList.resetSearch()
      this.$refs.bindingTree.reloadNode(this.selectedNode)
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.queryParam.programId = key
      this.$refs.bindingList.reload({
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
      this.table.url = `${path.bpms.workflow.table}?currentLoginAppId=${this.appId}`
      switch (name) {
        case 'onRemove':
          this.reloadNode(data.original)
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onEdit':
          this.handleEdit(data.original.bindingId)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} bindingId 数据主键
     */
    reloadNode (bindingId) {
      if (!bindingId) {
        // 新建或者编辑的回调
        bindingId = this.bindingId
      }
      if (bindingId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.bindingTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.bindingTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.bindingId = ''
      this.programId = this.selectedNode
      // 先赋值，后显示
      this.$refs.bindingForm.show(this.appId, this.selectedNode)
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} bindingId 主键
     */
    handleEdit (bindingId) {
      this.formMode = 'edit'
      this.bindingId = bindingId
      this.programId = this.selectedNode
      // 先赋值，后显示
      this.$refs.bindingForm.show(this.appId)
    }
  }
}
</script>
