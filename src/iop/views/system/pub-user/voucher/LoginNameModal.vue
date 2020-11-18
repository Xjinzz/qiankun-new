<template>
  <iop-data-form
    ref="loginNameForm"
    :showReset="false"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="voucherUserId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor">
    <template #form>
      <a-form-item v-bind="formItemLayout" label="登录名">
        <a-input placeholder="请输入登录名" v-decorator="['loginName', { rules: [{ required: true, whitespace: true, message: '登录名不能为空' }] }]" />
      </a-form-item>
      <a-form-item v-if="isPerson" v-bind="formItemLayout" label="旧密码">
        <a-input v-if="resetFlag" placeholder="请输入旧密码" v-decorator="['oldPassWord', { rules: [{ required: true, whitespace: true, message: '密码不能为空' }] }]" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="新密码">
        <a-input-password
          v-if="resetFlag"
          placeholder="请输入新密码"
          v-decorator="['passWord', { rules: [{ required: true, whitespace: true, message: '密码不能为空' }, { validator: validateToNextPassword }] }]" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认新密码">
        <a-input-password
          placeholder="请再次输入新密码"
          v-if="resetFlag"
          v-decorator="['confirmPassWord', { rules: [{ required: true, whitespace: true, message: '确认密码不能为空' }, { validator: compareToFirstPassword }] }]"
          @blur="handleConfirmBlur" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm } from '@/iop/components'
import { iopAuthService } from '@/iop/service/index'
import path from '@/iop/api/index'

export default {
  name: 'PubUserLoginNameModal',
  components: { IopDataForm },
  data () {
    return {
      url: path.system.pubUser.voucher.loginName,
      vo: [
        {
          title: '登录名',
          dataIndex: 'loginName'
        },
        {
          title: '旧密码',
          dataIndex: 'oldPassWord'
        },
        {
          title: '密码',
          dataIndex: 'passWord'
        },
        {
          title: '确认密码',
          dataIndex: 'confirmPassWord'
        }
      ],
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        }
      },
      passWord: '',
      confirmPassWord: '',
      resetFlag: false
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
    isPerson: {
      type: Boolean,
      required: false,
      default: false
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
      this.resetFlag = false
      this.$nextTick(() => {
        this.resetFlag = true
      })
      this.$refs.loginNameForm.showModal()
    },

    compareToFirstPassword (rule, value, callback) {
      this.confirmPassWord = value
      if (value && value !== this.passWord) {
        const message = '两次输入的密码不一致'
        callback(message)
      } else {
        callback()
      }
    },

    validateToNextPassword (rule, value, callback) {
      this.passWord = value
      callback()
    },

    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },

    loadConvertor (values) {
      values.confirmPassWord = values.passWord
      return values
    },

    submitConvertor (values) {
      const { voucherId, userId } = this
      Object.assign(values, { voucherId, userId })
      values.passWord = iopAuthService.encodePassword(values.passWord)
      if (this.isPerson) {
        values.oldPassWord = iopAuthService.encodePassword(values.oldPassWord)
      }
      values.confirmPassWord = null
      return values
    }
  }
}
</script>
