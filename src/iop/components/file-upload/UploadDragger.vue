<template>
  <div>
    <template v-if="mode !== 'view'">
      <a-upload-dragger
        name="file"
        :multiple="multiple"
        :headers="headers"
        :fileList="state.successList"
        :action="url"
        :listType="listType"
        :remove="remove"
        class="upload-list-inline"
        :beforeUpload="handleBeforeUpload"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">点击或者拖拽文件上传</p>
        <p class="ant-upload-hint">
        </p>
      </a-upload-dragger>
    </template>
    <template v-else>
      <a-upload v-if="state.successList && state.successList.length > 0" :fileList="state.successList" :showUploadList="{showRemoveIcon:false}"/>
      <p v-else class="ant-empty-description" style="color: rgba(0, 0, 0, 0.25);">暂无数据</p>
    </template>
  </div>
</template>

<script>
import { iopTokenService, iopAppService, iopDataService } from '@/iop/service/index'
import { IOP_ACCESS_TOKEN, IOP_APP_CODE } from '@/iop/constants/index'
import MessageUtils from '@/utils/message'
import { Upload } from 'ant-design-vue/es/index'
import path from '@/iop/api/index'
import { arrayTool } from 'mwutil'
export default {
  name: 'FileUpload',
  components: { Upload },
  props: {
    /**
     * 业务主键
     */
    id: {
      type: String,
      required: true
    },
    /**
     * 业务表名称
     */
    businessName: {
      type: String,
      required: true
    },
    /**
     * 业务字段名称
     */
    attrName: {
      type: String,
      required: true
    },
    listType: {
      type: String,
      required: false,
      default: 'text'
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    mode: {
      type: String,
      required: true,
      default: 'edit'
    },
    customUrl: {
      type: String,
      required: false,
      default: ''
    },
    moreFileUpload: {
      type: Boolean,
      required: false,
      default: false
    },
    // 自定义校验
    validateFn: {
      type: Function,
      required: false,
      default: null
    },
    // 最大大小
    size: {
      type: [Number, String],
      required: false,
      default: 50
    },
    autoUpload: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      headers: {},
      action: '',
      defaultFileList: [],
      url: '',
      state: {
        // 当前有多少文件正在传递
        currentFileListLen: 0,
        successList: [],
        fileUploadedList: []
      }
    }
  },
  created () {
    const app = iopAppService.getCurrentAppCode()
    const token = iopTokenService.getToken(app)
    this.headers = {
      [IOP_ACCESS_TOKEN]: token,
      [IOP_APP_CODE]: app
    }
    if (this.customUrl) {
      this.url = `${this.customUrl}?busiId=${this.id}&storeCode=${this.businessName}&busiType=${this.attrName}`
    } else {
      this.url = `${path.fileStorage.upload}?busiId=${this.id}&storeCode=${this.businessName}&busiType=${this.attrName}`
    }
    if (this.mode !== 'create') {
      this.loadFiles()
    }
  },
  activated () {
    if (this.mode !== 'create') {
      this.loadFiles()
    }
  },
  computed: {
    maxSize () {
      const re = /^[0-9]+.?[0-9]*$/
      if (!re.test(this.size)) {
        return 0
      }
      return parseFloat(this.size)
    }
  },
  watch: {
    id (value) {
      if (value.length === 0) {
        MessageUtils.error('业务主键不能为空')
      } else {
        if (this.customUrl) {
          this.url = `${this.customUrl}?busiId=${this.id}&storeCode=${this.businessName}&busiType=${this.attrName}`
        } else {
          this.url = `${path.fileStorage.upload}?busiId=${this.id}&storeCode=${this.businessName}&busiType=${this.attrName}`
        }
      }
    }
  },
  methods: {
    /*
     * @description 上传之前的回掉钩子
     */
    handleBeforeUpload (file, fileList) {
      if (this.validateFile(file)) {
        if (!this.multiple) {
          this.state.successList = []
        }
        this.state.currentFileListLen++
        this.state.successList = [...this.state.successList, file]
        this.setFileField(file, '__uploaded', false)
        if (this.autoUpload) {
          this.doUploadAjax(file)
        }
        return false
      }
      return false
    },
    upload () {
      this.state.successList.forEach(file => {
        // 只上传还没上传的，防止多次上传
        if (!file.__uploaded) {
          this.doUploadAjax(file)
        }
      })
    },
    /*
     * @description 将file文件转成formdata
     * @return formData
     */
    formDataFile (file) {
      const formData = new FormData()
      formData.append('file', file)
      return formData
    },
    setFileField (file, fieldKey, fieldValue) {
      const idx = arrayTool.findIndex(this.state.successList, file)
      if (Number(idx) > -1) {
        const fileItem = this.state.successList[idx]
        fileItem[fieldKey] = fieldValue
        this.$set(this.state.successList, idx, fileItem)
      }
    },
    doUploadAjax (file) {
      const formData = this.formDataFile(file)
      this.setFileField(file, 'status', 'uploading')
      iopDataService.post({
        url: this.url,
        method: 'post',
        processData: false,
        data: formData
      })
        .then(({ code, message }) => {
          this.state.currentFileListLen--
          this.setFileField(file, '__uploaded', true)
          // 上传成功
          if (code === 200) {
            // file.status = 'done'
            this.setFileField(file, 'status', 'done')
            this.setFileField(file, 'uid', message)
            this.setFileField(file, '__isSuccess', true)
            const _fileList = [...this.state.successList].filter(x => x.__isSuccess)
            this.$emit('progress', file, _fileList)
            MessageUtils.success(`${file.name} 上传成功`)
          } else {
            this.setFileField(file, 'status', 'error')
            this.setFileField(file, '__isSuccess', false)
            MessageUtils.error(`${file.name} 上传失败`)
            // 上传失败
          }
          // this.$forceUpdate()
        })
        .catch(() => {
          this.setFileField(file, 'status', 'error')
          this.setFileField(file, '__uploaded', true)
          this.setFileField(file, '__isSuccess', false)
          this.state.currentFileListLen--
          MessageUtils.error(`${file.name} 上传失败`)
        })
        .finally(() => {
          this.$nextTick(() => {
            const _fileList = this.state.successList.filter(x => x.__isSuccess)
            if (this.state.currentFileListLen === 0) {
              this.$emit('success', _fileList)
            }
            // 文件列表
            this.state.fileUploadedList = _fileList
          })
        })
    },
    /*
     * @description 校验文件，需要传入一个file,如果用户需要自定义可以传入自定义校验函数，并返回true/false
     */
    validateFile (file) {
      // 获取用户自定义校验结果,如果用户校验错误则直接终止
      if (this.validateFn && !this.validateFn(file)) {
        return false
      }
      // 组件的校验规则
      if (this.checkSize(file)) {
        MessageUtils.error(`${file.name} 超过大小限制：${this.maxSize}M`)
        return false
      }
      return true
    },
    // 判断文件大小
    checkSize (file) {
      return file.size && (this.maxSize * 1024 * 1024) < file.size
    },
    async loadFiles () {
      const files = []
      if (this.id) {
        const { result } = await iopDataService.get({
          url: path.fileStorage.list,
          params: {
            busiId: this.id,
            busiType: this.attrName
          }
        })
        const token = iopTokenService.getCurrentToken()
        const addFiles = (item) => {
          if (!item) return
          files.push({
            uid: item.fileId,
            name: item.fileName,
            status: 'done',
            url: `${path.fileStorage.download}?fileId=${item.fileId}&fileTile=${item.fileName}&token=${token}`
          })
        }
        if (!this.multiple) {
          addFiles(result[result.length - 1])
        } else {
          result.map(item => {
            addFiles(item)
          })
        }
      }
      this.state.successList = files
    },

    getFiles () {
      return this.state.fileUploadedList
    },

    getFileNames () {
      return arrayTool.getSimpleValuesByField(this.state.fileUploadedList, 'name')
    },

    getFileIds () {
      return arrayTool.getSimpleValuesByField(this.state.fileUploadedList, 'uid')
    },
    removeItem (item) {
      this.state.successList = arrayTool.removeItem(this.state.successList, item)
      this.state.currentFileListLen--
    },
    remove (item) {
      if (!this.autoUpload) {
        this.removeItem(item)
        return Promise.resolve(false)
      }
      return new Promise((resolve, reject) => {
        if (this.mode !== 'view') {
          iopDataService.post({
            url: `${path.fileStorage.remove}?fileIds=${item.uid}`
          })
            .then(() => {
              this.removeItem(item)
              resolve()
            })
            .catch((err) => { reject(err) })
        } else {
          resolve(false)
        }
      })
    }
  }
}
</script>
