<template>
  <iop-data-form
    ref="paramForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="paraId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form="{ record }">
      <a-form-item label="参数名称" v-bind="formItemLayout">
        <a-input placeholder="请输入参数名称" v-decorator="['paraName']" maxLength="100"/>
      </a-form-item>
      <a-form-item label="参数序号" v-bind="formItemLayout">
        <a-input v-decorator="['paraNum', { rules: [{ pattern: new RegExp(/^[1-9]\d{0,7}$/), message: '序号只能输入1-8位正整数' },{required: true, message: '请输入序号'}] }]" />
      </a-form-item>
      <a-form-item label="编码值" v-bind="formItemLayout">
        <iop-data-tree-select
          :url="claTreeUrl"
          query="parentId"
          ref="paraPageList"
          v-decorator="['paraPage']"/>
      </a-form-item>
      <a-form-item label="参数类型" v-bind="formItemLayout">
        <a-input placeholder="请输入参数类型" v-decorator="['paraType']" maxLength="100"/>
      </a-form-item>
      <a-form-item label="可选值清单" v-bind="formItemLayout">
        <a-input placeholder="请输入可选值清单" v-decorator="['valDef']" maxLength="100"/>
      </a-form-item>
      <a-form-item label="参数说明" v-bind="formItemLayout">
        <a-input placeholder="请输入参数说明" v-decorator="['remark']" maxLength="100"/>
      </a-form-item>
      <input id="methodId" type="hidden" :value="record.methodId" />
      <input id="paraId" type="hidden" :value="record.paraId" />
    </template>

  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio } from '@/iop/components'
import paramFormVo from './vo/param-form-vo'
import path from '@/iop/api/index'

export default {
  name: 'ServiceForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, IopDataDictRadio },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.system.serv.paramsIndex,
      claTreeUrl: path.system.userAttr.clatree,
      /** 表单定义 */
      vo: paramFormVo,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      code: ''
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
    paraId: {
      type: String,
      required: false,
      default: ''
    },
    methodId: {
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
      this.$refs.paramForm.showModal()
      if (this.mode === 'create') {
        this.$nextTick(() => {
          this.$refs.paraPageList && this.$refs.paraPageList.cleanSelected()
        })
      }
    },
    selectCode (res) {
      // 解决控制台code报undefined警告
      if (res.key === '' || res.data === undefined) {
        return false
      }
      this.code = res.data.code
    },
    loadConvertor (val) {
      this.$nextTick(() => {
        val.paraPage && this.$refs.paraPageList.setSelected({ title: val.paraPageName, value: val.paraPage })
      })
      return val
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      // value.paraNum
      if (this.mode === 'edit') {
        const { paraId } = this
        Object.assign(value, { paraId })
      }
      value.paraPage = this.code
      Object.assign(value, { methodId: this.methodId })
      return value
    }
  }
}
</script>
