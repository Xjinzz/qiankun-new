<template>
  <a-modal
    title="资源属性"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    width="1300px"
  >
    <iop-data-table ref="attrList" :table="table" :permission="permission">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="属性名称">
              <a-input v-model="queryParam.attrName" placeholder="请输入属性名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="属性编码">
              <a-input v-model="queryParam.attrCode" placeholder="请输入属性编码" allowClear />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="是否列表显示">
                <iop-data-dict-select ref="isShowList" type="isTrue" @change="onShowChange"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="是否查询项" style="margin-top: 20px;">
                <iop-data-dict-select ref="isQuery" type="isTrue" @change="onQueryChange"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>
      <template #editButton="{ record }">
        <a @click="handleEdit(record.attrId)">编辑</a>
        <a-divider type="vertical" />
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record.attrId)">查看</a>
        <a-divider type="vertical" />
      </template>
      <template #removeButton="{ record }">
        <a href="javascript:;" @click="handleRemove(record)">删除</a>
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
    </iop-data-table>

    <attr-form ref="attrForm" :mode="formMode" :attrId="attrId" :submitSuccess="submitSuccess" />
    <modal ref="modal" @submitSuccess="submitSuccess" />

    <template #footer>
      <div style="text-align:center;">
        <a-button @click="handleCancel">关闭</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop-drms/api'
import AttrForm from './AttrForm'
import modal from './AttrModal'
// 资源对象-属性
export default {
  name: 'AttrList',
  components: { IopDataTable, AttrForm, modal, IopDataDictSelect },
  data () {
    return {
      advanced: false,
      visible: false,
      confirmLoading: false,
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.manage.attr.allList,
        /** rowKey，必填 */
        rowKey: 'attrId',
        /** 列定义 */
        // columns: attrListVO,
        columns: [
          {
            title: '属性名称',
            dataIndex: 'attrName',
            width: 150
          },
          {
            title: '属性编码',
            dataIndex: 'attrCode',
            width: 150
          },
          {
            title: '数据类型',
            dataIndex: 'dataType',
            width: 150
          },
          {
            title: '取值类型',
            dataIndex: 'valueType',
            width: 150
          },
          {
            title: '是否查询项',
            dataIndex: 'isQuery',
            width: 150
          },
          {
            title: '列表中显示',
            dataIndex: 'isShowList',
            width: 150
          },
          {
            title: '排序号',
            dataIndex: 'orderNum',
            width: 150,
            customRender: (val, row, ind) => {
              return <div ondblclick = { () => { this.numEdit(row) } }>{val}</div>
            }
          }
        ]
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      attrId: '',
      objectId: '',
      firstShow: true
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
     * 重置搜索条件
     */
    resetSearchForm () {
      this.queryParam = {}
      if (this.advanced) {
        this.$refs.isShowList.cleanSelected()
        this.$refs.isQuery.cleanSelected()
      }
      this.search()
    },

    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.attrList.reload(this.queryParam)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 表单保存成功回调
     */
    submitSuccess () {
      this.search()
    },
    /**
     * 删除
     */
    handleRemove (record) {
      this.$refs.attrList.handleRemove(record)
    },
    /**
     * 删除列表选择项，多选
     *
     * @param {Array} claIds 选中项的主键数组
     */
    handleRemoveSelected (claIds = []) {
      let objectId
      if (claIds.includes(this.selectedNode)) {
        objectId = this.selectedNode
      } else {
        objectId = claIds[0]
      }
      this.reloadNode(objectId)
    },
    /**
     * 打开新建窗口
     */
    handleCreate () {
      // 改变弹出框标题
      this.formMode = 'create'
      // 显示弹出框
      this.$refs.attrForm.show(this.objectId)
      // 清空表单项
      this.attrId = ''
    },

    /**
     * 打开编辑窗口
     *
     * @param {string} attrId 主键
     */
    async handleEdit (attrId = '') {
      this.formMode = 'edit'
      this.$refs.attrForm.show(this.objectId)
      this.attrId = attrId
    },

    /**
     * 打开查看窗口
     * @param {string} attrId 主键
     */
    async handleView (attrId = '') {
      this.formMode = 'view'
      this.$refs.attrForm.show()
      this.attrId = attrId
    },
    handleOk () {
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    },
    show (objectId = '') {
      this.objectId = objectId
      this.table.query = { objectId }
      this.visible = true
      if (!this.firstShow) {
        this.$nextTick(() => {
          this.resetSearchForm()
          // this.search()
        })
      } else {
        this.firstShow = false
      }
    },
    numEdit (row) {
      this.$refs.modal.show(row)
    },
    onQueryChange (record) {
      this.queryParam.isQuery = record
    },
    onShowChange (record) {
      this.queryParam.isShowList = record
    }
  }
}
</script>
