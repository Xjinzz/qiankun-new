<template>
  <iop-data-form
    ref="rulesForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="rolrId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    :reset="reset"
  >
    <template #form>
      <a-form-item label="规则名称" v-bind="formItemLayout">
        <a-input v-decorator="['rolrName', { rules: [{ required: true, whitespace: true, message: '规则名称不能为空' }, { max: 100, message: '规则名称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="规则处理程序" v-bind="formItemLayout">
        <a-input v-decorator="['rolrGramener', { rules: [{ required: true, whitespace: true, message: '规则处理程序不能为空' }, { max: 100, message: '规则处理程序长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="配置参数" v-bind="formItemLayout">
        <a-input v-decorator="['rolrConf', { rules: [{ required: true, whitespace: true, message: '配置参数不能为空' }, { max: 100, message: '配置参数长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="规则说明" v-bind="formItemLayout">
        <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['rolrDesc', { rules: [{ max: 500, message: '说明长度不能超过500'}] }]" />
      </a-form-item>
      <a-form-item label="适用对象" v-bind="formItemLayout">
        <iop-data-dict-select ref="rolrObject" type="rolrObject" v-decorator="['rolrObject', { rules: [{ required: true, whitespace: true, message: '适用对象不能为空' }] }]"/>
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect } from '@/iop/components'
import rulesFormVO from './vo/rules-form-vo'
import path from '@/iop-drms/api'

export default {
  name: 'RulesForm',
  components: { IopDataForm, IopDataDictSelect },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.manage.rules.form,
      /** 表单定义 */
      vo: rulesFormVO,
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
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    /** 数据主键 */
    rolrId: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    loadConvertor (values) {
      if (this.mode === 'create') {
        this.$nextTick(() => {
          this.$refs.rolrObject && this.$refs.rolrObject.cleanSelected()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.rolrObject && this.$refs.rolrObject.setSelected(values.rolrObject)
        })
      }
      return values
    },
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.rulesForm.showModal()
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，要求更新时body必须有id
      if (this.mode === 'edit') {
        const { rolrId } = this
        Object.assign(value, { rolrId })
      }
      return value
    },
    // 重置
    reset (cb) {
      cb()
      const values = this.$refs.rulesForm.record
      if (this.mode === 'created') {
        this.$refs.rolrObject && this.$refs.rolrObject.cleanSelected()
      } else {
        this.$refs.rolrObject && this.$refs.rolrObject.setSelected(values.rolrObject)
      }
    }
  }
}
</script>
