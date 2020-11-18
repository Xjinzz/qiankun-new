<template>
  <div>
    <a-card :bordered="false" v-if="!hiddenTop" class="topSearch" style="margin-bottom: 24px;">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <slot name="top" />
        </a-form>
      </div>
    </a-card>

    <a-card :bordered="false" :title="table.title">
      <a-row :gutter="8" type="flex" align="top">
        <div
          v-if="tree"
          style="position:absolute; top: 10px; left: 15px;"
          @click="triggerTreeHidden()"
        >
          <a-icon :type="hideTree ? 'menu-unfold' : 'menu-fold'" />
        </div>
        <a-col v-if="tree" :span="!hideTree ? 5 : 0">
          <slot name="tree" />
        </a-col>
        <a-col :span="tree && !hideTree ? 19 : 24">
          <div class="table-header" v-if="buttons">
            <slot name="headerButtons">
              <slot name="beforeCreateButton" />
              <slot name="createButton" v-if="permission.includes('create')">
                <a-button type="primary" @click="handleAction('create')">新建</a-button>
              </slot>
              <slot name="afterCreateButton" />

              <slot name="beforeRemoveSelectedButton" />
              <slot
                name="removeSelectedButton"
                v-if="permission.includes('removeSelected')"
              >
                <a-button
                  v-if="selectable"
                  type="primary"
                  @click="handleRemoveSelected"
                  :disabled="selectedRows.length === 0"
                >删除</a-button>
              </slot>
              <template v-if="hasSelected">
                <slot name="alert">
                  <span class="ant-alert ant-alert-info ant-alert-no-icon">
                    已选择:
                    <a style="font-weight: 600">{{ selectedRows.length }}</a>项
                    <a style="margin-left: 24px" @click="clearSelected()">清空</a>
                  </span>
                </slot>
              </template>
              <slot name="afterRemoveSelectedButton" />
            </slot>
          </div>

          <a-table
            ref="__dataTable"
            :rowKey="table.rowKey"
            :dataSource="dataSource"
            :rowSelection="rowSelection"
            :pagination="false"
            :scroll="table.scroll"
            :loading="loading"
            :columns="columns"
            @change="loadData"
          >
            <template #[serialRender]="text, record, index" v-if="serial">
              <slot name="serialRender" :record="record" :index="index">
                <span
                  v-if="pagination"
                >{{ (pagination.current - 1) * pagination.pageSize + index + 1 }}</span>
                <span v-else>{{ index + 1 }}</span>
              </slot>
            </template>

            <template #[actionsRender]="text, record, index" v-if="actions">
              <span>
                <slot name="rowButtons" :record="record" :index="index">
                  <slot name="beforeViewButton" :record="record" :index="index" />
                  <slot
                    name="viewButton"
                    :record="record"
                    :index="index"
                    v-if="permission.includes('view')"
                  >
                    <a @click="handleAction('view', record)">查看</a>
                    <a-divider type="vertical"/>
                  </slot>
                  <slot name="afterViewButton" :record="record" :index="index" />

                  <slot name="beforeEditButton" :record="record" :index="index" />
                  <slot
                    name="editButton"
                    :record="record"
                    :index="index"

                    v-if="permission.includes('edit')"
                  >
                    <a @click="handleAction('edit', record)">编辑</a>
                    <a-divider type="vertical"/>
                  </slot>
                  <slot name="afterEditButton" :record="record" :index="index" />

                  <slot name="beforeRemoveButton" :record="record" :index="index" />
                  <slot
                    name="removeButton"
                    :record="record"
                    :index="index"
                    v-if="permission.includes('remove')"
                  >
                    <a @click="handleRemove(record)">删除</a>
                  </slot>
                  <slot name="afterRemoveButton" :record="record" :index="index" />
                </slot>
              </span>
            </template>

            <template #filterDropdown>
              <a-checkbox-group @change="onColumnsChange" v-model="defColumnsDataIndex" :defaultValue="defColumnsDataIndex">
                <template v-for="item in filtersColumns">
                  <a-row :key="item.dataIndex">
                    <li class="ant-dropdown-menu-item">
                      <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
                    </li>
                  </a-row>
                </template>
              </a-checkbox-group>
            </template>
          </a-table>

          <a-pagination
            class="ant-table-pagination"
            v-if="pageable"
            :showQuickJumper="pagination.showQuickJumper"
            :showSizeChanger="pagination.showSizeChanger"
            :pageSize.sync="pagination.pageSize"
            :showTotal="pagination.showTotal"
            :total="pagination.total"
            :pageSizeOptions="pagination.pageSizeOptions"
            v-model="pagination.current"
            @change="pageChange"
            @showSizeChange="pageChange" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import { iopDataService, iopAuthService } from '@/iop/service/index'
