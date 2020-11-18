<template>
  <div>
    <iop-data-table
      :ref="tableState.tableId"
      :table="tableState.tableConfig"
      :tree="isTreePage"
      :permission="tableState.permission"
      @onAction="onAction"
      :autoLoad="false"
      :autoConfig="false"
      v-if="isLoaded"
    >
      <template #tree v-if="isTreePage">
        <iop-tree :rootNode="{show:false}" :ref="treeState.treeId" :options="treeState.treeOption" @onSelect="onTreeSelect"/>
      </template>
      <template #top>
        <slot name="searchArea">
          <form-item-list
            ref="formItemList"
            :mode="mode"
            :options="searchState.formOptions"
            @inputEnter="search"
          >
          </form-item-list>
          <a-row style="clear:both">
            <a-col :span="24" style="text-align:right;">
              <a-button type="primary" @click="search">查询</a-button>
              <a-button @click="reset">重置</a-button>
              <a class="ant-dropdown-link" style="margin-left:10px" v-if="isShowMorebtn && !moreDataSource" @click="showMore" block>
                更多<a-icon type="down" />
              </a>
              <a class="ant-dropdown-link" style="margin-left:10px" v-if="isShowMorebtn && moreDataSource" @click="hideMore" block>
                收起<a-icon type="up" />
              </a>
            </a-col>
          </a-row>
        </slot>
      </template>
      <template #afterCreateButton="{ record }">
        <slot name="brforeAnalysisButton" :record="record"/>
        <slot name="analysisButton" :record="record">
          <a-button
            type="primary"
            @click="doAnalysis"
            v-if="showAnalyze"
          >
            分析
          </a-button>
        </slot>
        <slot name="afterAnalysisButton" :record="record"/>
        <slot name="brforeGraphButton" :record="record"/>
        <slot name="analysisButton" :record="record">
          <a-button
            type="primary"
            @click="showTableGraph"
            v-if="showGraphBtn"
          >
            图谱
          </a-button>
        </slot>
        <slot name="afterGraphButton" :record="record"/>
      </template>
      <template #beforeCreateButton="{ record }">
        <slot name="beforeCreateButton" :record="record" />
      </template>
      <template #createButton="{ record }">
        <slot name="createButton" :record="record" />
      </template>
      <template #beforeRemoveSelectedButton="{ record }">
        <slot name="beforeRemoveSelectedButton" :record="record"/>
      </template>
      <template #removeSelectedButton="{ record }">
        <slot name="removeSelectedButton" :record="record">
          <a-button
            type="primary"
            @click="doRemoveSelect"
            :disabled="tableState.selectedRows.length === 0"
          >删除</a-button>
        </slot>
      </template>
      <template #afterRemoveSelectedButton="{ record }">
        <slot name="afterRemoveSelectedButton" :record="record"></slot>
      </template>
      <!-- 行按钮 -->
      <template #beforeViewButton="{ record }">
        <slot name="beforeViewButton" :record="record"></slot>
      </template>
      <template #viewButton="{ record }">
        <slot name="viewButton" :record="record"></slot>
      </template>
      <template #afterViewButton="{ record }">
        <slot name="afterViewButton" :record="record"></slot>
      </template>
      <template #beforeEditButton="{ record }">
        <slot name="beforeEditButton" :record="record"></slot>
      </template>
      <template #editButton="{ record }">
        <slot name="editButton" :record="record"></slot>
      </template>
      <template #afterEditButton="{ record }">
        <slot name="afterEditButton" :record="record"></slot>
      </template>
      <template #beforeRemoveButton="{ record }">
        <slot name="beforeRemoveButton" :record="record"></slot>
      </template>
      <template #removeButton="{ record }">
        <slot name="removeButton" :record="record">
          <a @click="doRemove(record)">删除</a>
        </slot>
      </template>
      <template v-if="btnList.length" #afterRemoveButton="{ record }">
        <slot name="beforeMoreButton"></slot>
        <slot name="moreButton">
          <a-divider v-if="tableInlineBtnList.length" type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item
                v-for="item in btnList"
                :key="'btnMore-'+item.key"
              >
                <a @click="item.action(record)">
                  {{ item.key }}
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </slot>
        <slot name="afterMoreButton"></slot>
      </template>
    </iop-data-table>
    <!-- 资源库图表/数据资源图表 -->
    <a-modal :width="1300" :visible="graphModalState.visible" @cancel="hideGraphModal" @ok="hideGraphModal" title="资源库图谱">
      <iop-sys-graph :ref="graphModalState.ref" :option="graphModalState.options"></iop-sys-graph>
    </a-modal>
  </div>
