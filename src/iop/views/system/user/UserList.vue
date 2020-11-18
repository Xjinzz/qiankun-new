<template>
  <div>
    <iop-data-table
      ref="userList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="编码">
              <a-input @pressEnter="search" v-model="queryParam.userCode" placeholder="请输入编码" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="姓名">
              <a-input @pressEnter="search" v-model="queryParam.userName" placeholder="请输入姓名" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <iop-sys-dept-tree ref="deptTree" @onSelect="onTreeSelect" />
      </template>

      <template #beforeCreateButton v-if="showSync">
        <a-button type="primary" @click="syncPubDept">同步</a-button>
      </template>

      <template #rowButtons="{ record }">
        <a @click="handleVoucher(record)">凭证</a>
        <a-divider type="vertical" />
        <a @click="handleJob(record)">职位</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="handleDept(record)">管辖机构</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleRole(record.userId)">角色</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleView(record.sysUserId)">查看</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleEdit(record.sysUserId)">编辑</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleRemove(record)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </iop-data-table>

    <user-form
      ref="userForm"
      :sysUserId="userId"
      :sysDeptName="treeName"
      :sysDeptId="deptId"
      :mode="formMode"
      :submitSuccess="search"
    />

    <a-modal title="凭证信息" width="850px" :visible="showVoucherList" @cancel="hideVoucherModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideVoucherModal">关闭</a-button>
        </div>
      </template>
      <iop-pub-user-voucher-list ref="voucherList" :pubUserId="pubUserId" type="1" />
    </a-modal>

    <a-modal title="管辖机构" width="850px" :visible="showDeptList" @cancel="hideDeptModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideDeptModal">关闭</a-button>
        </div>
      </template>
      <sys-user-dept-list ref="deptList" :pubUserId="pubUserId" />
    </a-modal>

    <a-modal title="职位" width="950px" :visible="showJobtList" @cancel="hideJobModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideJobModal">关闭</a-button>
        </div>
      </template>
      <user-job-list ref="jobList" :userId="userId" :pubUserId="pubUserId" />
    </a-modal>

    <sync-modal ref="syncPubDeptModal" @success="onSync"/>

    <a-modal title="角色信息" width="950px" :visible="showRoleList" @cancel="hideRoleModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideRoleModal">关闭</a-button>
        </div>
      </template>
      <sys-user-role-list ref="roleList" :pubUserId="pubUserId" />
    </a-modal>
  </div>
</template>

<script>
import path from '@/iop/api/index'
import { IopDataTable, IopSysDeptTree } from '@/iop/components'
import { IopPubUserVoucherList } from '@/iop/views'
import { iopPubUserService } from '@/iop/service'
import SyncModal from './SyncModal'
import SysUserDeptList from './SysUserDeptList'
import SysUserRoleList from './SysUserRoleList'
import UserForm from './UserForm'
import userListVO from './vo/user-list-vo'
import UserJobList from './job/UserJobList'
import MessageUtils from '@/utils/message'

