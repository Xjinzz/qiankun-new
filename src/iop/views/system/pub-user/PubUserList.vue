<template>
  <div>
    <iop-data-table
      ref="pubUserList"
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
        <iop-pub-dept-tree ref="pubDeptTree" manager @onSelect="onTreeSelect" />
      </template>

      <template #rowButtons="{ record }">
        <a @click="handleVoucher(record.userId)">凭证</a>
        <a-divider type="vertical" />
        <a @click="handleApp(record.userId)">授权系统</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="handleJob(record.userId)">职位</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleDept(record.userId)">管辖机构</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleRole(record.userId)">角色</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleView(record.userId)">查看</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleEdit(record.userId)">编辑</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleRemove(record)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </iop-data-table>

    <pub-user-form ref="pubUserForm" :userId="userId" :deptId="deptId" :mode="formMode" @onSubmitSuccess="search" />

    <a-modal title="凭证信息" width="850px" :visible="showVoucherList" @cancel="hideVoucherModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideVoucherModal">关闭</a-button>
        </div>
      </template>
      <pub-user-vocher-list ref="voucherList" :pubUserId="userId" type="0" />
    </a-modal>

    <a-modal title="授权系统" width="850px" :visible="showAppList" @cancel="hideAppModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideAppModal">关闭</a-button>
        </div>
      </template>
      <pub-user-app-list ref="appList" :pubUserId="userId" />
    </a-modal>

    <a-modal title="管辖机构" width="850px" :visible="showDeptList" @cancel="hideDeptModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideDeptModal">关闭</a-button>
        </div>
      </template>
      <pub-user-dept-list ref="deptList" :pubUserId="userId" />
    </a-modal>

    <a-modal title="职位信息" width="950px" :visible="showJobList" @cancel="hideJobModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideJobModal">关闭</a-button>
        </div>
      </template>
      <pub-user-job-list ref="jobList" :userId="userId" />
    </a-modal>

    <a-modal title="角色信息" width="950px" :visible="showRoleList" @cancel="hideRoleModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideRoleModal">关闭</a-button>
        </div>
      </template>
      <pub-user-role-list ref="roleList" :pubUserId="userId" />
    </a-modal>
  </div>
</template>

<script>
import path from '@/iop/api/index'
import { IopPubDeptTree, IopDataTable } from '@/iop/components'
import { iopPubUserService } from '@/iop/service'
import MessageUtils from '@/utils/message'
import pubUserForm from './PubUserForm'
import pubUserListVO from './vo/pub-user-list-vo'
import PubUserAppList from './PubUserAppList'
import PubUserDeptList from './PubUserDeptList'
import PubUserJobList from './job/PubUserJobList'
import PubUserRoleList from './PubUserRoleList'
import PubUserVocherList from './PubUserVoucherList'

export default {
  name: 'PubUserList',
  components: {
    IopPubDeptTree,
    IopDataTable,
    pubUserForm,
    PubUserDeptList,
    PubUserRoleList,
    PubUserVocherList,
    PubUserJobList,
    PubUserAppList
  },
  data () {
    return {
      table: {
        url: path.system.pubUser.index,
        actionsWidth: 210,
        rowKey: 'userId'
      },
      queryParam: {},
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      formMode: 'create',
      userId: '',
      selectedNode: '',
      deptId: '',
      showVoucherList: false,
      showAppList: false,
      showDeptList: false,
      showJobList: false,
      showRoleList: false
    }
  },
  created () {
    const columns = [...pubUserListVO]
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
  methods: {
    async search (firstPage = true) {
      try {
        await this.$refs.pubUserList.reload(Object.assign({ deptId: this.selectedNode }, this.queryParam), { firstPage })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    resetSearchForm () {
      this.queryParam = {}
      this.search()
    },

    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.$refs.pubUserList.reload({
        deptId: key
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
      this.$refs.pubUserForm.show()
    },

    handleVoucher (userId = '') {
      this.showVoucherList = true
      this.userId = userId
      this.$nextTick(() => {
        this.$refs.voucherList && this.$refs.voucherList.load()
      })
    },

    hideVoucherModal () {
      this.showVoucherList = false
    },

    handleApp (userId = '') {
      this.showAppList = true
      this.userId = userId
      this.$nextTick(() => {
        this.$refs.appList && this.$refs.appList.load()
      })
    },

    hideAppModal () {
      this.showAppList = false
    },

    handleJob (userId = '') {
      this.showJobList = true
      this.userId = userId
      this.$nextTick(() => {
        this.$refs.jobList && this.$refs.jobList.load()
      })
    },

    hideJobModal () {
      this.showJobList = false
    },

    handleDept (userId = '') {
      this.showDeptList = true
      this.userId = userId
      this.$nextTick(() => {
        this.$refs.deptList && this.$refs.deptList.load()
      })
    },

    hideDeptModal () {
      this.showDeptList = false
    },

    handleRole (userId = '') {
      this.showRoleList = true
      this.userId = userId
      this.$nextTick(() => {
        this.$refs.roleList && this.$refs.roleList.load()
      })
    },

    hideRoleModal () {
      this.showRoleList = false
    },

    handleView (userId = '') {
      this.formMode = 'view'
      this.userId = userId
      this.$refs.pubUserForm.show()
    },

    handleEdit (userId = '') {
      this.formMode = 'edit'
      this.userId = userId
      this.$refs.pubUserForm.show()
    },

    handleRemove (record = {}) {
      this.$refs.pubUserList.handleRemove(record)
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
          onOk: () => {
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
