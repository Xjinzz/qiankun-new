
<template>
  <div>
    <iop-data-table
      ref="testTable"
      :table="tableState.config"
      :permission="tableState.permission"
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col v-if="!logModel" :span="8">
            <a-form-item label="调用系统">
              <a-input @pressEnter="search" placeholder="请输入调用系统" v-model="searchModal.appId" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="调用人">
              <a-input @pressEnter="search" placeholder="请输入调用人" v-model="searchModal.callUserName" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="调用方法" v-show="advanced">
              <a-input @pressEnter="search" placeholder="请输入调用方法" v-model="searchModal.method" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="reset()">重置</a-button>
            <a @click="toggleAdvanced()" style="margin-left: 8px">
              {{ advanced ? '收起' : '高级' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </template>
    </iop-data-table>
    <log-view ref="logView" :mode="viewState.mode" :id="viewState.id"></log-view>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api'
import { objectTool } from 'mwutil'
import Define from '@/iop/constants/dataSourceSet'
import LogView from './LogView'
const searchModal = {
  appId: '',
  callUserName: '',
  method: ''
}
export default {
  props: {
    logModel: {
      type: Boolean,
      default: () => false
    },
    appId: {
      type: String,
      default: ''
    },
    method: {
      type: String,
      default: ''
    }
  },
  components: {
    IopDataTable,
    LogView
  },
  data () {
    return {
      // tableState 存储tableConfig/permission/selectId.....等table相关的
      tableState: {
        config: {
          /** 列表查询地址 */
          url: path.dataSourceSet.table,
          /** rowKey，必填 */
          rowKey: 'id',
          /** 列定义 */
          columns: [
            {
              title: '调用系统',
              dataIndex: 'callApp'
            },
            {
              title: '调用人',
              dataIndex: 'callUserName'
            },
            {
              title: '调用方法',
              dataIndex: 'method'
            },
            {
              title: '访问资源',
              dataIndex: 'uri'
            },
            {
              title: '资源所属系统',
              dataIndex: 'resourceApp'
            },
            {
              title: '调用时间',
              dataIndex: 'createTime'
            }
            // ,
            // {
            //   title: '数据源',
            //   dataIndex: 'connUrl'
            // },
            // {
            //   title: '方法',
            //   dataIndex: 'connUrl'
            // }
          ]
        },
        permission: [
          'view'
        ]
      },
      // searchModal为页面search条件Json
      searchModal: objectTool.deepClone(searchModal),
      viewState: {
        mode: Define.MODE.CREATE,
        id: ''
      },
      advanced: false
    }
  },
  methods: {
    /**
     * 显示/隐藏高级搜索
     */
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onAction ({ name = '', data = {} }) {
      const actionMap = {
        onView: this.doView.bind(this, data.original)
      }
      actionMap.hasOwnProperty(name) && actionMap[name]()
    },
    search () {
      let params = this.searchModal
      if (this.logModel) {
        params = Object.assign(params, {
          method: this.method,
          appId: this.appId
        })
      }
      this.$refs.testTable.reload(params)
    },
    reset () {
      this.searchModal = objectTool.deepClone(searchModal)
      this.search()
    },
    doView (data) {
      this.viewState.mode = Define.MODE.VIEW
      this.viewState.id = ''
      this.$refs.logView.show(data)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
