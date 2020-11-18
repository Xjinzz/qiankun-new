<template>
  <iop-data-form
    ref="descForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="descId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
  >
    <template #form>
      <a-form-item label="采用标准" v-bind="formItemLayout">
        <a-input v-decorator="['descStandard', { rules: [{ required: true, whitespace: true, message: '采用标准不能为空' }, { max: 100, message: '标准不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="适用范围" v-bind="formItemLayout">
        <a-input v-decorator="['descRanger', { rules: [{ required: true, whitespace: true, message: '适用范围不能为空' }, { max: 100, message: '范围不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="规则说明" v-bind="formItemLayout">
        <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['descRorls', { rules: [{ max: 500, message: '备注不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm } from '@/iop/components'
import descFormVO from './vo/desc-form-vo'
import path from '@/iop-drms/api'

export default {
  name: 'DescForm',
  components: { IopDataForm },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.manage.desc.form,
      /** 表单定义 */
      vo: descFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      objectId: ''
    }
  },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    /** 数据主键 */
    descId: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.descForm.showModal()
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      value.objectId = this.objectId
      // 后台接口bug，要求更新时body必须有id
      if (this.mode === 'edit') {
        const { descId } = this
        Object.assign(value, { descId })
      }
      return value
    }
  }
}
</script>
