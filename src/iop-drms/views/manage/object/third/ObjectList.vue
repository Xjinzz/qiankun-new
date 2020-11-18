<template>
  <a-tabs defaultActiveKey="0" class="tabs-header">
    <a-tab-pane key="0" tab="已注册">
      <registered-list />
    </a-tab-pane>
    <a-tab-pane key="1" tab="已审核">
      <!-- <in-audit-list /> -->
    </a-tab-pane>
    <a-tab-pane key="2" tab="未通过">
      <!-- <audited-list /> -->
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import RegisteredList from './RegisteredList'

export default {
  name: 'ServObjectList',
  components: { RegisteredList }
}
</script>
