<template>
  <div>
    <iop-data-table
      ref="pubDeptList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="机构编码">
              <a-input v-model="quary.deptCode" allowClear @pressEnter="search" placeholder="请输入机构编码" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="机构名称">
              <a-input v-model="quary.deptName" allowClear @pressEnter="search" placeholder="请输入机构名称" />
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="advanced">
            <a-form-item label="机构类型：">
              <iop-data-dict-radio type="deptType" v-model="quary.deptType" />
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="advanced" style="margin-top: 20px;">
            <a-form-item label="行政级别：">
              <iop-data-dict-select type="deptLevel" ref="deptLevel" v-model="quary.deptLevel" />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced()" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>

      <template #tree>
        <iop-pub-dept-tree ref="pubDeptTree" manager @onSelect="onTreeSelect" />
      </template>

      <template #rowButtons="{ record }">
        <a @click="handleAdmin(record.deptId)" :disabled="record.deptType !== '单位'">管理员</a>
        <a-divider type="vertical" />
        <a @click="handleApp(record.deptId)">子系统</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="handleView(record.deptId)">查看</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleEdit(record.deptId)">编辑</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleRemove(record)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>

      <template #beforeCreateButton>
        <a-button type="primary" @click="handleJoin">合并</a-button>
        <a-button type="primary" @click="handleTransfer">划转</a-button>
      </template>
    </iop-data-table>

    <pub-dept-form
      ref="pubDeptForm"
      v-if="showForm"
      :deptId="deptId"
      :parentId="parentId"
      :mode="formMode"
      @onSubmitSuccess="reloadNode"
    />

    <a-modal title="子系统使用情况" width="850px" :visible="showAppList" @cancel="hideAppModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideAppModal">关闭</a-button>
        </div>
      </template>
      <pub-dept-app-list ref="appsList" :deptId="deptId" />
    </a-modal>

    <a-modal title="单位管理员" width="850px" :visible="showAdminList" @cancel="hideAdminModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideAdminModal">关闭</a-button>
        </div>
      </template>
      <pub-dept-admin-list ref="adminList" :deptId="deptId" />
    </a-modal>

    <transfer-modal ref="transferModal" />

    <join-modal ref="joinModal" />
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect, IopPubDeptTree, IopDataDictRadio } from '@/iop/components'
import { iopPubDeptService } from '@/iop/service'
import MessageUtils from '@/utils/message'
import JoinModal from './join/JoinModal'
import path from '@/iop/api'
import PubDeptAdminList from './PubDeptAdminList'
import PubDeptAppList from './PubDeptAppList'
import PubDeptForm from './PubDeptForm'
import pubDeptListVO from './vo/pub-dept-list-vo'
import TransferModal from './TransferModal'

export default {
  name: 'PubDeptList',
  components: {
    PubDeptForm,
    IopDataTable,
    IopDataDictSelect,
    IopDataDictRadio,
    PubDeptAppList,
    PubDeptAdminList,
    IopPubDeptTree,
    TransferModal,
    JoinModal },
  data () {
    return {
      quary: {},
      advanced: false,
      table: {
        url: path.system.pubDept.index,
        rowKey: 'deptId',
        actionsWidth: 220
      },
      permission: ['create', 'edit', 'view', 'remove', 'removeSelected'],
      formMode: 'create',
      deptId: '',
      selectedNode: '',
      parentId: '',
      showAppList: false,
      showAdminList: false,
      showForm: true
    }
  },
  created () {
    const columns = [ ...pubDeptListVO ]
    columns.push({
      title: '状态',
      dataIndex: 'deptStatus',
      sorter: false,
      customRender: (text, record) => {
        if (record.deptStatus === '注销') {
          return <a-switch checked-children="启用" un-checked-children="注销" defaultChecked={false} onChange={() => { this.changeStatus(record, true) } } />
        } else {
          return <a-switch checked-children="启用" un-checked-children="注销" defaultChecked={true} onChange={() => { this.changeStatus(record, false) } } />
        }
      }
    })
    this.table.columns = columns
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
    async search (firstPage = true) {
      try {
        await this.$refs.pubDeptList.search(Object.assign({ deptId: this.selectedNode }, this.quary), { firstPage })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.deptLevel.cleanSelected()
      this.quary = {}
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.$refs.pubDeptList.reload({
        deptId: key
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
        case 'onCreate':
          this.handleCreate()
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
        case 'onRemove':
          this.reloadNode(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} deptId 数据主键
     */
    reloadNode (deptId) {
      if (!deptId) {
        deptId = this.deptId
      }
      if (deptId !== this.selectedNode) {
        this.$refs.pubDeptTree.reloadNode(this.selectedNode)
      } else {
        this.$refs.pubDeptTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.deptId = ''
      this.parentId = this.selectedNode
      // 先赋值，后显示
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
        this.$nextTick(() => {
          this.$refs.pubDeptForm.show()
        })
      })
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} deptId 主键
     */
    handleView (deptId = '') {
      this.formMode = 'view'
      this.deptId = deptId
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
        this.$nextTick(() => {
          this.$refs.pubDeptForm.show()
        })
      })
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} deptId 主键
     */
    handleEdit (deptId = '') {
      this.formMode = 'edit'
      this.deptId = deptId
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
        this.$nextTick(() => {
          this.$refs.pubDeptForm.show()
        })
      })
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} deptIds 选中项的主键数组
     */
    handleRemoveSelected (deptIds = []) {
      let deptId
      if (deptIds.includes(this.selectedNode)) {
        deptId = this.selectedNode
      } else {
        deptId = deptIds[0]
      }
      this.reloadNode(deptId)
    },

    handleRemove (record = {}) {
      this.$refs.pubDeptList.handleRemove(record)
    },

    handleApp (deptId = '') {
      this.deptId = deptId
      this.showAppList = true
      this.$nextTick(() => {
        this.$refs.appsList.load()
      })
    },

    handleAdmin (deptId = '') {
      this.deptId = deptId
      this.showAdminList = true
      this.$nextTick(() => {
        this.$refs.adminList.load()
      })
    },

    hideAppModal () {
      this.showAppList = false
    },

    hideAdminModal () {
      this.showAdminList = false
    },

    handleTransfer () {
      this.$refs.transferModal.show()
    },

    handleJoin () {
      this.$refs.joinModal.show()
    },

    changeStatus (record = '', status = true) {
      if (status) {
        this.$confirm({
          title: `确定启用【${record.deptName}】吗`,
          onOk: () => {
            iopPubDeptService.setFlag(record.deptId, '1')
              .catch(err => {
                MessageUtils.error(err)
              })
              .finally(() => this.reloadCurrentPage())
          },
          onCancel: this.reloadCurrentPage
        })
      } else {
        this.$confirm({
          title: `确定注销【${record.deptName}】吗`,
          onOk: async () => {
            iopPubDeptService.setFlag(record.deptId, '9')
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
