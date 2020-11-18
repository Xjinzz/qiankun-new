<template>
  <div>
    <iop-data-table
      ref="objectList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="资源编号">
              <a-input @pressEnter="search" v-model="queryParam.objectCode" placeholder="请输入资源编号" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="资源领域">
              <iop-data-dict-select ref="objectDomain" type="objectDomain" @change="domainChange"/>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="标签">
                <a-input @pressEnter="search" v-model="queryParam.objectLabel" placeholder="请输入标签名称" allowClear />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="资源名称" style="margin-top: 20px;">
                <a-input @pressEnter="search" v-model="queryParam.objectName" placeholder="请输入资源名称" allowClear />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="资源性质" style="margin-top: 20px;">
                <iop-data-dict-select ref="objectNat" type="objectNat" @change="natChange"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="发布状态" style="margin-top: 20px;">
                <iop-data-dict-select ref="releaseStatus" type="releaseStatus" @change="releChange"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>
      <template #createButton>
        <a-button type="primary" @click="catalogChange()">修改分类</a-button>
        <a-button type="primary" @click="releaseClick()">目录发布</a-button>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
        <a-button type="primary" @click="handleImport()">导入</a-button>
        <a-button type="primary" @click="handleExport()">导出</a-button>
      </template>
      <template #editButton="{ record }">
        <a href="javascript:;" @click="attrClick(record)">属性</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="servClick(record)">服务</a>
        <a-divider type="vertical" />
      </template>
      <template #removeButton="{ record }">
        <a href="javascript:;" @click="handleView(record)">查看</a>
      </template>
      <template #afterRemoveButton="{ record }">
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="showAtlas(record)">图谱</a>
            </a-menu-item>
            <!--
            <a-menu-item>
            <a href="javascript:;">属性分布</a>
            </a-menu-item>
            -->
            <a-menu-item>
              <a @click="handleEdit(record)">资源编辑</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleRemove(record)">资源删除</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="addMenu(record)">添加到菜单</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
      <template #tree>
        <object-tree ref="ObjectTree" :catalogType="catalogType" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
    <attr ref="attr"></attr>
    <serv ref="serv"></serv>
    <add ref="add" :mode="formMode" :objectId="objectId" :catalogType="catalogType" @onSubmitSuccess="submitSuccess" />
    <rele ref="rele"></rele>
    <add-menu ref="addMenu"></add-menu>
    <treeUp ref="treeUp" @onSubmitSuccess="submitSuccess"></treeUp>
    <atlas ref="atlas"></atlas>
    <importObject v-if="showImport" ref="import" @search="search"></importObject>
    <exportObject v-if="showExport" ref="export"></exportObject>
  </div>
