<template>
  <div>
    <iop-basic-search
      ref="topSearch"
      v-if="!hiddenTop"
      style="margin-bottom: 24px;"
    >
      <slot name="top" />
    </iop-basic-search>
    <a-card :bordered="false" :title="table.title">
      <a-row :gutter="8" type="flex" align="top">
        <!-- 展开按钮 -->
        <div
          v-if="tree"
          style="position:absolute; top: 10px; left: 15px;"
          @click="triggerTreeHidden()"
        >
          <a-icon :type="hideTree ? 'menu-unfold' : 'menu-fold'" />
        </div>
        <a-col v-if="tree" class="tree-border-right" :span="!hideTree ? 5 : 0">
          <slot name="tree" />
        </a-col>

        <a-col :span="tree && !hideTree ? 19 : 24">
          <iop-basic-table
            ref="iopBasicTable"
            :permission="permission"
            @onAction="handleAction"
            :paginationQuery="paginationQuery"
            :autoLoad="autoLoad"
            :batchRemove="batchRemove"
            :removeUrl="removeUrl"
            :table="table"
            :autoConfig="autoConfig"
            :removeRefresh="!tree"
          >
            <!-- 顶部按钮列表 -->
            <template #headerButtons>
              <slot name="headerButtons" />
            </template>
            <!-- 创建按钮之前 -->
            <template #beforeCreateButton>
              <slot name="beforeCreateButton" />
            </template>
            <!-- 创建按钮 -->
            <template #createButton>
              <slot name="createButton" />
            </template>
            <!-- 创建按钮之后 -->
            <template #afterCreateButton>
              <slot name="afterCreateButton" />
            </template>
            <!-- 删除选中按钮之前 -->
            <template #beforeRemoveSelectedButton>
              <slot name="beforeRemoveSelectedButton" />
            </template>
            <!-- 删除选中按钮 -->
            <template #removeSelectedButton>
              <slot name="removeSelectedButton" />
            </template>
            <!-- 删除选中按钮之后 -->
            <template #afterRemoveSelectedButton>
              <slot name="afterRemoveSelectedButton" />
            </template>
            <!-- 已经选中xxx条 -->
            <template #alert>
              <slot name="alert" />
            </template>
            <!-- 序号列 -->
            <template #serialRender="{ record, index }">
              <slot name="serialRender" :record="record" :index="index" />
            </template>
            <!-- 行内按钮 -->
            <template #rowButtons="{ record, index }">
              <slot name="rowButtons" :record="record" :index="index"/>
            </template>
            <!-- 查看按钮 -->
            <template #beforeViewButton="{ record, index }">
              <slot name="beforeViewButton" :record="record" :index="index"/>
            </template>
            <template #viewButton="{ record, index }">
              <slot name="viewButton" :record="record" :index="index"/>
            </template>
            <template #afterViewButton="{ record, index }">
              <slot name="afterViewButton" :record="record" :index="index"/>
            </template>
            <!-- 编辑按钮 -->
            <template #beforeEditButton="{ record, index }">
              <slot name="beforeEditButton" :record="record" :index="index"/>
            </template>
            <template #editButton="{ record, index }">
              <slot name="editButton" :record="record" :index="index"/>
            </template>
            <template #afterEditButton="{ record, index }">
              <slot name="afterEditButton" :record="record" :index="index"/>
            </template>
            <!-- 删除按钮 -->
            <template #beforeRemoveButton="{ record, index }">
              <slot name="beforeRemoveButton" :record="record" :index="index"/>
            </template>
            <template #removeButton="{ record, index }">
              <slot name="removeButton" :record="record" :index="index"/>
            </template>
            <template #afterRemoveButton="{ record, index }">
              <slot name="afterRemoveButton" :record="record" :index="index"/>
            </template>
          </iop-basic-table>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import { IopBasicSearch, IopBasicTable } from '@/iop/components'

export default {
  name: 'DataTablePage',
  components: { IopBasicSearch, IopBasicTable },
  props: {
    table: {
      type: Object,
      default: () => { }
    },
    permission: {
      type: Array,
      required: false,
      // 'create', 'edit', 'view', 'remove', 'removeSelected'
      default: () => []
    },
    tree: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    paginationQuery: {
      type: Map,
      required: false,
      default: () => {
        return new Map([
          ['page', 'page'],
          ['size', 'size'],
          ['sort', 'sort'],
          ['asc', 'asc'],
          ['desc', 'desc'],
          ['order', 'order']
        ])
      }
    },
    hiddenTop: {
      type: Boolean,
      required: false,
      default: false
    },
    removeUrl: {
      type: String,
      required: false,
      default: ''
    },
    batchRemove: {
      type: Object,
      required: false,
      default: () => {}
    },
    autoLoad: {
      type: Boolean,
      required: false,
      default: true
    },
    autoConfig: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      tbodys: null,
      hideTree: false
    }
  },
  methods: {
    /**
     * @description 表格初始化
     * @public
     */
    init () {
      this.$refs.iopBasicTable.init()
    },
    /**
     * 触发事件
     * @private
     */
    handleAction (action) {
      this.$emit('onAction', action)
    },

    /**
     * @description 切换树的隐藏与显示
     * @private
     */
    triggerTreeHidden () {
      this.hideTree = !this.hideTree
    },
    /**
     * @deprecated 获取表单项值
     * @public
     */
    getFieldsValue () {
      return this.$refs.topSearch.getFieldsValue()
    },
    /**
     * @deprecated 设置表单项值
     * @public
     */
    setFieldsValue (data) {
      this.$refs.topSearch.setFieldsValue(data)
    },
    /**
     * @description 重载表格，此方法已废弃，请谨慎外部直接调用
     * @deprecated
     */
    reload (params = {}, { firstPage = true } = {}) {
      this.$refs.iopBasicTable.reload(params, { firstPage })
    },
    /**
     * @description 查询
     * @public
     */
    search (data = {}) {
      const query = this.getFieldsValue()
      Object.assign(query, data)
      this.reload(query)
    },
    /**
     * @description 重置表单值
     * @public
     */
    resetSearch () {
      this.$refs.topSearch.resetSearch()
    },

    getTbodys () {
      this.$refs.iopBasicTable.getTbodys()
    },

    handleRemove () {
      this.$refs.iopBasicTable.handleRemove()
    }
  }
}
</script>
<style scoped lang="less">
.ant-table td { white-space: nowrap; }
.tree-border-right {
  /deep/ .data-tree {
    border-right: 1px solid #f0f2f5;
  }
}
</style>
