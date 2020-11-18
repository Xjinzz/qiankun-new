<template>
  <div>
    <a-card :title="'方法名称：'+methodDetail.chName+ '方法'" v-if="methodDetail !== null">
      <a-button slot="extra" @click="goBack">返回</a-button>
      <a-row>
        <a-col :span="8">
          <p>方法调用名：{{ methodDetail.methodName }}</p>
        </a-col>
        <a-col :span="8">
          <p>方法中文名：{{ methodDetail.chName }}</p>
        </a-col>
        <a-col :span="8">
          <p>支持格式：{{ methodDetail.format }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <p>请求方式：{{ methodDetail.requestMode }}</p>
        </a-col>
        <a-col :span="8">
          <p>方法授权界面：{{ methodDetail.authPage }}</p>
        </a-col>
        <a-col :span="8">
          <p>日志级别：{{ logLevel }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <p>授权方式：{{ $route.query.authType === '0' ? '无授权控制' : '有授权控制' }}</p>
        </a-col>
        <a-col :span="8">
          <p>是否启用：{{ methodDetail.isValide === '0' ? '否' : '是' }}</p>
        </a-col>
        <a-col :span="8">
          <p>方法说明：{{ methodDetail.remark }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <p>返回示例：{{ methodDetail.backTest }}</p>
        </a-col>
        <a-col :span="8">
        </a-col>
        <a-col :span="8">
        </a-col>
      </a-row>
    </a-card>
    <a-tabs defaultActiveKey="0">
      <a-tab-pane key="0" tab="方法授权">
        <method-view-list :methodId="id" :serviceId="$route.query.serviceId" :mode="$route.query.mode"/>
      </a-tab-pane>
      <a-tab-pane key="1" tab="参数">
        <param-view-list/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// import AuthMethodList from './AuthMethodList'
import MethodViewList from './MethodViewList'
import ParamViewList from './ParamViewList'
import { iopServService } from '@/iop/service/index'
export default {
  name: 'AuthView',
  components: { MethodViewList, ParamViewList },
  data () {
    return {
      methodDetail: null,
      logLevel: '',
      id: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.id = this.$route.query.methodId
    iopServService.methodDetail(this.id).then(res => {
      this.methodDetail = res
    })
    this.methodDetail && this.methodDetail.forEach(v => {
      if (v.logLevel === '0') {
        this.logLevel = '不记日志'
      } else if (v.logLevel === '1') {
        this.logLevel = '记操作日志'
      } else if (v.logLevel === '2') {
        this.logLevel = '记变更日志'
      }
    })
  }
}
</script>
<style lang="less" scoped>
  /deep/.ant-tabs-nav-scroll{
    overflow: hidden;
    white-space: nowrap;
    background: #fff;
  }
</style>
