<template>
  <iop-data-form
    ref="storeForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="typeId"
    :width="width"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="文档类型名称" v-bind="formItemLayout">
            <a-input placeholder="请输入文档类型名称" v-decorator="['typeName', { rules: [{ required: true, whitespace: true, message: '文档类型名称不能为空' }, { max: 100, message: '名称不能超过100'}] }]"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="文档类型编码" v-bind="formItemLayout">
            <a-input placeholder="请输入文档类型编码" v-decorator="['typeCode', { rules: [{ required: true, whitespace: true, message: '文档类型编码不能为空' }, { max: 100, message: '编码不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="是否有效" v-bind="formItemLayout">
            <a-switch :checked="isValid" @change="onIsValid"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="父级文档名称" v-bind="formItemLayout">
            <iop-data-tree-select ref="parentId" :url="parentUrl" query="parentId" v-decorator="['parentId', { rules: [{ required: true, whitespace: true, message: '父级文档名称不能为空' }] }]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="是否储存加密" v-bind="formItemLayout">
            <a-switch :checked="isEncrypt" @change="onIsEncrypt"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="是否版本管理" v-bind="formItemLayout">
            <a-switch :checked="isVersion" @change="onIsVersion"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="存储加密算法" v-bind="formItemLayout">
            <a-input placeholder="请输入存储加密算法" v-decorator="['encryptAlgo', { rules: [{ max: 100, message: '算法不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="存储加密秘钥" v-bind="formItemLayout">
            <a-input placeholder="请输入存储加密秘钥" v-decorator="['encryptKey', { rules: [{ max: 100, message: '加密密钥不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="起草地址" v-bind="formItemLayout">
            <a-input placeholder="请输入起草地址" v-decorator="['urlDraft', { rules: [{ max: 100, message: '起草加密密钥不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="管理地址" v-bind="formItemLayout">
            <a-input placeholder="请输入管理地址" v-decorator="['urlMng', { rules: [{ max: 100, message: '管理地址不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="关联表单" v-bind="formItemLayout">
            <a-input placeholder="请输入关联表单" v-decorator="['refFormId', { rules: [{ max: 100, message: '表单不能超过100'}] }]" />
            <!-- <iop-data-tree-select ref="refFormId" :url="formUrl" query="parentId" v-decorator="['refFormId']"/> -->
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="关联流程" v-bind="formItemLayout">
            <a-input placeholder="请输入关联流程" v-decorator="['refBpmdefId', { rules: [{ max: 100, message: '流程不能超过100'}] }]" />
            <!-- <iop-data-tree-select ref="refBpmdefId" :url="bFormUrl" query="parentId" v-decorator="['refBpmdefId']"/> -->
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="是否执行归档" v-bind="formItemLayout">
            <a-switch :checked="isArchive" @change="onIsArchive"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="数据归档规则" v-bind="formItemLayout">
            <a-input placeholder="请输入数据归档规则" v-decorator="['archiveRule', { rules: [{ max: 100, message: '规则不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="文件保管期限(月)" v-bind="formItemLayout">
            <a-input-number v-decorator="['bgqx', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '文件保管期限最多7位'}] }]" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="文件处置程序" v-bind="formItemLayout">
            <a-input placeholder="请输入文件处置程序" v-decorator="['czcx', { rules: [{ max: 100, message: '程序不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="排序号码" v-bind="formItemLayout">
            <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '排序号最多7位'}] }]" style="width: 100%"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="备注" v-bind="formItemLayout">
            <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注不能超过500'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import storeFormVO from './vo/store-form-vo'
import path from '@/iop/api'

// TODO 下拉树组件
export default {
  name: 'AreaForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect },
  data () {
    return {
      width: 1000,
      /** 表单加载、提交地址 */
      url: path.file.types.table,
      /** 表单定义 */
      vo: storeFormVO,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      parentUrl: '/iop/file/types/tree',
      // formUrl: '',
      // bFormUrl: '',
      isArchive: false,
      isEncrypt: false,
      isValid: false,
      isVersion: false
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
    }
  },
  methods: {
    /**
     * 显示弹窗
     */
    show () {
      this.$refs.storeForm.showModal()
    },
    /**
     * 加载前
     */
    loadConvertor (values) {
      values.isVersion === '1' ? this.isVersion = true : this.isVersion = false
      values.isArchive === '1' ? this.isArchive = true : this.isArchive = false
      values.isEncrypt === '1' ? this.isEncrypt = true : this.isEncrypt = false
      values.isValid === '1' ? this.isValid = true : this.isValid = false
      this.$nextTick(() => {
        this.$refs.parentId && this.$refs.parentId.setSelected({ title: values.parentName, key: values.parentId })
        // this.$refs.refFormId && this.$refs.refFormId.setSelected({ key: values.refFormId })
        // this.$refs.refBpmdefId && this.$refs.refBpmdefId.setSelected({ key: values.refBpmdefId })
      })
      return values
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      // 后台接口bug，要求更新时body必须有id
      if (this.mode === 'edit') {
        const { skinId } = this
        Object.assign(value, { skinId })
      }
      return value
    },
    onIsArchive (checked) {
      this.isArchive = checked
    },
    onIsEncrypt (checked) {
      this.isEncrypt = checked
    },
    onIsValid (checked) {
      this.isValid = checked
    },
    onIsVersion (checked) {
      this.isVersion = checked
    }
  }
}
</script>
