<template>
  <div>
    <iop-data-form
      ref="mappingForm"
      :mode="mode"
      :url="url"
      :vo="vo"
      :id="id"
      :submitSuccess="submitSuccess"
      :submitConvertor="submitConvertor"
      :loadConvertor="loadConvertor"
      :reset="reset"
    >
      <template #form>
        <a-form-item label="文件库名称" v-bind="formItemLayout">
          <a-input disabled v-decorator="['storeName', { rules: [{ max: 100, message: '名称不能超过100'}] }]"/>
        </a-form-item>
        <a-form-item label="文件库编码" v-bind="formItemLayout">
          <a-input disabled v-decorator="['storeCode', { rules: [{ max: 100, message: '编码不能超过100'}] }]"/>
        </a-form-item>
        <a-form-item label="文档类型名称" v-bind="formItemLayout">
          <iop-data-tree-select
            ref="typeId"
            :url="typeUrl"
            query="id"
            :loadQuery="loadQuery"
            v-decorator="['typeId', { rules: [{ required: true, whitespace: true, message: '父级文档名称不能为空' }] }]"
          />
        </a-form-item>
        <a-form-item label="文件库物理目录" v-bind="formItemLayout">
          <div v-if="folderNameTab === ''"></div>
          <a-tag v-else>{{ folderNameTab }}</a-tag>
          <a-button type="primary" @click="selCatalog" style="float: right; margin-right: 0;">选择</a-button>
        </a-form-item>
        <a-form-item label="备注" v-bind="formItemLayout">
          <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', { rules: [{ max: 500, message: '备注长度不能超过500'}] }]" />
        </a-form-item>
      </template>
    </iop-data-form>
    <mapping-sel v-if="showSta" ref="mappingSel" @selectCatalog="selectCatalog"></mapping-sel>
  </div>
</template>
<script>
import { IopDataForm, IopDataTreeSelect } from '@/iop/components'
import mappingFormVO from './vo/mapping-form-vo'
import path from '@/iop/api'
import mappingSel from './MappingSel'

export default {
  name: 'MappingForm',
  components: { IopDataForm, IopDataTreeSelect, mappingSel },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.file.stores.mappingList,
      /** 表单定义 */
      vo: mappingFormVO,
      /** 新建表单的初始值，设置上级行政区划 */
      initValue: {},
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 }
      },
      loadQuery: { id: '0' },
      isVersion: true,
      typeUrl: path.file.stores.mappingFormTree,
      catalogData: [],
      rootPath: '',
      folderName: '',
      folderNameTab: '',
      showSta: true
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
    storeId: {
      type: String,
      required: false,
      default: ''
    },
    storeName: {
      type: String,
      required: false,
      default: ''
    },
    storeCode: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    selectCatalog (path) {
      this.folderName = path
      const num = path.split('')
      this.folderNameTab = ''
      for (const key in num) {
        if (key < 20) this.folderNameTab += num[key]
      }
      if (num.length > 21) this.folderNameTab += '...'
    },
    selCatalog () {
      this.showSta = false
      this.$nextTick(() => {
        this.showSta = true
        this.$nextTick(() => {
          this.$refs.mappingSel.show(this.rootPath, this.folderName)
        })
      })
    },
    /**
     * 显示弹窗
     */
    show (rootPath) {
      this.rootPath = rootPath
      this.typeUrl = path.file.stores.mappingFormTree + '/' + this.storeId
      this.$refs.mappingForm.showModal()
    },
    /**
     * 加载前
     */
    loadConvertor (values) {
      values.storeName = this.storeName
      values.storeCode = this.storeCode
      if (this.mode === 'create') {
        this.folderName = ''
        this.$refs.typeId && this.$refs.typeId.cleanSelected()
      } else {
        this.$nextTick(() => {
          this.folderName = values.folderName
          this.$refs.typeId && this.$refs.typeId.setSelected({ title: values.typeName, value: values.typeId })
        })
      }
      return values
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      value.storeId = this.storeId
      value.folderName = this.folderName
      return value
    },
    // 重置
    reset (cb) {
      cb()
      const values = this.$refs.basicsForm.record
      if (this.mode === 'created') {
        this.folderName = ''
        this.$refs.typeId && this.$refs.typeId.cleanSelected()
      } else {
        this.folderName = values.folderName
        this.$refs.typeId && this.$refs.typeId.setSelected({ title: values.typeName, value: values.typeId })
      }
    },
    onIsVersion (checked) {
      this.isVersion = checked
    }
  }
}
</script>
