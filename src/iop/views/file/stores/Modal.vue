<template>
  <div>
    <a-tabs defaultActiveKey="1" v-model="selectKey" @change="callback">
      <a-tab-pane tab="基本信息" key="1" :forceRender="true">
        <basics ref="basics" :submitSuccess="submitSuccess" :mode="formMode"></basics>
      </a-tab-pane>
      <a-tab-pane tab="统计概览" key="2" :forceRender="true">
        <analysis ref="analysis"></analysis>
      </a-tab-pane>
      <a-tab-pane tab="关联文档类型" key="3" :forceRender="true">
        <types ref="types"></types>
      </a-tab-pane>
      <a-tab-pane tab="映射物理目录" key="4" :forceRender="true">
        <mapping ref="mapping"></mapping>
      </a-tab-pane>
      <a-tab-pane tab="文件发布配置" key="5" :forceRender="true">
        <refed ref="refed"></refed>
      </a-tab-pane>
      <a-button slot="tabBarExtraContent" type="primary" @click="retu()">返回</a-button>
    </a-tabs>
  </div>
</template>
<script>
import basics from './basics/Basics'
import analysis from './analysis/AnalysisIndex'
import types from './types/TypesList'
import mapping from './mapping/MappingList'
import refed from './refed/RefedList'
import { iopAuthService } from '@/iop/service'
import { IOP_FORM_URL } from '@/iop/constants'
export default {
  components: { basics, analysis, types, mapping, refed },
  data () {
    return {
      /** 表单组件模式 */
      formMode: 'edit',
      selectKey: '1',
      storeId: '',
      storeName: '',
      storeCode: '',
      rootPath: ''
    }
  },
  methods: {
    callback (key) {
      this.selectKey = key
      if (key === '1') this.$refs.basics.show(this.formMode, this.storeId)
      else if (key === '2') this.$refs.analysis.show(this.storeId)
      else if (key === '3') this.$refs.types.show(this.storeId, this.formMode)
      else if (key === '4') this.$refs.mapping.show(this.storeId, this.storeName, this.storeCode, this.rootPath, this.formMode)
      else if (key === '5') this.$refs.refed.show(this.storeId, this.formMode)
    },
    /**
     * 表单保存成功回调
     */
    submitSuccess () {
    },
    /**
     * 打开编辑窗口
     *
     * @param {string} storeId 主键
     */
    async handleEdit () {
      this.$refs.basics.show(this.formMode, this.storeId)
    },
    retu () {
      iopAuthService.goPage(IOP_FORM_URL.FILE.STORES.LIST, { showStores: true })
    }
  },
  mounted () {
    if (this.$route.query.typesId !== undefined) {
      this.selectKey = '1'
      this.formMode = this.$route.query.formMode
      this.rootPath = this.$route.query.rootPath
      this.storeName = this.$route.query.storeName
      this.storeCode = this.$route.query.storeCode
      this.storeId = this.$route.query.typesId
      this.handleEdit()
    }
  },
  watch: {
    $route: function () {
      if (this.$route.query.typesId !== undefined) {
        this.selectKey = '1'
        this.formMode = this.$route.query.formMode
        this.rootPath = this.$route.query.rootPath
        this.storeName = this.$route.query.storeName
        this.storeCode = this.$route.query.storeCode
        this.storeId = this.$route.query.typesId
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
