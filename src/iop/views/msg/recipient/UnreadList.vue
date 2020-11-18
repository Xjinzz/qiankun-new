<template>
  <div>
    <iop-data-table ref="recipientList" :id="recId" @onAction="onAction" :table="table" :permission="permission">
      <template #top>
        <a-form layout="inline">
          <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :md="8" :sm="24">
              <a-form-item label="内容类型">
                <data-select type="msgContType" ref="msgContType" @change="contChange"></data-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="发送时间(区间)">
                <a-range-picker :value="dateData" :format="dateFormat" @change="onTimeChange"/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="发送人">
                  <a-input @pressEnter="search" v-model="queryParam.sendUserName" placeholder="请输入发送人" allowClear />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="消息标题" style="margin-top: 20px">
                  <a-input @pressEnter="search" v-model="queryParam.title" placeholder="请输入标题" allowClear />
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 16" :sm="24" class="search-buttons" :class="advanced ? 'searchMarTop' : ''">
              <a-button type="primary" @click="search()">查询</a-button>
              <a-button @click="resetSearchForm()">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '高级' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </a-col>
          </a-row>
        </a-form>
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record)">查看</a>
        <a-divider type="vertical" />
      </template>
      <template #createButton>
        <a-button type="primary" @click="handleCreate()">已读</a-button>
      </template>
    </iop-data-table>

    <recipient-form ref="recipientForm" :mode="formMode" :recId="recId" :submitSuccess="submitSuccess" />
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api'
import RecipientForm from './RecipientForm'
import recipients from '@/iop/service/msg/recipient'
import recipientListVO from './vo/recipient-list-vo'

export default {
  name: 'RecipientList',
  components: { IopDataTable, DataSelect: IopDataDictSelect, RecipientForm },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      /** 搜索参数 */
      queryParam: {
        msgType: ''
      },
      table: {
        /** 列表查询地址 */
        url: path.msg.recipient.table,
        /** rowKey，必填 */
        rowKey: 'recId',
        /** 列定义 */
        columns: recipientListVO,
        query: { recStatus: 0 }
      },
      /** 表格组件按钮权限 */
      permission: ['create', 'view', 'remove', 'removeSelected'],
      /** 表单组件模式 */
      formMode: 'create',
      /** 表单数据主键 */
      recId: '',
      show: '1',
      msgSelect: [],
      options: [
        { value: '', label: '请选择' }
      ],
      dateFormat: 'YYYY/MM/DD',
      dateData: [],
      selectedRows: []
    }
  },
  methods: {
    onAction ({ name = '', data = {} }) {
      if (name === 'onSelectedChange') {
        if (data && data.original) {
          this.selectedRows = data.original.selectedRows
        } else if (name === 'onClearSelected') {
          this.selectedRows = []
        }
      }
    },
    onTimeChange (date, dateString) {
      this.dateData = date
      var beginDate = new Date(dateString[0])
      var endDate = new Date(dateString[1])
      this.queryParam.startSendTime = beginDate.getTime()
      this.queryParam.endSendTime = endDate.getTime()
    },
    /**
     * 刷新数据
     */
    showData () {
      this.$refs.recipientList.reload({ recStatus: '0' })
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
        msgType: ''
      }
      this.dateData = []
      this.$refs.msgContType.cleanSelected()
      this.search()
    },
    contChange (record) {
      this.queryParam.contType = record
    },
    msgChange (record) {
      this.queryParam.msgType = record
    },
    /**
     * 搜索
     */
    async search () {
      try {
        await this.$refs.recipientList.reload(this.queryParam)
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
     * 批量已读窗口
     */
    handleCreate () {
      var selectId = []
      this.selectedRows.map((code) => {
        selectId.push(code.recId)
      })
      if (selectId.length !== 0) {
        recipients.dels(selectId).then((res) => {
          this.showData()
        })
      }
    },
    /**
     * 打开查看窗口
     * @param {string} recId 主键
     */
    async handleView (record) {
      this.recId = record.recId
      this.$refs.recipientForm.data = record
      this.$refs.recipientForm.contType = record.contType
      this.$refs.recipientForm.show('查看')
      recipients.dels([record.recId]).then((res) => {
        this.showData()
      })
    }
  },
  mounted () {
    this.showData()
  }
}
</script>
