<template>
  <iop-data-form
    ref="voucherForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="voucherId"
    @onSubmitSuccess="submitSuccess">
    <template #form>
      <a-form-item label="凭证名称" v-bind="formItemLayout">
        <a-input placeholder="请输入凭证名称" v-decorator="['voucherName', { rules: [{ required: true, whitespace: true, message: '凭证名称不能为空' }, { max: 100, message: '凭证名称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="凭证编码" v-bind="formItemLayout">
        <a-input placeholder="请输入凭证编码" v-decorator="['voucherCode', { rules: [{ required: true, whitespace: true, message: '凭证编码不能为空' }, { max: 100, message: '凭证编码长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="维护页面" v-bind="formItemLayout">
        <a-textarea placeholder="请输入维护页面" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['voucherPage', { rules: [{ required: true, whitespace: true, message: '维护页面不能为空' }, { max: 500, message: '维护页面长度不能超过500'}] }]" />
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm } from '@/iop/components'
import voucherFormVO from './vo/voucher-form-vo'
import path from '@/iop/api'

export default {
  name: 'VouchrForm',
  components: { IopDataForm },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    voucherId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      url: path.system.pubVoucher.index,
      vo: voucherFormVO,
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
      this.$refs.voucherForm.showModal()
    }
  }
}
</script>
