<template>
  <a-modal
    title="通讯录"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    width="1200px"
  >
    <template slot="footer">
      <a-button key="back" @click="handleCancel">关闭</a-button>
    </template>
    <iop-data-table ref="proList" :tree="{}" :table="table" :permission="permission" @onAction="onAction">
      <template #top>
        <a-form layout="inline">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :span="8">
              <a-form-item label="姓名">
                <a-input v-model="queryParam.recipientName" placeholder="请输入姓名" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="编码">
                <!-- <data-select type="msgSentStatus" ref="recStatus" @change="contChange"></data-select> -->
                <a-input v-model="queryParam.recipientName" placeholder="请输入编码" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-button type="primary" @click="search()">查询</a-button>
              <a-button style="margin-left: 8px" @click="resetSearchForm()">重置</a-button>
            </a-col>
          </a-row>
        </a-form>
      </template>
      <template #createButton>
        <a-button type="primary" @click="sel()">选择</a-button>
      </template>
      <template #tree>
        <sel-peo-tree ref="CatalogTree" @onSelect="onTreeSelect" />
      </template>
    </iop-data-table>
  </a-modal>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import selListVO from './vo/select-people-list-vo'
import selPeoTree from './selPeoTree'
import path from '@/iop/api'
/** 点击树节点查询列表参数名 */
const tableQueryName = 'parentId'
export default {
  name: 'ProList',
  components: { IopDataTable, DataSelect: IopDataDictSelect, selPeoTree },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: path.msg.contactUser.index,
        /** rowKey，必填 */
        rowKey: 'conUserId',
        /** 列定义 */
        columns: selListVO,
        actions: false
      },
      /** 表格组件按钮权限 */
      permission: ['create'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      conUserId: '',
      selectedRowKeys: [],
      /** 树当前选中节点，上级行政区域 */
      selectedNode: '',
      selectData: []
    }
  },
  methods: {
    sel () {
      this.$parent.peopleClose(this.selectData)
      this.$refs.proList.clearSelected()
    },
    onAction ({ name = '', data = {} }) {
      this.selectData = data.original.selectedRows
      this.selectedRowKeys = data.original.selectedRowKeys
    },
    /**
     * 选中树节点
     *
     * @param {string} key 节点id
     */
    onTreeSelect ({ key }) {
      this.selectedNode = key
      // 请求:/iop/base/baseCodeCla?page=1&size=10&catalogId=123
      this.$refs.proList.reload({
        [tableQueryName]: key
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
