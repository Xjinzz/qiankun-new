<template>
  <div>
    <iop-data-table
      ref="defInfoList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="流程名称">
              <a-input @pressEnter="search" :maxLength="100" v-decorator="['defName']" placeholder="请输入流程名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="流程编码">
              <a-input @pressEnter="search" :maxLength="100" v-decorator="['defCode']" placeholder="请输入流程编码" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <def-info-tree ref="defInfoTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
    <def-info-form
      ref="defInfoForm"
      :defId="defId"
      :parentId="parentId"
      :mode="formMode"
      :submitSuccess="resetSearchForm"
    />
  </div>
</template>
<script>
import DefInfoTree from './DefInfoTree'
import DefInfoForm from './DefInfoForm'
import { IopDataTable } from '@/iop/components/index'
import path from '@/iop/api'
import MessageUtils from '@/utils/message'
import { IOP_FORM_URL } from '@/iop/constants'
import defInfoListVO from './vo/def-info-list-vo'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'parentId'

export default {
  name: 'DefInfoList',
  components: { DefInfoTree, DefInfoForm, IopDataTable },
  data () {
    return {
      table: {
        /** 列表查询地址 */
        url: path.bpms.definfo.info.index,
        /** rowKey，必填 */
        rowKey: 'defId',
        /** 不显示序号列 */
        serial: false,
        /** 列定义 */
        columns: defInfoListVO
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      defId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      parentId: '',
      /** 是否提交状态 */
      loading: false,
      editId: ''
    }
  },
  /**
   * 多页签切回来的时候，刷新
   */
  activated () {
    this.resetSearchForm()
  },
  methods: {
    /**
     * 查询
     */
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.defInfoList.search({ parentId: this.selectedNode })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.defInfoList.resetSearch()
      this.$refs.defInfoTree.reloadNode(this.selectedNode)
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.$refs.defInfoList.reload({
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
        case 'onEdit':
          this.handleEdit(data.original.defId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} defId 数据主键
     */
    reloadNode (defId) {
      if (!defId) {
        // 新建或者编辑的回调
        defId = this.defId
      }
      if (defId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.defInfoTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.defInfoTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.defId = ''
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : '0'
      // 先赋值，后显示
      this.$refs.defInfoForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} defId 主键
     */
    handleEdit (defId) {
      this.$goPage(IOP_FORM_URL.BPMS.DEFINFO.INFO, { defid: defId, mode: 'edit' })
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} defIds 选中项的主键数组
     */
    handleRemoveSelected (defIds = []) {
      let defId
      if (defIds.includes(this.selectedNode)) {
        defId = this.selectedNode
      } else {
        defId = defIds[0]
      }
      this.reloadNode(defId)
    }
  }
}
</script>
