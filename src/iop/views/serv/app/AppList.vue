<template>
  <a-tabs defaultActiveKey="0" class="tabs-header" @change="callback">
    <a-tab-pane key="0" tab="待申请" :forceRender="true">
      <pending-list ref="pending"/>
    </a-tab-pane>
    <a-tab-pane key="1" tab="审核中" :forceRender="true">
      <in-audit-list ref="inaudit"/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="已通过" :forceRender="true">
      <audited-list ref="audited"/>
    </a-tab-pane>
    <a-tab-pane key="3" tab="未通过" :forceRender="true">
      <no-through-list ref="through"/>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import PendingList from './PendingList'
import InAuditList from './InAuditList'
import AuditedList from './AuditedList'
import NoThroughList from './NoThroughList'

export default {
  components: {
    PendingList,
    InAuditList,
    AuditedList,
    NoThroughList
  },
  methods: {
    callback (key) {
      if (key === '0') this.$refs.pending.search()
      else if (key === '1') this.$refs.inaudit.search()
      else if (key === '2') this.$refs.audited.search()
      else this.$refs.through.search()
    }
  },
  mounted () {
    this.$refs.pending.search()
  }
}
</script>
