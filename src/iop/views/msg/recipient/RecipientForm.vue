<template>
  <!-- 个人设置-个人消息-未读-查看 -->
  <!-- 个人设置-个人消息-已读-回复 -->
  <a-modal
    :title="showState"
    @ok="handleOk"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    width="500px"
  >
    <template slot="footer">
      <a-button key="reply" v-if="showState !== '回复' && contType === '消息'" @click="reply">回复</a-button>
      <a-button key="reply" v-if="showRutn === true" @click="retuView">返回</a-button>
      <a-button key="back" @click="handleCancel">关闭</a-button>
      <a-button v-if="showState === '回复'" key="submit" type="primary" @click="handleOk">提交</a-button>
    </template>
    <a-row>
      <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
        <a-form-item :label="showState === '回复' ? '接收人' : '发送人'">
          <a-input disabled style="display: inline-block" class="inps" v-model="data.sendUserName"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row v-if="showState === '查看'">
      <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
        <a-form-item label="发送时间">
          <a-input style="display: inline-block" class="inps" v-model="data.sendTime"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
        <a-form-item label="标题">
          <a-input style="display: inline-block" class="inps" v-model="data.title"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
        <a-form-item label="正文">
          <a-textarea style="min-height: 100px;" autosize class="inps" v-model="data.sendContent"/>
        </a-form-item>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { IopDataTreeSelect, IopDataDictSelect } from '@/iop/components'
import sends from '@/iop/service/msg/send'
import path from '@/iop/api'
import { iopDataService } from '@/iop/service/index'

export default {
  name: 'RecipientForm',
  components: { DataDictSelect: IopDataDictSelect, DataTreeSelect: IopDataTreeSelect },
  data () {
    return {
      tag: false,
      visible: false,
      confirmLoading: false,
      data: {
        recipientName: '',
        sendTime: '',
        sendContent: ''
      },
      showState: '',
      showRutn: false,
      contType: '',
      replyCont: '',
      title: ''
    }
  },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    submitQuery: {
      type: Object,
      required: false,
      default: () => {}
    },
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    /** 数据主键 */
    recId: {
      type: String,
      required: false,
      default: ''
    },
    /** 上级对象 */
    parentId: {
      type: String,
      required: false,
      default: ''
    }
  },
  watch: {
    /**
     * 上级对象
     */
    parentId (value) {
      this.$refs.recipientForm.setInitValue({ parentId: value })
    }
  },
  methods: {
    reply () {
      this.showState = '回复'
      this.showRutn = true
      this.replyCont = this.data.sendContent
      this.title = this.data.title
      this.data.sendContent = ''
      this.data.title = ''
    },
    retuView () {
      this.showState = '查看'
      this.showRutn = false
      this.data.sendContent = this.replyCont
      this.data.title = this.title
    },
    handleOk () {
      this.visible = false
      this.showRutn = false
      const timestamp = Date.parse(new Date())
      iopDataService
        .get({
          url: path.msg.sendType.index
        })
        .then((res) => {
          res.result.map((code) => {
            if (code.msgName === this.data.msgType) {
              this.data.msgType = code.msgCode
              const datas = {
                title: this.data.title,
                contType: '2',
                sendType: '1',
                msgType: this.data.msgType,
                sendContent: this.data.sendContent,
                sendTime: timestamp,
                status: '1',
                msgAccps: [{
                  accpAcount: this.data.sendUserId,
                  accpName: this.data.sendUserName
                }]
              }
              sends.addData(datas).then((res) => {
                this.visible = false
                this.$parent.showData()
              })
            }
          })
        })
    },
    handleCancel () {
      this.visible = false
      this.showRutn = false
      this.data = {
        recipientName: '',
        sendTime: '',
        sendContent: ''
      }
    },
    /**
     * 显示弹窗
     */
    show (data) {
      this.visible = true
      this.showState = data
      if (data === '查看') {
        this.title = this.data.title
        this.replyCont = this.data.sendContent
      }
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { recId } = this
        Object.assign(value, { recId })
      }
      return value
    }
  }
}
</script>
