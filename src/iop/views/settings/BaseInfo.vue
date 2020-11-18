<template>
  <iop-data-form
    ref="baseInfoForm"
    title="基本信息"
    showType="page"
    mode="edit"
    :loadUrl="loadUrl"
    :url="updateUrl"
    :id="userId"
    :vo="vo"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor">
    <template #form>
      <a-form-item label="姓名" v-bind="formItemLayout">
        <a-input placeholder="请输入姓名" v-decorator="['userName', { rules: [{ required: true, whitespace: true, message: '姓名不能为空' }] }]" />
      </a-form-item>
      <a-form-item label="性别" v-bind="formItemLayout">
        <iop-data-dict-radio type="sex" v-decorator="['sex', { rules: [{ required: true, whitespace: true, message: '请选择性别' }] }]" />
      </a-form-item>
      <a-form-item label="证件类型" v-bind="formItemLayout">
        <iop-data-dict-radio type="paperType" v-decorator="['paperType']" />
      </a-form-item>
      <a-form-item label="证件号码" v-bind="formItemLayout">
        <a-input placeholder="请输入证件号码" v-decorator="['paperNum', { rules: [{validator: idCardCheck}]}]"/>
      </a-form-item>
      <a-form-item label="出生日期" v-bind="formItemLayout">
        <a-date-picker v-decorator="['birthday']" style="width: 100%"/>
      </a-form-item>
      <a-form-item label="国籍" v-bind="formItemLayout">
        <a-input placeholder="请输入国籍" v-decorator="['nationality']"/>
      </a-form-item>
      <!-- <a-form-item label="通讯地址" v-bind="formItemLayout">
        <a-input v-decorator="['address']"/>
      </a-form-item> -->
      <a-form-item label="个人描述" v-bind="formItemLayout">
        <a-textarea placeholder="请输入个人描述" v-decorator="['remark']" :autosize="{ minRows: 4, maxRows: 6 }" />
      </a-form-item>
      <a-divider />
      <a-row>
        <a-col :span="5" :offset="5" style="text-align:center">
          <a-button type="primary" @click="submitForm()">提交</a-button>
        </a-col>
      </a-row>
    </template>
    <template #submitButton>
      <p></p>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataDictRadio, IopDataForm } from '@/iop/components'
import baseInfoFormVO from './vo/base-info-vo'
import moment from 'moment'
import path from '@/iop/api/index'
export default {
  name: 'SettingBaseInfo',
  components: { IopDataDictRadio, IopDataForm },
  data () {
    return {
      loadUrl: path.settings.info,
      updateUrl: path.settings.savePubUserData,
      userId: '',
      formItemLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 10 }
      },
      vo: baseInfoFormVO
    }
  },
  mounted () {
    this.$refs.baseInfoForm.load()
  },
  methods: {
    idCardCheck (rule, value, callback) {
      if (value !== '' && value !== undefined) {
        const type = this.$refs.baseInfoForm.getFieldValue('paperType')
        if (type === '' || type === undefined) {
          callback(new Error('请选择证件类型'))
        }
        if (type === '1' && !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
          callback(new Error('身份证号格式不正确'))
        }
      }
      callback()
    },
    loadConvertor (values) {
      this.userId = values.userId
      const birthday = values.birthday
      if (birthday) {
        values.birthday = moment(birthday)
      }
      return values
    },

    submitConvertor (values) {
      const birthday = values.birthday
      if (birthday) {
        values.birthday = birthday.toDate().getTime()
      }
      return values
    },

    submitForm () {
      this.$refs.baseInfoForm.submitForm()
    }
  }
}
</script>
