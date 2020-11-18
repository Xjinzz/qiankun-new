<template>
  <iop-data-form
    ref="padForm"
    :mode="mode"
    :showReset="false"
    :url="url"
    :vo="vo"
    :id="voucherUserId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor">
    <template #form>
      <a-form-item v-bind="formItemLayout" label="登录账号">
        <a-input placeholder="请输入登录账号" v-decorator="['voucherCode', { rules: [{ required: true, whitespace: true, message: '登录账号不能为空' }] }]" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="设备号">
        <a-input placeholder="请输入设备号" v-decorator="['imei', { rules: [{ required: true, whitespace: true, message: '设备号不能为空' }] }]" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="通讯卡">
        <a-input placeholder="请输入通讯卡" v-decorator="['iccid', { rules: [{ required: true, whitespace: true, message: '通讯卡信息不能为空' }] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm } from '@/iop/components'
import path from '@/iop/api/index'

export default {
  name: 'PhoneModal',
  components: { IopDataForm },
  data () {
    return {
      url: path.system.pubUser.voucher.pad,
      vo: [
        {
          title: '登录账号',
          dataIndex: 'voucherCode'
        },
        {
          title: 'imei',
          dataIndex: 'imei'
        },
        {
          title: 'iccid',
          dataIndex: 'iccid'
        }
      ],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        }
      }
    }
  },
  props: {
    voucherId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    voucherUserId: {
      type: String,
      required: false,
      default: ''
    },
    mode: {
      type: String,
      required: true,
      default: 'cerate'
    },
    submitSuccess: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  methods: {
    show () {
      this.$refs.padForm.showModal()
    },

    submitConvertor (values) {
      const { voucherId, userId } = this
      Object.assign(values, { voucherId, userId })
      return values
    }
  }
}
</script>