</template>
<script>
import ObjectTree from './ObjectTree'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop-drms/api'
import attr from './attr/AttrList'
import serv from './service/ServiceList'
import add from './AddForm'
import rele from './Release'
import treeUp from './TreeUp'
import objects from '@/iop-drms/service/server/object'
import addMenu from './addMenu'
import atlas from './Atlas'
import importObject from './importObject/ImportObject'
import exportObject from './exportObject/TreeUp'
import { iopAuthService } from '@/iop/service'
import { DRMS_FORM_URL } from '@/iop-drms/constants'
// 资源对象列表
/** 点击树节点查询列表参数名 */
const tableQueryName = 'catalogId'
export default {
  name: 'ObjectList',
  components: { ObjectTree, IopDataTable, IopDataDictSelect, attr, serv, add, rele, addMenu, treeUp, atlas, importObject, exportObject },
  data () {
    return {
      showForm: false,
      /** 是否展开高级搜索 */
      advanced: false,
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.manage.object.allList,
        /** rowKey，必填 */
        rowKey: 'objectId',
        /** 不显示序号列 */
        /** 列定义 */
        columns: [
          {
            title: '资源编码',
            dataIndex: 'objectCode',
            sorter: true
          },
          {
            title: '资源名称',
            dataIndex: 'objectName',
            sorter: true
          },
          {
            title: '资源性质',
            dataIndex: 'objectNat',
            sorter: true
          },
          {
            title: '行业',
            dataIndex: 'objectTrade',
            sorter: true
          },
          {
            title: '发布状态',
            dataIndex: 'releaseStatus',
            sorter: false,
            customRender: (val, row, ind) => {
              if (row.releaseStatus === '未发布') {
                return <a-switch defaultChecked = { false } onChange = { () => { this.releClick(event, row) } } />
              } else {
                return <a-switch defaultChecked = { true } onChange = { () => { this.releClick(event, row) } } />
              }
            }
          }
        ],
        query: {
          catalogType: this.$route.meta.para
        }
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      objectId: '',
      /** 树当前选中节点 */
      selectedNode: '',
      data: {},
      catalogType: '',
      selectedRowKeys: [],
      showImport: true,
      showExport: true
    }
  },
  created () {
    this.catalogType = this.$route.meta.para
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
        await this.$refs.objectList.reload(Object.assign(this.queryParam, {
          [tableQueryName]: this.selectedNode
        }))
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.objectDomain.cleanSelected()
      if (this.advanced) {
        this.$refs.objectNat.cleanSelected()
        this.$refs.releaseStatus.cleanSelected()
      }
      this.queryParam = {}
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.search()
    },

    /**
     * 监听表格事件
     *
     * @param {string} name 事件名称
     * @param {Object} data 数据
     * @param {string} data.original 数据id
     */
    onAction ({ name, data } = {}) {
      this.selectedRowKeys = []
      this.selectedRowKeys = data.original.selectedRowKeys
      switch (name) {
        case 'onRemove':
          this.reloadNode(data.original)
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original.objectId)
          break
        case 'onEdit':
          this.handleEdit(data.original.objectId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} objectId 数据主键
     */
    reloadNode (objectId) {
      if (!objectId) {
        // 新建或者编辑的回调
        objectId = this.objectId
      }
      if (objectId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.ObjectTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.ObjectTree.reload()
      }
    },
    /**
     * 表单保存成功回调
     */
    submitSuccess () {
      this.queryParam.catalogId = ''
      this.queryParam.catalogId = this.selectedNode
      this.search()
    },
    /**
     * 删除
     */
    handleRemove (record) {
      this.$refs.objectList.handleRemove(record)
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      // 改变弹出框标题
      this.formMode = 'create'
      // 显示弹出框
      this.$refs.add.show()
      // 清空表单项
      this.objectId = ''
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} objectId 主键
     */
    handleView (record) {
      iopAuthService.goPage(DRMS_FORM_URL.OBJECT.FORM, {
        objectFormId: record.objectId,
        objectFormName: record.objectName,
        formMode: 'view'
      })
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} objectId 主键
     */
    handleEdit (record) {
      iopAuthService.goPage(DRMS_FORM_URL.OBJECT.FORM, {
        objectFormId: record.objectId,
        objectFormName: record.objectName,
        formMode: 'edit'
      })
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} objectIds 选中项的主键数组
     */
    handleRemoveSelected (objectIds = []) {
      let objectId
      if (objectIds.includes(this.selectedNode)) {
        objectId = this.selectedNode
      } else {
        objectId = objectIds[0]
      }
      this.reloadNode(objectId)
    },

    attrClick (record = {}) {
      this.$refs.attr.show(record.objectId)
    },
    servClick (record = {}) {
      this.$refs.serv.show(record.objectId)
    },
    domainChange (record) {
      this.queryParam.objectDomain = record
    },
    natChange (record) {
      this.queryParam.objectNat = record
    },
    releChange (record) {
      this.queryParam.releaseStatus = record
    },
    releClick (event, record) {
      const data = { type: record.releaseStatus === '未发布' ? '1' : '0' }
      objects.rele(record.objectId, data).then((res) => {
        this.search()
      })
    },
    releaseClick () {
      this.$refs.rele.show()
    },
    addMenu (record) {
      this.$refs['addMenu'].show({
        id: record.objectId,
        code: record.objectCode,
        name: record.objectName
      })
    },
    catalogChange () {
      if (this.selectedRowKeys.length !== 0) {
        this.$refs.treeUp.show(this.selectedRowKeys)
      } else {
        this.$message.warning('请选择要修改分类的对象')
      }
    },
    // 图谱
    showAtlas (record) {
      this.$refs.atlas.show(record)
    },
    // 导入
    handleImport () {
      this.showImport = false
      this.$nextTick(() => {
        this.showImport = true
        this.$nextTick(() => {
          this.$refs.import.show()
        })
      })
    },
    // 导出
    handleExport () {
      this.showExport = false
      this.$nextTick(() => {
        this.showExport = true
        this.$nextTick(() => {
          this.$refs.export.show()
        })
      })
    }
  }
}
</script>
