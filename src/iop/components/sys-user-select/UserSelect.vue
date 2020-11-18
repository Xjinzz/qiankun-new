<template>
  <a-modal title="人员选择" :visible="visible" @cancel="hide" width="900px">
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
        ref="sysUserList"
        :table="table"
        :permission="permission"
        hiddenTop
        tree
        @onAction="onAction"
      >
        <template #removeSelectedButton>
          <a-button type="primary" @click="onMultiSelect" v-if="!multipleChoice" :disabled="selectedRows.length === 0">选择</a-button>
        </template>

        <template #beforeViewButton="{ record }">
          <a @click="onUsersSelect([record])" :disabled="selectedOne" :class="selectedOne ? 'forbidden' : ''">选择</a>
        </template>

        <template #tree>
          <iop-sys-dept-tree ref="sysDeptTree" @onSelect="onTreeSelect" />
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
import { IopSysDeptTree, IopDataTable } from '../index'
import MessageUtils from '@/utils/message'

export default {
  name: 'PubUserSelect',
  components: { IopSysDeptTree, IopDataTable },
  props: {
    multipleChoice: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      query: {},
      selectedUsers: [],
      userMap: new Map(),
      table: {
        url: path.system.user.index + '?userStatus=1',
        rowKey: 'sysUserId',
        columns: [
          {
            title: '姓名',
            dataIndex: 'userName'
          }
        ],
        selectable: !this.multipleChoice,
        actionsWidth: 120,
        pagination: {
          showQuickJumper: false,
          showSizeChanger: false
        }
      },
      permission: ['removeSelected'],
      selectedRows: [],
      selectedOne: false,
      first: true,
      sysDeptId: ''
    }
  },
  methods: {
    handleClose (sysUserId) {
      this.userMap.delete(sysUserId)
      this.selectedUsers = [...this.userMap.values()]
      if (this.multipleChoice) {
        if (this.userMap.size >= 1) {
          this.selectedOne = true
        } else {
          this.selectedOne = false
        }
      }
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
      this.$refs.sysUserList.clearSelected()
    },

    onUsersSelect (users) {
      const { userMap, multipleChoice } = this
      users.map(user => {
        if (!userMap.has(user.sysUserId)) {
          userMap.set(user.sysUserId, user)
        } else {
          MessageUtils.warn(`【${user.userName}】已经选择过了`)
        }
      })
      this.userMap = userMap
      this.selectedUsers = [...userMap.values()]
      if (multipleChoice) {
        if (this.userMap.size >= 1) {
          this.selectedOne = true
        } else {
          this.selectedOne = false
        }
      }
    },

    cleanSelected () {
      this.userMap.clear()
      this.selectedOne = false
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
      const { sysDeptId } = this
      this.$refs.sysUserList.reload(Object.assign({ sysDeptId }, this.query))
    },

    onTreeSelect ({ key }) {
      this.sysDeptId = key
      this.$refs.sysUserList.reload({ sysDeptId: key })
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
<style>
  .forbidden {
    pointer-events: none;
    color: #ccc
  }
</style>
