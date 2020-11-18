<template>
  <iop-data-form
    ref="basicsForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="fileId"
    :showType="showType"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
    :reset="reset"
  >
    <template #form>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="文件编号" v-bind="formItemLayout">
            <a-input placeholder="请输入文档编号" v-decorator="['fileCode', {rules: [{ max: 100, message: '编号不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="文件标题" v-bind="formItemLayout">
            <a-input placeholder="请输入文档标题" v-decorator="['fileTitle', {rules: [{ max: 100, message: '标题不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="关键词" v-bind="formItemLayout">
            <a-input placeholder="请输入关键词" v-decorator="['keyWord', {rules: [{ max: 100, message: '关键词不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="文档类型" v-bind="formItemLayout">
            <iop-data-tree-select ref="pubFileTypeId" :url="pubUrl" query="parentId" v-decorator="['pubFileTypeId']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="编制单位名称" v-bind="formItemLayout">
            <a-input placeholder="请输入绘制单位名称" v-decorator="['deptName', {rules: [{ max: 100, message: '编制单位名称不能超过100'}] }]" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="编制人姓名" v-bind="formItemLayout">
            <a-input placeholder="请输入绘制人姓名" v-decorator="['authorName', {rules: [{ max: 100, message: '编制人姓名不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="编制完成日期" v-bind="formItemLayout">
            <a-date-picker style="width:100%" format="YYYY/MM/DD" @change="finChange" v-decorator="['finishDate']"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="发布单位名称" v-bind="formItemLayout">
            <a-input v-decorator="['pubDeptName', {rules: [{ max: 100, message: '单位名称不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="发布日期" v-bind="formItemLayout">
            <a-date-picker style="width:100%" format="YYYY/MM/DD" @change="pubChange" v-decorator="['pubDate']"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="文件格式类型" v-bind="formItemLayout">
            <a-input placeholder="请输入文件格式类型" v-decorator="['fileFormat', {rules: [{ max: 100, message: '格式类型不能超过100'}] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="是否密件" v-bind="formItemLayout">
            <iop-data-dict-select ref="isSecure" type="isTrue" v-decorator="['isSecure']"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="密件等级" v-bind="formItemLayout">
            <iop-data-dict-select ref="secureLevel" type="isTrue" v-decorator="['secureLevel']"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :md="12" :sm="24">
          <a-form-item label="文件序号" v-bind="formItemLayout">
            <a-input-number v-decorator="['orderNum', { rules: [{ pattern: /^[0-9]{0,7}$/, message: '文件序号只能输入最多7位'}] }]" style="width: 100%"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="摘要说明" v-bind="remLayout">
        <a-textarea placeholder="请输入摘要说明" style="width:100%" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', {rules: [{ max: 500, message: '说明长度不能超过500'}] }]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopDataDictSelect, IopDataTreeSelect } from '@/iop/components'
import basicsFormVO from './vo/basics-form-vo'
import { DatePicker } from 'ant-design-vue'
import path from '@/iop/api'
import moment from 'moment'

export default {
  name: 'BasicsForm',
  components: { IopDataForm, IopDataDictSelect, IopDataTreeSelect, ADatePicker: DatePicker },
  data () {
    return {
      pubUrl: '/iop/drms/catalog/tree',
      /** 表单加载、提交地址 */
      url: path.file.files.businessList,
      /** 表单定义 */
      vo: basicsFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 13 }
      },
      remLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      pubDate: '',
      finishDate: '',
      showType: 'page'
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
    /** 数据主键 */
    fileId: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    show () {
      this.$nextTick(() => {
        this.$refs.basicsForm.load()
      })
    },
    loadConvertor (values) {
      const dictSelectArray = ['secureLevel', 'isSecure', 'pubFileTypeId']
      if (this.mode === 'create') {
        this.$nextTick(() => {
          dictSelectArray.map(name => {
            this.$refs[name] && this.$refs[name].cleanSelected()
          })
        })
      } else {
        this.$nextTick(() => {
          this.$refs.secureLevel && this.$refs.secureLevel.setSelected(values.secureLevel)
          this.$refs.isSecure && this.$refs.isSecure.setSelected(values.isSecure)
          this.$refs.pubFileTypeId && this.$refs.pubFileTypeId.setSelected({ title: values.pubFileTypeId })
          values.pubDate = values.pubDate ? moment(values.pubDate) : null
          values.finishDate = values.finishDate ? moment(values.finishDate) : null
        })
      }
      return values
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      value.pubDate = this.pubDate
      value.finishDate = this.finishDate
      if (this.mode === 'edit') {
        const { fileId } = this
        Object.assign(value, { fileId })
      }
      return value
    },
    reset (cb) {
      cb()
      const values = this.$refs.basicsForm.record
      if (this.mode === 'created') {
        const dictSelectArray = ['secureLevel', 'isSecure', 'pubFileTypeId']
        dictSelectArray.map(name => {
          this.$refs[name] && this.$refs[name].cleanSelected()
        })
      } else {
        this.$refs.secureLevel && this.$refs.secureLevel.setSelected(values.secureLevel)
        this.$refs.isSecure && this.$refs.isSecure.setSelected(values.isSecure)
        this.$refs.pubFileTypeId && this.$refs.pubFileTypeId.setSelected({ title: values.pubFileTypeId })
        values.pubDate = values.pubDate ? moment(values.pubDate) : null
        values.finishDate = values.finishDate ? moment(values.finishDate) : null
      }
    },
    pubChange (date, dateString) {
      const nowdate = new Date(dateString).getTime()
      this.pubDate = nowdate
    },
    finChange (date, dateString) {
      const nowdate = new Date(dateString).getTime()
      this.finishDate = nowdate
    }
  }
}
</script>
<style lang="less" scoped>
textarea.ant-input {
  max-width:80%
}
</style>
