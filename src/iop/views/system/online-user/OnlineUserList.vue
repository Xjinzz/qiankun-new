<template>
  <div>
    <data-table-page
      ref="userList"
      :table="table"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户姓名">
              <a-input @pressEnter="search" v-model="queryParam.userName" placeholder="请输入用户姓名" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="系统名称">
              <a-input @pressEnter="search" v-model="queryParam.appName" placeholder="请输入系统名称" allowClear />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="ip地址">
                <a-input @pressEnter="search" v-model="queryParam.ip" placeholder="请输入ip地址" allowClear />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="操作系统" style="margin-top: 20px">
                <a-input @pressEnter="search" v-model="queryParam.os" placeholder="请输入操作系统" allowClear />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="开始时间" style="margin-top: 20px">
                <a-time-picker v-model="dateParams.start" style="width:100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="结束时间" style="margin-top: 20px">
                <a-time-picker v-model="dateParams.end" style="width:100%"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>
      <template #rowButtons="{ record }" >
        <span v-if="record.kickOut">已下线</span>
        <a v-else @click="kickOut(record)">强制下线</a>
      </template>
    </data-table-page>
  </div>
</template>
<script>
import { IopLocalDataTable } from '@/iop/components'
import path from '@/iop/api'
import { iopOnlineService } from '@/iop/service'
import MessageUtils from '@/utils/message'

export default {
  name: 'OnlineUserList',
  components: { DataTablePage: IopLocalDataTable },
  data () {
    return {
      queryParam: {},
      dateParams: {},
      advanced: false,
      table: {
        url: path.system.onlineUser.index,
        rowKey: (record) => `${record.id}-${record.loginTime}`,
        selectable: false,
        hidePagination: true,
        actionsWidth: 120,
        columns: [{
          title: '用户姓名',
          dataIndex: 'userName'
        }, {
          title: '登录名',
          dataIndex: 'loginName',
          hidden: true
        }, {
          title: '系统名称',
          dataIndex: 'appName'
        }, {
          title: 'IP地址',
          dataIndex: 'ip',
          sorter: false
        }, {
          title: '操作系统',
          dataIndex: 'os'
        }, {
          title: '浏览器',
          dataIndex: 'browser',
          sorter: false
        }, {
          title: '登录时间',
          dataIndex: 'loginTime',
          align: 'center'
        }, {
          title: '在线状态',
          dataIndex: 'kickOut',
          align: 'center',
          customRender: (text) => {
            if (text) {
              return '被踢出'
            } else {
              return '正常'
            }
          }
        }
        ]
      }
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
     * 强制下线
     */
    kickOut (record = {}) {
      console.log(record)
      this.$confirm({
        title: '确定强制下线吗',
        onOk: async () => {
          try {
            const { appCode, ip, userId } = record
            console.log(appCode)
            console.log(ip)
            console.log(userId)
            await iopOnlineService.tick({ appCode, ip, userId })
            this.search()
          } catch (error) {
            MessageUtils.error(error)
          }
        }
      })
    },

    /**
     * 搜索
     */
    async search () {
      try {
        const { dateParams, queryParam } = this
        if (dateParams.start) {
          queryParam.start = dateParams.start.toDate().getTime()
        }
        if (dateParams.end) {
          queryParam.end = dateParams.end.toDate().getTime()
        }
        await this.$refs.userList.reload(queryParam)
      } catch (error) {
        MessageUtils.error(error)
      }
    },

    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      this.queryParam = {}
      this.dateParams = {}
      this.search()
    }
  }
}
</script>
