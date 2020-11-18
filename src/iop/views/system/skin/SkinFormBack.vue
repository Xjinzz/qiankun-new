<template>
  <iop-data-form
    ref="skinForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="skinId"
    @onSubmitSuccess="submitSuccess"
  >
    <template #form>
      <a-form-item label="皮肤编码" v-bind="formItemLayout">
        <a-input placeholder="请输入皮肤编码" v-decorator="['skinCode', { rules: [{ required: true, whitespace: true, message: '皮肤编码不能为空' }, { max: 100, message: '编码长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="皮肤名称" v-bind="formItemLayout">
        <a-input placeholder="请输入皮肤名称" v-decorator="['skinName', { rules: [{ required: true, whitespace: true, message: '皮肤编码不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="皮肤效果图" v-bind="formItemLayout">
        <a-input v-decorator="['skinExample', { rules: [{ max: 100, message: '长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="CSS样式" v-bind="formItemLayout">
        <a-input placeholder="请输入CSS样式" v-decorator="['css', {rules: [{ max: 100, message: '长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm } from '@/iop/components'
import skinFormVO from './vo/skin-form-vo'
import path from '@/iop/api'

export default {
  name: 'SkinForm',
  components: { IopDataForm },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.system.skin.index,
      /** 表单定义 */
      vo: skinFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      }
    }
  },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    mode: {
      type: String,
      required: true,
      default: 'create'
    },
    /** 数据主键 */
    skinId: {
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
      this.$refs.skinForm.showModal()
    },

    submitSuccess () {
      this.$emit('onSubmitSuccess')
    }
  }
}
</script>
