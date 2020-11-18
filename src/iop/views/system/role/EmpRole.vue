<template>
  <div>
    <a-modal
      title="授权用户"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="1000px"
    >
      <div v-show="userShow === true">
        <a-row>
          <a-col :xs="{ span: 10 }" :lg="{ span: 10 }">
            <a-form-item label="姓名">
              <a-input @pressEnter="selectUser" placeholder="请输入姓名" class="inps" v-model="userName" allowClear/>
            </a-form-item>
          </a-col>
          <a-col class="search-buttons" :xs="{ span: 14 }" :lg="{ span: 14 }">
            <a-button type="primary" @click="userShowOk">选择授权用户</a-button>
            <a-button type="primary" :disabled="selectedRowKeys.length === 0" @click="delUser">取消授权用户</a-button>
            <a-button type="primary" @click="selectUser">查询</a-button>
            <a-button @click="resetSearchForm">重置</a-button>
          </a-col>
        </a-row>
        <a-table
          :columns="userColumns"
          :dataSource="userDataList.data"
          :rowKey="record => record.userId"
          :pagination="pagination"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          style="margin-top:10px"
          @change="handlePageChange"
        >
        </a-table>
      </div>
      <div v-show="userShow === false">
        <div>
          <a-row>
            <a-col :xs="{ span: 7 }" :lg="{ span: 8 }">
              <a-form-item
                label="用户名称"
              >
                <a-input @pressEnter="selectOnUser" class="inps" v-model="userSelName"/>
              </a-form-item>
            </a-col>
            <a-col :xs="{ span: 7 }" :lg="{ span: 8 }">
              <a-form-item
                label="授权日期"
              >
                <a-range-picker
                  :value="dateData"
                  :format="dateFormat"
                  @change="onUserChange"
                />
              </a-form-item>
            </a-col>
            <a-col style="text-align:right" :xs="{ span: 7 }" :lg="{ span: 8 }">
              <a-button type="primary" :disabled="selectedRowKeys.length === 0" @click="upUserData">保存</a-button>
              <a-button type="primary" @click="selectOnUser">查询</a-button>
              <a-button @click="retUser">返回</a-button>
            </a-col>
          </a-row>
        </div>
        <div style="display: inline-block;float: left;width: 238px;overflow:auto;height:400px">
          <a-tree
            :treeData="this.userTreeData"
            :loadData="onLoadData"
            @select="this.onUserSelect"
            :loadedKeys="loadedKeys"
          >
          </a-tree>
        </div>
        <div style="display: inline-block;width: 75%;">
          <a-table
            :columns="userTColumns"
            :dataSource="userTDataList.data"
            :rowKey="record => record.userId"
            :pagination="false"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            style="margin-top:10px"
          >
          </a-table>
          <a-pagination
            style="margin-top:24px"
            :pageSizeOptions="pageSizeOptions"
            :total="total"
            showSizeChanger
            :pageSize="pageSize"
            v-model="current"
            @showSizeChange="onShowSizeChange"
            @change="pagChange"
            :showTotal="(total, range) => `${range[0]}-${range[1]}  共 ${total} 项`"
          >
            <template slot="buildOptionText" slot-scope="props">
              <span v-if="props.value!=='50'">{{ props.value }}条/页</span>
              <span v-if="props.value==='50'">全部</span>
            </template>
          </a-pagination>
        </div>
      </div>

      <template #footer>
        <div style="text-align:center;">
          <a-button @click="handleOk()">关闭</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
