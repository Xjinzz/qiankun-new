<template>
  <iop-data-form
    ref="catalogForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="catalogId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form>
      <a-form-item label="分类编号：" v-bind="formItemLayout">
        <a-input placeholder="请输入" v-decorator="['catalogCode', { rules: [{ required: true, whitespace: true, message: '分类编号不能为空' }, { max: 100, message: '编号长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="分类名称：" v-bind="formItemLayout">
        <a-input placeholder="请输入" v-decorator="['catalogName', { rules: [{ required: true, whitespace: true, message: '分类名称不能为空' }, { max: 100, message: '名称长度不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="上级分类：" v-bind="formItemLayout" v-show="showParent">
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="treeData"
          placeholder="请选择"
          v-decorator="['parentId', { rules: [{ required: showParent, message: '上级分类不能为空' }] }]"
          :url="TreeUrl"
        />
      </a-form-item>
      <a-form-item label="排序号：" v-bind="formItemLayout">
        <a-input-number v-decorator="['orderNum', { rules: [{ required: true, message: '请输入排序号'}, { pattern: /^[0-9]{0,7}$/, message: '排序号最多七位'}]}]" style="width:100%;" />
      </a-form-item>
      <a-form-item label="备注：" v-bind="formItemLayout">
        <a-textarea placeholder="请输入" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}] }]"/>
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataTreeSelect } from '@/iop/components'
import catalogFormVO from './vo/catalog-form-vo'
import path from '@/iop-drms/api'
import { TreeSelect } from 'ant-design-vue'
import catalogs from '@/iop-drms/service/server/catalog'

export default {
  name: 'CatalogForm',
  components: { IopDataForm, IopDataTreeSelect, ATreeSelect: TreeSelect },
  data () {
    return {
      TreeUrl: path.manage.catalog.asynTree,
      /** 表单加载、提交地址 */
      url: path.manage.catalog.form,
      /** 表单定义 */
      vo: catalogFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      treeData: [],
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
    catalogId: {
      type: String,
      required: false,
      default: null
    },
    catalogType: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted () {
    if (this.catalogType) {
      this.showParent = false
    }
  },
  methods: {
    loadConvertor (values) {
      if (this.mode === 'create') {
        this.$nextTick(() => {
          values.parentId = '0'
        })
      }
      return values
    },
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.catalogForm.showModal()
      if (this.showParent) {
        this.getTree()
      }
    },

    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      if (this.mode === 'edit') {
        const { claId } = this
        Object.assign(value, { claId })
      }
      value.catalogType = this.catalogType
      return value
    },
    getTree () {
      catalogs.getTree({ catalogType: this.catalogType }).then((res) => {
        const data = JSON.parse(JSON.stringify(res).replace(/name/g, 'title').replace(/code/g, 'key').replace(/id/g, 'value'))
        this.treeData = [data]
        this.treeData.unshift({ key: '', title: '请选择', value: '' })
      })
    }
  }
}
</script>
