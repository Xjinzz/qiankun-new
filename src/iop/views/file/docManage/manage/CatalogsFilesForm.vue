<template>
  <iop-data-form
    ref="catalogFilesForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="fileId"
    @onSubmitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form>
      <a-form-item label="目录名称" v-bind="formItemLayout">
        <a-input placeholder="请输入目录名称" v-decorator="['ctlgName', { rules: [{ required: true, whitespace: true, message: '目录名称不能为空' }] }]" maxLength="100"/>
      </a-form-item>
      <a-form-item label="目录编码" v-bind="formItemLayout">
        <a-input placeholder="请输入目录编码" v-decorator="['ctlgCode', { rules: [{ required: true, whitespace: true, message: '目录编码不能为空' }] }]" maxLength="100"/>
      </a-form-item>
      <a-form-item label="父级目录" v-bind="formItemLayout">
        <iop-data-tree-select
          ref="parentId"
          :url="treeUrl"
          :placeHolderSelected="placeHolderSelected"
          v-decorator="['parentId']"/>
      </a-form-item>
      <a-form-item label="排序号码" v-bind="formItemLayout">
        <a-input v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'},{required: true, message: '请输入排序号'}] }]" />
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-input placeholder="请输入备注" v-decorator="['remark']" maxLength="100"/>
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import catalogFilesFromVo from './vo/catalogs-files-form-vo.js'
import path from '@/iop/api/index'

// TODO 下拉树组件
export default {
  name: 'CatalogFilesForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.file.manage.add,
      treeUrl: path.file.manage.moveTree,
      /** 表单定义 */
      vo: catalogFilesFromVo,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      placeHolderSelected: {
        title: '请选择',
        value: this.ctlgId,
        key: this.ctlgId
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
    fileId: {
      type: String,
      required: false,
      default: null
    },
    ctlgId: {
      type: String,
      required: false,
      default: null
    },
    parentId: {
      type: String,
      required: true,
      default: ''
    },
    parentName: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.catalogFilesForm.showModal()
      if (this.mode === 'create') {
        this.$nextTick(() => {
          this.$refs.parentId.cleanSelected()
        })
      }
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，更新时body必须有id
      if (this.mode === 'edit') {
        const { fileId } = this
        Object.assign(value, { fileId })
      }
      value.parentId = value.parentId ? value.parentId : this.ctlgId
      return value
    },
    loadConvertor (value) {
      if (this.mode === 'create') {
        value.parentId = this.parentId
        this.$nextTick(() => {
          if (this.parentName !== '') {
            this.$refs.parentId.setSelected({ title: this.parentName, value: this.parentId })
          }
        })
      } else {
        this.$nextTick(() => {
          value.parentId && this.$refs.parentId.setSelected({ title: value.parentName, value: value.parentId })
        })
      }
      return value
    }
  }
}
</script>
