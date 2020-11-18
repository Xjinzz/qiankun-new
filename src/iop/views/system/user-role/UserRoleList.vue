<template>
  <div>
    <iop-data-table
      ref="userRoleList"
      :table="table"
      :permission="permission"
      tree
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="用户姓名">
              <a-input @pressEnter="search" placeholder="请输入用户姓名" :maxLength="100" v-decorator="['userName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="用户编码">
              <a-input @pressEnter="search" placeholder="请输入用户编码" :maxLength="100" v-decorator="['userCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" :span="8">
            <a-form-item label="机构名称">
              <a-input @pressEnter="search" placeholder="请输入机构名称" :maxLength="100" v-decorator="['deptName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" :span="8">
            <a-form-item label="角色名称" style="margin-top: 20px;">
              <a-input @pressEnter="search" placeholder="请输入角色名称" :maxLength="100" v-decorator="['roleName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col v-show="advanced" :span="8">
            <a-form-item label="授权状态" style="margin-top: 20px;">
              <iop-data-dict-select ref="grantType" type="grantType" v-decorator="['type']" />
            </a-form-item>
          </a-col>
          <a-col class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
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
        <user-role-tree ref="userRoleTree" :rootNode="rootNode" :url="url" @onSelect="onTreeSelect" />
      </template>
      <!-- 授权表格上方 -->
      <template #beforeRemoveSelectedButton="{ record }">
        <a-button type="primary" @click="handleAuthorizationSelect(record)">授权</a-button>
      </template>
      <!-- 删除表格上方 -->
      <template #removeSelectedButton="{ record }">
        <a-button
          type="primary"
          @click="handleDelect(record)"
          :disabled="seleckdIds.length === 0"
        >删除</a-button>
      </template>
      <!-- 行查看 -->
      <template #beforeRemoveButton="{ record }" >
        <a @click="handleToview(record.roleId)" v-if="record.urId">查看</a>
        <a-divider type="vertical" v-if="record.urId" />
      </template>
      <!-- 行删除 -->
      <template #removeButton="{ record }" >
        <a @click="handleDelect(record.urId,'coulmn')" v-if="record.urId">删除</a>
        <a-divider type="vertical" v-if="record.urId" />
      </template>
      <!-- 行授权 -->
      <template #afterRemoveButton="{ record }">
        <a @click="handleColumnAuthorization(record)">授权</a>
      </template>
    </iop-data-table>
    <!-- 授权树页面 -->
    <a-modal
      class="userModeal"
      :title="title"
      destroyOnClose
      :width="500"
      :visible="visibleSelect"
      @ok="onSave"
      @cancel="cancel"
    >
      <a-form-item label="授权日期" >
        <a-range-picker @change="onChange" :value="dateData" :disabled="false">
          <a-icon slot="suffixIcon" type="smile" />
        </a-range-picker>
      </a-form-item>
      <a-form-item label="授权角色" >
        <user-role-tree-select ref="authorizationTree" :userId="userId" :url="roletreeUrl" :rootNode="rootNode" @onCheck="onAuthorizationTreeCheck" />
      </a-form-item>
    </a-modal>
    <a-modal
      :title="title"
      :width="500"
      :footer="null"
      :visible="visibleView"
      @cancel="cancel"
    >
      <user-role-view-tree :roleId="roleId" ref="userRoleViewTree" />
    </a-modal>
  </div>
</template>
<script>
import UserRoleTree from './UserRoleTree'
import UserRoleTreeSelect from './UserRoleTreeSelect'
import UserRoleViewTree from './UserRoleViewTree'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import { iopUserRoleServe } from '@/iop/service/index'
import moment from 'moment'
import MessageUtils from '@/utils/message'
import Ellipsis from '@/components/Ellipsis'

