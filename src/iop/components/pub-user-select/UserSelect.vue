<template>
  <a-modal title="统一人员选择" :visible="visible" @cancel="hide" width="900px">
    <div class="table-page-search-wrapper" style="margin-top: 5px;">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="12" :offset="6">
          <a-input-search
            allowClear
            enter-button="查询"
            v-model="query.userName"
            @search="search"
            placeholder="请输入姓名" />
        </a-col>
      </a-row>
      <a-divider style="margin-bottom:5px;"/>
      <div v-show="selectedUsers.length > 0" style="margin-top: 10px;">
        <div style="text-align:center;">
          <template v-for="user in selectedUsers">
            <a-tag :key="user.userId" :closable="true" :afterClose="() => handleClose(user.userId)">
              {{ user.userName }}
            </a-tag>
          </template>
          <div style="margin-top: 10px;">
            <a-button type="primary" @click="submit" style="margin-left: 10px;">确定</a-button>
            <a-button @click="cleanSelected">清空</a-button>
          </div>
        </div>
        <a-divider style="margin-bottom:5px;"/>
      </div>

      <iop-data-table
        ref="pubUserList"
        :table="table"
        :permission="permission"
        hiddenTop
        tree
        @onAction="onAction"
      >
        <template #removeSelectedButton>
          <a-button type="primary" @click="onMultiSelect" :disabled="selectedRows.length === 0">选择</a-button>
        </template>

        <template #beforeViewButton="{ record }">
          <a @click="onUsersSelect([record])">选择</a>
        </template>

        <template #tree>
          <iop-pub-dept-tree ref="pubDeptTree" @onSelect="onTreeSelect" />
        </template>
      </iop-data-table>
    </div>

    <template #footer>
      <div style="text-align:center;" >
        <a-button @click="hide">关闭</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import path from '@/iop/api'
import { IopPubDeptTree, IopDataTable } from '../index'
import MessageUtils from '@/utils/message'

export default {
  name: 'PubUserSelect',
  components: { IopPubDeptTree, IopDataTable },
  data () {
    return {
      visible: false,
      query: {},
      selectedUsers: [],
      userMap: new Map(),
      table: {
        url: path.system.pubUser.index,
        rowKey: 'userId',
        columns: [
          {
            title: '姓名',
            dataIndex: 'userName'
          }
        ],
        actionsWidth: 120,
        pagination: {
          showQuickJumper: false,
          showSizeChanger: false
        }
      },
      permission: ['removeSelected'],
      selectedRows: [],
      hasSelected: false,
      first: true,
      deptId: ''
    }
  },
  methods: {
    handleClose (userId) {
      this.userMap.delete(userId)
      this.selectedUsers = [...this.userMap.values()]
    },

    onAction ({ name = '', data = {} }) {
      if (name === 'onSelectedChange') {
        if (data && data.original) {
          this.selectedRows = data.original.selectedRows
        } else if (name === 'onClearSelected') {
          this.selectedRows = []
        }
      }
    },

    onMultiSelect () {
      this.onUsersSelect(this.selectedRows)
      this.$refs.pubUserList.clearSelected()
    },

    onUsersSelect (users) {
      const { userMap } = this
      users.map(user => {
        if (!userMap.has(user.userId)) {
          userMap.set(user.userId, user)
        } else {
          MessageUtils.warn(`【${user.userName}】已经选择过了`)
        }
      })
      this.userMap = userMap
      this.selectedUsers = [...userMap.values()]
    },

    cleanSelected () {
      this.userMap.clear()
      this.selectedUsers = []
    },

    show () {
      this.visible = true
      if (!this.first) {
        this.cleanSelected()
        this.resetSearchForm()
      } else {
        this.first = false
      }
    },

    hide () {
      this.visible = false
    },

    resetSearchForm () {
      this.query = {}
      this.search()
    },

    search () {
      const { deptId } = this
      this.$refs.pubUserList.reload(Object.assign({ deptId }, this.query))
    },

    onTreeSelect ({ key }) {
      this.deptId = key
      this.$refs.pubUserList.reload({ deptId: key })
    },

    submit () {
      this.$confirm({
        title: '确定已经选择的用户吗',
        onOk: () => {
          this.$emit('submit', { keys: [...this.userMap.keys()], values: [...this.userMap.values()] })
          this.hide()
        }
      })
    }
  }
}
</script>