import roles from '@/iop/service/system/role'
import { TreeSelect, Tree } from 'ant-design-vue'
import moment from 'moment'
export default {
  props: {
    roleUser: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  components: {
    ATreeSelect: TreeSelect,
    ATree: Tree
  },
  data () {
    return {
      pagination: {
        current: 1,
        total: 0
      },
      visible: false,
      userColumns: [
        {
          title: '姓名',
          dataIndex: 'userName'
        },
        {
          title: '所在机构',
          dataIndex: 'deptName'
        },
        {
          title: '授权开始时间',
          dataIndex: 'beginDate'
        },
        {
          title: '授权结束时间',
          dataIndex: 'endDate'
        }
      ],
      userTColumns: [
        {
          title: '用户类别',
          dataIndex: 'userType'
        },
        {
          title: '用户名称',
          dataIndex: 'userName'
        },
        {
          title: '登录名称',
          dataIndex: 'loginName'
        }
      ],
      userTreeData: [],
      selectedRowKeys: [],
      confirmLoading: false,
      userShow: true,
      userName: '',
      userSelName: '',
      beginDate: '',
      endDate: '',
      dateFormat: 'YYYY/MM/DD',
      dateData: [],
      userTDataList: {},
      userDataList: {},
      sysDeptId: '',
      deptId: '',
      loadedKeys: [],
      // 分页
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      total: 10,
      roleId: ''
    }
  },
  methods: {
    moment,
    show (roleId) {
      this.visible = true
      this.roleId = roleId
      this.selectUserData(roleId)
    },
    // 重置
    resetSearchForm () {
      this.userName = ''
      this.selectUserData(this.roleId)
    },
    // 加载未授权用户数据
    notroleData (data) {
      roles.notrole(data).then((res) => {
        this.userTDataList = res
        this.total = res.totalSizes
      })
    },
    pagChange (page, pageSize) {
      const data = {
        roleId: this.roleUser.roleId,
        sysDeptId: this.sysDeptId,
        page: page,
        size: pageSize
      }
      this.notroleData(data)
    },
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
      const data = {
        roleId: this.roleUser.roleId,
        sysDeptId: this.sysDeptId,
        page: current,
        size: pageSize
      }
      this.notroleData(data)
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    onLoadData (treeNode) {
      this.loadedKeys.push(treeNode.dataRef.key)
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        setTimeout(() => {
          roles.dept({ parentId: treeNode.dataRef.key }).then((res) => {
            const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/id/g, 'key'))
            treeNode.dataRef.children = data
            this.userTreeData = [...this.userTreeData]
          })
          resolve()
        }, 1000)
      })
    },
    handlePageChange (pagination) {
      this.pagination.current = pagination.current
      this.selectUserData()
    },
    selectUserData (id) {
      this.userDataList = []
      if (id === undefined) {
        const data = {
          roleId: this.roleUser.roleId,
          page: this.pagination.current,
          size: 10
        }
        roles.user(data).then((res) => {
          this.userDataList = res
          this.pagination.total = res.totalSizes
        })
      } else {
        const data = {
          roleId: id,
          page: this.pagination.current,
          size: 10
        }
        roles.user(data).then((res) => {
          this.userDataList = res
          this.pagination.total = res.totalSizes
        })
      }
    },
    // 显示授权
    userShowOk () {
      this.userTDataList = {}
      this.selectedRowKeys = []
      this.beginDate = ''
      this.endDate = ''
      this.userShow = false
      const id = { parentId: 0 }
      roles.dept(id).then((res) => {
        var data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/id/g, 'key'))
        this.userTreeData = data

        data = {
          roleId: this.roleUser.roleId,
          sysDeptId: this.userTreeData[0].key
        }
        this.sysDeptId = this.userTreeData[0].key
        this.notroleData(data)
      })
      this.dateData = [this.moment(this.getCurrentData(), this.dateFormat), moment('2050/01/01', this.dateFormat)]
      this.selectUserData()
    },
    // 授权树形点击
    onUserSelect (record, e) {
      this.sysDeptId = e.node.dataRef.key
      this.deptId = e.node.dataRef.dept_key
      const data = {
        roleId: this.roleUser.roleId,
        sysDeptId: this.sysDeptId,
        page: this.current,
        size: this.pageSize
      }
      this.notroleData(data)
    },
    getCurrentData () {
      return new Date()
    },
    // 开始和结束时间
    onUserChange (date, dateString) {
      this.dateData = date
      var beginDate = new Date(dateString[0])
      var endDate = new Date(dateString[1])
      this.beginDate = beginDate.getTime()
      this.endDate = endDate.getTime()
    },
    // 保存
    upUserData () {
      if (this.beginDate === '' || this.endDate === '') {
        const time = [this.moment(this.getCurrentData(), this.dateFormat), '2050/01/01']
        this.onUserChange('', time)
      }
      const data = {
        beginDate: this.beginDate,
        endDate: this.endDate,
        roleId: this.roleUser.roleId
      }
      roles.grant(this.selectedRowKeys, data).then((res) => {
        this.userShow = true
        this.selectUserData(this.roleUser.roleId)
        this.loadedKeys = []
        this.selectedRowKeys = []
        this.rangePicker = ''
      })
      this.dateData = [this.moment(this.getCurrentData(), this.dateFormat), moment('2050/01/01', this.dateFormat)]
    },
    // 取消授权
    delUser () {
      const data = {
        roleId: this.roleUser.roleId
      }
      const that = this
      this.$confirm({
        title: '是否删除该条记录？',
        okText: '是',
        cancelText: '否',
        onOk () {
          roles.delUser(that.selectedRowKeys, data).then((res) => {
            that.selectUserData(that.userId)
            that.selectedRowKeys = []
          })
        }
      })
    },
    // 查询授权
    selectUser () {
      if (this.userName !== '') {
        const data = {
          roleId: this.roleUser.roleId,
          userName: this.userName
        }
        roles.user(data).then((res) => {
          this.userDataList = res
          this.userName = ''
        })
      } else {
        this.selectUserData(this.roleUser.roleId)
      }
    },
    // 查询内授权
    selectOnUser () {
      const data = {
        roleId: this.roleUser.roleId,
        sysDeptId: this.sysDeptId,
        userName: this.userSelName
      }
      roles.notrole(data).then((res) => {
        this.userTDataList = res
      })
    },
    // 返回
    retUser () {
      this.userShow = true
      this.selectUserData(this.roleUser.roleId)
      this.selectedRowKeys = []
      this.loadedKeys = []
      this.rangePicker = ''
      this.dateData = [this.moment(this.getCurrentData(), this.dateFormat), moment('2050/01/01', this.dateFormat)]
    },
    funTData (id) {
      const progId = {
        programId: 0,
        roleId: id
      }
      roles.fun(progId).then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/id/g, 'key'))
        this.funTreeData = data
        for (var key of data) {
          if (key.checked === 'true') {
            this.funSelect.push(key.key)
          }
        }
      })
    },
    handleOk () {
      this.visible = false
      this.userShow = true
      this.selectedRowKeys = []
      this.loadedKeys = []
      this.dateData = [this.moment(this.getCurrentData(), this.dateFormat), moment('2050/01/01', this.dateFormat)]
    },
    handleCancel () {
      this.visible = false
      this.userShow = true
      this.selectedRowKeys = []
      this.loadedKeys = []
      this.dateData = [this.moment(this.getCurrentData(), this.dateFormat), moment('2050/01/01', this.dateFormat)]
    }
  }
}
</script>
<style lang="less" scoped>
.ant-form-item {
  /deep/ .ant-form-item-control-wrapper {
    display: inline-block;
    width: 70%;
  }
}
</style>