import { IopEllipsis } from '@/iop/components'
import MessageUtils from '@/utils/message'

export default {
  name: 'DataTablePage',
  components: { IopEllipsis },
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
      loading: false,
      dataSource: [],
      columns: [],
      buttons: true,
      serial: true,
      actions: true,
      selectable: true,
      pageable: true,

      pagination: false,
      tbodys: null,

      filtersColumns: [],
      defColumnsDataIndex: [],

      selectedRows: [],
      selectedRowKeys: [],
      currentRowIndex: -1,

      actionsDataIndex: '__actions',
      actionsRender: 'actionsRender',
      actionsTitle: '操作',

      serialDataIndex: '__serial',
      serialRender: 'serialRender',
      serialTitle: '序号',

      scroll: {},
      hideTree: false,
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    if (this.autoConfig) {
      this.init()
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    },
    rowSelection () {
      if (this.selectable) {
        return Object.assign(
          {
            type: 'checkbox',
            columnWidth: '50px',
            fixed: !!this.table.scroll,
            backgroundColor: '#cbf2ff'
          },
          this.table.rowSelection,
          {
            selectedRowKeys: this.selectedRowKeys,
            selectedRows: this.selectedRows,
            onChange: this.selectedChange,
            onSelect: this.selectedRow
          })
      } else {
        return null
      }
    }
  },
  methods: {

    init () {
      const defaultOptions = ['pageable', 'selectable', 'actions', 'serial', 'buttons']
      const initOptionValue = (name, value) => {
        if (name in this.table) {
          this[name] = this.table[name]
        } else {
          this[name] = value
        }
      }
      for (const attr of defaultOptions) {
        initOptionValue(attr, true)
      }
      this.initColumns()
      this.initPagination()

      if (!this.tree && this.autoLoad) {
        this.loadData()
      }
    },

    initColumns () {
      const defColumnsDataIndex = []
      const filtersColumns = []
      const columns = []
      if (this.serial) {
        this.serialColumn = {
          title: this.serialTitle,
          align: 'center',
          dataIndex: this.serialDataIndex,
          fixed: !!this.table.scroll,
          width: 80,
          scopedSlots: { customRender: this.serialRender }
        }
        columns.push(this.serialColumn)
        defColumnsDataIndex.push(this.serialDataIndex)
      }
      this.actionColumn = {
        title: this.actionsTitle,
        align: 'center',
        dataIndex: this.actionsDataIndex,
        fixed: this.table.scroll ? 'right' : false,
        width: this.table.actionsWidth || 180,
        scopedSlots: {
          customRender: this.actionsRender,
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon'
        }
      }
      const vo = this.table.columns
      vo.map(column => {
        if (!column.hidden) {
          columns.push(column)
        }
        if (!column.hasOwnProperty('sorter')) {
          column.sorter = true
        }
        if ((column.dataIndex) &&
          (column.dataIndex === this.actionsDataIndex)) {
          this.actionColumn = column
        } else {
          filtersColumns.push({ dataIndex: column.dataIndex, title: column.title })
          !column.hidden && defColumnsDataIndex.push(column.dataIndex)
        }
        if (column.maxLength && !column.customRender) {
          column.customRender = (text) => {
            return <iop-ellipsis length={column.maxLength} tooltip={true}>{{ text }}</iop-ellipsis>
          }
        }
      })
      this.defColumnsDataIndex = defColumnsDataIndex
      this.filtersColumns = filtersColumns
      // actions
      if (this.actions) {
        columns.push(this.actionColumn)
      }

      this.columns = columns
    },

    initPagination () {
      if (this.pageable) {
        this.pagination = Object.assign(
          {
            current: 1,
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]}  共 ${total} 项`,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '40', '50']
          },
          this.table.pagination)
      }
    },

    /**
     * 触发事件
     */
    handleAction (name = '', data = {}, extra = {}) {
      this.$emit('onAction',
        {
          name: `on${name.substring(0, 1).toUpperCase()}${name.substring(1)}`,
          data: { original: data, extra }
        })
    },

    /**
     * 改变显示列
     */
    onColumnsChange (checkedValues = []) {
      this.defColumnsDataIndex = checkedValues
      const columns = []
      if (checkedValues.includes(this.serialDataIndex)) {
        columns.push(this.serialColumn)
      }
      for (const column of this.table.columns) {
        if (checkedValues.includes(column.dataIndex)) {
          columns.push(column)
        }
      }
      columns.push(this.actionColumn)
      this.columns = columns
    },

    /**
     * 表格重新加载
     *
     * @param {Object} params 搜索参数
     * @param {boolean} firstPage 是否返回到第一页
     */
    async reload (params = {}, { firstPage = true } = {}) {
      this.dynamicQueryParams = params
      this.refresh(firstPage)
    },

    /**
     * 请求列表数据
     *
     * @param {Object} params service的get方法参数
     */
    async load (params, isPageChange) {
      let resultObj = {}
      const { result } = await iopDataService.get({
        url: this.table.url,
        params
      })
      resultObj = {
        ...result,
        page: params.page,
        size: params.size,
        data: result.data.slice((params.page - 1) * params.size, params.page * params.size)
      }
      return resultObj
    },

    /**
     * 表格刷新
     * @param {boolean} firstPage 是否返回到第一页
     */
    async refresh (firstPage = false) {
      this.clearSelected()
      firstPage && Object.assign(this.pagination, {
        current: 1
      })
      await this.loadData()
    },

    /**
     * 加载数据
     *
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     * @param {Boolean} flag 标记是不是分页器变化
     * @private
     */
    async loadData (pagination, filters, sorter, flag = false) {
      this.loading = true
      this.dataSource = []

      const parameter = Object.assign(
        (this.pageable && {
          [this.paginationQuery.get('page') || 'page']: (pagination && pagination.current) || this.pagination.current,
          [this.paginationQuery.get('size') || 'size']: (pagination && pagination.pageSize) || this.pagination.pageSize
        }) || {},
        (sorter && sorter.field && {
          [this.paginationQuery.get('sort') || 'sort']: sorter.field
        }) || {},
        (sorter &&
          sorter.order && {
          [this.paginationQuery.get('order') || 'order']:
            sorter.order === 'ascend'
              ? [this.paginationQuery.get('asc') || 'asc']
              : [this.paginationQuery.get('desc') || 'desc']
        }) || {},
        this.table.query,
        this.dynamicQueryParams)
      try {
        const result = await this.load(parameter, flag)
        this.dataSource = result.data
        if (this.pageable) {
          const page = parseInt(result.page)
          Object.assign(this.pagination, {
            current: page, // 返回结果中的当前分页数
            total: parseInt(result.totalSizes), // 返回结果中的总记录数
            pageSize: (pagination && pagination.pageSize) || this.pagination.pageSize
          })
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (result.data.length === 0 && this.pagination.current > 1) {
            this.pagination.current--
            this.loadData()
            return
          }
        }
      } catch (err) {
        MessageUtils.error(err)
      } finally {
        this.loading = false
      }
    },

    /**
     * 删除指定项
     *
     * @param {string} id 主键
     */
    async handleRemove (record) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          this.remove(record)
        }
      })
    },

    /**
     * 删除指定项
     *
     * @param {string} id 主键
     * @param {boolean=} reload 是否返回第一页，默认true
     */
    async remove (record = {}, { reload = true, loading = true } = {}) {
      const id = this.getRowKeyValue(record)
      if (id && id.length > 0) {
        try {
          if (loading) {
            this.loading = true
          }
          let url
          if (!this.removeUrl) {
            url = `${this.table.url}/${id}`
          } else {
            url = `${this.removeUrl}/${id}`
          }
          await iopDataService.delete({ url })
          MessageUtils.success('操作成功')

          if (reload && !this.tree) {
            this.refresh()
          }
          this.handleAction('remove', id, { ...record })
        } catch (err) {
          MessageUtils.error(err)
        } finally {
          this.loading = false
        }
      }
    },

    /**
     * 删除选中项，有提示信息和异常处理
     */
    handleRemoveSelected () {
      this.$confirm({
        title: `确定删除吗`,
        onOk: async () => {
          this.removeSelected()
        }
      })
    },

    /**
     * 删除选中项，没有提示信息和异常处理
     */
    async removeSelected () {
      const { selectedRowKeys } = this
      if (selectedRowKeys.length > 0) {
        this.loading = true
        try {
          if (!this.batchRemove) {
            const url = !this.removeUrl ? `${this.table.url}` : `${this.removeUrl}`
            for (const id of selectedRowKeys) {
            // await selectedRowKeys.map(async (id) => {
              await iopDataService.delete({ url: `${url}/${id}` })
            // })
            }
          } else {
            const url = this.batchRemove.url
            if (url) {
              await iopDataService.post({ url, data: selectedRowKeys })
            } else {
              MessageUtils.error('未指定批量删除的url')
            }
          }
          MessageUtils.success('操作成功')
          if (!this.tree) {
            this.refresh()
          }
          this.handleAction('removeSelected', selectedRowKeys, [...this.selectedRows])
        } catch (err) {
          MessageUtils.error(err)
        } finally {
          this.loading = false
        }
      } else {
        MessageUtils.error('请至少选择一条数据')
      }
    },

    /**
     * 清空已选中项
     */
    clearSelected () {
      if (this.rowSelection) {
        this.handleAction('clearSelected')
        this.rowSelection.onChange([], [])
        this.updateSelect([], [])
        this.currentRowIndex = -1
      }
    },

    /**
     * 选中项变化
     */
    selectedChange (selectedRowKeys, selectedRows) {
      this.updateSelect(selectedRowKeys, selectedRows)
      this.handleAction('selectedChange', { selectedRowKeys, selectedRows })
    },

    /**
      * 更新已选中的列表数据
      *
      * @param {Array} selectedRowKeys
      * @param {Array} selectedRows
      */
    updateSelect (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
    },

    /**
     * 页码改变和pageSize改变
     *
     * @param {number} current 改变后的页码
     * @param {number} pageSize 每页条数
     * @private
     */
    pageChange (current, pageSize) {
      this.clearSelected()
      this.loadData({ current, pageSize }, null, null, true)
    },

    /**
     *
     */
    triggerTreeHidden () {
      this.hideTree = !this.hideTree
    },

    getFieldsValue () {
      return this.form.getFieldsValue()
    },

    search (data = {}) {
      const query = this.form.getFieldsValue()
      Object.assign(query, data)
      this.reload(query)
    },

    resetSearch () {
      this.form.resetFields()
    },

    goPage (path = '', query = {}, params) {
      iopAuthService.goPage(path, query, params)
    },

    getRowKeyValue (record = {}) {
      const rowKey = this.table.rowKey
      if (typeof rowKey === 'string') {
        return record[rowKey]
      } else if (typeof rowKey === 'function') {
        return rowKey(record)
      }
      return null
    },

    checkCurrentRow (allowUnChecked = true) {
      if (this.selectable && this.dataSource.length > 0) {
        const record = this.dataSource[this.currentRowIndex]
        const id = this.getRowKeyValue(record)
        if (id) {
          const keyIndex = this.selectedRowKeys.findIndex((element) => element === id)
          if (this.rowSelection.type !== 'checkbox') {
            this.selectedRowKeys = []
            this.selectedRows = []
          }
          if (keyIndex === -1) {
            this.selectedRowKeys.push(id)
            this.selectedRows.push(record)
          } else if (allowUnChecked) {
            this.selectedRowKeys.splice(keyIndex, 1)
            this.selectedRows.splice(keyIndex, 1)
          }
          this.handleAction('selectedChange', { selectedRowKeys: this.selectedRowKeys, selectedRows: this.selectedRows })
        }
      }
    },

    checkNextRow () {
      if (this.selectable && this.currentRowIndex < this.dataSource.length) {
        this.currentRowIndex++
        this.checkCurrentRow(false)
      }
    },

    checkPreRow () {
      if (this.selectable && this.currentRowIndex > 0) {
        this.currentRowIndex--
        this.checkCurrentRow(false)
      }
    },

    selectCurrentRow () {
      if (this.selectable) {
        const tbodys = this.getTbodys()
        for (const tbody of tbodys) {
          const tr = tbody.children[this.currentRowIndex]
          if (tr) {
            const current = tr.style.backgroundColor
            tr.style.backgroundColor = current ? '' : '#cbf2ff'
          }
        }
      }
    },

    selectNextRow () {
      if (this.selectable && this.currentRowIndex < this.dataSource.length) {
        this.selectCurrentRow()
        this.currentRowIndex++
        this.selectCurrentRow()
      }
    },

    selectPreRow () {
      if (this.selectable && this.currentRowIndex > 0) {
        this.selectCurrentRow()
        this.currentRowIndex--
        this.selectCurrentRow()
      }
    },

    getTbodys () {
      if (!this.tbodys) {
        this.tbodys = this.$el.querySelectorAll('tbody')
      }
      return this.tbodys
    }
  }
}
</script>
<style scoped lang="less">
.ant-table td { white-space: nowrap; }
.table-header {
  margin-bottom: 18px;
}
.topSearch {
  /deep/ .ant-card-body {
    padding: 20px 20px;
    .ant-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
