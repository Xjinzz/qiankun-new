<template>
  <div>
    <!-- 个人设置-个人消息 -->
    <a-tabs defaultActiveKey="0" @change="tabChange" class="tabs-header">
      <a-tab-pane key="0" tab="未读">
        <unread-list ref="unreads"></unread-list>
      </a-tab-pane>
      <a-tab-pane key="1" tab="已读" :forceRender="true">
        <already-list ref="alreadys"></already-list>
      </a-tab-pane>
      <a-tab-pane key="2" tab="草稿" :forceRender="true">
        <draft-list ref="draft"></draft-list>
      </a-tab-pane>
      <a-tab-pane key="3" tab="已发送" :forceRender="true">
        <send-list ref="sends"></send-list>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import alreadyList from './AlreadyList'
import unreadList from './UnreadList'
import draftList from './DraftList'
import sendList from './SendList'
export default {
  data () {
    return {
      showAl: 0,
      showSen: 0
    }
  },
  components: { alreadyList, unreadList, draftList, sendList },
  methods: {
    tabChange (key) {
      if (key === '0') {
        this.$refs.unreads.showData()
      } else if (key === '1') {
        this.$refs.alreadys.showData()
      } else if (key === '2') {
        this.$refs.draft.showData()
      } else {
        this.$refs.sends.showData()
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .tabs-header {
    /deep/ .ant-tabs-nav-wrap {
      padding-top: 7px !important;
      .ant-tabs-tab {
        padding-bottom: 19px;
      }
    }
  }
</style>