</template>
<script>
import { IopDataTable, IopSysGraph, IopDataDictSelect } from '@/iop/components'
import IopTree from './TreeItem'
import FormItemList from './FormItemList'
import _idSeed from '../tool/idSeed'
import Service from '@/iop-drms/service/resource-definition/resource-definition'
import { arrayTool } from 'mwutil'
import Define from '../tool/define'
import tableMixins from './tableMixins'
import { getRouteMark, initRouteMark } from '../tool/routeMark'
import { inputNumberFieldHandle, dateFieldHandle, defaultFieldHandle } from '../tool/business'
export default {
  mixins: [tableMixins],
  props: {
    /**
     * @description 请求信息的id 对应objectid
     * @requires
     * @readonly
     * @returns { String } query.id
     */
    depeatId: {
      type: String,
      required: true,
      default: ''
    },
    /**
     * @description objectCode请求form接口使用
     * @requires
     * @default ''
     */
    depeatCode: {
      type: String,
      required: true,
      default: ''
    },
    options: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    /**
     * @description 过滤条件
     * @default {}
     */
    filter: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * @description 是否隐藏行内资源图谱按钮
     * @default false
     */
    hideRowGraph: {
      type: Boolean,
      required: false,
      default: () => false
    },
    /**
     * @description 多选
     * @default false
     */
    selectable: {
      type: Boolean,
      default: true
    }
  },
  components: {
    IopDataTable,
    FormItemList,
    IopTree,
    IopSysGraph,
    IopDataDictSelect
  },
  data () {
    return {
      graphModalState: {
        visible: false,
        ref: 'graphModal',
        baseConfig: {
          getUrl: () => {},
          getCurrentNodeId: () => {},
          width: 1200,
          height: 800,
          color: {
            'Attribute': '#ff5757',
            'Foreign': '#7e4cef',
            'Inherit': '#47ef1f',
            'default': '#333'
          },
          autoList: false
        },
        opitons: {}
      },
      // 判断数据是否加载完毕
      isLoaded: false,
      layoutType: Define.LAYOUTTYPE.LIST,
      // 控制查看页面打开的是什么类型
      relationLayout: Define.RELATIONLAYOUT.COLUMN,
      // 判断打开时候是什么页面
      mode: Define.MODE.SEARCH,
      api: {},
      treeState: {
        treeId: _idSeed.newId(),
        treeOption: {
          getUrl: (key, nodeQuery, node) => {
            // 隐藏全部之后第一次拿到的node为空对象，所以需要兼容判断
            if (!node.id) {
              return this.api.treeUrl
            } else {
              return node.bh
            }
          }
        },
        selecter: null
      },
      searchState: {
        formOptions: {
          dataSource: [],
          layoutColumn: 3,
          minDataSource: [],
          maxDataSource: [],
          filterKeyMap: {}
        }
      },
      tableState: {
        tableId: _idSeed.newId(),
        tableConfig: {},
        permission: [],
        selectedRows: []
      },
      // 控制更多还是收起
      moreDataSource: false,
      // 控制是否需要更多按钮
      isShowMorebtn: false
    }
  },
  computed: {
    isTreePage () {
      return this.layoutType === Define.LAYOUTTYPE.TREE
    },
    // 查看页面url获取
    viewUrl () {
      const pagePath = {
        [Define.RELATIONLAYOUT.COLUMN]: Define.PAGEURL.VIEW + getRouteMark(),
        [Define.RELATIONLAYOUT.TABROW]: Define.PAGEURL.RELATIONVERTICAL + getRouteMark(),
        [Define.RELATIONLAYOUT.TABCOLUMN]: Define.PAGEURL.RELATION + getRouteMark()
      }
      return pagePath[(this.relationLayout || Define.RELATIONLAYOUT.COLUMN)]
    },
    showAnalyze () {
      return arrayTool.deepClone(this.tableState.permission).includes(Define.TABLEBUTTON.ANALYZE)
    },
    showGraphBtn () {
      return arrayTool.deepClone(this.tableState.permission).includes(Define.TABLEBUTTON.GRAPHBTN)
    },
    id () {
      return this.depeatId
    },
    code () {
      return this.depeatCode
    },
    // 按钮列表
    btnList () {
      const customBtn = this.options.btn || []
      if (this.hideRowGraph) {
        return [...customBtn]
      }
      return [
        {
          key: '资源对象图谱',
          action: this.showItemGraph
        },
        ...customBtn
      ]
    },
    // 获取table行内按钮
    tableInlineBtnList () {
      return arrayTool.deepClone(this.tableState.permission).filter(item => {
        return (item === Define.TABLEBUTTON.VIEW || item === Define.TABLEBUTTON.REMOVE || item === Define.TABLEBUTTON.EDIT)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      initRouteMark()
      this.isLoaded = false
      this.layoutType = Define.LAYOUTTYPE.LIST
      this.getPageInfo()
    })
  },
  methods: {
    // 按钮展开更多
    showMore () {
      this.moreDataSource = true
      this.searchState.formOptions.dataSource = arrayTool.deepClone(this.searchState.formOptions.maxDataSource)
    },
    // 按钮展开更多
    hideMore () {
      this.moreDataSource = false
      this.searchState.formOptions.dataSource = arrayTool.deepClone(this.searchState.formOptions.minDataSource)
    },
    // 处理初始化search数据
    dealSearchField (arr) {
      this.filterKeyMap = {}
      return arr.map((item) => {
        item.__show = true
        if (this.filter.hasOwnProperty(item.name)) {
          dateFieldHandle.setSuccessor(inputNumberFieldHandle)
          inputNumberFieldHandle.setSuccessor(defaultFieldHandle)
          this.filterKeyMap[item.name] = dateFieldHandle.handleRequest(item.type, this.filter[item.name])
          item.readOnly = true
        }
        return item
      })
    },
    // 处理页面的查询区域
    _addBtn (x) {
      // 最少查询项
      this.searchState.formOptions.minDataSource = []
      // 最多查询项
      this.searchState.formOptions.maxDataSource = this.dealSearchField(x.search)
      this.searchState.formOptions.minDataSource = arrayTool.deepClone(this.searchState.formOptions.maxDataSource)
      if (this.searchState.formOptions.minDataSource.length > 3) {
        this.isShowMorebtn = true
        this.searchState.formOptions.minDataSource.forEach((item, index) => {
          if (index > 2) {
            item.__show = false
          }
        })
      }
      this.searchState.formOptions.dataSource = arrayTool.deepClone(this.searchState.formOptions.minDataSource)
    },
    // 处理页面searchoption
    _addConfig (x) {
      const config = {}
      // 获取table行内按钮组合
      const actionsWidthList = {
        1: '100px',
        2: '125px',
        3: '150px',
        4: '216px'
      }
      // 获取行内所有按钮（更多）
      let btnNum = this.tableInlineBtnList.length
      // 融合更多按钮进行判断
      if (this.btnList.length) {
        btnNum++
      }
      if (btnNum > 0) {
      // 设置宽度
        config['actionsWidth'] = actionsWidthList[btnNum]
      } else {
      // 隐藏actions
        config['actions'] = false
      }
      // 表格是否多选
      x.selectable = this.selectable
      // 解析tableconfig(MIX)
      this.tableState.tableConfig = this.mx_dealTableConfig(config, x)
    },
    // 获取页面信息
    getPageInfo () {
      Service.getConstructList(this.id, {
        objectCode: this.code
      })
        .then(x => {
          this.api = x.api
          this.layoutType = x.layoutType
          this.tableState.permission = arrayTool.getSimpleValuesByField(x.button, 'code')
          this._addConfig(x)
          // 设置打开的页面的类型
          this.relationLayout = x.relationLayout || Define.RELATIONLAYOUT.COLUMN
          this._addBtn(x)
          this.isLoaded = true
          this.$nextTick(() => {
            try {
              this.$refs[this.tableState.tableId].init()
            } catch (e) {
            }
            // 设置初使过滤条件
            this.$refs[this.tableState.tableId].setFieldsValue(this.filterKeyMap)
            this.search()
          })
        })
        .catch(e => {
          this.$message.error(e)
        })
    },
    // 操作按钮
    onAction ({ name = '', data = {} }) {
      switch (name) {
        case 'onSelectedChange':
          this.setSelected({ data, name })
          break
        case 'onEdit':
          this.doEdit(data.original)
          break
        case 'onView':
          this.doView(data.original)
          break
        case 'onCreate':
          this.doCreate()
          break
      }
    },
    // 根据item获取表格主键的value
    getRowKeyByItem (item) {
      return item[this.tableState.tableConfig['rowKey']]
    },
    // 设置选中
    setSelected (table) {
      this.tableState.selectedRows = table.data.original.selectedRowKeys
      this.$emit('tableSelected', table)
    },
    // 新建
    doCreate () {
      // 如果左侧有选中  则传入treeSelectCode\treeSelectid
      const params = {}
      if (this.treeState.selecter) {
        params['treeSelectCode'] = this.treeState.selecter.code
        params['treeSelectId'] = this.treeState.selecter.id
      }
      this.$goPage(this.viewUrl + '?mode=' + Define.MODE.CREATE, Object.assign({}, params, {
        id: this.id,
        mode: Define.MODE.CREATE,
        code: this.code
      }))
    },
    // 查看
    doView (item) {
      this.$goPage(this.viewUrl + '?mode=' + Define.MODE.DETAIL, {
        id: this.id,
        code: this.code,
        detailId: this.getRowKeyByItem(item)
      })
    },
    // 修改
    doEdit (item) {
      this.$goPage(this.viewUrl + '?mode=' + Define.MODE.EDIT, {
        id: this.id,
        mode: Define.MODE.EDIT,
        code: this.code,
        detailId: this.getRowKeyByItem(item)
      })
    },
    reset () {
      // 重置
      if (this.isTreePage) {
        // 重置树
        this.treeState.selecter = null
        this.$refs[this.treeState.treeId].reload()
      }
      this.$refs['formItemList'].reset()
      // this.reloadTable()
      this.$refs[this.tableState.tableId].resetSearch()
      this.$refs[this.tableState.tableId].search()
    },
    // 删除选中
    doRemoveSelect (item) {
      this.$confirm({
        title: '确定删除选中项吗',
        onOk: () => {
          Service.doRemoveSelect(this.api.batchDeleteUrl, {
            items: this.tableState.selectedRows
          })
            .then((x) => {
              this.$message.success('删除成功')
              this.search()
            })
        }
      })
    },
    // 删除行内
    doRemove (item) {
      this.$confirm({
        title: '确定删除吗',
        onOk: () => {
          Service.doRemove(this.api.deleteUrl + this.getRowKeyByItem(item))
            .then((x) => {
              this.$message.success('删除成功')
              this.search()
            })
        }
      })
    },
    // 到分析页面
    doAnalysis () {
      this.$goPage(Define.PAGEURL.ANALYSIS + getRouteMark(), {
        objectId: this.id,
        objectCode: this.code,
        searchCondition: JSON.stringify(this.getSearchCondition())
      })
    },
    onTreeSelect (item) {
      this.treeState.selecter = item.data
      this.search()
    },
    // params二次解析函数
    dealParams (params) {
      this.searchState.formOptions.dataSource.map(x => {
        // 处理所有的时间区间对象
        if (x.type === Define.COMPTYPE.DATEGROUP || x.type === Define.COMPTYPE.DATETIMEGROUP) {
          if (params[x.name]) {
            // 获取时间戳
            params[x.name] = params[x.name].map(item => {
              if (x.type === Define.COMPTYPE.DATEGROUP) {
                return String(new Date(new Date(Date.parse(item)).toLocaleDateString()).getTime())
              } else {
                return String(Date.parse(item))
              }
            })
            // ～链接两个时间
            params[x.name] = params[x.name].join('~')
          }
        }
        // 处理区间数字提交
        if (x.type === Define.COMPTYPE.INPUTNUMBER && params[x.name]) {
          params[x.name] = params[x.name].join('~')
          if (params[x.name] === '~') {
            params[x.name] = ''
          }
        }
      })
      return params
    },
    // 获取search的条件
    getSearchCondition () {
      const params = this.dealParams(this.$refs[this.tableState.tableId].getFieldsValue())
      return params
    },
    async reloadTable (params) {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs[this.tableState.tableId].reload(params)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },
    // 获取树选中值
    getTreeSelector () {
      if (this.treeState.selecter) {
        return this.treeState.selecter
      }
      return null
    },
    // 增加包含树的过滤
    search () {
      const params = this.getSearchCondition()
      if (this.treeState.selecter && this.treeState.selecter.code && this.treeState.selecter.id) {
        params[this.treeState.selecter.code] = this.treeState.selecter.id
      }
      this.reloadTable(params)
    },
    // 展示资源图谱弹窗
    showGraphModal (options) {
      this.graphModalState.visible = true
      this.graphModalState.options = options
      this.$nextTick(() => {
        this.$refs[this.graphModalState.ref].restart()
      })
    },
    hideGraphModal () {
      this.graphModalState.visible = false
    },
    showItemGraph (d) {
      this.showGraphModal(Object.assign(this.graphModalState.baseConfig, {
        getUrl: () => {
          return `/iop/drms/data-graph/data-list/${this.code}/${this.id}/${d.id}`
        },
        getCurrentNodeId: () => {
          return d.id
        },
        customNodeText: (x) => {
          return x.object_graph_show_name
        }
      }))
    },
    showTableGraph () {
      this.showGraphModal(Object.assign(this.graphModalState.baseConfig, {
        getUrl: () => {
          return `/iop/drms/data-graph/list/${this.code}/${this.id}`
        },
        getCurrentNodeId: () => {
          return this.id
        }
      }))
    },
    /*
    * @description 获取api对象
    * @public
    */
    getApiMap () {
      return this.api
    }
  }
}
</script>
<style lang="less" scoped>
  .__tableItemtd{
    word-break: break-all;
  }
  .ellipsis {
    display: block;
    max-width:200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
