<template>
  <div>
    <a-row>
      <h4>1 基本信息</h4>
      <div style="width:90%;margin:0 auto">
        <a-col :span="8" class="ellipsis">
          系统编号：{{ infoData.appCode }}
        </a-col>
        <a-col :span="8" class="ellipsis">
          系统名称：{{ infoData.appName }}
        </a-col>
        <a-col :span="8" class="ellipsis">
          上下文根：{{ infoData.appContext }}
        </a-col>
      </div>
    </a-row>
  </div>
</template>
<script>
export default {
  props: {
    infoData: {
      type: Object,
      required: true
    },
    dataSource: {
      type: Object,
      required: true
    }
  },
  methods: {
    validate (cb) {
      // TODO: 需要对所有数据进行校验时候需要执行
      const result = {
        success: true,
        message: '校验成功'
      }
      cb(result)
    }
  }
}
</script>
<style scoped>
.box-row-check >>> .ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left:0!important;
}
</style>
<style lang="less" scoped>
.ellipsis{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.flex{
  display:flex;
}
.mar10{
  margin-top:10px
}
.contineBox{
  padding-top:20px;
  padding-bottom:20px;
  display:flex;
  line-height:100%;
  align-items: center;
  &:not(:last-child){
    border-bottom:1px solid #f2f2f2;
  }
  .contineTitle{
    font-size: 16px;
    color: rgba(0,0,0,0.50);
    text-align: center;
  }
}
</style>
