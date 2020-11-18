<template>
  <div>
    <span style="display: block;font-family: PingFangSC-Medium;font-size: 16px;color: #333333;">非结构化数据统计</span>
    <div v-for="(item, i) in filesData" :key="i" style="width: 33%;margin-top: 20px;display: inline-block">
      <a-card style="width: 90%;margin: 0 auto" :hoverable="true" @click="jumpList(item)">
        <div class="title">
          <div>
            <a-icon type="folder" style="fontSize: 30px"/>
          </div>
          <div>
            {{ item.defiName }}
          </div>
        </div>
        <div style="margin-top:10px">
          <a-row :gutter="24">
            <a-col :span="12">
              使用容量：{{ item.dirCount }}
            </a-col>
            <a-col :span="12">
              文件夹数量：{{ item.dirCount }}个
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              文件数量：{{ item.dirCount }}个
            </a-col>
          </a-row>
        </div>
      </a-card>
    </div>
  </div>
</template>
<script>
import iopFilesService from '@/iop/service/file/files'
export default {
  /** 数据发布组件 */
  name: 'FilesIndex',
  data () {
    return {
      filesData: []
    }
  },
  methods: {
    getData () {
      iopFilesService.filesTotal().then((res) => {
        this.filesData = res
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
.title {
  height: 30px;
  div {
    font-family: 'PingFangSC-Medium';
    font-size: 16px;
    color: rgba(0,0,0,0.85);
    height: 30px;
    line-height: 30px;
    float: left;
    margin-right: 10px
  }
}
.ant-card-wider-padding .ant-card-body {
}
</style>
