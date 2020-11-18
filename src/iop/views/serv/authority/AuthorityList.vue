<template>
  <div>
    <iop-data-table ref="authList" :table="table" :permission="permission" tree @onAction="onAction">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="服务名称">
              <a-input @pressEnter="search" placeholder="请输入服务名称" v-decorator="['chName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="服务提供单位">
              <a-input @pressEnter="search" placeholder="请输入服务提供单位" v-decorator="['deptName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>
      <template #beforeCreateButton>
        <a-button type="primary" :disabled="selectedFlag" @click="create">新建授权</a-button>
      </template>
      <template #rowButtons="{ record }">
        <a @click="methodAuth(record.serviceId)">方法授权</a>
        <a-divider type="vertical" />
        <a @click="handleCreate(record.serviceId)">服务授权</a>
      </template>
      <template #tree>
        <auth-tree ref="authTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
    <auth-form
      ref="authForm"
      :serviceId="serviceId"
      :parentId="parentId"
      :mode="formMode"
      :createCont="createCont"
    />
  </div>
</template>
<script>
import authTree from './AuthTree'
import authForm from './AuthForm'
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api/index'
import MessageUtils from '@/utils/message'

export default {
  name: 'ServiceList',
  components: { authTree, IopDataTable, IopDataDictSelect, authForm },
  data () {
    const authListVO = [
      {
        title: '服务名称',
        dataIndex: 'chName',
        align: 'center',
        sorter: false
      },
      {
        title: '服务提供单位',
        align: 'center',
        dataIndex: 'deptName',
        sorter: false
      },
      {
        title: '服务入口地址',
        align: 'left',
        dataIndex: 'inAddr',
        sorter: false
      },
      {
        title: '状态',
        align: 'left',
        dataIndex: 'isValide',
        sorter: false,
        customRender: (val, row, ind) => {
          if (row.isValide === '否') {
            return <a-tag color="pink">未启用</a-tag>
          } else {
            return <a-tag color="purple">已启用</a-tag>
          }
        }
      }
    ]
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.system.serv.servindex,
        /** rowKey，必填 */
        rowKey: 'serviceId',
        /** 列定义 */
        columns: authListVO
      },
      /** 表格组件按钮权限 */
      permission: [],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      serviceId: '',
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      /** 上级行政区域 */
      parentId: '',
      selectedFlag: true,
      selecteds: [],
      createCont: 'one'
    }
  },
  methods: {
    /**
     * 查询
     */
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        const query = {}
        Object.assign(query, { parentId: this.selectedNode })
        await this.$refs.authList.search(query)
      } catch (error) {
        MessageUtils.error(error)
      }
    },
    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.authList.resetSearch()
      this.search()
    },

    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      this.$refs.authList.reload({
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
        case 'onSelectedChange':
          this.selected(data.original)
          break
      }
    },
    selected (data) {
      this.selecteds = data.selectedRowKeys
      if (data.selectedRowKeys.length > 0) {
        this.selectedFlag = false
      } else {
        this.selectedFlag = true
      }
    },
    //  批量授权
    create () {
      this.formMode = 'create'
      this.createCont = 'more'
      this.serviceId = this.selecteds
      this.parentId = this.selectedNode
      this.$refs.authForm.show()
    },
    /**
     * 点击新建按钮事件
     */
    handleCreate (serviceId) {
      this.$goPage(`serv/authority/servAuthList`, {
        serviceId: serviceId
      })
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string} serviceId 主键
     */
    methodAuth (serviceId = '') {
      this.formMode = 'edit'
      this.serviceId = serviceId
      this.$goPage(`serv/authority/authView`, {
        mode: this.formMode,
        serviceId: this.serviceId
      })
    }
  }
}
</script>
