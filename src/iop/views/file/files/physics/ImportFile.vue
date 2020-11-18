<template>
  <a-modal
    title="导入文件"
    :visible="visible"
    @cancel="handleCancel"
    width="400px"
  >
    <div>
      <a-upload-dragger
        v-if="visible"
        name="file"
        :action="url"
        :headers="headers"
        :before-upload="beforeUpload"
        :showUploadList="{showRemoveIcon:false}"
        :fileList="fileList"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" style="color: #40a9ff;font-size: 48px"/>
        </p>
        <p class="ant-upload-text">点击或者拖拽文件上传</p>
        <p class="ant-upload-hint">
        </p>
      </a-upload-dragger>
    </div>
    <template slot="footer">
      <div style="text-align: center">
        <a-button key="back" @click="handleCancel">
          关闭
        </a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import path from '@/iop/api/index'
import { iopTokenService, iopAppService } from '@/iop/service/index'
export default {
  name: 'Move',
  components: {},
  data () {
    return {
      visible: false,
      url: '',
      headers: {},
      loading: false,
      fileList: []
    }
  },
  methods: {
    show (code) {
      this.visible = true
      const app = iopAppService.getCurrentAppCode()
      const token = iopTokenService.getToken(app)
      this.url = `${path.file.files.filesImport}?filePath=${code}`
      this.headers = {
        'Access-Token': token
      }
    },
    handleCancel () {
      this.visible = false
      this.$emit('search')
    },
    handleChange ({ file = {}, fileList = [] } = {}) {
      const files = [...fileList]
      const status = file.status
      if (status === 'done') {
        for (const item of fileList) {
          if (file.uid === item.uid) {
            if (file.response.success) {
              this.$message.success('上传成功')
            } else {
              item.status = 'error'
              this.$message.error(`${item.name} 上传失败 ${file.response.message}`)
            }
          }
        }
      } else if (status === 'error') {
        this.$message.error(`${file.name} 上传失败`)
      }
      this.fileList = files
    },
    beforeUpload (file) {
      const type = file.type.indexOf('zip') !== -1
      if (!type) {
        this.$message.error('请上传格式为zip的文件')
      }
      return type
    }
  }
}
</script>
<style lang="less" scoped>
.avatar-uploader {
  /deep/ .ant-upload {
    width: 255px;
    height: 130px;
    margin: 0 auto;
    font-size: 16px;
  }
}
</style>
