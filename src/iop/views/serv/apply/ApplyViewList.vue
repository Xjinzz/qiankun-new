<template>
  <div class="view-list">
    <a-card :title="title">
      <access-application
        v-if="applyType=='0'"
        :mode="mode"
        :id="id"
        :status="status"
        :appId="appId"
        :applyId="applyId"
      />
      <call-service
        v-if="applyType=='1'"
        :mode="mode"
        :id="id"
        :status="status"
        :appId="appId"
        :applyId="applyId"
      />
      <login-service
        v-if="applyType=='2'"
        :mode="mode"
        :id="id"
        :status="status"
      />
      <login-resources
        v-if="applyType=='3'"
        :mode="mode"
        :id="id"
        :status="status"
      />
    </a-card>
  </div>
</template>
<script>
import AccessApplication from './view-list/AccessApplication'
import LoginResources from './view-list/LoginResources'
import LoginService from './view-list/LoginService'
import CallService from './view-list/CallService'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: false,
      default: ''
    },
    appId: {
      type: String,
      required: false,
      default: ''
    },
    applyId: {
      type: String,
      required: false,
      default: ''
    },
    applyType: {
      type: String,
      required: false,
      default: ''
    },
    mode: {
      type: String,
      required: true,
      default: 'edit'
    }
  },
  data () {
    return {
      showAl: 0,
      showSen: 0,
      title: ''
    }
  },
  created () {
    switch (this.applyType) {
      case '0':
        this.title = '接入系统'
        break
      case '1':
        this.title = '服务'
        break
      case '2':
        this.title = '服务'
        break
      case '3':
        this.title = '资源'
        break
    }
  },
  components: {
    LoginResources,
    LoginService,
    CallService,
    AccessApplication
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
  /deep/.ant-tabs-nav-wrap{
    background: #fff;
    padding: 10px;
  }
</style>
<style >
  .view-list>.ant-card-wider-padding .ant-card-body{
    padding: 12px 16px;
  }

</style>
