<template>
  <a-tabs defaultActiveKey="0" class="tabs-header">
    <a-tab-pane key="0" tab="全部服务">
      <all-service-list />
    </a-tab-pane>
    <a-tab-pane key="1" tab="申请中">
      <pending-service-list />
    </a-tab-pane>
    <a-tab-pane key="2" tab="已通过">
      <audited-service-list />
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import AllServiceList from './AllServiceList'
import PendingServiceList from './PendingServiceList'
import AuditedServiceList from './AuditedServiceList'

export default {
  name: 'ServCallServiceList',
  components: { AllServiceList, PendingServiceList, AuditedServiceList }
}
</script>
