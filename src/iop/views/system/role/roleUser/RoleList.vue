<template>
  <a-modal
    title="选择副角色"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    width="1100px"
  >
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        关闭
      </a-button>
    </template>
    <iop-data-table
      ref="roleList"
      :table="table"
      :permission="permission"
      :tree="{}"
      @onAction="onAction"
      :hiddenTop="true"
    >
      <template #editButton="{ record }">
        <a @click="handleEdit(record)">选择</a>
      </template>

      <template #tree>
        <role-tree ref="roleTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
  </a-modal>
</template>
<script>
import RoleTree from './RoleTree'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api'
import Ellipsis from '@/components/Ellipsis'
// import DataDictSelect from '@/components/data-dict-select'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'parentId'
export default {
  name: 'RoleList',
  components: { RoleTree, IopDataTable, IopDataDictSelect, Ellipsis },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.system.role.table,
        /** rowKey，必填 */
        rowKey: 'roleId',
        /** 不显示序号列 */
        // serial: false,
        /** 列定义 */
        columns: [
          {
            title: '角色名称',
            dataIndex: 'roleName'
          },
          {
            title: '角色分组',
            dataIndex: 'roleGroup'
          },
          {
            title: '角色类型',
            dataIndex: 'roleType',
            customRender: (text) => {
              if (text === '1') {
                return '普通角色'
              } else if (text === '2') {
                return '系统管理员'
              } else if (text === '3') {
                return '安全管理员'
              } else {
                return '审计管理员'
              }
            }
          },
          {
            title: '所属单位',
            dataIndex: 'deptName'
          },
          {
            title: '角色说明',
            dataIndex: 'remark',
            customRender: (text) => {
              if (text !== '') {
                return <ellipsis length={15} tooltip={true}>{{ text }}</ellipsis>
              }
            }
          }
        ],
        actionsWidth: 100,
        selectable: false
      },
      /** 表格组件按钮权限 */
      permission: ['edit'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      areaId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      parentId: '',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$nextTick(() => {
        this.search()
      })
    },
    handleCancel () {
      this.visible = false
    },
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
        await this.$refs.roleList.search()
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.roleList.resetSearch()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      // 请求:/iop/base/area?page=1&size=10&areaId=123
      this.$refs.roleList.reload({
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
          this.handleView(data.original.areaId)
          break
        case 'onEdit':
          this.handleEdit(data.original.areaId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} areaId 数据主键
     */
    reloadNode (areaId) {
      if (!areaId) {
        // 新建或者编辑的回调
        areaId = this.areaId
      }
      if (areaId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.roleTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.roleTree.reload()
      }
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} areaId 主键
     */
    handleEdit (record) {
      this.visible = false
      this.$emit('selRole', record)
    },
    /**
     * 删除列表选择项，多选
     *
     * @param {Array} areaIds 选中项的主键数组
     */
    handleRemoveSelected (areaIds = []) {
      let areaId
      if (areaIds.includes(this.selectedNode)) {
        areaId = this.selectedNode
      } else {
        areaId = areaIds[0]
      }
      this.reloadNode(areaId)
    }
  }
}
</script>
