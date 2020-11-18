<template>
  <div>
    <a-modal
      title="角色关系"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="1000px"
    >
      <template slot="footer">
        <a-button @click="handleCancel">
          关闭
        </a-button>
      </template>
      <iop-data-table
        ref="roleUserList"
        :table="table"
        :permission="permission"
        :tree="false"
        :hiddenTop="true"
        :autoLoad="false"
        @onAction="onAction"
      >
        <template #editButton="{ record }">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
        </template>
      </iop-data-table>
      <role-user-form
        ref="roleUserForm"
        :mode="formMode"
        :relaTypeId="relaTypeId"
        :roleId="roleId"
        :submitSuccess="submitSuccess"
      />
    </a-modal>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api/index'
import roleUserForm from './RoleUserForm'

export default {
  name: 'RoleUserList',
  components: { IopDataTable, roleUserForm },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      table: {
        /** 列表查询地址 */
        url: path.system.role.roletable,
        /** rowKey，必填 */
        rowKey: 'relaTypeId',
        /** 不显示序号列 */
        // serial: false,
        /** 列定义 */
        columns: [
          {
            title: '关联角色名称',
            dataIndex: 'viceRoleName'
          },
          {
            title: '角色关系',
            dataIndex: 'roleRelaType'
          }
        ],
        actionsWidth: 170,
        selectable: false
      },
      queryParam: {
        roleId: ''
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'edit', 'remove'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      relaTypeId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      roleId: ''
    }
  },
  methods: {
    show (roleId) {
      this.visible = true
      this.roleId = roleId
      this.queryParam.roleId = roleId
      this.$nextTick(() => {
        this.$refs.roleUserList.reload({ roleId: roleId })
      })
    },
    handleCancel () {
      this.visible = false
    },
    /**
     * 查询
     */
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.roleUserList.reload(this.queryParam)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
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
          this.search()
          break
        case 'onCreate':
          this.handleCreate()
          break
        case 'onView':
          this.handleView(data.original.relaTypeId)
          break
        case 'onEdit':
          this.handleEdit(data.original.relaTypeId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.relaTypeId = ''
      this.$refs.roleUserForm.show()
      // this.$refs.roleUserForm.show('create', '', '', this.selectedNode, this.treeName)
    },
    submitSuccess () {
      this.search()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} relaTypeId 主键
     */
    handleEdit (record) {
      this.formMode = 'edit'
      this.relaTypeId = record.relaTypeId
      this.$refs.roleUserForm.show(record.viceRoleName)
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} typeIds 选中项的主键数组
     */
    handleRemoveSelected (typeIds = []) {
      let relaTypeId
      if (typeIds.includes(this.selectedNode)) {
        relaTypeId = this.selectedNode
      } else {
        relaTypeId = typeIds[0]
      }
      this.search(relaTypeId)
    }
  }
}
</script>
