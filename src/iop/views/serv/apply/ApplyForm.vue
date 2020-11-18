<template>
  <iop-data-form
    ref="applyForm"
    showType="page"
    :title="title"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="applyId"
    :showPageHeader="showPageHeader"
    :loadConvertor="loadConvertor"
    :submitConvertor="submitConvertor"
    @onSubmitSuccess="submitSuccess"
  >
    <template #form>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="标题" v-bind="formItemLayout">
            <a-input placeholder="请输入标题" :maxLength="100" v-decorator="['applyTitle', { rules: [{ required: true, whitespace: true, message: '标题不能为空' }] }]" :disabled="status=='99'||status=='88'"/>
          </a-form-item>
        </a-col>
        <a-col :span="11" >
          <a-form-item label="申请单编码" v-bind="formItemLayout">
            <a-input placeholder="请输入申请单编码" :maxLength="100" v-decorator="['applyCode']" disabled />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" v-if="showApp">
        <a-col :span="9" :offset="2">
          <a-form-item label="所属系统" v-bind="formItemLayout">
            <iop-data-dict-select v-if="status=='99'||status=='88'" type="appSelect" ref="serviceAppSelect" v-decorator="['appId']" disabled />
            <iop-service-app-select v-else v-decorator="['appId', { rules: [{ required: showApp, message: '所属系统不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="22" :offset="1">
          <a-form-item label="内容" v-bind="textAreaformItemLayout">
            <a-textarea placeholder="请输入申请单内容" :maxLength="500" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['applyContent']" :disabled="status=='99'||status=='88'"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="申请时间" v-bind="formItemLayout">
            <a-input :maxLength="100" v-decorator="['applyDate']" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="11" v-show="mode !== 'create'">
          <a-form-item label="申请类型" v-bind="formItemLayout">
            <iop-data-dict-select ref="applyType" type="applyType" v-decorator="['applyType']" disabled />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="申请人" v-bind="formItemLayout">
            <a-input placeholder="请输入申请人姓名" :maxLength="100" v-decorator="['applyUser']" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item label="单位名称" v-bind="formItemLayout">
            <a-input placeholder="请输入单位名称" :maxLength="100" v-decorator="['deptName']" disabled/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="9" :offset="2">
          <a-form-item label="联系电话" v-bind="formItemLayout">
            <a-input placeholder="请输入联系电话" :maxLength="13" v-decorator="['teleNum']" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="11">
          <a-form-item label="电子邮件" v-bind="formItemLayout">
            <a-input placeholder="请输入电子邮件" type="email" :maxLength="100" v-decorator="['mailAddr']" disabled/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="22" :offset="1">
          <a-form-item label="联系地址" v-bind="textAreaformItemLayout">
            <a-input placeholder="请输入联系地址" :maxLength="200" v-decorator="['addr']" disabled/>
          </a-form-item>
        </a-col>
      </a-row>
    </template>
    <template #submitButton>
      <a-button type="primary" @click="save" :disabled="loading">保存草稿</a-button>
    </template>
  </iop-data-form>

</template>
<script>
import { IopDataForm, IopDataDictSelect, IopServiceAppSelect } from '@/iop/components'
import { iopServApplyService, iopAuthService } from '@/iop/service'
import applyFormVO from './vo/apply-form-vo'
import moment from 'moment'
import path from '@/iop/api/index'
import MessageUtils from '@/utils/message'

export default {
  name: 'ApplyForm',
  components: { IopDataForm, IopDataDictSelect, IopServiceAppSelect },
  data () {
    return {
      url: path.serv.apply.index,
      vo: applyFormVO,
      appName: '',
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      textAreaformItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      },
      showApp: true,
      /** 判断是否审核的 */
      status: '',
      loading: false,
      committing: false
    }
  },
  props: {
    mode: {
      type: String,
      required: true
    },
    applyId: {
      type: String,
      required: false,
      default: ''
    },
    applyType: {
      type: String,
      required: true
    },
    initValue: {
      type: Object,
      required: false,
      default: () => {}
    },
    showPageHeader: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  created () {
    switch (this.applyType) {
      case '0':
        this.title = '申请基本信息'
        break
      case '1':
        this.title = '调用申请基本信息'
        break
      case '2':
        this.title = '注册申请基本信息'
        break
      case '3':
        this.title = '注册资源申请基本信息'
        break
    }
    this.status = this.$route.query.status
    this.showApp = (this.applyType !== '0')
  },
  mounted () {
    this.load()
  },
  methods: {
    async loadConvertor (values) {
      values.applyType = this.applyType
      this.$refs.serviceAppSelect && this.$refs.serviceAppSelect.setSelected(values.appId)
      this.$nextTick(() => {
        this.$refs.applyType && this.$refs.applyType.setSelected(values.applyType)
      })
      if (this.mode === 'create') {
        if (!values.applyUser) {
          const res = await iopServApplyService.access()
          if (!res.accessName) {
            MessageUtils.warn('请先保存接入者信息')
            this.$emit('noInformation')
          } else {
            values.applyUser = await iopAuthService.getNickname()
            values.deptName = res.accessName
            values.addr = res.address
            values.mailAddr = res.email
            values.teleNum = res.telePhone
          }
        }
        values.applyDate = moment().format('YYYY-MM-DD HH:mm:ss')
        values.applyCode = await iopServApplyService.generateApplyId('1')
      }
      return values
    },

    submitConvertor (values) {
      Object.assign(values, this.initValue)
      return values
    },

    async submitSuccess (value) {
      if (this.committing) {
        this.committing = false
        try {
          await iopServApplyService.commit(value.applyId)
          this.$emit('onSubmitSuccess')
        } catch (err) {
          MessageUtils.error(err)
        }
      } else {
        this.$emit('onSubmitSuccess')
      }
    },

    async load () {
      this.$refs.applyForm.load()
    },

    resetFormValues () {
      this.$refs.applyForm.resetFormValues()
    },

    submitForm () {
      this.$refs.applyForm.submitForm()
    },

    save () {
      this.$refs.applyForm.submitForm()
    },

    async commit (record = {}) {
      this.committing = true
      this.save()
    }
  }
}
</script>
