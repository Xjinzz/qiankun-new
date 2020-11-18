<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    {{ title === '修改文件名称' ? '文件名称：' : '文件夹名称：' }}<a-input v-model="fileName" style="width: 80%"></a-input>
  </a-modal>
</template>
<script>
import files from '@/iop/service/file/files'
export default {
  name: 'PhysicsForm',
  components: {},
  data () {
    return {
      mode: '',
      title: '',
      visible: false,
      fileName: '',
      filePath: ''
    }
  },
  methods: {
    show (mode = 'create', filePath = '', fileName = '', title = '') {
      this.mode = mode
      this.title = mode === 'create' ? '新增文件夹' : '修改文件夹名称'
      this.filePath = filePath
      this.fileName = mode === 'create' ? '' : fileName
      this.title = title
      this.visible = true
    },
    handleOk () {
      this.visible = false
      const data = {
        filePath: this.filePath,
        fileName: this.fileName
      }
      if (this.mode === 'create') {
        files.filesAdd(data).then((res) => {
          this.$emit('submitSuccess')
        })
      } else {
        files.filesRename(data).then((res) => {
          this.$emit('submitSuccess')
        })
      }
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
