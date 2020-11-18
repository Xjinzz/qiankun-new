<template>
  <div>
    <!-- 个人设置-个人消息-草稿箱 -->
    <iop-data-table ref="sendList" :table="table" :permission="permission" @onAction="onAction">
      <template #top>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col :md="8" :sm="24">
            <a-form-item label="类型">
              <data-select type="msgContType" ref="msgContType" @change="contChange"></data-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="发送方式">
              <a-select v-model="queryParam.msgType" :options="options" />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="接收人">
                <a-input @pressEnter="search" v-model="queryParam.msgAccps" placeholder="请输入接收人" allowClear />
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

      <template #viewButton="{ record }">
        <a @click="sendOut(record)">发送</a>
        <a-divider type="vertical" />
        <a v-if="record.status === '0'" @click="handleEdit(record)">编辑</a>
        <a-divider v-if="record.status === '0'" type="vertical" />
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
        <a-button type="primary" @click="sendOuts()">发送</a-button>
      </template>
    </iop-data-table>

    <draft-form ref="sendForm" :options="options" :mode="formMode" :senId="senId" :submitSuccess="submitSuccess" />
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api'
import { iopDataService } from '@/iop/service/index'
import sends from '@/iop/service/msg/send'
import draftForm from './DraftForm'
import draftListVO from './vo/draft-list-vo'
import recipients from '@/iop/service/msg/recipient'
import MessageUtils from '@/utils/message'

export default {
  name: 'RecipientList',
  components: { IopDataTable, DataSelect: IopDataDictSelect, draftForm },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      /** 搜索参数 */
      queryParam: {
        msgType: '',
        status: '0'
      },
      table: {
        /** 列表查询地址 */
        url: path.msg.send.table,
        /** rowKey，必填 */
        rowKey: 'senId',
        /** 列定义 */
        columns: draftListVO
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      senId: '',
      show: 0,
      msgSelect: [],
      options: [
        { value: '', label: '请选择' }
      ],
      selectedRowKeys: []
    }
  },
  methods: {
    selectData () {
      iopDataService
        .get({
          url: path.msg.sendType.index
        })
        .then((res) => {
          res.result.map((code) => {
            this.options.push({ value: code.msgCode, label: code.msgName })
          })
        })
    },
    /**
     * 刷新数据
     */
    showData () {
      this.$refs.sendList.reload({ status: '0' })
    },
    /**
     * 显示/隐藏高级搜索
     */
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      this.queryParam = {
        msgType: '',
        status: '0'
      }
      this.$refs.msgContType.cleanSelected()
      this.search()
    },
    contChange (record) {
      this.queryParam.contType = record
    },
    statusChange (record) {
      this.queryParam.status = record
    },
    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.sendList.reload(this.queryParam)
      } catch (error) {
        this.$message.error(error || '请求错误，请稍后再试')
      }
    },

    /**
     * 表单保存成功回调
     */
    submitSuccess () {
      this.search()
    },

    /**
     * 打开新建窗口
     */
    handleCreate () {
      // 改变弹出框标题
      this.formMode = 'create'
      // 显示弹出框
      this.$refs.sendForm.show()
      // 清空表单项
      this.senId = ''
    },
    /**
     * 打开编辑窗口
     *
     * @param {string} senId 主键
     */
    async handleEdit (record) {
      this.formMode = 'edit'
      this.senId = record.senId
      const that = this.$refs.sendForm
      sends.getListId({ id: record.senId }).then((res) => {
        that.data = res
        that.accpName = record.msgAccps
        this.$refs.sendForm.show()
      })
    },

    /**
     * 发送多条
     */
    sendOuts () {
      if (this.selectedRowKeys.length === 0) {
        MessageUtils.warn('请选择要发送的消息')
      } else {
        recipients.batch(this.selectedRowKeys).then((res) => {
          MessageUtils.warn('发送成功')
          this.showData()
        })
      }
    },
    /**
     * 发送单条
     */
    sendOut (record) {
      const data = [record.senId]
      recipients.batch(data).then((res) => {
        MessageUtils.warn('发送成功')
        this.showData()
      })
    },
    onAction ({ name = '', data = {} }) {
      this.selectedRowKeys = data.original.selectedRowKeys
    }
  },
  mounted () {
    this.selectData()
    this.showData()
  }

}
</script>
