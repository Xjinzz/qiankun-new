<template>
  <div>
    <iop-data-table
      ref="codeList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="编码编号">
              <a-input v-decorator="['codeNum']" placeholder="请输入编码编号" allowClear @pressEnter="search" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="编码名称">
              <a-input v-decorator="['codeName']" placeholder="请输入编码名称" allowClear @pressEnter="search" />
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="advanced">
            <a-form-item label="编码类型">
              <iop-data-dict-select ref="codeTypeSelect" type="codeKind" v-decorator="['codeType']" />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced()" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>

      <template #beforeViewButton="{ record }">
        <a @click="handleVals(record)">编码项</a>
        <a-divider type="vertical" />
      </template>

      <template #tree>
        <codecla-tree ref="codeclaTree" @onSelect="onTreeSelect" />
      </template>

      <template #beforeCreateButton>
        <a-button type="primary" @click="createCla()">新建分类</a-button>
      </template>
      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建编码</a-button>
      </template>
    </iop-data-table>

    <base-code-form
      ref="baseCodeForm"
      :claId="claId"
      :mode="formMode"
      @onSubmitSuccess="reloadNode"
      :codeId="codeId"
    />

    <a-modal title="编码项" :visible="showValModal" @cancel="hideValModal" :width="900">
      <base-code-val-list ref="valList" :codeId="codeId" :tree="codeTree" />

      <template #footer>
        <div style="text-align:center;">
          <a-button @click="hideValModal">关闭</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
import BaseCodeForm from './BaseCodeForm'
import BaseCodeValList from './val/BaseCodeValList'
import baseCodeListVO from './vo/base-code-list-vo'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import CodeclaTree from '../codecla/CodeclaTree'
import path from '@/iop/api'
import { IOP_BASE_CODE_TREE } from '@/iop/constants/index'
import MessageUtils from '@/utils/message'

export default {
  name: 'BaseCodeList',
  components: {
    CodeclaTree,
    BaseCodeForm,
    IopDataTable,
    IopDataDictSelect,
    BaseCodeValList
  },
  data () {
    return {
      table: {
        url: path.system.code.index,
        rowKey: 'codeId',
        columns: baseCodeListVO,
        actionsWidth: 210
      },
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      formMode: 'create',
      codeId: '',
      selectedNode: '',
      claId: '',
      codeTree: false,
      showValModal: false,
      advanced: false
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
        await this.$refs.codeList.search({ claId: this.selectedNode })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.codeList.resetSearch()
      this.$refs.codeTypeSelect.cleanSelected()
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.$refs.codeList.reload({
        claId: key
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
        case 'onRemoveSelected':
          this.reloadNode()
          break
        case 'onView':
          this.handleView(data.original.codeId)
          break
        case 'onEdit':
          this.handleEdit(data.original.codeId)
          break
      }
    },

    reloadNode () {
      this.$refs.codeclaTree.reload()
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.codeId = ''
      this.claId = this.selectedNode !== '0' ? this.selectedNode : '0'
      this.$refs.baseCodeForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} codeId 主键
     */
    handleView (codeId = '') {
      this.formMode = 'view'
      this.codeId = codeId
      this.claId = this.selectedNode !== '0' ? this.selectedNode : '0'
      this.$refs.baseCodeForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {Object} record 行数据
     */
    handleEdit (codeId = '') {
      this.formMode = 'edit'
      this.codeId = codeId
      this.claId = this.selectedNode !== '0' ? this.selectedNode : '0'
      this.$refs.baseCodeForm.show()
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} codeIds 选中项的主键数组
     */
    handleRemoveSelected (codeIds = []) {
      let codeId
      if (codeIds.includes(this.selectedNode)) {
        codeId = this.selectedNode
      } else {
        codeId = codeIds[0]
      }
      this.reloadNode(codeId)
    },

    handleVals (record = {}) {
      this.codeId = record.codeId
      this.codeTree = (record.codeType === IOP_BASE_CODE_TREE.title)
      this.showValModal = true
      this.$nextTick(() => {
        this.$refs.valList && this.$refs.valList.load()
      })
    },

    hideValModal () {
      this.showValModal = false
    },

    createCla () {
      this.$refs.codeclaTree.handleCreate()
    }
  }
}
</script>
