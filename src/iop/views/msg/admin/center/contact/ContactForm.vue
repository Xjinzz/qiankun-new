<template>
  <iop-data-form
    ref="contactForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="contactId"
    :reset="reset"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form="{ record }">
      <a-form-item label="分组名称" v-bind="formItemLayout">
        <a-input placeholder="请输入分组名称" v-decorator="['contactName', { rules: [{ required: true, whitespace: true, message: '分组名称不能为空' }] }]" maxLength="100"/>
      </a-form-item>
      <a-form-item label="分组编码" v-bind="formItemLayout">
        <a-input placeholder="请输入分组编码" v-decorator="['contactCode', { rules: [{ max: 50, message: '长度不能超过50位' }] }]" />
      </a-form-item>
      <a-form-item label="上级标识" v-bind="formItemLayout">
        <iop-data-tree-select
          v-if="showParent"
          ref="parentId"
          :url="treeUrl"
          v-decorator="['parentId']"/>
      </a-form-item>
      <a-form-item label="排序号" v-bind="formItemLayout">
        <a-input v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'},{required: true, message: '请输入排序号'}] }]" />
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 6 }" v-decorator="['remark']" maxLength="500"/>
      </a-form-item>
      <input id="contactId" type="hidden" :value="record.contactId" />
      <input id="kind" type="hidden" :value="record.kind" />
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataTreeSelect } from '@/iop/components'
import contactFormVO from './vo/contact-form-vo.js'
import path from '@/iop/api/index'

// TODO 下拉树组件
export default {
  name: 'ContactForm',
  components: { IopDataForm, IopDataTreeSelect },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.msg.contact.index,
      treeUrl: path.msg.contact.tree,
      /** 表单定义 */
      vo: contactFormVO,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      showParent: true
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
    contactId: {
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
      this.$nextTick(() => {
        this.$refs.contactForm.setInitValue({ parentId: value })
      })
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.contactForm.showModal()
    },
    reset (call) {
      this.$refs.parentId && this.$refs.parentId.cleanSelected()
      call()
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { contactId } = this
        if (contactId === value.parentId) {
          this.$message.error('不能加到当前的分组下')
          return false
        }
        Object.assign(value, { contactId })
      }
      return value
    },
    loadConvertor (value) {
      this.showParent = false
      this.$nextTick(() => {
        this.showParent = true
      })
      if (this.mode !== 'create') {
        this.$nextTick(() => {
          this.$nextTick(() => {
            value.parentId && this.$refs.parentId.setSelected({ title: value.parentName, value: value.parentId })
          })
        })
      } else {
        let { parentId } = this
        if (!parentId) {
          parentId = '0'
        }
        value.parentId = parentId
      }
      return value
    }
  }
}
</script>
