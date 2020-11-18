<template>
  <iop-data-form
    ref="templateForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="id"
    :submitSuccess="submitSuccess"
    :loadConvertor="loadConvertor"
    :submitConvertor="submitConvertor"
  >
    <template #form>
      <a-form-item label="模板名称" v-bind="formItemLayout">
        <a-input placeholder="请输入模板名称" v-decorator="['msgName', { rules: [{ required: true, whitespace: true, message: '模板名称不能为空' }, { max: 100, message: '模版名称最多100位' }] }]"/>
      </a-form-item>
      <a-form-item label="模板编码" v-bind="formItemLayout">
        <a-input placeholder="请输入模板编码" v-decorator="['msgCode', { rules: [{ required: true, whitespace: true, message: '模板编码不能为空' }, { max: 100, message: '模版编码最多100位' }] }]"/>
      </a-form-item>
      <a-form-item label="排序号" v-bind="formItemLayout">
        <a-input v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号只能输入正整数且最多七位'},{required: true, message: '请输入排序号'}] }]" />
      </a-form-item>
      <a-form-item label="变量个数" v-bind="formItemLayout">
        <a-input v-decorator="['variableNum',{ rules: [{ pattern: new RegExp(/^[1-9]\d{0,8}$/), message: '只能输入1-9位正整数' }] }]" />
      </a-form-item>
      <a-form-item label="模板内容" v-bind="formItemLayout">
        <a-textarea placeholder="请输入模板内容" :autosize="{ minRows: 3, maxRows: 6 }" v-decorator="['msgContent', {rules: [{ max: 500, message: '模版内容最多500位' }]}]"/>
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 6 }" v-decorator="['remark', {rules: [{ max: 500, message: '备注最多500位' }]}]"/>
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio } from '@/iop/components'
import templateFormVo from './vo/app-template-form-vo.js'
import path from '@/iop/api/index'

// TODO 下拉树组件
export default {
  name: 'AppTemplateForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.msg.appTemplate.form,
      /** 表单定义 */
      vo: templateFormVo,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      templType: '0'
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
    id: {
      type: String,
      required: false,
      default: null
    },
    /** 上级行政区域 */
    parentId: {
      type: String,
      required: false,
      default: null
    }
  },
  watch: {
    /**
     * 上级行政区域
     */
    parentId (value) {
      this.$refs.templateForm.setInitValue({ parentId: value })
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.templateForm.showModal()
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { id } = this
        Object.assign(value, { id })
      }
      Object.assign(value, {
        templType: this.templType
      })
      return value
    },
    loadConvertor (value) {
      return value
    }
  }
}
</script>
