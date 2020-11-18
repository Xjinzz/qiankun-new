<template>
  <iop-data-form
    ref="applicationForm"
    :width="900"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="id"
    :submitConvertor="submitConvertor"
    @onSubmitSuccess="submitSuccess"
  >
    <template #form>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="10" :offset="2">
          <a-form-item label="系统编码" v-bind="formItemLayout">
            <a-input placeholder="请输入系统编码" :maxLength="100" v-decorator="['appCode', { rules: [{ required: true, whitespace: true, message: '系统编码不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="系统名称" v-bind="formItemLayout">
            <a-input placeholder="请输入系统名称" :maxLength="100" v-decorator="['appName', { rules: [{ required: true, whitespace: true, message: '系统名称不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="10" :offset="2">
          <a-form-item label="上下文根" v-bind="formItemLayout">
            <a-input placeholder="请输入上下文根" :maxLength="100" v-decorator="['appContext', { rules: [{ required: true, whitespace: true, message: '上下文根不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="IP地址" v-bind="formItemLayout">
            <a-input placeholder="请输入IP地址" :maxLength="200" v-decorator="['appIp', { rules: [{ required: true, whitespace: true, message: 'IP地址不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="10" :offset="2">
          <a-form-item label="登录地址" v-bind="formItemLayout">
            <a-input placeholder="请输入登录地址" :maxLength="200" v-decorator="['loginUrl']" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="登出地址" v-bind="formItemLayout">
            <a-input placeholder="请输入登出地址" :maxLength="200" v-decorator="['logoutUrl']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="10" :offset="2">
          <a-form-item label="检索地址" v-bind="formItemLayout">
            <a-input placeholder="请输入检索地址" :maxLength="200" v-decorator="['indexUrl']" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="系统类型" v-bind="formItemLayout">
            <a-input placeholder="请输入系统类型" :maxLength="100" v-decorator="['appType']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :span="22" :offset="1">
          <a-form-item label="备注" v-bind="textAreaformItemLayout">
            <a-textarea placeholder="请输入备注" v-decorator="['remark']" :autosize="{ minRows: 4, maxRows: 6 }" />
          </a-form-item>
        </a-col>
      </a-row>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm } from '@/iop/components'
import applicationFormVO from '../vo/application-form-vo'
import path from '@/iop/api/index'

export default {
  name: 'ApplicationForm',
  components: { IopDataForm },
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      textAreaformItemLayout: {
        labelCol: {
          xs: { span: 20 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 20 },
          sm: { span: 18 }
        }
      },
      vo: applicationFormVO,
      url: path.serv.app.application
    }
  },
  props: {
    mode: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    appId: {
      type: String,
      required: true
    }
  },
  methods: {
    show () {
      this.$refs.applicationForm.showModal()
    },

    submitSuccess (values) {
      this.$emit('submitSuccess', values)
    },

    submitConvertor (values) {
      values.appId = this.appId
      return values
    }
  }
}
</script>
