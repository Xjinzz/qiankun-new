<template>
  <iop-data-form
    ref="pubPolicyWayForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="wayId"
    :loadConvertor="loadConvertor"
    @onSubmitSuccess="submitSuccess">
    <template #form>
      <a-form-item label="认证名称" v-bind="formItemLayout">
        <a-input placeholder="请输入认证名称" v-decorator="['policyWayName', { rules: [{ required: true, whitespace: true, message: '名称不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="认证编码" v-bind="formItemLayout">
        <a-input placeholder="请输入认证编码" v-decorator="['policyWayCode', { rules: [{ required: true, whitespace: true, message: '编码不能为空' }, { max: 100, message: '编码长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="凭证类型" v-bind="formItemLayout">
        <iop-data-dict-select type="voucherType" ref="policyWayType" v-decorator="['policyWayType', { rules: [{ required: true, whitespace: true, message: '请选择凭证类型' }] }]" />
      </a-form-item>
      <a-form-item label="实现类" v-bind="formItemLayout">
        <a-input placeholder="请输入实现类" v-decorator="['policyWayClass', { rules: [{ required: true, whitespace: true, message: '实现类不能为空' }, { max: 100, message: '实现类长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect } from '@/iop/components'
import pubPolicyWayFormVO from './vo/pub-policy-form-vo'
import path from '@/iop/api'

export default {
  name: 'PubPolicyWayForm',
  components: { IopDataForm, IopDataDictSelect },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    wayId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      url: path.system.pubPolicyWay.table,
      vo: pubPolicyWayFormVO,
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
      this.$refs.pubPolicyWayForm.showModal()
    },

    loadConvertor (value) {
      if (this.mode === 'create') {
        this.$nextTick(() => {
          this.$refs.policyWayType.cleanSelected()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.policyWayType.setSelected(value.policyWayType)
        })
      }
      return value
    }
  }
}
</script>
