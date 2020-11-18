<template>
  <iop-data-form
    ref="phoneForm"
    :mode="mode"
    :url="url"
    :showReset="false"
    :vo="vo"
    :id="voucherUserId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor">
    <template #form>
      <a-form-item v-bind="formItemLayout" label="手机号">
        <a-input placeholder="请输入手机号" v-decorator="['phone', { rules: [{ required: true, whitespace: true, message: '手机号不能为空' }] }]" />
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
      url: path.system.pubUser.voucher.phone,
      vo: [
        {
          title: '手机号',
          dataIndex: 'phone'
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
      this.$refs.phoneForm.showModal()
    },

    submitConvertor (values) {
      const { voucherId, userId } = this
      Object.assign(values, { voucherId, userId })
      return values
    }
  }
}
</script>
