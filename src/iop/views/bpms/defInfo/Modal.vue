<template>
  <div class="tabs-header">
    <a-tabs defaultActiveKey="1" v-model="selectKey" @change="callback">
      <a-tab-pane tab="流程定义基本信息" key="1" :forceRender="true">
        <def-info-form ref="defInfoForm" :defId="defId" mode="edit"/>
      </a-tab-pane>
      <a-tab-pane tab="活动定义" key="2" :forceRender="true">
        <act-list ref="actList"/>
      </a-tab-pane>
      <a-tab-pane tab="流程定义与引擎" key="3" :forceRender="true">
        <def-to-eng-list ref="defToEngList"/>
      </a-tab-pane>
      <a-tab-pane tab="流程实例" key="4" :forceRender="true">
        <pro-instance ref="proInstance"/>
      </a-tab-pane>
      <a-button slot="tabBarExtraContent" type="primary" class="return" @click="retu()">返回</a-button>
    </a-tabs>
  </div>
</template>
<script>
import DefInfoForm from './DefInfoForm'
import ActList from './act/ActList'
import DefToEngList from './defToEng/DefToEngList'
import ProInstance from './proInstance/ProInstanceList'

export default {
  components: { DefInfoForm, ActList, DefToEngList, ProInstance },
  data () {
    return {
      selectKey: '1',
      defId: '',
      mode: 'edit'
    }
  },
  methods: {
    callback (key) {
      this.selectKey = key
      if (key === '1') this.$refs.defInfoForm.show(this.mode, '')
      else if (key === '2') this.$refs.actList.load(this.defId)
      else if (key === '3') this.$refs.defToEngList.load(this.defId)
      else if (key === '4') this.$refs.proInstance.load(this.defId)
    },
    /**
     * 打开编辑窗口
     *
     * @param {string} defId 主键
     */
    async handleEdit () {
      this.$refs.defInfoForm.show(this.defId)
    },
    retu () {
      this.$router.go(-1)
    }
  },
  mounted () {
    if (this.$route.query.defid !== undefined) {
      this.selectKey = '1'
      this.defId = this.$route.query.defid
      this.mode = this.$route.query.mode
      this.$refs.defInfoForm.show()
    }
  },
  watch: {
    $route: function () {
      if (this.$route.query.defid !== undefined) {
        this.selectKey = '1'
        this.defId = this.$route.query.defid
        this.mode = this.$route.query.mode
        this.$refs.defInfoForm.show()
      }
    }
  }
}
</script>
<style lang="less" >
.tabs-header .ant-tabs-extra-content{
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 1;
}

</style>
