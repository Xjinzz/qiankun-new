<template>
  <iop-data-form
    ref="lifecycleForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="id"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form>
      <a-form-item label="文档类型名称" v-bind="formItemLayout">
        <a-input placeholder="请输入文档类型名称" disabled v-decorator="['typeName', { rules: [{ required: true, whitespace: true, message: '文档类型名称不能为空' }, { max: 100, message: '类型名称不能超过100'}] }]"/>
      </a-form-item>
      <a-form-item label="生命周期名称" v-bind="formItemLayout">
        <a-input placeholder="请输入生命周期名称" v-decorator="['name', { rules: [{ required: true, whitespace: true, message: '生命周期名称不能为空' }, { max: 100, message: '周期名称不能超过100'}] }]"/>
      </a-form-item>
      <a-form-item label="生命周期编码" v-bind="formItemLayout">
        <a-input placeholder="请输入生命周期编码" v-decorator="['code', { rules: [{ required: true, whitespace: true, message: '生命周期编码不能为空' }, { max: 100, message: '编码不能超过100'}] }]"/>
      </a-form-item>
      <a-form-item label="是否版本管理" v-bind="formItemLayout">
        <a-switch :checked="isVersion" @change="onIsVersion"/>
      </a-form-item>
      <a-form-item label="排序号码" v-bind="formItemLayout">
        <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" style="width: 100%;"/>
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import lifecycleFormVO from './vo/lifecycle-form-vo'
import path from '@/iop/api'

// TODO 下拉树组件
export default {
  name: 'LifecycleForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.file.types.lifecycle,
      /** 表单定义 */
      vo: lifecycleFormVO,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      isVersion: true
    }
  },
  props: {
    /** 表单显示模式，查看(view)、编辑(edit)、新建(create) */
    mode: {
      type: String,
      required: true,
      default: 'view'
    },
    /** 表单提交成功之后的回调 */
    submitSuccess: {
      type: Function,
      required: false,
      default: () => { }
    },
    typeId: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default: ''
    },
    typeName: {
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
      this.$refs.lifecycleForm.showModal()
    },
    /**
     * 加载前
     */
    loadConvertor (values) {
      if (this.mode === 'create') {
        this.isVersion = true
        values.typeName = this.typeName
      } else {
        values.isVersion === '1' ? this.isVersion = true : this.isVersion = false
        this.$nextTick(() => {
        })
      }
      return values
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      value.typeId = this.typeId
      this.isVersion ? value.isVersion = '1' : value.isVersion = '0'
      // 后台接口bug，要求更新时body必须有id
      if (this.mode === 'edit') {
        const { skinId } = this
        Object.assign(value, { skinId })
      }
      return value
    },
    onIsVersion (checked) {
      this.isVersion = checked
    }
  }
}
</script>
