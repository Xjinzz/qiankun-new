<template>
  <a-tabs activeKey="1" type="editable-card">
    <a-tab-pane
      v-for="pane in panes"
      :key="pane.key"
      :tab="pane.title"
    >
    </a-tab-pane>
  </a-tabs>
</template>
<script>
export default {
  name: 'CMultitab',
  data () {
    return {
      panes: [
        { title: 'Tab 1', key: '1' },
        { title: 'Tab 2', key: '2' }
      ]
    }
  }
}
</script>
