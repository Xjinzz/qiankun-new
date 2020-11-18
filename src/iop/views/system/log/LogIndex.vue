<template>
  <div>
    <data-table-page
      ref="skinTable"
      :table="table"
      :permission="permission"
      @onAction="onAction"
    >
      <template #top>
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
              <a-col :md="8" :sm="24">
                <a-form-item label="操作名称">
                  <a-input @pressEnter="search" v-model="queryParam.operateName" placeholder="请输入操作名称" allowClear />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="操作人：">
                  <a-input @pressEnter="search" v-model="queryParam.operateUser" placeholder="请输入操作人" allowClear />
                </a-form-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="操作ip地址">
                    <a-input @pressEnter="search" v-model="queryParam.logIp" placeholder="请输入操作ip地址" allowClear />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24" style="margin-top: 20px">
                  <a-form-item label="开始时间：">
                    <a-date-picker
                      v-model="dateParams.startDate"
                      style="width:100%;"
                    />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24" style="margin-top: 20px">
                  <a-form-item label="结束时间：">
                    <a-date-picker
                      v-model="dateParams.endDate"
                      style="width:100%;"
                    />
                  </a-form-item>
                </a-col>
              </template>
              <a-col :md="8" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
                <a-button type="primary" @click="search()">查询</a-button>
                <a-button @click="resetSearchForm()">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '高级' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </template>

      <template #viewButton="{ record }" >
        <a @click="handelView(record)" style="margin-right:8px;">查看</a>
      </template>

    </data-table-page>

    <viewModal ref="detailPage" />
  </div>
</template>
<script>
import { IopDataTablePage } from '@/iop/components/index'
import path from '@/iop/api/index'
import viewModal from './DetailPage'

export default {
  name: 'LoginIndex',
  components: { DataTablePage: IopDataTablePage, viewModal },
  data () {
    return {
      /** 搜索参数 */
      dateParams: {},
      queryParam: {},
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        url: path.system.logAll.table,
        /** rowKey，必填 */
        rowKey: 'logId',
        /** 是否有选择列 */
        selectable: false,
        actionsWidth: 100,
        columns: [{
          title: '系统名称',
          dataIndex: 'appName'
          /** 排序 */
          // sorter: true
        }, {
          /** 表头显示的文字 */
          title: '操作时间',
          /** 绑定的属性名 */
          dataIndex: 'logTime'
          /** 排序 */
          // sorter: true
        }, {
          title: '操作机器IP地址',
          dataIndex: 'logIp'
        }, {
          /** 表头显示的文字 */
          title: '操作人',
          /** 绑定的属性名 */
          dataIndex: 'operateUser'
          /** 排序 */
          // sorter: true
        }, {
          /** 表头显示的文字 */
          title: '操作名称',
          /** 绑定的属性名 */
          dataIndex: 'operateName'
          /** 排序 */
          // sorter: true
        }, {
          /** 表头显示的文字 */
          title: '操作类型',
          /** 绑定的属性名 */
          dataIndex: 'operateType'
          /** 排序 */
          // sorter: true
        }
        ]
      },
      permission: ['view']
    }
  },
  methods: {
    /**
     * 显示/隐藏高级搜索
     */
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handelView (record) {
      this.$refs.detailPage.load(record)
    },

    /**
      * 刷新列表
      */
    refreshList (firstPage) {
      if (firstPage) {
        this.$refs.skinTable.refresh(firstPage)
        return
      }
      this.$refs.skinTable.refresh()
    },
    // 获取时间的当前0点
    getTimeZero (time) {
      return new Date(time).setHours(0, 0, 0, 0)
    },
    // 获取一天的最后一天的毫秒
    dateLast () {
      return 24 * 60 * 60 * 1000 - 1
    },
    /**
     * 搜索
     */
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        if (this.dateParams.startDate || this.dateParams.endDate) {
          if (this.dateParams.startDate && this.dateParams.endDate) {
            this.queryParam.startDate = this.getTimeZero(new Date(this.dateParams.startDate._d))
            this.queryParam.endDate = this.getTimeZero(new Date(this.dateParams.endDate._d)) + this.dateLast()
          } else {
            this.$message.warning('请选择开始时间或结束时间')
            return
          }
        } else {
          delete this.queryParam.startDate
          delete this.queryParam.endDate
        }
        await this.$refs.skinTable.reload(this.queryParam)
        // delete this.queryParam.startDate
        // delete this.queryParam.endDate
      } catch (error) {
        this.handleError(error)
      }
    },

    handleCreate () {
      this.$refs.skinTable.handleAction('create', this.queryParam)
    },

    /**
     * 接收事件
     */
    onAction ({ name = '', data = {} } = {}) {
      console.log('fire action', name)
      console.log('data', data)
    },

    /**
     * 打开编辑页
     */
    async handleEdit (record) {
      console.log('edit', record)
      // this.$router.push({ path: '/iop/sys/skin/edit', query: { id } })
    },

    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      this.queryParam = {}
      this.dateParams = {}
      this.refreshList(true)
      this.search()
    },

    /**
     * 异常处理
     */
    handleError ({ message = '' } = {}) {
      this.$message.error(message || '请求出现错误，请稍后再试')
    }
  }
}
</script>
