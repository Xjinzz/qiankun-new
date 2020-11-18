<template>
  <a-modal
    title="导入"
    width="850px"
    :visible="true"
    v-if="importModal"
    @cancel="hideImportModal"
    @ok="submitHandle"
  >
    <a-form :form="form">
      <a-spin :spinning="spinningTag">
        <a-form-item v-bind="layout" label="所属单位">
          <iop-data-tree-select
            ref="deptname"
            :url="treeUrl"
            @onSelect="deptNameChange"
            v-decorator="[
              'id',
              {rules: [{ required: true, whitespace: true, message: '请选择所属单位' }]}
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="layout" label="版本号">
          <a-input v-decorator="['versionNum', {rules: [{ required: true, whitespace: true, message: '请输入版本号' }]}]"></a-input>
        </a-form-item>
        <a-form-item v-bind="layout" label="上传文件">
          <a-upload-dragger
            ref="upload"
            name="file"
            :multiple="false"
            :beforeUpload="handleBeforeUpload"
            @change="handleChange"
            :file-list="fileList"
            :remove="remove"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p class="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </a-upload-dragger>
        </a-form-item>
      </a-spin>
    </a-form>
    <template #footer>
      <div style="text-align:center;">
        <a-button @click="hideImportModal">取消</a-button>
        <a-button :loading="spinningTag" type="primary" @click="submitHandle">
          确定
        </a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import { IopDataTreeSelect } from '@/iop/components'
import Service from '@/iop-drms/service/zhuangfa/zhuangfa'
export default {
  components: {
    IopDataTreeSelect
  },
  data () {
    return {
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      entity: {
        deptName: ''
      },
      importModal: false,
      fileList: [],
      treeUrl: '/iop/drms/data-manage/data/obj/examinDept/tree',
      form: this.$form.createForm(this),
      spinningTag: false
    }
  },
  methods: {
    show () {
      this.importModal = true
      this.remove()
    },
    hideImportModal () {
      this.importModal = false
    },
    handleBeforeUpload () {
      return false
    },
    /*
     * @description 将file文件转成formdata
     * @return formData
     */
    formDataFile (file) {
      const formData = new FormData()
      const formParams = Object.assign({
        file
      }, this.entity, this.form.getFieldsValue())
      for (const key in formParams) {
        const item = formParams[key]
        formData.append(key, item)
      }
      return formData
    },
    handleChange ({ file }) {
      this.$set(this.fileList, 0, file)
    },
    remove () {
      this.fileList = []
    },
    submitHandle () {
      this.form.validateFields(error => {
        if (!error) {
          if (this.fileList.length === 0) {
            this.$message.error('请上传文件')
            return
          }
          this.spinningTag = true
          Service.doUpload(this.formDataFile(this.fileList[0]))
            .then(() => {
              this.$message.success('导入成功')
              this.hideImportModal()
            })
            .catch(e => {
              this.$message.error(e)
            })
            .finally(() => {
              this.spinningTag = false
            })
        }
      })
    },
    deptNameChange ({ key, data }) {
      this.entity.deptName = data.name
    }
  }
}
</script>
