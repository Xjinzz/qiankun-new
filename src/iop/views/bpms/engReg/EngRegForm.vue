<template>
  <iop-data-form
    ref="engRegForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="id"
    :width="800"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
  >
    <template #form="{ record }">
      <a-row >
        <a-col :span="12">
          <a-form-item label="引擎名称" v-bind="formItemLayout">
            <a-input placeholder="请输入引擎名称" :maxLength="100" v-decorator="['engName', { rules: [{ required: true, whitespace: true, message: '引擎名称不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="厂家名称" v-bind="formItemLayout">
            <a-input placeholder="请输入厂家名称" :maxLength="100" v-decorator="['corp', { rules: [{ required: true, whitespace: true, message: '厂商名称不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="版本号" v-bind="formItemLayout">
            <a-input placeholder="请输入版本号" :maxLength="100" v-decorator="['version', { rules: [{ required: true, whitespace: true, message: '版本号不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="调用地址" v-bind="formItemLayout">
            <a-input placeholder="请输入调用地址" :maxLength="200" v-decorator="['addr', { rules: [{ required: true, whitespace: true, message: '调用地址（IP＋端口＋上下文）不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="接口实现类" v-bind="formItemLayout">
            <a-input placeholder="请输入接口实现类" :maxLength="100" v-decorator="['implClass', { rules: [{ required: true, whitespace: true, message: '接口实现类不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="流程图地址" v-bind="formItemLayout">
            <a-input placeholder="请输入流程图地址" :maxLength="200" v-decorator="['processPicAddr', { rules: [{ required: true, whitespace: true, message: '流程图地址不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="跟踪图地址" v-bind="formItemLayout">
            <a-input placeholder="请输入跟踪图地址" :maxLength="200" v-decorator="['trackPicAddr', { rules: [{ required: true, whitespace: true, message: '跟踪图地址不能为空' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="管理入口地址" v-bind="formItemLayout">
            <a-input placeholder="请输入管理入口地址" :maxLength="200" v-decorator="['mngUrl', { rules: [{ required: true, whitespace: true, message: '管理入口地址不能为空' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="12">
          <a-form-item label="排序号" v-bind="formItemLayout" >
            <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" style="width:100%;"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="24">
          <a-form-item label="备注：" v-bind="formItemLayout24">
            <a-textarea placeholder="请输入备注" :maxLength="500" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <input id="id" type="hidden" :value="record.id" />
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm } from '@/iop/components'
import engRegFormVO from './vo/eng-reg-form-vo'
import path from '@/iop/api/index'
export default {
  name: 'EngRegForm',
  components: { IopDataForm },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.bpms.engreg.index,
      /** 表单定义 */
      vo: engRegFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      formItemLayout24: {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 }
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
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.engRegForm.showModal()
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
      return value
    }
  }
}
</script>
