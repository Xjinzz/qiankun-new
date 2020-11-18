<template>
  <a-tabs defaultActiveKey="0" class="tabs-header">
    <a-tab-pane key="0" tab="待审核">
      <in-audit-list />
    </a-tab-pane>
    <a-tab-pane key="1" tab="已审核">
      <audited-list />

    </a-tab-pane>
  </a-tabs>
</template>
<script>
import InAuditList from './InAuditList'
import AuditedList from './AuditedList'

export default {
  name: 'ApplyAdminList',
  components: { InAuditList, AuditedList }
}
</script>
