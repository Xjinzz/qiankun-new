<template>
  <div>
    <!-- 个人设置-个人消息-已发送 -->
    <iop-data-table ref="sendList" :table="table" :permission="permission">
      <template #top>
        <a-form layout="inline">
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
        </a-form>
      </template>

      <template #viewButton="{ record }">
        <a @click="handleView(record)">查看状态</a>
        <a-divider type="vertical" />
        <a v-if="record.status === '0'" @click="handleEdit(record)">编辑</a>
        <a-divider v-if="record.status === '0'" type="vertical" />
      </template>

      <template #createButton>
        <a-button type="primary" @click="handleCreate()">新建</a-button>
      </template>
    </iop-data-table>

    <draft-form ref="sendForm" :options="options" :mode="formMode" :senId="senId" :submitSuccess="submitSuccess" />
    <see-list ref="seeList"></see-list>
  </div>
</template>
<script>
import { IopDataTable, IopDataDictSelect } from '@/iop/components'
import path from '@/iop/api'
import { iopDataService } from '@/iop/service/index'
import sends from '@/iop/service/msg/send'
import draftForm from './DraftForm'
import sendListVO from './vo/send-list-vo'
import seeList from './See'

export default {
  name: 'RecipientList',
  components: { IopDataTable, DataSelect: IopDataDictSelect, draftForm, seeList },
  data () {
    return {
      /** 是否展开高级搜索 */
      advanced: false,
      /** 搜索参数 */
      queryParam: {
        msgType: '',
        status: '1'
      },
      table: {
        /** 列表查询地址 */
        url: path.msg.send.table,
        /** rowKey，必填 */
        rowKey: 'senId',
        /** 列定义 */
        columns: sendListVO
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
      ]
    }
  },
  methods: {
    selectData () {
      iopDataService
        .get({
          url: path.msg.sendType.index
        })
        .then((res) => {
          res.result.map((item) => {
            this.options.push({ value: item.msgCode, label: item.msgName })
          })
        })
    },
    /**
     * 刷新数据
     */
    showData () {
      this.$refs.sendList.reload({ status: '1' })
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
        status: '1'
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
      this.$refs.sendForm.visible = true
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
        that.visible = true
      })
    },

    /**
     * 打开查看窗口
     */
    handleView (record) {
      this.formMode = 'view'
      this.$refs.seeList.visible = true
      this.$refs.seeList.table.url = `${path.msg.send.recipient}?sendId=${record.senId}`
      if (this.show === 0) {
        this.show++
      } else {
        this.$refs.seeList.showData()
      }
    }
  },
  mounted () {
    this.selectData()
    this.showData()
  }

}
</script>
