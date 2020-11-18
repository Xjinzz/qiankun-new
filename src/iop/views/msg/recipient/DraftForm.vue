<template>
  <div>
    <!-- 个人设置-个人消息-草稿箱-新建 -->
    <a-modal
      title="消息"
      @ok="handleOk"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      width="800px"
    >
      <template slot="footer">
        <div style="width: 100%; text-align: center;">
          <a-button key="back" @click="handleCancel" style="margin-right: 8px">取消</a-button>
          <a-button key="prese" type="primary" @click="preservation">
            保存草稿
          </a-button>
          <a-button key="submit" type="primary" @click="handleOk">
            发送
          </a-button>
        </div>
      </template>
      <a-form :form="form">
        <a-row>
          <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
            <a-form-item label="接收人">
              <div style="border: 1px;display: inline-block">
                <template v-for="user in data.msgAccps">
                  <a-tag :key="user.accpAcount" :closable="true" :afterClose="() => handleClose(user.accpAcount)">
                    {{ user.accpName }}
                  </a-tag>
                </template>
                <a-button type="primary" @click="selUser">选择</a-button>
              </div>
              <!-- <a-button style="display: inline-block" @click="selPeo">通讯录</a-button> -->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
            <a-form-item label="发送方式">
              <a-select v-decorator="['msgType', {rules: [{ required: true, whitespace: true, message: '发送方式不能为空' }]}]" style="width:100%" :options="options" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
            <a-form-item label="标题">
              <a-input placeholder="请输入标题" style="display: inline-block;width:100%" class="inps" v-decorator="['title', {rules: [{ required: true, whitespace: true, message: '标题不能为空' }]}]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="{ span: 24 }" :lg="{ span: 24 }">
            <a-form-item label="正文">
              <a-textarea placeholder="请输入正文" style="min-height: 100px;" autosize class="inps" v-decorator="['sendContent', {rules: [{ required: true, whitespace: true, message: '模板名称不能为空' },{ max: 500, message: '正文最多500位' }]}]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <iop-sys-user-select ref="userSelects" @submit="onUserSelect"/>
    <sel-peo ref="selectPeo"></sel-peo>
  </div>
</template>
<script>
import { IopDataTreeSelect, IopDataDictSelect, IopSysUserSelect } from '@/iop/components'
import sends from '@/iop/service/msg/send'
import selPeo from './selectPeo/SelectPeople'
import MessageUtils from '@/utils/message'

export default {
  components: { IopDataTreeSelect, DataSelect: IopDataDictSelect, IopSysUserSelect, selPeo },
  props: {
    options: {
      type: Array,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      data: {
        msgAccps: [
        ],
        contType: '2',
        sendType: '1',
        msgType: 'PM',
        title: ''
      }
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$nextTick(() => {
        this.setForm()
      })
    },
    handleClose (accpAcount) {
      this.data.msgAccps.map((item, key) => {
        if (item.accpAcount === accpAcount) {
          this.data.msgAccps.splice(key, 1)
        }
      })
    },
    doSave (status) {
      const timestamp = Date.parse(new Date())
      this.data.sendTime = timestamp
      this.data.status = status
      if (this.data.msgAccps.length === 0) {
        MessageUtils.warn('接收人不能为空')
        return
      }
      this.form.validateFields((error) => {
        if (!error) {
          this.data = Object.assign(this.data, this.form.getFieldsValue(['msgType', 'title', 'sendContent']))
          sends.addData(this.data).then((res) => {
            this.visible = false
            this.clearData()
            this.$parent.showData()
          })
        }
      })
    },
    handleOk () {
      this.doSave('1')
    },
    preservation () {
      this.doSave('0')
    },
    handleCancel () {
      this.visible = false
      this.clearData()
      // this.setForm()
    },
    async onUserSelect ({ keys, values }) {
      for (var i of values) {
        this.data.msgAccps.push({
          accpAcount: i.userId,
          accpName: i.userName
        })
      }
      this.data.msgAccps = Array.from(new Map(this.data.msgAccps.map(item => ([item.accpAcount, item]))).values())
    },
    selUser () {
      this.$refs.userSelects.show()
    },
    selPeo () {
      this.$refs.selectPeo.visible = true
    },
    setForm () {
      this.form.setFieldsValue({
        msgType: this.data.msgType,
        sendContent: this.data.sendContent,
        title: this.data.title
      })
    },
    clearData () {
      this.accpName = ''
      this.data = {
        msgAccps: [],
        contType: '2',
        sendType: '1',
        msgType: 'PM',
        title: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ant-form-item{
  /deep/.ant-form-item-label{
    float: left;
    width:15%;
  }
  /deep/.ant-form-item-control-wrapper{
    display: inline-block;
    width: 85%;
  }
}
</style>
