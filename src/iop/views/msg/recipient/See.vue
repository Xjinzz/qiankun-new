<template>
  <a-modal
    title="查看状态"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    width="1000px"
  >
    <template slot="footer">
      <a-button key="back" @click="handleCancel">关闭</a-button>
    </template>
    <iop-data-table ref="SeeList" :table="table" :permission="permission">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :span="8">
            <a-form-item label="接收人">
              <a-input @pressEnter="search" v-model="queryParam.recipientName" placeholder="请输入接收人" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="阅读状态">
              <data-select type="msgRecivStatus" ref="recStatus" @change="contChange"></data-select>
            </a-form-item>
          </a-col>
          <a-col :span="8" class="search-buttons">
            <a-button type="primary" @click="search()">查询</a-button>
            <a-button @click="resetSearchForm()">重置</a-button>
          </a-col>
        </a-row>
      </template>
    </iop-data-table>
  </a-modal>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import seeListVO from './vo/see-list-vo'

export default {
  name: 'SeeList',
  components: { IopDataTable, DataSelect: IopDataDictSelect },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      /** 搜索参数 */
      queryParam: {},
      table: {
        /** 列表查询地址 */
        url: '',
        /** rowKey，必填 */
        rowKey: 'sendId',
        /** 列定义 */
        columns: seeListVO,
        actions: false
      },
      /** 表格组件按钮权限 */
      permission: [],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      sendId: ''
    }
  },
  methods: {
    contChange (record) {
      this.queryParam.recStatus = record
    },
    handleCancel () {
      this.resetSearchForm()
      this.visible = false
    },
    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      this.queryParam = {}
      this.$refs.recStatus.setSelected('')
      this.search()
    },
    /**
     * 刷新数据
     */
    showData (key) {
      this.$refs.SeeList.reload()
    },
    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.SeeList.reload(this.queryParam)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 表单保存成功回调
     */
    submitSuccess () {
      this.search()
    }
  }
}
</script>
