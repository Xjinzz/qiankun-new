<template>
  <a-card title="审批情况" :bordered="false">
    <a-list :data-source="historyData">
      <template #renderItem="item">
        <a-card>
          <a-list-item>
            <a-list-item-meta :description="`审核时间：${item.replyTime }`">
              <template #title>
                <span>审核意见：{{ item.context }}</span>
              </template>
              <template #avatar>
                <a-avatar icon="user" size="large" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </a-card>
      </template>
    </a-list>
  </a-card>
</template>
<script>
export default {
  props: {
    historyData: {
      type: Array,
      required: false,
      default: () => {}
    }
  }
}
</script>
