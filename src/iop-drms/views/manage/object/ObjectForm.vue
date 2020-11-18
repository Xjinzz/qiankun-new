<template>
  <div>
    <a-tabs defaultActiveKey="1" v-model="selectKey" @change="callback">
      <a-tab-pane tab="基本信息" key="1" :forceRender="true">
        <basics ref="basics" :submitSuccess="submitSuccess" :mode="formMode" :objectId="objectId"></basics>
      </a-tab-pane>
      <a-tab-pane tab="资源描述" key="2" :forceRender="true">
        <descs ref="descss"></descs>
      </a-tab-pane>
      <a-tab-pane tab="资源标识" key="3" :forceRender="true">
        <segment ref="segments"></segment>
      </a-tab-pane>
      <a-tab-pane tab="资源文件" key="4">
        <file ref="files" :objectId="objectId"></file>
      </a-tab-pane>
      <a-tab-pane tab="资源关系" key="5" :forceRender="true">
        <rela ref="relas" :objectName="objectName"></rela>
      </a-tab-pane>
      <a-button slot="tabBarExtraContent" type="primary" @click="retu()">返回</a-button>
    </a-tabs>
  </div>
</template>
<script>
import rela from './rela/RelationList'
import descs from './desc/DescList'
import segment from './segment/SegmentList'
import file from './file/FileList'
import basics from './basics/BasicsForm'
export default {
  components: { descs, segment, file, basics, rela },
  data () {
    return {
      objectId: '',
      objectName: '',
      /** 表单组件模式 */
      formMode: 'edit',
      selectKey: '1'
    }
  },
  methods: {
    callback (key) {
      this.selectKey = key
      if (key === '2') {
        this.$refs.descss.getList(this.objectId)
      } else if (key === '3') {
        this.$refs.segments.getList(this.objectId)
      } else if (key === '5') {
        this.$refs.relas.getList(this.objectId)
      }
    },
    /**
     * 表单保存成功回调
     */
    submitSuccess () {
    },
    /**
     * 打开编辑窗口
     *
     * @param {string} objectId 主键
     */
    async handleEdit () {
      this.$refs.basics.show()
    },
    retu () {
      this.$router.go(-1)
    }
  },
  mounted () {
    if (this.$route.query.objectFormId !== undefined) {
      this.selectKey = '1'
      this.objectId = this.$route.query.objectFormId
      this.objectName = this.$route.query.objectFormName
      this.formMode = this.$route.query.formMode
      this.handleEdit()
    }
  },
  watch: {
    $route: function () {
      if (this.$route.query.objectFormId !== undefined) {
        this.selectKey = '1'
        this.objectId = this.$route.query.objectFormId
        this.objectName = this.$route.query.objectFormName
        this.formMode = this.$route.query.formMode
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
    padding: 24px 0;
  }
}
</style>
