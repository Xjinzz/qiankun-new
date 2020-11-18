<template>
  <div>
    <iop-data-table
      ref="sentTypeList"
      :table="table"
      :permission="permission"
      @onAction="onAction"
    >
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="配置名称">
              <a-input @pressEnter="search" placeholder="请输入配置名称" v-decorator="['msgName']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="编码">
              <a-input @pressEnter="search" placeholder="请输入编码" v-decorator="['msgCode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>
    </iop-data-table>
  </div>
</template>
<script>
import { IopDataTable } from '@/iop/components'
import path from '@/iop/api/index'

/** 点击树节点查询列表参数名 */
export default {
  name: 'SendTypeList',
  components: { IopDataTable },
  data () {
    const sendTypeListVO = [
      {
        title: '配置名称',
        dataIndex: 'msgName',
        align: 'center',
        sorter: false
      },
      {
        title: '编码',
        align: 'center',
        dataIndex: 'msgCode',
        sorter: false
      },
      {
        title: '是否需要用户配置账号',
        align: 'center',
        dataIndex: 'userConf',
        sorter: false,
        customRender: (val, row, ind) => {
          if (row.userConf) {
            return <a-tag color="pink">{ row.userConf }</a-tag>
          } else {
            return ''
          }
        }
      },
      {
        title: '备注',
        align: 'center',
        dataIndex: 'remark',
        sorter: false,
        hidden: true
      }
    ]
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      table: {
        /** 列表查询地址 */
        url: path.msg.sendType.table,
        /** rowKey，必填 */
        rowKey: 'msgTypeId',
        /** 不显示序号列 */
        serial: true,
        /** 列定义 */
        columns: sendTypeListVO
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'edit', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create'
    }
  },
  methods: {

    /**
     * 查询
     */
    async search () {
      try {
        // 通过组件的ref属性指定控件的id获取控件，调用组件的方法
        await this.$refs.sentTypeList.search()
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 重置查询条件
     */
    resetSearchForm () {
      this.$refs.sentTypeList.resetSearch()
      this.$refs.sentTypeList.reload()
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
        case 'onView':
          this.handleView(data.original.msgTypeId)
          break
        case 'onEdit':
          this.handleEdit(data.original.msgTypeId)
          break
        case 'onRemoveSelected':
          this.handleRemoveSelected(data.original)
          break
      }
    },

    /**
     * 点击新建按钮事件
     */
    handleCreate () {
      this.formMode = 'create'
      // 先赋值，后显示
      this.$goPage('msg/send-type/add', {
        mode: this.formMode
      })
    },

    /**
     * 点击查看按钮事件
     *
     *  @param {string}  主键
     */
    handleView (id) {
      this.formMode = 'view'
      this.$goPage('msg/send-type/add', {
        mode: this.formMode,
        msgTypeId: id
      })
    },

    /**
     * 点击编辑按钮事件
     *
     * @param {string}  主键
     */
    handleEdit (id) {
      this.formMode = 'edit'
      this.$goPage('msg/send-type/add', {
        mode: this.formMode,
        msgTypeId: id
      })
    },
    // 劈脸删除
    handleRemoveSelected () {
      this.$refs.sentTypeList.reload()
    }
  }
}
</script>
