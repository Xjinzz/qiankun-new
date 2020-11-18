<template>
  <div>
    <iop-data-table
      ref="typesList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="类型名称">
              <a-input @pressEnter="search" v-model="queryParam.typeName" placeholder="请输入类型名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="类型编码">
              <a-input @pressEnter="search" v-model="queryParam.typeCode" placeholder="请输入类型编码" allowClear />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="是否有效">
                <a-select defaultValue="0" v-model="queryParam.isValid">
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option value="0">否</a-select-option>
                  <a-select-option value="1">是</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px" :style="{ marginTop: advanced ? '20px': '' }">
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
        <a @click="handleView(record)">查看</a>
        <a-divider type="vertical" />
      </template>

      <template #tree>
        <types-tree ref="typesTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
    <basics-form
      ref="typesForm"
      :mode="formMode"
      :submitSuccess="submitSuccess"
    />
  </div>
</template>
<script>
import TypesTree from './TypesTree'
import BasicsForm from './basics/Basics'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import modal from './Modal'
import { iopAuthService } from '@/iop/service'
import { IOP_FORM_URL } from '@/iop/constants'
import files from '@/iop/service/file/types'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'typeId'
export default {
  name: 'TypesList',
  components: { TypesTree, BasicsForm, IopDataTable, IopDataDictSelect, modal },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.file.types.table,
        /** rowKey，必填 */
        rowKey: 'typeId',
        /** 不显示序号列 */
        // serial: false,
        /** 列定义 */
        columns: [
          {
            title: '类型名称',
            dataIndex: 'typeName'
          },
          {
            title: '类型编码',
            dataIndex: 'typeCode'
          },
          {
            title: '是否有效',
            dataIndex: 'isValid',
            customRender: (val, row, ind) => {
              if (row.isValid === '1') {
                return <a-switch defaultChecked = { true } onChange = { () => { this.isValidClick(event, row) } } />
              } else {
                return <a-switch defaultChecked = { false } onChange = { () => { this.isValidClick(event, row) } } />
              }
            }
          },
          {
            title: '版本管理',
            dataIndex: 'isVersion',
            customRender: (val, row, ind) => {
              if (row.isVersion === '1') {
                return <a-switch defaultChecked = { true } onChange = { () => { this.isVersionClick(event, row) } } />
              } else {
                return <a-switch defaultChecked = { false } onChange = { () => { this.isVersionClick(event, row) } } />
              }
            }
          },
          {
            title: '存储加密',
            dataIndex: 'encryptAlgo',
            customRender: (val, row, ind) => {
              if (row.encryptAlgo === '1') {
                return <a-switch defaultChecked = { true } onChange = { () => { this.encryptAlgoClick(event, row) } } />
              } else {
                return <a-switch defaultChecked = { false } onChange = { () => { this.encryptAlgoClick(event, row) } } />
              }
            }
          },
          {
            title: '执行归档',
            dataIndex: 'isArchive',
            customRender: (val, row, ind) => {
              if (row.isArchive === '1') {
                return <a-switch defaultChecked = { true } onChange = { () => { this.isArchiveClick(event, row) } } />
              } else {
                return <a-switch defaultChecked = { false } onChange = { () => { this.isArchiveClick(event, row) } } />
              }
            }
          }
        ],
        actionsWidth: 170,
        selectable: false
      },
      queryParam: {
        isValid: '',
        typeId: ''
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'edit', 'remove'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      typeId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      treeName: '',
      /** 上级行政区域 */
      parentId: '',
      showForm: false
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
        await this.$refs.typesList.reload(this.queryParam)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.queryParam = {
        isValid: '',
        typeId: this.selectedNode
      }
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key, data }) {
      this.queryParam.typeId = key
      this.selectedNode = key
      if (key === '0') {
        this.treeName = '全部'
      } else if (data) {
        this.treeName = data.name
      }
      // 请求:/iop/base/area?page=1&size=10&typeId=123
      this.$refs.typesList.reload({
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
          this.handleView(data.original.typeId)
          break
        case 'onEdit':
          this.handleEdit(data.original.typeId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} typeId 数据主键
     */
    reloadNode (typeId) {
      if (!typeId) {
        // 新建或者编辑的回调
        typeId = this.typeId
      }
      if (typeId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.typesTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.typesTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.typeId = ''
      this.parentId = this.selectedNode !== '0' ? this.selectedNode : ''
      this.$refs.typesForm.show('create', '', '', this.selectedNode, this.treeName)
    },
    submitSuccess () {
      this.reloadNode(this.selectedNode === '0' ? '0' : '')
    },
    /**
     * 点击查看按钮事件
     *
     *  @param {string} typeId 主键
     */
    handleView (record) {
      this.formMode = 'view'
      this.typeId = record.typeId
      iopAuthService.goPage(IOP_FORM_URL.FILE.LIFECYCLE.VIEW, {
        typesId: record.typeId,
        typesName: record.typeName,
        formMode: 'view'
      })
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} typeId 主键
     */
    handleEdit (record) {
      this.formMode = 'edit'
      this.typeId = record.typeId
      iopAuthService.goPage(IOP_FORM_URL.FILE.LIFECYCLE.VIEW, {
        typesId: record.typeId,
        typesName: record.typeName,
        formMode: 'edit'
      })
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} typeIds 选中项的主键数组
     */
    handleRemoveSelected (typeIds = []) {
      let typeId
      if (typeIds.includes(this.selectedNode)) {
        typeId = this.selectedNode
      } else {
        typeId = typeIds[0]
      }
      this.reloadNode(typeId)
    },
    isValidClick (event, row) {
      files.fileSwitch(row.typeId, { attrName: 'isValid', status: row.isValid === '1' ? '0' : '1' }).then((res) => {
      })
    },
    isVersionClick (event, row) {
      files.fileSwitch(row.typeId, { attrName: 'isVersion', status: row.isVersion === '1' ? '0' : '1' }).then((res) => {
      })
    },
    encryptAlgoClick (event, row) {
      files.fileSwitch(row.typeId, { attrName: 'isEncrypt', status: row.encryptAlgo === '1' ? '0' : '1' }).then((res) => {
      })
    },
    isArchiveClick (event, row) {
      files.fileSwitch(row.typeId, { attrName: 'isArchive', status: row.isArchive === '1' ? '0' : '1' }).then((res) => {
      })
    }
  },
  mounted () {
    if (this.$route.query.showTypes) {
      this.submitSuccess()
    }
  },
  watch: {
    $route: function () {
      if (this.$route.query.showTypes) {
        this.submitSuccess()
      }
    }
  }
}
</script>
