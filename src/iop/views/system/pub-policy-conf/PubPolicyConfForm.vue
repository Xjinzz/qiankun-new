<template>
  <iop-data-form
    ref="pubPolicyConfForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="policyConfId"
    @onSubmitSuccess="submitSuccess">
    <template #form>
      <a-form-item label="策略编号" v-bind="formItemLayout">
        <a-input placeholder="请输入策略编号" v-decorator="['policyCode', { rules: [{ required: true, whitespace: true, message: '策略编号不能为空' }, { max: 100, message: '策略编号长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="策略名称" v-bind="formItemLayout">
        <a-input placeholder="策略名称" v-decorator="['policyName', { rules: [{ required: true, whitespace: true, message: '策略名称不能为空' }, { max: 100, message: '策略名称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="实现类" v-bind="formItemLayout">
        <a-input placeholder="请输入实现类" v-decorator="['policyClass', { rules: [{ required: true, whitespace: true, message: '实现类不能为空' }, { max: 100, message: '实现类长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="配置策略页面" v-bind="formItemLayout">
        <a-input placeholder="请输入配置策略页面" v-decorator="['policyPage', { rules: [{ required: true, whitespace: true, message: '页面不能为空' }, { max: 100, message: '页面长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="参数配置" v-bind="formItemLayout">
        <a-textarea placeholder="请输入参数配置" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['policyParam', { rules: [{ required: true, whitespace: true, message: '参数不能为空' }, { max: 500, message: '参数长度不能超过500'}] }]" />
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm } from '@/iop/components'
import pubPolicyConfFormVO from './vo/pub-policy-conf-form-vo'
import path from '@/iop/api'

export default {
  name: 'PubPolicyConfForm',
  components: { IopDataForm },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    policyConfId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      vo: pubPolicyConfFormVO,
      url: path.system.pubPolicyConf.table,
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      }
    }
  },
  methods: {
    submitSuccess () {
      this.$emit('onSubmitSuccess')
    },

    show () {
      this.$refs.pubPolicyConfForm.showModal()
    }
  }
}
</script>
