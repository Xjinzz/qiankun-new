<template>
  <a-modal
    title="目录统计"
    :visible="visible"
    @cancel="handleCancel"
    width="400px"
  >
    <div style="padding-left:30px">
      <a-row>
        <a-col :span="6">
          已用空间：
        </a-col>
        <a-col :span="18">
          {{ folderData.UsedSpace }} KB
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
          文件夹数：
        </a-col>
        <a-col :span="18">
          {{ folderData.DirCount }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
          文件数：
        </a-col>
        <a-col :span="18">
          {{ folderData.FileCount }}
        </a-col>
      </a-row>
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
import files from '@/iop/service/file/files'
export default {
  name: 'Folder',
  components: {},
  data () {
    return {
      visible: false,
      folderData: {}
    }
  },
  methods: {
    show (folderPath = '') {
      files.folder({ folderPath: folderPath }).then((res) => {
        this.folderData = res
      })
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style scoped>
div {
  font-family: 'PingFangSC-Medium';
  font-size: 16px;
  color: rgba(0,0,0,0.85);
  line-height: 42px;
}
</style>