export default {
  name: 'UserRoleList',
  components: { UserRoleTree, IopDataTable, UserRoleTreeSelect, IopDataDictSelect, UserRoleViewTree, Ellipsis },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.system.userRole.list,
        /** rowKey，必填 */
        rowKey: (record, index) => record.urId + index,
        /** 显示序号列 */
        serial: true,
        actionsWidth: 100,
        /** 列定义 */
        columns: [
          {
            title: '用户姓名',
            dataIndex: 'userName',
            align: 'center'
          },
          {
            title: '用户编码',
            dataIndex: 'userCode',
            align: 'center',
            customRender: (text) => {
              if (text !== '') {
                return <ellipsis length={15} tooltip={true}>{{ text }}</ellipsis>
              }
            }
          },
          {
            title: '机构名称',
            dataIndex: 'deptName',
            align: 'center'
          },
          {
            title: '角色名称',
            dataIndex: 'roleName',
            align: 'center'
          },
          {
            title: '开始时间',
            dataIndex: 'beginDate',
            align: 'center'
          },
          {
            title: '结束时间',
            dataIndex: 'endDate',
            align: 'center'
          }
        ]
      },
      /** 表格组件按钮权限 */
      permission: ['remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      urId: '',
      /** 树当前选中节点，上级机构节点 */
      selectedNode: '',
      /** 上级行政区域 */
      id: '',
      /**  选中的用户 */
      seleckdIds: [],
      // 选中的权限
      seleckdUrIds: [],
      /** 选中的角色 */
      seleckdRoleIds: [],
      /** 单行选中得用户 */
      userIds: [],
      /** 用户id */
      userId: '',
      /** 模态框状态 */
      visibleView: false,
      visibleSelect: false,
      /** 模态框标题 */
      title: '授权',
      url: path.system.userRole.tree,
      roletreeUrl: path.system.userRole.roletree,
      rootNode: {
        title: '全部机构'
      },
      // 查看树参数
      roleId: '',
      /** 日期 */
      dateFormat: 'YYYY-MM-DD',
      dateData: [],
      beginDate: '',
      endDate: ''
    }
  },
  /** 路由切换 */
  activated () {
    this.$refs.userRoleTree.reload()
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
        await this.$refs.userRoleList.search({ sysDeptId: this.selectedNode })
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.userRoleList.resetSearch()
      this.$refs.grantType.cleanSelected()
      this.search()
    },
    /**
     * 点击树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.search()
      this.visibleView = false
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
        case 'onSelectedChange':
          this.handleSelectedChange(data.original.selectedRows)
          break
      }
    },

    /**
     * 刷新树当前选中节点
     *
     * @param {string} urId 数据主键
     */
    reloadNode (urId) {
      if (!urId) {
        // 新建或者编辑的回调
        urId = this.urId
      }
      if (urId !== this.selectedNode) {
        // 刷新当前选中节点
        this.$refs.userRoleTree.reloadNode(this.selectedNode)
      } else {
        // 数据主键等于当前节点，刷新根节点
        this.$refs.userRoleTree.reload()
      }
    },

    /**
     * 点击删除按钮事件
     * @param {string} urId 选中的授权id
     */
    async handleDelect (urId, type) {
      this.$confirm({
        title: '确定删除吗',
        onOk: async () => {
          try {
            if (type === undefined) {
              await iopUserRoleServe.delAll(this.seleckdUrIds)
            } else {
              await iopUserRoleServe.del(urId)
            }
            this.$refs.userRoleTree.reloadNode(this.selectedNode)
            this.cancel()
            MessageUtils.success()
          } catch (error) {
            this.handleError(error)
          }
        }
      })
    },

    /**
     * 保存
     */
    async onSave () {
      try {
        if (this.beginDate === '' || this.endDate === '') {
          const tiem = [moment(new Date(), this.dateFormat), moment('2099-12-30', this.dateFormat)]
          this.onChange('', tiem)
        }
        this.seleckdRoleIds = await this.$refs.authorizationTree.$children[0].localCheckedKeys
        if (this.seleckdRoleIds.length > 0) {
          const data = {
            userIds: this.userIds.length > 0 ? this.userIds : this.seleckdIds,
            roleIds: this.seleckdRoleIds,
            beginDate: this.beginDate,
            endDate: this.endDate
          }
          await iopUserRoleServe.saveAll(data)
          this.$refs.userRoleTree.reloadNode(this.selectedNode)
          this.cancel()
          MessageUtils.success()
        } else {
          MessageUtils.error('授权角色不能为空')
        }
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 取消事件
     */
    cancel () {
      // this.$refs.userRoleList.reload({
      //   [tableQueryName]: this.selectedNode
      // })
      this.search()
      this.userId = ''
      this.userIds = []
      this.seleckdRoleIds = []
      this.beginDate = ''
      this.endDate = ''
      this.visibleView = false
      this.visibleSelect = false
      this.$refs.userRoleViewTree && this.$refs.userRoleViewTree.clearData()
    },

    /**
     * 查看按钮事件
     */
    async handleToview (roleId) {
      this.title = await '查看'
      this.$nextTick(async () => {
        await this.$refs.userRoleViewTree.getDeptTree(roleId)
        this.roleId = roleId
      })
      this.visibleView = true
    },

    /**
     * 点击授权按钮事件
     * @param {Array} this.seleckdIds 选中项的主键数组
     */
    handleAuthorizationSelect  (record) {
      const { seleckdIds } = this
      if (seleckdIds.length > 0) {
        this.title = '授权'
        this.visibleSelect = true
        this.dateData = [moment(new Date(), this.dateFormat), moment('2099-12-30', this.dateFormat)]
      } else {
        MessageUtils.error('您未选择要授权的用户')
      }
    },

    /**
     * 授权多选框选中
     * @param {Array} key 选中项的
     */
    onAuthorizationTreeCheck ({ keys, data }) {
      this.seleckdRoleIds = keys
    },

    /**
     * 开始和结束时间
     */

    onChange (date, dateString) {
      var beginDate = new Date(dateString[0])
      var endDate = new Date(dateString[1])
      this.beginDate = beginDate.getTime()
      this.endDate = endDate.getTime()
      dateString[0] && (this.dateData = [moment(dateString[0], this.dateFormat), moment(dateString[1], this.dateFormat)])
    },

    /**
     * 点击列表内授权按钮事件
     * @param {Array} userId 选中项用户id
     */
    handleColumnAuthorization  (record) {
      this.title = '授权'
      this.visibleSelect = true
      this.userId = record.userId
      this.userIds[0] = record.userId
      this.dateData = [moment(new Date(), this.dateFormat), moment('2099-12-30', this.dateFormat)]
    },

    /**
     * 列表复选框选中的事件
     *
     * @param {string} selectedRows 选中的数组
     */
    handleSelectedChange (selectedRows = []) {
      this.seleckdIds = selectedRows.map(item => item.userId)
      this.seleckdUrIds = selectedRows.map(item => item.urId)
      if (selectedRows.length === 1) {
        this.userId = selectedRows[0].userId
      }
    }
  }
}
</script>
<style>
/* .userModeal .ant-modal-body {
  overflow-y: scroll;
  height: 300px;
} */
</style>
