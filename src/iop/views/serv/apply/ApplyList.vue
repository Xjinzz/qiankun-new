<template>
  <div>
    <a-tabs defaultActiveKey="0" @change="tabChange" class="tabs-header">
      <a-tab-pane key="0" tab="审批通过">
        <through-list />
      </a-tab-pane>
      <a-tab-pane key="1" tab="审批未通过">
        <no-through-list />
      </a-tab-pane>
      <a-tab-pane key="2" tab="待审批">
        <pending-list />
      </a-tab-pane>
      <a-tab-pane key="3" tab="草稿箱">
        <draft-list />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import ThroughList from './apply-list/ThroughList'
import NoThroughList from './apply-list/NoThroughList'
import PendingList from './apply-list/PendingList'
import DraftList from './apply-list/DraftList'

export default {
  data () {
    return {
      showAl: 0,
      showSen: 0
    }
  },
  components: {
    ThroughList,
    NoThroughList,
    PendingList,
    DraftList
  },
  methods: {
    tabChange (key) {
      if (key === '0') {
      } else if (key === '1') {
        if (this.showAl === 0) {
          this.showAl++
        } else {
        }
      } else {
        if (this.showSen === 0) {
          this.showSen++
        } else {
        }
      }
    }
  }
}
</script>
