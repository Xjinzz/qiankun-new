<template>
  <div>
    <iop-data-table
      ref="sysDeptList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="机构编号">
              <a-input @pressEnter="search" placeholder="请输入机构编号" v-model="queryParam.deptCode" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="机构名称">
              <a-input @pressEnter="search" placeholder="请输入机构名称" v-model="queryParam.deptName" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="advanced">
            <a-form-item label="节点类型">
              <iop-data-dict-select ref="deptType" type="deptType" v-model="queryParam.deptType" />
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="advanced">
            <a-form-item label="行政级别" style="margin-top: 20px">
              <iop-data-dict-select ref="deptLevel" type="deptLevel" v-model="queryParam.deptLevel" />
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
      <template #beforeCreateButton>
        <a-button type="primary" @click="syncPubDept">同步</a-button>
      </template>
      <template #beforeViewButton v-if="showAdmin">
        <a>管理员</a>
        <a-divider type="vertical" />
      </template>

      <template #tree>
        <iop-sys-dept-tree ref="sysDeptTree" manager @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>

    <sys-dept-form
      ref="sysDeptForm"
      :deptId="sysDeptId"
      :parentId="parentId"
      :mode="formMode"
      :submitSuccess="reloadNode"
    />

    <sync-modal ref="syncPubDeptModal" @success="onSync"/>

    <a-modal title="单位管理员" width="850px" :visible="showAdminList" @cancel="hideAdminModal">
      <template #footer>
        <div style="text-align:center;" >
          <a-button @click="hideAdminModal">关闭</a-button>
        </div>
      </template>
      <sys-dept-admin-list ref="adminList" :pubDeptId="pubDeptId" :sysDeptId="sysDeptId" />
    </a-modal>
  </div>
</template>
<script>
import SysDeptAdminList from './SysDeptAdminList'
import SysDeptForm from './SysDeptForm'
import sysDeptListVO from './vo/sys-dept-list-vo'
import SyncModal from './SyncModal'
import { IopDataTable, IopDataDictSelect, IopSysDeptTree } from '@/iop/components'
import { iopPubDeptService } from '@/iop/service'
import path from '@/iop/api'
import MessageUtil from '@/utils/message'

export default {
  name: 'SysDeptList',
  components: { IopDataTable, SyncModal, IopDataDictSelect, SysDeptForm, IopSysDeptTree, SysDeptAdminList },
  data () {
    return {
      advanced: false,
      queryParam: {},
      table: {
        url: path.system.dept.index,
        rowKey: 'sysDeptId',
        actionsWidth: 220
      },
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      formMode: 'create',
      sysDeptId: '',
      selectedNode: '',
      parentId: '',
      pubDeptId: '',
      showAdminList: false,
      showAdmin: true
    }
  },
  created () {
    const columns = [ ...sysDeptListVO ]
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
  mounted () {
    if (this.$route.meta.para) {
      this.showAdmin = false
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
    async search (firstPage = true) {
      try {
        await this.$refs.sysDeptList.search(Object.assign({ parentId: this.selectedNode }, this.queryParam), { firstPage })
      } catch (error) {
        MessageUtil.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.queryParam = {}
      this.$refs.deptType.cleanSelected()
      this.$refs.deptLevel.cleanSelected()
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.$refs.sysDeptList.reload({
        parentId: key
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
          this.handleView(data.original.sysDeptId)
          break
        case 'onEdit':
          this.handleEdit(data.original.sysDeptId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} sysDeptId 数据主键
     */
    reloadNode (sysDeptId) {
      if (!sysDeptId) {
        // 新建或者编辑的回调
        sysDeptId = this.sysDeptId
      }
      if (sysDeptId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.sysDeptTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.sysDeptTree.reload()
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      this.sysDeptId = ''
      this.parentId = this.selectedNode
      // 先赋值，后显示
      this.$refs.sysDeptForm.show()
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} sysDeptId 主键
     */
    handleView (sysDeptId = '') {
      this.formMode = 'view'
      this.sysDeptId = sysDeptId
      this.$refs.sysDeptForm.show()
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string} sysDeptId 主键
     */
    handleEdit (sysDeptId = '') {
      this.formMode = 'edit'
      this.sysDeptId = sysDeptId
      this.$refs.sysDeptForm.show()
    },

    /**
     * 删除列表选择项，多选
     *
     * @param {Array} sysDeptIds 选中项的主键数组
     */
    handleRemoveSelected (sysDeptIds = []) {
      let sysDeptId
      if (sysDeptIds.includes(this.selectedNode)) {
        sysDeptId = this.selectedNode
      } else {
        sysDeptId = sysDeptIds[0]
      }
      this.reloadNode(sysDeptId)
    },

    syncPubDept () {
      this.$refs.syncPubDeptModal.show()
    },

    onSync () {
      this.$refs.sysDeptTree.reload()
    },

    handleAdmin (record = {}) {
      this.pubDeptId = record.deptId
      this.sysDeptId = record.sysDeptId
      this.showAdminList = true
      this.$nextTick(() => {
        this.$refs.adminList && this.$refs.adminList.load()
      })
    },

    hideAdminModal () {
      this.showAdminList = false
    },

    changeStatus (record = '', status = true) {
      if (status) {
        this.$confirm({
          title: `确定启用【${record.deptName}】吗`,
          onOk: () => {
            iopPubDeptService.setFlag(record.deptId, '1')
              .catch(err => {
                MessageUtil.error(err)
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
                MessageUtil.error(err)
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
