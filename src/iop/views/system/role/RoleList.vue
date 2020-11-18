<template>
  <div>
    <iop-data-table
      ref="roleList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色名称">
              <a-input @pressEnter="search" v-model="queryParam.roleName" placeholder="请输入角色名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="角色分组">
              <a-input @pressEnter="search" v-model="queryParam.roleGroup" placeholder="请输入角色分组" allowClear />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="角色类型">
                <iop-data-dict-select type="roleType" ref="roleTypes" @change="onTypeChange"></iop-data-dict-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="所属单位" style="margin-top: 20px;">
                <a-input @pressEnter="search" v-model="queryParam.deptName" placeholder="请输入所属单位" allowClear />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 16" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>

      <template #createButton="{ tree }">
        <a-button type="primary" @click="handleCreate(tree)">新建</a-button>
      </template>

      <template #editButton="{ record }">
        <a href="javascript:;" @click="empower(record)">授权用户</a>
        <a-divider type="vertical" />
      </template>
      <template #removeButton="{ record }">
        <a href="javascript:;" @click="roleFun(record)">授权菜单</a>
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
              <a @click="handleEdit(record)">编辑</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleRemove(record)">删除</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="relation(record)">角色关系</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>

      <template #tree>
        <role-tree ref="typesTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
    <roleForm
      ref="roleForm"
      :id="roleId"
      :mode="formMode"
      :selectedNode="selectedNode"
      :submitSuccess="submitSuccess"
    >
    </roleForm>
    <empRole
      :roleUser="roleUser"
      ref="empRole"
      v-if="empRoleHidden"
    >
    </empRole>
    <roleFun ref="roleFun"></roleFun>
    <roleUser ref="roleData" :roleUser="roleUser"></roleUser>
  </div>
</template>
<script>
import RoleTree from './RoleTree'
import roleForm from './RoleForm'
import empRole from './EmpRole'
import roleFun from './RoleFun'
import roleUser from './roleUserIndex/RoleUserList'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import roleListVO from './vo/role-list-vo'
// import roles from '@/iop/service/system/role'

/** 点击树节点查询列表参数名 */
const tableQueryName = 'parentId'
export default {
  name: 'RoleList',
  components: { RoleTree, IopDataTable, IopDataDictSelect, roleForm, empRole, roleFun, roleUser },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.system.role.table,
        /** rowKey，必填 */
        rowKey: 'roleId',
        /** 列定义 */
        columns: roleListVO,
        actionsWidth: 250
      },
      empRoleHidden: false,
      queryParam: {
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'remove', 'edit', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      roleId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      treeName: '',
      /** 上级行政区域 */
      parentId: '',
      roleUser: {}
    }
  },
  methods: {
    /**
     * 显示/隐藏高级搜索
     */
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onTypeChange (data) {
      this.queryParam.roleType = data
    },
    /**
     * 查询
     */
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.roleList.reload(Object.assign({ parentId: this.selectedNode }, this.queryParam))
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.queryParam = {
      }
      if (this.advanced) {
        this.$refs.roleTypes.cleanSelected()
      }
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key, data }) {
      this.selectedNode = key
      if (key === '0') {
        this.treeName = '全部'
      } else if (data) {
        this.treeName = data.name
      }
      // 请求:/iop/base/area?page=1&size=10&roleId=123
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
          this.handleView(data.original.roleId)
          break
        case 'onEdit':
          this.handleEdit(data.original.roleId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} roleId 数据主键
     */
    reloadNode (roleId) {
      if (!roleId) {
        // 新建或者编辑的回调
        roleId = this.roleId
      }
      if (roleId !== this.selectedNode) {
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
      this.roleId = ''
      this.$refs.roleForm.show()
    },
    submitSuccess () {
      this.reloadNode(this.selectedNode === '0' ? '0' : '')
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} roleId 主键
     */
    handleEdit (record) {
      this.formMode = 'edit'
      this.roleId = record.roleId
      this.$refs.roleForm.show()
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} typeIds 选中项的主键数组
     */
    handleRemoveSelected (typeIds = []) {
      let roleId
      if (typeIds.includes(this.selectedNode)) {
        roleId = this.selectedNode
      } else {
        roleId = typeIds[0]
      }
      this.reloadNode(roleId)
    },
    handleRemove (record) {
      this.$refs.roleList.handleRemove(record)
    },
    // 授权
    empower (record) {
      this.roleUser = record
      this.empRoleHidden = false
      this.$nextTick(() => {
        this.empRoleHidden = true
        setTimeout(() => {
          this.$refs.empRole.show(record.roleId)
        })
      })
    },
    // 角色授权
    roleFun (record) {
      this.$refs.roleFun.show(record.roleId)
    },
    // 角色关系
    relation (record) {
      this.roleUser = record
      this.$refs.roleData.show(record.roleId)
    }
  }
}
</script>
