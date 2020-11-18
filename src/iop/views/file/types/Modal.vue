<template>
  <div>
    <a-tabs defaultActiveKey="1" v-model="selectKey" @change="callback">
      <a-tab-pane tab="基本信息" key="1" :forceRender="true">
        <basics ref="basics" :submitSuccess="submitSuccess" :mode="formMode"></basics>
      </a-tab-pane>
      <a-tab-pane tab="关联物理库" key="3" :forceRender="true">
        <store ref="store"></store>
      </a-tab-pane>
      <a-tab-pane tab="关联逻辑库" key="4" :forceRender="true">
        <ctlgs ref="ctlgs"></ctlgs>
      </a-tab-pane>
      <a-tab-pane tab="模板管理" key="2" :forceRender="true">
        <temp ref="temp" :mode="formMode"></temp>
      </a-tab-pane>
      <a-tab-pane tab="生命周期管理" key="5" :forceRender="true">
        <lifecycle ref="lifecycle"></lifecycle>
      </a-tab-pane>
      <a-button slot="tabBarExtraContent" type="primary" @click="retu()">返回</a-button>
    </a-tabs>
  </div>
</template>
<script>
import basics from './basics/Basics'
import store from './stores/StoreList'
import temp from './temp/TempList'
import lifecycle from './lifecycle/LifecycleList'
import ctlgs from './ctlgs/CtlgsList'
import { iopAuthService } from '@/iop/service'
import { IOP_FORM_URL } from '@/iop/constants'
export default {
  components: { basics, store, temp, lifecycle, ctlgs },
  data () {
    return {
      /** 表单组件模式 */
      formMode: 'edit',
      selectKey: '1',
      typeId: '',
      typeName: ''
    }
  },
  methods: {
    callback (key) {
      this.selectKey = key
      if (key === '1') this.$refs.basics.show(this.formMode, this.typeId)
      else if (key === '2') this.$refs.temp.show(this.typeId, this.formMode)
      else if (key === '3') this.$refs.store.show(this.typeId, this.formMode)
      else if (key === '4') this.$refs.ctlgs.show(this.typeId, this.formMode)
      else if (key === '5') this.$refs.lifecycle.show(this.typeId, this.typeName, this.formMode)
    },
    /**
     * 表单保存成功回调
     */
    submitSuccess () {
    },
    /**
     * 打开编辑窗口
     *
     * @param {string} typeId 主键
     */
    async handleEdit () {
      this.$refs.basics.show(this.formMode, this.typeId)
    },
    retu () {
      iopAuthService.goPage(IOP_FORM_URL.FILE.LIFECYCLE.LIST, { showTypes: true })
    }
  },
  mounted () {
    if (this.$route.query.typesId !== undefined) {
      this.selectKey = '1'
      this.formMode = this.$route.query.formMode
      this.typeId = this.$route.query.typesId
      this.typeName = this.$route.query.typesName
      this.handleEdit()
    }
  },
  watch: {
    $route: function () {
      if (this.$route.query.typesId !== undefined) {
        this.selectKey = '1'
        this.formMode = this.$route.query.formMode
        this.typeId = this.$route.query.typesId
        this.typeName = this.$route.query.typesName
        this.handleEdit()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ant-tabs {
  /deep/ .ant-tabs-bar {
    background: #fff;
    padding: 10px;
  }
  /deep/ .ant-card {
    margin: 0 !important;
  }
  /deep/ .ant-card-body {
    padding: 20px;
  }
}
</style>
