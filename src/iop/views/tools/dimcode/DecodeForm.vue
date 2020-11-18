<template>
  <iop-data-form
    ref="barcodeForm"
    :mode="mode"
    :url="url"
    showType="page"
    title=" "
    :vo="vo"
    :id="id"
    :submitSuccess="submitSuccess"
  >
    <template #form>
      <a-form-item label="上传图码：" v-bind="formItemLayout">
        <a-upload
          name="file"
          :action="url"
          :fileList="fileList"
          :headers="headers"
          :before-upload="beforeUpload"
          :showUploadList="{showRemoveIcon:false}"
          @change="handleChange"
        >
          <a-button type="primary" >上传文件</a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="解析数据：" v-bind="formItemLayout">
        <a-textarea :autosize="{ minRows: 4, maxRows: 6 }" v-model="codeData" />
      </a-form-item>
    </template>
    <template #pageHeader>
      <a-button type="primary" @click="loada">清空</a-button>
    </template>
  </iop-data-form>
</template>
<script>
import { IopDataForm, IopUploadDragger } from '@/iop/components'
import path from '@/iop/api/index'
import MessageUtils from '@/utils/message'
import { iopTokenService, iopAppService } from '@/iop/service/index'

export default {
  name: 'BarcodeForm',
  components: { IopDataForm, IopUploadDragger },
  data () {
    return {
      /** 表单加载、提交地址 */
      url: path.tools.dimcode.decode,
      /** 表单定义 */
      vo: [
        {
          title: '选择类型',
          dataIndex: 'id'
        }
      ],
      /** 布局 */
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      mode: 'cerate',
      id: '',
      codeData: '',
      headers: {},
      file: {},
      fileList: []
    }
  },
  mounted () {
    this.loada()
  },
  methods: {
    // 导入上传
    handleChange ({ file = {}, fileList = [] } = {}) {
      this.fileList = fileList
      const status = file.status
      if (status === 'done') {
        this.codeData = file.response.result
        MessageUtils.success(`${file.name} 上传成功`)
      } else if (status === 'error') {
        MessageUtils.error(`${file.name} 上传失败`)
      }
    },
    beforeUpload (file) {
      this.reset()
      const type = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif'
      if (!type) {
        MessageUtils.error('请上传正确的图片格式')
      }
      return type
    },
    loada () {
      // 得到token
      const app = iopAppService.getCurrentAppCode()
      const token = iopTokenService.getToken(app)
      this.headers = {
        'Access-Token': token
      }
      this.reset()
    },
    /**
     * 清空值
     */
    reset () {
      this.codeData = ''
      this.fileList = []
    },
    /**
     * 成功回调
     */
    submitSuccess (value) {
      this.codeData = value
    }
  }
}
</script>
