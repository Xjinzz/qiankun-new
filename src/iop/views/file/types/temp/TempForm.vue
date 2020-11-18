<template>
  <iop-data-form
    ref="tempForm"
    :mode="mode"
    :url="url"
    :vo="vo"
    :id="tmplId"
    :submitSuccess="submitSuccess"
    :submitConvertor="submitConvertor"
    :loadConvertor="loadConvertor"
  >
    <template #form>
      <a-form-item label="模板名称" v-bind="formItemLayout">
        <a-input placeholder="请输入模板名称" v-decorator="['tmplName', { rules: [{ required: true, whitespace: true, message: '模板名称不能为空' }, { max: 100, message: '名称不能超过100'}] }]" />
      </a-form-item>
      <a-form-item label="模板状态" v-bind="formItemLayout">
        <a-switch :checked="status" @change="onStatusChange" />
      </a-form-item>
      <a-form-item label="上传模板" v-bind="formItemLayout">
        <iop-upload-dragger
          ref="tmp"
          :mode="mode"
          :id="uuservId"
          businessName="FileTypeTmplStore"
          attrName="TMPL_FILE" />
      </a-form-item>
      <a-form-item label="模板预览图" v-bind="formItemLayout">
        <iop-upload-dragger
          ref="prev"
          :mode="mode"
          :id="uuservId"
          :echoUrl="'/iop/file/files/files'"
          businessName="FileTypeTmplStore"
          attrName="TMMPL_PREVIEW" />
      </a-form-item>
      <a-form-item label="模板缩略图" v-bind="formItemLayout">
        <iop-upload-dragger
          ref="thum"
          :mode="mode"
          :id="uuservId"
          :echoUrl="'/iop/file/files/files'"
          businessName="FileTypeTmplStore"
          attrName="TMPL_THUMB" />
      </a-form-item>
      <a-form-item label="备注" v-bind="formItemLayout">
        <a-textarea placeholder="请输入备注" :autosize="{ minRows: 4, maxRows: 6 }" v-decorator="['remark', {rules: [{ max: 500, message: '备注不能超过500'}]}]" />
      </a-form-item>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopUploadDragger } from '@/iop/components'
import path from '@/iop/api'
import tempFormVO from './vo/temp-form-vo'
import UUIDUtils from '@/utils/uuid'
import types from '@/iop/service/file/types'

export default {
  name: 'TempForm',
  components: { IopDataForm, IopUploadDragger },
  data () {
    return {
      mode: 'create',
      /** 表单加载、提交地址 */
      url: path.file.types.template,
      /** 表单定义 */
      vo: tempFormVO,
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 13 }
      },
      typeId: '',
      tmplId: '',
      uuservId: '',
      status: true
    }
  },
  methods: {
    show (id, mode, tmplId) {
      this.$refs.tempForm.showModal()
      this.typeId = id
      this.tmplId = tmplId
      this.mode = mode
      if (this.mode === 'create') {
        this.uuservId = UUIDUtils.generate()
      } else {
        this.uuservId = this.tmplId
      }
    },
    loadConvertor (values) {
      if (this.mode === 'create') {
        this.status = true
      } else {
        this.$nextTick(() => {
          values.status === '1' ? this.status = true : this.status = false
          this.$refs.tmp && this.$refs.tmp.loadFiles()
          this.$refs.prev && this.$refs.prev.loadFiles()
          this.$refs.thum && this.$refs.thum.loadFiles()
        })
      }
      return values
    },
    /**
     * 表单提交前对数据处理
     */
    submitConvertor (value) {
      value.tmplFileId = this.$refs.tmp.getFileIds()[0]
      value.previewImageId = this.$refs.prev.getFileIds()[0]
      value.thumbImageId = this.$refs.thum.getFileIds()[0]
      this.status ? value.status = '1' : value.status = '0'
      value.releaseTime = this.relaTime
      value.typeId = this.typeId
      if (this.mode === 'create') {
        value.tmplId = this.uuservId
      }
      if (this.mode === 'edit') {
        const { tmplId } = this
        Object.assign(value, { tmplId })
      }
      return value
    },
    onStatusChange (checked) {
      this.status = checked
    },
    submitSuccess (result) {
      const fileIds = []
      if (result.tmplFileId) {
        fileIds.push(result.tmplFileId)
      }
      if (result.thumbImageId) {
        fileIds.push(result.thumbImageId)
      }
      if (result.previewImageId) {
        fileIds.push(result.previewImageId)
      }
      if (fileIds.length !== 0) {
        types.operation({ busiId: result.tmplId }, fileIds).then((res) => {
        }).catch((err) => {
          this.$message.error(err)
        })
      }
      this.$emit('submitSuccess')
    }
  }
}
</script>
