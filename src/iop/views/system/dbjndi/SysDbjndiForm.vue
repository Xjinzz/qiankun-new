<template>
  <data-form
    ref="sysDbjndiForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="jndiId"
    :loadConvertor="loadConvertor"
    @onSubmitSuccess="submitSuccess"
  >
    <template #form>
      <a-form-item label="数据源名称" v-bind="formItemLayout">
        <a-input placeholder="请输入数据源名称" v-decorator="['jndiName', { rules: [{ required: true, whitespace: true, message: '数据源名称不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="数据库类型" v-bind="formItemLayout">
        <data-dict-select ref="dbType" type="dbType" v-decorator="['dbType', { rules: [{ required: true, whitespace: true, message: '请选择数据库类型' }] }]" />
      </a-form-item>
      <a-form-item label="数据库地址" v-bind="formItemLayout">
        <a-textarea placeholder="如：jdbc:oracle:thin:@127.0.0.1:1521:orcl" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['connUrl', { rules: [{ required: true, whitespace: true, message: '数据库地址不能为空' }, { max: 500, message: '数据库地址长度不能超过500'}] }]" />
      </a-form-item>
      <a-form-item label="数据库用户" v-bind="formItemLayout">
        <a-input placeholder="请输入数据库用户" v-decorator="['loginName', { rules: [{ required: true, whitespace: true, message: '用户名不能为空' }, { max: 100, message: '用户名长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="数据库密码" v-bind="formItemLayout">
        <a-input-password v-if="resetFlag" placeholder="请输入数据库密码" v-decorator="['passWord', { rules: [{ required: true, whitespace: true, message: '密码不能为空' }, { max: 100, message: '密码长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="备注说明" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注说明" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', {rules: [{ max: 500, message: '备注长度不能超过500'}]}]" />
      </a-form-item>
    </template>
  </data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect } from '@/iop/components'
import sysDbjndiFormVO from './vo/sys-dbjndi-form-vo'
import path from '@/iop/api/index'

export default {
  name: 'SysDbjndiForm',
  components: { DataForm: IopDataForm, DataDictSelect: IopDataDictSelect },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.system.dbjndi.add,
      /** 表单定义 */
      vo: sysDbjndiFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 }
      },
      viewShow: false,
      resetFlag: false
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
    jndiId: {
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
      this.resetFlag = false
      this.$nextTick(() => {
        this.resetFlag = true
      })
      this.$refs.sysDbjndiForm.showModal()
    },

    loadConvertor (value) {
      if (this.mode === 'create') {
        this.$nextTick(() => {
          this.$refs.dbType.cleanSelected()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.dbType.setSelected(value.dbType)
        })
      }
      return value
    },

    submitSuccess () {
      this.$emit('onSubmitSuccess')
    }
  }
}
</script>