export default {
  name: 'UserList',
  components: {
    IopSysDeptTree,
    IopDataTable,
    IopPubUserVoucherList,
    SyncModal,
    SysUserDeptList,
    UserForm,
    UserJobList,
    SysUserRoleList
  },
  data () {
    return {
      table: {
        url: path.system.user.index,
        rowKey: 'sysUserId'
      },
      queryParam: {},
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      formMode: 'create',
      userId: '',
      selectedNode: '',
      deptId: '',
      pubUserId: '',
      showVoucherList: false,
      showAppList: false,
      showDeptList: false,
      showJobtList: false,
      showRoleList: false,
      showSync: true,
      treeName: ''
    }
  },
  created () {
    const columns = [...userListVO]
    columns.push({
      title: '状态',
      dataIndex: 'deptStatus',
      width: 90,
      sorter: false,
      customRender: (text, record) => {
        if (record.userStatus === '注销') {
          return <a-switch checked-children="启用" un-checked-children="注销" defaultChecked={false} onChange={() => { this.changeStatus(record, true) } } />
        } else {
          return <a-switch checked-children="启用" un-checked-children="注销" defaultChecked={true} onChange={() => { this.changeStatus(record, false) } } />
        }
      }
    })
    this.table.columns = columns
  },
  mounted () {
    if (this.$route.meta.para) {
      this.showSync = false
    }
  },
  methods: {
    async search (firstPage = true) {
      try {
        await this.$refs.userList.reload(Object.assign({ sysDeptId: this.selectedNode }, this.queryParam), { firstPage })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    resetSearchForm () {
      this.queryParam = {}
      this.search()
    },

    onTreeSelect ({ key, data }) {
      this.selectedNode = key
      if (key === '0') {
        this.treeName = '全部'
      } else {
        this.treeName = data.name
      }
      this.$refs.userList.reload({
        sysDeptId: key
      })
    },

    onAction ({ name, data } = {}) {
      switch (name) {
        case 'onCreate':
          this.handleCreate()
          break
        case 'onRemoveSelected':
          this.search()
          break
        case 'onRemove':
          this.search()
          break
      }
    },

    handleCreate () {
      this.formMode = 'create'
      this.userId = ''
      this.deptId = this.selectedNode
      this.$refs.userForm.show()
    },

    reloadNode (deptId) {
      if (!deptId) {
        deptId = this.deptId
      }
      if (deptId !== this.selectedNode) {
        this.$refs.deptTree.reloadNode(this.selectedNode)
      } else {
        this.$refs.deptTree.reload()
      }
    },

    handleVoucher (record = {}) {
      this.showVoucherList = true
      this.pubUserId = record.userId
      this.$nextTick(() => {
        this.$refs.voucherList && this.$refs.voucherList.load()
      })
    },

    hideVoucherModal () {
      this.showVoucherList = false
    },

    handleJob (record = {}) {
      this.showJobtList = true
      this.userId = record.userId
      this.pubUserId = record.userId
      this.$nextTick(() => {
        this.$refs.jobList && this.$refs.jobList.load()
      })
    },

    hideJobModal () {
      this.showJobtList = false
    },

    handleDept (record = {}) {
      this.showDeptList = true
      this.pubUserId = record.userId
      this.$nextTick(() => {
        this.$refs.deptList && this.$refs.deptList.load()
      })
    },

    hideDeptModal () {
      this.showDeptList = false
    },

    handleRole (pubUserId = '') {
      this.showRoleList = true
      this.pubUserId = pubUserId
      this.$nextTick(() => {
        this.$refs.roleList && this.$refs.roleList.load()
      })
    },

    hideRoleModal () {
      this.showRoleList = false
    },

    handleView (sysUserId = '') {
      this.formMode = 'view'
      this.userId = sysUserId
      this.$refs.userForm.show()
    },

    handleEdit (sysUserId = '') {
      this.formMode = 'edit'
      this.userId = sysUserId
      this.$refs.userForm.show()
    },

    handleRemove (record = {}) {
      this.$refs.userList.handleRemove(record)
    },

    onSync () {
      this.$refs.deptTree.reload()
    },

    syncPubDept () {
      this.$refs.syncPubDeptModal.show()
    },

    changeStatus (record = '', status = true) {
      if (status) {
        this.$confirm({
          title: `确定启用【${record.userName}】吗`,
          onOk: () => {
            iopPubUserService.setFlag(record.userId, '1')
              .catch(err => {
                MessageUtils.error(err)
              })
              .finally(() => this.reloadCurrentPage())
          },
          onCancel: this.reloadCurrentPage
        })
      } else {
        this.$confirm({
          title: `确定注销【${record.userName}】吗`,
          onOk: async () => {
            iopPubUserService.setFlag(record.userId, '9')
              .catch(err => {
                MessageUtils.error(err)
              })
              .finally(() => this.reloadCurrentPage())
          },
          onCancel: this.reloadCurrentPage
        })
      }
    },

    reloadCurrentPage () {
      this.search(false)
    }
  }
}
</script>
