<template>
  <a-modal :width="900" :visible="show" @cancel="hideModal" title="查看">
    <app-detail-form ref="detailForm" mode="view" :appId="appId" />
    <template #footer>
      <div style="text-align:center;">
        <a-button @click="hideModal">关闭</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import AppDetailForm from './AppDetailForm'

export default {
  name: 'AppViewForm',
  components: { AppDetailForm },
  props: {
    appId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    showModal () {
      this.show = true
      this.$nextTick(() => {
        this.$refs.detailForm.load()
      })
    },

    hideModal () {
      this.show = false
    }
  }
}
</script>
