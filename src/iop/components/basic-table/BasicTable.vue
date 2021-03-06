<template>
  <div>
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
        <slot name="afterRemoveSelectedButton" />
        <template v-if="hasSelected">
          <slot name="alert">
            <span class="ant-alert ant-alert-info ant-alert-no-icon">
              已选择:
              <a style="font-weight: 600">{{ selectedRows.length }}</a>项
              <a style="margin-left: 24px" @click="clearSelected()">清空</a>
            </span>
          </slot>
        </template>
      </slot>
    </div>
    <!-- <a-table
      ref="__dataTable"
      :rowKey="table.rowKey"
      :dataSource="dataSource"
      :rowSelection="rowSelection"
      :pagination="false"
      :scroll="table.scroll"
      :loading="loading"
      :columns="columns"
      @change="loadData"
      :customRow="customRow"
    > -->
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
          <slot name="beforeViewButton" :record="record" :index="index" />
          <slot name="rowButtons" :record="record" :index="index">
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
      @showSizeChange="pageChange"
    />
  </div>
</template>
<script>
import { iopDataService } from '@/iop/service/index'
import MessageUtils from '@/utils/message'

export default {
  name: 'BasicTable',
  props: {
    table: {
      type: Object,
      default: () => { }
    },
    removeUrl: {
      type: String,
      required: false,
      default: ''
    },
    permission: {
      type: Array,
      required: false,
      // 'create', 'edit', 'view', 'remove', 'removeSelected'
      default: () => []
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
    // FIXME:暂时处理基础表格和table-page页面的判断是否有树，外部一定不要使用，不久的将来一定会删除
    removeRefresh: {
      type: Boolean,
      required: false,
      default: true
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
    autoConfig: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      buttons: true,
      serial: true,
      actions: true,
      selectable: true,
      pageable: true,
      pagination: false,
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: [],
      currentRowIndex: -1,
      defColumnsDataIndex: [],
      filtersColumns: [],
      columns: [],
      actionsDataIndex: '__actions',
      actionsRender: 'actionsRender',
      actionsTitle: '操作',
      serialDataIndex: '__serial',
      serialRender: 'serialRender',
      serialTitle: '序号',
      scroll: {}
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
            // FIXME: selectedRow找不到
            onSelect: this.selectedRow
          })
      } else {
        return null
      }
    },
    getRemoveUrl () {
      return this.removeUrl || this.table.url
    }
  },
  mounted () {
    if (this.autoConfig) {
      this.init()
    }
  },
  methods: {
    // 获取page/size/order/sort等参数组合
    _getParams (pagination, filters, sorter) {
      return Object.assign(
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
    },
    _setData (name, value) {
      if (name in this.table) {
        this[name] = this.table[name]
      } else {
        this[name] = value
      }
    },
    /**
     * @description 初始化
     * @public
     */
    init () {
      const defaultOptions = ['pageable', 'selectable', 'actions', 'serial', 'buttons']
      for (const attr of defaultOptions) {
        this._setData(attr, true)
      }
      this.initColumns()
      this.initPagination()
      // FIXME:removeRefresh 仅仅为了处理老的代替tree字段
      if (this.autoLoad && this.removeRefresh) {
        this.loadData()
      }
    },
    /**
     * @description 初始化列
     * TODO: 方法待优化
     * @private
     */
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
        /*
         * updateBy jinzhenzong
         * 解决所有表格超出换行的问题
         */
        if (!column.maxLength && !column.customRender) {
          column.customRender = (text) => {
            if (text === null || text === undefined) {
              return text
            }
            return (
              <p style="word-break:break-all;margin-bottom:0">
                {{ text }}
              </p>
            )
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
    /**
     * @description 初始化page
     */
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
     * 加载数据
     *
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     * @private
     */
    async loadData (pagination, filters, sorter) {
      this.loading = true
      this.dataSource = []
      const parameter = this._getParams(pagination, filters, sorter)
      try {
        const result = await this.load(parameter)
        // 增加外部自定义处理数据
        this.dataSource = this.table.analysis && this.table.analysis instanceof Function ? this.table.analysis(result.data) : result.data
        // 如果有分页
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
     * 请求列表数据
     * @param {Object} params service的get方法参数
     * @private
    */
    async load (params) {
      const { result } = await iopDataService.get({
        url: this.table.url,
        params
      })
      return result
    },
    /**
     * 选中项变化
     * @private
     */
    selectedChange (selectedRowKeys, selectedRows) {
      this.updateSelect(selectedRowKeys, selectedRows)
      this.handleAction('selectedChange', { selectedRowKeys, selectedRows })
    },
    /**
    * 事件触发器
    * @emit onAciton
    */
    handleAction (name = '', data = {}, extra = {}) {
      this.$emit('onAction',
        {
          name: `on${name.substring(0, 1).toUpperCase()}${name.substring(1)}`,
          data: { original: data, extra }
        })
    },
    /**
    * 更新已选中的列表数据
    *
    * @param {Array} selectedRowKeys
    * @param {Array} selectedRows
    * @private
    */
    updateSelect (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
    },
    /**
     * @description 清空已选中项
     * @public
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
    * 删除指定项
    * @param {string} id 主键
    * @private
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
     * @desc 获取传入数据的主键
     * @private
     */
    getRowKeyValue (record = {}) {
      const rowKey = this.table.rowKey
      if (typeof rowKey === 'string') {
        return record[rowKey]
      } else if (typeof rowKey === 'function') {
        return rowKey(record)
      }
      return null
    },
    /**
    * 删除指定项
    *
    * @param {string} id 主键
    * @param {boolean=} reload 是否返回第一页，默认true
    * @private
    */
    async remove (record = {}, { reload = true } = {}) {
      const id = this.getRowKeyValue(record)
      if (id && id.length > 0) {
        try {
          this.loading = true
          const url = `${this.getRemoveUrl}/${id}`
          await iopDataService.delete({ url })
          MessageUtils.success('操作成功')
          if (reload && this.removeRefresh) {
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
    * 表格刷新
    * @param {boolean} firstPage 是否返回到第一页
    * @public
    */
    async refresh (firstPage = false) {
      this.clearSelected()
      firstPage && Object.assign(this.pagination, {
        current: 1
      })
      await this.loadData()
    },
    /**
    * 页码改变和pageSize改变
    * @param {number} current 改变后的页码
    * @param {number} pageSize 每页条数
    * @private
    */
    pageChange (current, pageSize) {
      this.clearSelected()
      this.loadData({ current, pageSize })
    },
    /**
    * 删除选中项，有提示信息和异常处理
    * @private
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
     * @private
     */
    async removeSelected () {
      const { selectedRowKeys } = this
      if (selectedRowKeys.length === 0) {
        MessageUtils.error('请至少选择一条数据')
        return
      }
      this.loading = true
      try {
        // 如果没有规定批量删除信息
        if (!this.batchRemove) {
          const url = this.getRemoveUrl
          // FIXME:这里可以进行优化
          for (const id of selectedRowKeys) {
          // await selectedRowKeys.map(async (id) => {
            await iopDataService.delete({ url: `${url}/${id}` })
          // })
          }
        } else {
          // 自定义批量删除接口
          const url = this.batchRemove.url
          if (url) {
            await iopDataService.post({ url, data: selectedRowKeys })
          } else {
            MessageUtils.error('未指定批量删除的url')
          }
        }
        MessageUtils.success('操作成功')
        if (this.removeRefresh) {
          this.refresh()
        }
        this.handleAction('removeSelected', selectedRowKeys, [...this.selectedRows])
      } catch (err) {
        MessageUtils.error(err)
      } finally {
        this.loading = false
      }
    },
    /**
    * 改变显示列
    * @private
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
    * @public
    */
    async reload (params = {}, { firstPage = true } = {}) {
      // FIXME: 这个变量为空
      this.dynamicQueryParams = params
      this.refresh(firstPage)
    },
    /**
     * @desc 获取tbody节点
     * @public
     */
    getTbodys () {
      if (!this.tbodys) {
        this.tbodys = this.$el.querySelectorAll('tbody')
      }
      return this.tbodys
    }
    // 表格拖拽排序
    // customRow (record, index) {
    //   return {
    //     // attr: {
    //     //   draggable: 'true'
    //     // },
    //     style: {
    //       cursor: 'pointer'
    //     },
    //     on: {
    //       // 鼠标移入
    //       mouseenter: (event) => {
    //         // 兼容IE
    //         var ev = event || window.event
    //         ev.target.draggable = true
    //       },
    //       // 开始拖拽
    //       dragstart: (event) => {
    //         // 兼容IE
    //         var ev = event || window.event
    //         // 阻止冒泡
    //         ev.stopPropagation()
    //         // 得到源目标数据
    //         this.dragCache.record = record
    //         console.log('起始点id', this.getRowKeyValue(record))
    //         console.log('起始点index', index)
    //         this.dragCache.index = index
    //       },
    //       // 拖动元素经过的元素
    //       dragover: (event) => {
    //         // 兼容 IE
    //         var ev = event || window.event
    //         // 阻止默认行为
    //         ev.preventDefault()
    //       },
    //       // 鼠标松开
    //       drop: async (event) => {
    //         // 兼容IE
    //         var ev = event || window.event
    //         // 阻止冒泡
    //         ev.stopPropagation()
    //         console.log('结束点id', this.getRowKeyValue(record))
    //         console.log('结束点index', index)
    //         // 目标数据 record
    //         const url = this.table.url
    //         // 老的变新的
    //         try {
    //           await iopDataService.put({
    //             url: `${url}/${this.getRowKeyValue(this.dragCache.record)}/set-order/${index}`
    //           })
    //           // 新的变老的
    //           await iopDataService.put({
    //             url: `${url}/${this.getRowKeyValue(record)}/set-order/${this.dragCache.index}`
    //           })
    //           this.search()
    //         } catch (e) {
    //           console.log(e)
    //         }
    //       }
    //     }
    //   }
    // },
  }
}
</script>
<style lang="less">
.table-header {
  margin-bottom: 18px;
}
</style>
