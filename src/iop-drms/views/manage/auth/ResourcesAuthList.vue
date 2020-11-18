<template>
  <div class="auth">
    <iop-data-table
      ref="resourcesAuthList"
      :table="table"
      :permission="permission"
      tree
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="12" :offset="6">
            <a-input-search
              allowClear
              enter-button="查询"
              @search="search"
              placeholder="请输入角色名称" />
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <user-role-auth-tree ref="authNavTree" @onSelect="onTreeSelect" />
      </template>

      <template #afterEditButton="{ record }" >
        <a @click="accessAuth(record.roleId)" >访问授权</a>
        <a-divider type="vertical"/>
      </template>

      <template #beforeRemoveButton="{ record }" >
        <a @click="manageAuth(record.roleId)" >管理授权</a>
        <a-divider type="vertical"/>
      </template>

      <template #afterRemoveButton="{ record }">
        <a @click="attrAuth(record.roleId)">属性授权</a>
      </template>
    </iop-data-table>
    <a-modal
      class="authModeal"
      title="授权"
      v-model="modelVisible"
      @cancel="handleCancel"
    >
      <resources-auth-tree
        ref="resourcesAuthTree"
        :url="url"
        :roleId="roleId"
        :checkable="true"
        @onCheck="onTreeCheck"
        @onCancleCheck="onCancleCheck"
      />
      <template #footer>
        <a-button type="primary" @click="handleCancel" style="text-aline:center;">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import resourcesAuthListVo from './vo/resources-auth-list-vo'
import UserRoleAuthTree from './UserRoleAuthTree'
import ResourcesAuthTree from './ResourcesAuthTree'
import { IopDataTable } from '@/iop/components'
import path from '@/iop-drms/api'
import { iopDrmsAuthService } from '@/iop-drms/service'
import MessageUtils from '@/utils/message'

export default {
  /** 资源授权列表 */
  name: 'ResourcesAuthList',
  components: { IopDataTable, UserRoleAuthTree, ResourcesAuthTree },
  data () {
    return {
      roleName: '',
      permission: [],
      table: {
        rowKey: 'roleId',
        columns: resourcesAuthListVo,
        serial: true,
        selectable: false,
        url: path.manage.auth.table,
        actionsWidth: '250px'
      },
      /** 左侧树形图选中节点 */
      selectedNode: '',
      navUrl: path.manage.auth.tree,
      /** 列表树地址 */
      url: '',
      accessUrl: path.manage.auth.treeVisit,
      attrUrl: path.manage.auth.treeAttr,
      manegeUrl: path.manage.auth.treeManage,
      roleId: '',
      /** 模态框状态 */
      modelVisible: false
    }
  },
  methods: {

    /**
     * 模态框隐藏事件
     */
    handleCancel (e) {
      this.modelVisible = false
      this.roleId = ''
      this.url = ''
      this.$nextTick(() => {
        this.$refs.resourcesAuthTree.setCheckedKeys()
      })
    },

    /**
     * 树形 多选框选中事件
     */
    async onTreeCheck ({ keys, data }) {
      try {
        const datas = {
          checked: 1,
          parentId: data.id,
          roleId: this.roleId,
          type: data.type,
          code: data.code
        }
        await iopDrmsAuthService.save(datas)
        MessageUtils.success()
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 树形 多选框取消选中
     */
    async onCancleCheck ({ key, data }) {
      try {
        const datas = {
          checked: 0,
          parentId: data.id,
          roleId: this.roleId,
          type: data.type,
          code: data.code
        }
        await iopDrmsAuthService.save(datas)
        MessageUtils.success()
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 访问授权
     */
    accessAuth (roleId = '') {
      this.modelVisible = true
      this.roleId = roleId
      this.url = this.accessUrl
      this.$nextTick(() => {
        this.$refs.resourcesAuthTree.reload()
      })
    },
    /**
     * 管理授权
     */
    manageAuth (roleId = '') {
      this.modelVisible = true
      this.roleId = roleId
      this.url = this.manegeUrl
      this.$nextTick(() => {
        this.$refs.resourcesAuthTree.reload()
      })
    },

    /**
     * 属性授权
     */
    attrAuth (roleId = '') {
      this.modelVisible = true
      this.roleId = roleId
      this.url = this.attrUrl
      this.$nextTick(() => {
        this.$refs.resourcesAuthTree.reload()
      })
    },

    /**
     * 点击树节点
     */
    onTreeSelect ({ key, data }) {
      this.selectedNode = key
      this.$refs.resourcesAuthList.reload({
        sysDeptId: key
      })
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} roleId 数据主键
     */
    reloadNode (roleId) {
      if (roleId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.authNavTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.authNavTree.reload()
      }
      this.modelVisible = false
    },

    /**
     * 查询
     */
    async search (roleName = '') {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.resourcesAuthList.search({ sysDeptId: this.selectedNode, roleName })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.resourcesAuthList.resetSearch()
      this.$refs.authNavTree.reload()
    }
  }
}
</script>
<style>
/* TODO */
.auth .ant-table-tbody > tr > td span{
  display: flex;
  justify-content: space-around;
}
/* .authModeal .ant-modal-body {
  overflow-y: scroll;
  height: 500px;
} */
</style>
